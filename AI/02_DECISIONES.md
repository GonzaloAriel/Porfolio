# 02_DECISIONES.md

FORMATO: 1.0

## Reglas

Guardar unicamente decisiones tecnicas o de arquitectura que no deben volver
a discutirse.

Una decision puede ser reemplazada por otra. Nunca se borra historial: la
decision vieja se marca como REEMPLAZADA.

Solo registrar decisiones reales tomadas. No opiniones ni propuestas no aprobadas.

Cuando se registra una decision, indicar el numero siguiente libre
(D-001, D-002, etc).

## Indice

| ID | Decision | Fecha | Estado |
|----|----------|-------|--------|
| D-001 | Sitio estatico: HTML5 + CSS puro, sin JS ni build tools | 2025-09-20 | REEMPLAZADA por D-006 |
| D-002 | Layout con CSS Grid para el contenido y Flexbox para header/nav | 2025-09-20 | REEMPLAZADA por D-007 |
| D-003 | Formulario sin backend, enviado via FormSubmit.co | 2025-09-21 | VIGENTE |
| D-004 | Responsive con una unica media query a 600px | 2025-09-21 | REEMPLAZADA por D-007 |
| D-005 | Deploy en GitHub Pages desde rama main | 2025-09-20 | VIGENTE |
| D-006 | Sitio estatico + JS vanilla propio, sin frameworks ni build tools | 2026-10-11 | VIGENTE |
| D-007 | Design system gotico "La Ciudad Velada": tokens, texturas, breakpoints multiples | 2026-10-11 | VIGENTE |
| D-008 | Identidad narrativa original; sin referencias explicitas a obras ajenas | 2026-10-11 | VIGENTE |
| D-009 | Tipografias serif goticas autoalojadas via Google Fonts | 2026-10-11 | VIGENTE |
| D-010 | Habilidades como categorias del stack, sin barras de porcentaje | 2026-10-11 | VIGENTE |

## Detalle

### D-001

Fecha: 2025-09-20

Decision: El portfolio se implementa como sitio estatico con HTML5 y CSS3
puro. No se usan frameworks JS, ni Node, ni bundlers/build tools.

Motivo: El objetivo es un portfolio personal simple, de bajo mantenimiento y
publicable en un hosting estatico (GitHub Pages) sin proceso de build.

Consecuencias: Toda funcionalidad debe resolverse con HTML/CSS o servicios
externos embebidos. Introducir JS o un framework requeria reabrir esta
decision con el TEAM LEAD.

Reemplaza a: NINGUNA

Estado: REEMPLAZADA por D-006 (2026-10-11: el rediseno requiere interacciones;
se autoriza JS vanilla, sigue prohibido todo framework y build tool).

### D-002

Fecha: 2025-09-20

Decision: El layout general usa CSS Grid (`.site-container` con
`grid-template-columns: auto auto`) para organizar los bloques de contenido, y
Flexbox para el header (`.header-container`) y el menu de navegacion
(`.menu-nav`, `.nav-ul`).

Motivo: Grid facilita el flujo de bloques a dos columnas (secciones a ancho
completo con `grid-column: 1/3`), Flexbox resuelve alineacion horizontal del
header y menu.

Consecuencias: Los nuevos bloques deben integrarse respetando el grid; los que
ocupan todo el ancho usan `grid-column: 1/3`.

Reemplaza a: NINGUNA

Estado: REEMPLAZADA por D-007 (2026-10-11: el rediseno redefine layout y sistema visual).

### D-003

Fecha: 2025-09-21

Decision: El formulario de contacto no tiene backend propio. Se envia con
`action="https://formsubmit.co/<email>"` (FormSubmit.co) y campos ocultos
`_next` y `_captcha`.

Motivo: Evitar infraestructura de servidor para un sitio estatico.

Consecuencias: Depende de un servicio externo. El campo `_next` debe apuntar a
la URL publica real (ver P-003). No agregar backend sin reabrir la decision.

Reemplaza a: NINGUNA

Estado: VIGENTE

### D-004

Fecha: 2025-09-21

Decision: La adaptacion a movil se hace con una unica media query
`@media (max-width: 600px)` en `css/Styles.css`, que pasa el grid a `display:
block`, apila el header en columna y desactiva la imagen de fondo del body.

Motivo: Mantener un solo punto de quiebre, simple de mantener.

Consecuencias: Todo ajuste responsive nuevo debe ir dentro de esa media query
salvo que el TEAM LEAD decida agregar mas breakpoints.

Reemplaza a: NINGUNA

