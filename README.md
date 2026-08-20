# Gamer World

[![Calidad del sitio](https://github.com/Ezequiel-Leiva-Cecchi/ProyectoFinal-LeivaCecchi-DesarrolloWeb/actions/workflows/quality.yml/badge.svg?branch=agent/mejora-html-css)](https://github.com/Ezequiel-Leiva-Cecchi/ProyectoFinal-LeivaCecchi-DesarrolloWeb/actions/workflows/quality.yml)

Gamer World es una experiencia web ficticia para descubrir videojuegos de
PlayStation 4, PlayStation 5 y Xbox. Nació como proyecto final de Desarrollo
Web y fue renovada con una identidad visual gamer, cards cinematográficas y un
diseño adaptable a cualquier pantalla.

> El proyecto funciona únicamente con HTML y CSS/Sass en el navegador. No
> carga JavaScript, no utiliza backend y no almacena información personal.

## Vista previa

[Abrir Gamer World en el navegador](https://htmlpreview.github.io/?https://github.com/Ezequiel-Leiva-Cecchi/ProyectoFinal-LeivaCecchi-DesarrolloWeb/blob/agent/mejora-html-css/index.html)

## Características

- Portada inmersiva con composición diferente para escritorio y celular.
- Catálogos independientes para PS4, PS5 y Xbox.
- Portadas locales de alta resolución y cards adaptables.
- Menú móvil desplegable hecho exclusivamente con HTML y CSS.
- Animaciones y microinteracciones CSS con soporte para movimiento reducido.
- Formularios de ingreso y registro presentados como demostraciones.
- Navegación por teclado, foco visible y textos alternativos.
- Validación automática de HTML, enlaces, imágenes, Sass y reglas responsive.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura semántica de las ocho páginas |
| CSS3 | Diseño, responsive, menú y animaciones |
| Sass | Organización modular de los estilos |
| Node.js | Herramientas de desarrollo y validaciones locales |
| GitHub Actions | Control automático de calidad |

Bootstrap y JavaScript no son necesarios para ejecutar el sitio.

## Páginas disponibles

| Página | Descripción |
| --- | --- |
| `index.html` | Portada, plataformas y juegos destacados |
| `pages/ps4.html` | Catálogo de PlayStation 4 |
| `pages/ps5.html` | Catálogo de PlayStation 5 |
| `pages/xbox.html` | Catálogo de Xbox |
| `pages/nosotros.html` | Presentación del proyecto |
| `pages/iniciarSesion.html` | Formulario demostrativo de ingreso |
| `pages/crearSesion.html` | Formulario demostrativo de registro |
| `pages/carrito.html` | Estado demostrativo del carrito |

## Ejecutar el proyecto

Para recorrerlo no hace falta instalar nada: descargá el repositorio y abrí
`index.html` en cualquier navegador moderno.

Si querés modificar Sass o ejecutar los controles de calidad, necesitás
Node.js:

```bash
npm install
npm run check
```

Durante el desarrollo podés recompilar los estilos automáticamente:

```bash
npm run watch:css
```

## Estructura

```text
.
├── .github/workflows/     Validación automática
├── assets/                Imágenes y portadas locales
├── css/style.css          Estilos compilados para el navegador
├── docs/                  Revisión técnica y fuentes de imágenes
├── pages/                 Catálogos y páginas secundarias
├── scripts/               Controles locales de calidad
├── scss/                  Fuente modular de los estilos
├── index.html             Página principal
└── package.json           Comandos de desarrollo
```

## Alcance y seguridad

Este es un proyecto educativo y estático. Los precios son ilustrativos, el
carrito no realiza compras y los formularios no envían ni guardan datos. Esta
decisión permite publicar la demostración sin servidor, base de datos ni
credenciales.

La explicación completa de la renovación está en
[`docs/REVISION_TECNICA.md`](docs/REVISION_TECNICA.md). Las procedencias de las
portadas incorporadas están documentadas en
[`docs/IMAGE_SOURCES.md`](docs/IMAGE_SOURCES.md).
