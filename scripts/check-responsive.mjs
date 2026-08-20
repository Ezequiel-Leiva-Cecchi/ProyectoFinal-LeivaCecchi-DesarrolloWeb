import { readFileSync } from "node:fs";

// La lista explícita evita que una página quede fuera de la comprobación por un
// cambio accidental en un patrón de búsqueda.
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

// Registra todos los problemas y los informa juntos para acelerar la corrección
// tanto en la computadora local como dentro de GitHub Actions.
const errors = [];
const requireText = (content, expected, context) => {
  if (!content.includes(expected)) errors.push(`${context}: falta ${expected}`);
};

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");

  // Cada página debe cargar el comportamiento y conectar el botón con el mismo
  // identificador de navegación mediante atributos accesibles.
  requireText(html, "navigation.js", file);
  requireText(html, 'class="nav-toggle"', file);
  requireText(html, 'aria-controls="primary-navigation"', file);
  requireText(html, 'id="primary-navigation"', file);
  requireText(html, "data-navigation", file);
}

const css = readFileSync("css/style.css", "utf8");

// Estas reglas son las garantías mínimas del diseño móvil: panel desplegable,
// portadas panorámicas y productos compactos de dos columnas.
requireText(css, "@media (max-width: 62rem)", "css/style.css");
requireText(css, ".js .primary-nav[data-open=true]", "css/style.css");
requireText(css, "aspect-ratio: 16/7", "css/style.css");
requireText(
  css,
  "grid-template-columns: minmax(7.25rem, 34%) minmax(0, 1fr)",
  "css/style.css",
);

// El script debe actualizar tanto la interfaz visual como aria-expanded; así el
// menú funciona para mouse, teclado y lectores de pantalla.
const navigationScript = readFileSync("js/navigation.js", "utf8");
requireText(navigationScript, 'setAttribute("aria-expanded"', "js/navigation.js");
requireText(navigationScript, "navigation.dataset.open", "js/navigation.js");
requireText(navigationScript, 'event.key === "Escape"', "js/navigation.js");

if (errors.length > 0) {
  console.error("Falló la revisión responsive:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Responsive verificado en ${htmlFiles.length} páginas.`);
