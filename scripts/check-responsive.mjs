import { existsSync, readFileSync } from "node:fs";

const htmlFiles = [
  "index.html",
  "pages/carrito.html",
  "pages/crearSesion.html",
  "pages/iniciarSesion.html",
  "pages/nosotros.html",
  "pages/ps4.html",
  "pages/ps5.html",
  "pages/xbox.html",
];

const errors = [];
const requireText = (content, expected, context) => {
  if (!content.includes(expected)) errors.push(`${context}: falta ${expected}`);
};

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");

  // El checkbox y su etiqueta ofrecen la apertura/cierre sin descargar ni
  // ejecutar código en el navegador.
  requireText(html, '<input class="nav-switch"', file);
  requireText(html, '<label class="nav-toggle"', file);
  requireText(html, '<nav class="primary-nav"', file);

  if (/<script\b/i.test(html)) {
    errors.push(`${file}: no debe cargar JavaScript`);
  }
}

if (existsSync("js/navigation.js")) {
  errors.push("js/navigation.js: el sitio debe funcionar solo con HTML y CSS");
}

const css = readFileSync("css/style.css", "utf8");

// Estas señales garantizan un menú CSS, tarjetas contenidas, animaciones y una
// alternativa sin movimiento para quien la haya configurado en su sistema.
requireText(css, "@media (max-width: 68rem)", "css/style.css");
requireText(css, ".nav-switch:checked ~ .primary-nav", "css/style.css");
requireText(css, "overflow-x: clip", "css/style.css");
requireText(css, "aspect-ratio: 16/10", "css/style.css");
requireText(css, "@keyframes card-rise", "css/style.css");
requireText(css, "@media (prefers-reduced-motion: reduce)", "css/style.css");

if (errors.length > 0) {
  console.error("Falló la revisión responsive:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Responsive sin JavaScript verificado en ${htmlFiles.length} páginas.`);
