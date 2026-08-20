import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = ["index.html", "pages/ps4.html", "pages/ps5.html", "pages/xbox.html"];
const minimumWidth = 450;
const minimumHeight = 600;
const errors = [];
const checkedImages = new Set();

// Obtiene el tamaño real de un JPEG sin agregar una biblioteca al proyecto.
// Los marcadores SOF contienen el ancho y el alto codificados en el archivo.
const readJpegSize = (filePath) => {
  const image = readFileSync(filePath);

  if (image[0] !== 0xff || image[1] !== 0xd8) {
    throw new Error("el archivo no es un JPEG válido");
  }

  let offset = 2;
  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
  ]);

  while (offset < image.length) {
    if (image[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    while (image[offset] === 0xff) offset += 1;
    const marker = image[offset];
    offset += 1;

    // SOI y EOI no tienen un segmento de datos con longitud propia.
    if (marker === 0xd8 || marker === 0xd9) continue;
    if (offset + 1 >= image.length) break;

    const segmentLength = image.readUInt16BE(offset);
    if (startOfFrameMarkers.has(marker)) {
      return {
        height: image.readUInt16BE(offset + 3),
        width: image.readUInt16BE(offset + 5),
      };
    }

    offset += segmentLength;
  }

  throw new Error("no se encontraron las dimensiones del JPEG");
};

for (const htmlFile of htmlFiles) {
  const htmlPath = resolve(projectRoot, htmlFile);
  const html = readFileSync(htmlPath, "utf8");
  const imagePattern = /<img class="product-card__image" src="([^"]+)" width="(\d+)" height="(\d+)"/g;

  for (const match of html.matchAll(imagePattern)) {
    const [, encodedSource, declaredWidth, declaredHeight] = match;
    const source = decodeURIComponent(encodedSource);
    const imagePath = resolve(dirname(htmlPath), source);

    // Una misma portada puede aparecer en Inicio y en su catálogo; se revisa
    // una sola vez para mantener una salida breve y fácil de entender.
    if (checkedImages.has(imagePath)) continue;
    checkedImages.add(imagePath);

    try {
      const { width, height } = readJpegSize(imagePath);

      if (width !== Number(declaredWidth) || height !== Number(declaredHeight)) {
        errors.push(`${source}: HTML declara ${declaredWidth}x${declaredHeight}, pero el archivo mide ${width}x${height}`);
      }

      if (width < minimumWidth || height < minimumHeight) {
        errors.push(`${source}: resolución insuficiente (${width}x${height}; mínimo ${minimumWidth}x${minimumHeight})`);
      }
    } catch (error) {
      errors.push(`${source}: ${error.message}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Falló la revisión de portadas:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`${checkedImages.size} portadas verificadas en alta resolución.`);
