# Gamer World

Gamer World es una tienda ficticia de videojuegos creada como proyecto final
del curso de Desarrollo Web. El sitio es estático: permite recorrer catálogos,
consultar información y ver formularios de demostración, pero no procesa
compras ni almacena datos personales.

## Qué se mejoró

- HTML semántico y válido en todas las páginas.
- Navegación, encabezado y pie consistentes, con menú móvil controlado mediante
  un checkbox accesible y CSS, sin JavaScript.
- Diseño responsive real para teléfono, tablet y escritorio, con cards
  cinematográficas que cambian de proporción según el espacio disponible.
- Animaciones y microinteracciones hechas únicamente con CSS, respetando la
  preferencia del sistema para reducir el movimiento.
- Banners optimizados en WebP y portadas locales de alta resolución para los
  tres catálogos.
- Estados de foco, contraste y textos alternativos accesibles.
- Formularios identificados claramente como demostraciones sin backend.
- Sass dividido por responsabilidad y compilado en un único CSS.
- Validación automática de HTML, enlaces, resolución real de las portadas,
  reglas responsive y compilación en GitHub Actions.
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

Vercel sirve directamente los archivos estáticos del repositorio. El archivo
`vercel.json` evita que la plataforma confunda el control de Sass con un paso
de construcción que deba generar otra carpeta de salida.

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

Este repositorio demuestra HTML semántico, Sass, animaciones CSS, diseño
responsive y accesibilidad. El sitio no carga JavaScript: el menú se despliega
con HTML y CSS, y los formularios actuales no envían ni guardan información.

La comparación completa de las preentregas y las decisiones tomadas está en
[`docs/REVISION_TECNICA.md`](docs/REVISION_TECNICA.md).
Las procedencias de las portadas incorporadas durante la mejora están en
[`docs/IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md).
