# Gamer World

Gamer World es una tienda ficticia de videojuegos creada como proyecto final
del curso de Desarrollo Web. El sitio es estático: permite recorrer catálogos,
consultar información y ver formularios de demostración, pero no procesa
compras ni almacena datos personales.

## Qué se mejoró

- HTML semántico y válido en todas las páginas.
- Navegación, encabezado y pie consistentes.
- Diseño responsive para teléfono, tablet y escritorio.
- Estados de foco, contraste y textos alternativos accesibles.
- Formularios identificados claramente como demostraciones sin backend.
- Sass dividido por responsabilidad y compilado en un único CSS.
- Validación automática de HTML y compilación en GitHub Actions.
- Eliminación de dependencias visuales externas y enlaces internos rotos.

## Ejecutar el proyecto

Podés abrir `index.html` directamente en un navegador. Para trabajar con los
estilos y ejecutar los controles de calidad necesitás Node.js:

```bash
npm install
npm run check
```

Mientras editás Sass, podés recompilar automáticamente con:

```bash
npm run watch:css
```

## Estructura

```text
.
├── index.html             Página principal
├── pages/                 Catálogos y páginas secundarias
├── assets/                Imágenes locales del proyecto
├── scss/                  Fuente modular de los estilos
├── css/style.css          CSS generado para el navegador
└── .github/workflows/     Validación automática
```

## Alcance

Este repositorio demuestra maquetación, diseño responsive y accesibilidad. Un
carrito real, autenticación y newsletter requieren JavaScript y un backend;
por seguridad, los formularios actuales no envían ni guardan información.

La comparación completa de las preentregas y las decisiones tomadas está en
[`docs/REVISION_TECNICA.md`](docs/REVISION_TECNICA.md).
