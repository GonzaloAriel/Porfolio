# 00_MEMORIA.md

FORMATO: 1.0

## Proyecto

Porfolio (portfolio personal de Gonzalo Ariel Acuña)

Sitio web personal de una sola pagina que presenta el perfil profesional de
Gonzalo Ariel Acuña: presentacion, experiencia, educacion, proyectos
academicos, habilidades tecnicas, certificaciones, contacto y un formulario de
mensaje. Es un portfolio estatico orientado a la busqueda de la primera
oportunidad laboral en IT. NO es una aplicacion con backend, base de datos,
autenticacion ni logica de servidor, ni una plataforma de multiples usuarios.

## Stack

- Lenguaje/marcado: HTML5 (un unico documento raiz `index.html`).
- Estilos: CSS3 puro en `css/Styles.css` (design system con custom properties,
  Flexbox, CSS Grid y multiples breakpoints).
- JavaScript: vanilla propio en `js/main.js` (sin dependencias, sin build). Ver D-006.
- Backend/BD/auth: no hay. El formulario usa el servicio externo FormSubmit.co.
- Gestor de paquetes / build tools / linter / tests: no hay.
- Tipografias: Google Fonts por CDN (ver D-009).
- Control de versiones: git, rama `main`, remoto en GitHub.

## Arquitectura

El proyecto es un sitio estatico de un solo documento HTML que referencia una
hoja de estilos externa, un script propio y assets de imagen. No hay capas de
aplicacion, servicios ni acceso a datos.

Flujo de render: navegador carga `index.html` -> enlaza `./css/Styles.css` ->
carga `./js/main.js` -> carga imagenes desde `./img/`. El unico punto de salida
de datos es el formulario, que hace POST directo a FormSubmit.co.

`index.html` contiene la estructura, el contenido y los SVG de atmosfera.
`css/Styles.css` contiene el design system (tokens) y todas las reglas visuales.
`js/main.js` contiene las interacciones progresivas (loader, cursor, particulas,
paralaje, nav, audio, easter egg).
`img/` contiene las imagenes (foto de perfil y texturas).

Nunca romper este flujo sin reabrir la decision con el TEAM LEAD.

Reglas inviolables vigentes:
- Sin frameworks ni build tools; JS vanilla propio unicamente (D-006).
- Todo color/tipografia/espaciado sale de los tokens del design system (D-007).
- Identidad narrativa original, sin referencias explicitas a obras ajenas (D-008).
- El documento de entrada se llama `index.html` en minusculas (D-005).

## Objetivo actual

Rediseno inmersivo del portfolio con una experiencia narrativa de scroll
inspirada en la atmosfera gotico-victoriana oscura, con identidad propia
("La Ciudad Velada"). El visitante recorre distritos: Hero, Sobre mi, Proyectos,
Habilidades, Experiencia, Contacto y Footer.

En curso esta primera etapa: design system + Hero + chrome global (loader,
cursor, particulas, nav, vial de scroll). Las secciones restantes quedan en
tratamiento basico on-brand y se trabajan en etapas siguientes.

El contenido ya refleja el perfil profesional real (Desarrollador de Software
.NET / Backend): perfil, stack por categorias, proyectos Minimercado y JKTURNOS,
experiencia en Willder S.A. (2005-2026) y educacion UTN (2022-2026).

Queda para despues: tratamiento dedicado de Proyectos (bestiario), Habilidades
(taller), Experiencia (camino) y Contacto, mas los problemas abiertos de
`03_PROBLEMAS.md`.

## Plan activo

Estado del ciclo: IMPLEMENTACION

Registrar aqui unicamente el paso en curso. Actualizar bajo confirmacion del TEAM LEAD.

Siguiente paso: implementar design system + Hero + chrome global (etapa 1).

Ciclo en curso (2026-10-11, orden de prioridad definido por TEAM LEAD):
1) Design system + Hero + chrome global (esta sesion).
2) Secciones restantes: Proyectos, Habilidades, Experiencia, Contacto.

## Fuentes de verdad

El proyecto no tiene carpeta `DOCS/` propia. La unica documentacion existente es
`README.md` (actualmente vacio, ver P-005). No se duplica en AI/.

- `README.md` - descripcion del proyecto (pendiente de contenido).
- `.git` (historial de commits) - historia de cambios del proyecto.
- Repositorio GitHub - hosting y deploy (no verificado en esta sesion).

## Archivos de esta memoria

Leer en este orden segun la tarea.

- 01_ESTADO.md - estado real por modulo. Solo el TEAM LEAD confirma CONSOLIDADO.
- 02_DECISIONES.md - decisiones tecnicas preservadas (IDs D-XXX).
- 03_PROBLEMAS.md - problemas conocidos (IDs P-XXX) y resueltos.

## Rutas de lectura por tarea

Toda tarea: leer este archivo y 01_ESTADO.md.

- Tarea de implementacion (HTML/CSS): leer ademas 02_DECISIONES.md y las
  secciones de 03_PROBLEMAS.md que afecten al bloque.
- Tarea de arquitectura o tecnologia (JS, framework, backend): leer
  02_DECISIONES.md completo.
- Tarea de diagnostico o bug: leer 03_PROBLEMAS.md completo y 01_ESTADO.md
  del modulo.
- Tarea de contenido o producto (textos, datos personales): consultar
  `README.md` e `index.html`.
- Tarea de frontend / UI / responsive: leer `css/Styles.css` y 02_DECISIONES.md
  (D-002, D-004).

## Reglas de la memoria

Solo el TEAM LEAD confirma que una etapa esta terminada, aprobada y funcionando.

Nunca auto-consolidar una etapa.

Una implementacion existente pero no confirmada no es CONSOLIDADO.

Lo que falla se registra en 03_PROBLEMAS.md.

Lo que se decide se registra en 02_DECISIONES.md.

Lo que se confirma se registra en 01_ESTADO.md.

No guardar conversaciones, logs, razonamientos internos ni opiniones temporales.

No duplicar la documentacion de producto.

La memoria permite a cualquier modelo continuar el trabajo sin conocer
conversaciones anteriores.