Estado: REEMPLAZADA por D-007 (2026-10-11: se usan multiples breakpoints).

### D-005

Fecha: 2025-09-20

Decision: El sitio se publica en GitHub Pages sirviendo desde la rama `main`.
Por eso el archivo de entrada se renombro a `index.html` en minusculas.

Motivo: GitHub Pages exige `index.html` como documento raiz.

Consecuencias: El nombre del archivo de entrada no debe cambiarse. El campo
`_next` del formulario y cualquier ruta absoluta deben usar la URL publica.

Reemplaza a: NINGUNA

Estado: VIGENTE

### D-006

Fecha: 2026-10-11

Decision: Se autoriza JavaScript vanilla propio para el sitio, cargado desde
`js/main.js`. Se mantiene la prohibicion de frameworks JS, Node, bundlers y
build tools. El sitio sigue siendo estatico y publicable en GitHub Pages.

Motivo: El rediseno inmersivo requiere interacciones y animaciones (cursor,
particulas, loader, audio, easter eggs) que CSS solo no cubre. El TEAM LEAD
aprueba JS vanilla tras presentar el conflicto con D-001.

Consecuencias: JS solo en `js/main.js`, sin dependencias externas ni
transpilado. Todo debe funcionar abriendo `index.html` directamente. No
introducir npm, frameworks ni pasos de build sin reabrir la decision.

Reemplaza a: D-001

Estado: VIGENTE

### D-007

Fecha: 2026-10-11

Decision: Se adopta un design system gotico-victoriano llamado "La Ciudad
Velada", definido con custom properties CSS en `css/Styles.css`. Tokens:
paleta (vacio, sangre, oro, luna, bruma, pergamino, hueso, ascua), tipografias,
sombras, espaciados y texturas. Se reemplaza el layout de grid unico por
secciones a ancho completo con multiples breakpoints (no solo 600px).

Motivo: El nuevo objetivo es una experiencia inmersiva, no una grilla de
bloques. Centralizar tokens permite consistencia y cambios rapidos.

Consecuencias: Todo color/tipografia/espaciado nuevo debe salir de los tokens,
no hardcodear valores. Los breakpoints se documentan en el CSS.

Reemplaza a: D-002 y D-004

Estado: VIGENTE

### D-008

Fecha: 2026-10-11

Decision: La identidad narrativa es original. El setting se llama "La Ciudad
Velada". NO se usan nombres, logos, runas, tipografias ni assets de obras
ajenas (ni el nombre de ningun videojuego). La iconografia (sigilo del
cazador, runas, goteo) es diseno propio inspirado en la atmosfera.

Motivo: Requisito explicito del TEAM LEAD: tomar la estetica y la atmosfera,
sin referencias explicitas ni plagio.

Consecuencias: Nada en el sitio puede nombrar obras reales. El credito del
footer es generico ("estetica victoriana-gotica"). Revisar cualquier texto
nuevo contra esta regla.

Reemplaza a: NINGUNA

Estado: VIGENTE

### D-009

Fecha: 2026-10-11

Decision: Las tipografias se cargan desde Google Fonts mediante `<link>`:
Cinzel Decorative y Cinzel (titulos), EB Garamond (subtitulos), Crimson Text /
Spectral (cuerpo), IM Fell English (imprenta/UI) y UnifrakturCook (caligrafia
goticas puntuales).

Motivo: Reproducir la tipografia serif gotica de imprenta victoriana requerida
por el diseno.

Consecuencias: Depende de Google Fonts por CDN. Mantener fallbacks serif en las
declaraciones `font-family`.

Reemplaza a: NINGUNA

Estado: VIGENTE

### D-010

Fecha: 2026-10-11

Decision: La seccion de Habilidades ("El Taller") se presenta como categorias
del stack tecnologico (Backend, Arquitectura, Bases de datos, Frontend, Cloud y
Deploy, Herramientas), SIN barras de porcentaje por habilidad.

Motivo: El brief pedia "viales de sangre que se llenan", pero asignar
porcentajes de dominio seria una metrica no verificable. El TEAM LEAD aporto el
stack como categorias, no como niveles.

Consecuencias: No reintroducir barras de progreso por habilidad salvo pedido
explicito. Los viales de sangre siguen existiendo como indicador de scroll.

Reemplaza a: NINGUNA

Estado: VIGENTE

Al tomar una decision nueva, agregar una ficha con el ID siguiente y
actualizar el indice.

Al reemplazar una decision, marcar la ficha anterior como REEMPLAZADA por
D-XXX y agregar la nueva.

Registrar bajo confirmacion del TEAM LEAD.
