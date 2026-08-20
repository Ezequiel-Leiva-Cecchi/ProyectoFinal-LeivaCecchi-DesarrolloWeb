import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// El script solo revisa archivos dentro del repositorio y nunca hace solicitudes de red.
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ignoredProtocols = /^(?:https?:|mailto:|tel:|data:)/i;
const problems = [];

function collectHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      // Dependencias y metadatos de Git no forman parte del sitio publicado.
      return ["node_modules", ".git"].includes(entry.name) ? [] : collectHtmlFiles(fullPath);
    }

    return entry.isFile() && extname(entry.name) === ".html" ? [fullPath] : [];
  });
}

function idsFrom(html) {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]));
}

function targetFor(rawReference, sourceFile) {
  const [pathPart, fragment = ""] = rawReference.split("#", 2);
  const decodedPath = decodeURIComponent(pathPart.split("?", 1)[0]);
  const targetPath = decodedPath ? resolve(dirname(sourceFile), decodedPath) : sourceFile;

  return { targetPath, fragment };
}

const htmlFiles = collectHtmlFiles(projectRoot);
const htmlCache = new Map(htmlFiles.map((file) => [file, readFileSync(file, "utf8")]));

for (const [sourceFile, html] of htmlCache) {
  const seenIds = new Set();

  // Los identificadores duplicados rompen etiquetas, anclas y ayudas de accesibilidad.
  for (const match of html.matchAll(/\sid="([^"]+)"/g)) {
    const id = match[1];
    if (seenIds.has(id)) {
      problems.push(`${relative(projectRoot, sourceFile)}: id duplicado "${id}"`);
    }
    seenIds.add(id);
  }

  // Se inspeccionan únicamente href y src entre comillas, que es el formato validado del proyecto.
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];

    if (!reference || ignoredProtocols.test(reference)) {
      continue;
    }

    const { targetPath, fragment } = targetFor(reference, sourceFile);

    if (isAbsolute(reference) || !targetPath.startsWith(projectRoot)) {
      problems.push(`${relative(projectRoot, sourceFile)}: la ruta sale del proyecto: ${reference}`);
      continue;
    }

    if (!existsSync(targetPath) || !statSync(targetPath).isFile()) {
      problems.push(`${relative(projectRoot, sourceFile)}: no existe ${reference}`);
      continue;
    }

    if (fragment && extname(targetPath) === ".html") {
      const targetHtml = htmlCache.get(targetPath) ?? readFileSync(targetPath, "utf8");
      if (!idsFrom(targetHtml).has(fragment)) {
        problems.push(`${relative(projectRoot, sourceFile)}: no existe el destino #${fragment} en ${reference}`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Enlaces locales verificados en ${htmlFiles.length} páginas.`);
}
