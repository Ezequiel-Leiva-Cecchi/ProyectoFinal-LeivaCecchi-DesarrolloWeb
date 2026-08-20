# Revisión técnica de los proyectos de Desarrollo Web

Fecha de revisión: 20 de agosto de 2026.

## Repositorios revisados

### `PreEntrega2LeivaCecchi`

La segunda preentrega contiene seis páginas HTML, una hoja CSS, recursos y
wireframes para escritorio y teléfono. Es una base útil para observar el inicio
del diseño, pero ya fue superada por las entregas siguientes.

Problemas principales encontrados:

- estilos concentrados en un único archivo;
- navegación y pie repetidos en cada página;
- HTML con estructura inválida y rutas inconsistentes;
- formularios sin un comportamiento o una advertencia clara;
- imágenes y nombres de archivo difíciles de mantener.

### `PreEntrega3LeivaCecchi`

La tercera preentrega incorpora Sass, Bootstrap, más productos y un diseño más
completo. El repositorio introduce una separación inicial entre base,
componentes y layouts.

Problemas principales encontrados:

- el `package.json` no incluía Sass ni un comando real de validación;
- coexistían numerosos CSS parciales compilados que las páginas no utilizaban;
- la navegación dependía de una versión alfa de Bootstrap;
- se repetían errores de etiquetas, identificadores y enlaces;
- encabezado y pie seguían copiados en todas las páginas.

### `ProyectoFinal-LeivaCecchi-DesarrolloWeb`

El proyecto final es la evolución directa de las preentregas. Suma las páginas
de carrito y presentación, banners por plataforma y la versión más completa de
los estilos. Por ese motivo se eligió como única base canónica para mejorar.

Problemas heredados que se corrigieron:

- `lang="en"` en contenido escrito en español;
- etiquetas inexistentes como `<il>` y atributos incompletos;
- enlaces del pie que apuntaban a `pages/pages/...`;
- identificadores repetidos en formularios;
- botones y enlaces anidados de forma inválida;
- formularios que parecían enviar información aunque no existía un backend;
- carga de logos de pago desde un servicio ajeno;
- teléfonos y perfiles personales repetidos en todas las páginas;
- estilos con medidas rígidas, reglas duplicadas y responsive limitado;
- ausencia de README, pruebas y automatización.

## Decisiones de la mejora

1. Conservar la marca Gamer World y los tres catálogos, reemplazando únicamente
   los banners borrosos por composiciones originales optimizadas.
2. Mantener el resultado como un sitio estático que funciona sin servidor.
3. Reemplazar Bootstrap por CSS propio para reducir dependencias y enseñar con
   claridad qué hace cada estilo.
4. Dividir Sass en base, componentes y layouts, compilándolo en un solo CSS.
5. Usar HTML semántico, textos alternativos, foco visible y enlaces válidos.
6. Marcar carrito, registro e ingreso como demostraciones sin persistencia.
7. Agregar controles automáticos para HTML, Sass y recursos locales.
8. No modificar las preentregas históricas: sirven como evidencia de progreso y
   actualizar tres copias del mismo sitio generaría mantenimiento duplicado.
9. Sustituir el desplazamiento horizontal del encabezado por un menú móvil
   controlado con un checkbox accesible y CSS, sin JavaScript.
10. Convertir las fichas en composiciones cinematográficas que cambian de
    proporción según el ancho disponible.

## Próximos pasos recomendados

Las mejoras deberían respetar el alcance de HTML y Sass acordado para el
proyecto:

1. ampliar el catálogo con nuevas páginas semánticas;
2. seguir optimizando imágenes y rendimiento;
3. mejorar las composiciones de formularios y estados vacíos;
4. sumar pruebas visuales para distintos tamaños de pantalla;
5. revisar periódicamente contraste, foco visible y navegación por teclado.
