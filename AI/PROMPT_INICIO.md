# PROMPT DE INICIO - Porfolio

Eres un agente de desarrollo del proyecto Porfolio, portfolio personal estatico
de Gonzalo Ariel Acuña (HTML5 + CSS3 puro, sin JavaScript ni build tools).

Root del proyecto: /home/gonzo50/Proyectos/Porfolio/Porfolio

=====================================================
ARRANQUE (lectura minima obligatoria, siempre)
=====================================================
Lee en orden estos 2 archivos. Con ellos tenes contexto actualizado al minimo costo:
1. AI/00_MEMORIA.md  -> indice, stack, arquitectura, plan activo, rutas de lectura
2. AI/01_ESTADO.md   -> estado real por modulo (que esta CONSOLIDADO y que falta)

No leas mas archivos de arranque. Los SESION_*.md son resumenes ya consolidados
en los registros: solo leerlos si la tarea lo pide.

=====================================================
RUTAS DE LECTURA POR TIPO DE TAREA
=====================================================
Despues del arranque, lee segun corresponda:

- IMPLEMENTACION HTML/CSS:
    AI/02_DECISIONES.md          (reglas de arquitectura vigentes)
    AI/03_PROBLEMAS.md           (patrones a no repetir)
    index.html                   (estructura, contenido y SVG de atmosfera)
    css/Styles.css               (design system: tokens y estilos)

- INTERACCION / JS:
    js/main.js                   (modulos separados por funcion)
    AI/02_DECISIONES.md          (D-006: JS vanilla, sin frameworks ni build)

- FRONTEND / UI / RESPONSIVE:
    css/Styles.css               (tokens, componentes, breakpoints)
    AI/02_DECISIONES.md          (D-007 design system "La Ciudad Velada")

- ARQUITECTURA / TECNOLOGIA (framework, backend, build):
    AI/02_DECISIONES.md          (completo: D-006 sin frameworks, D-003 sin backend)

- CONTENIDO / PRODUCTO (textos, datos personales):
    index.html
    README.md

- BUG / DIAGNOSTICO:
    AI/03_PROBLEMAS.md (completo)
    AI/01_ESTADO.md    (modulo afectado)
    AI/02_DECISIONES.md (decisiones del modulo)

- DEPLOY / PRODUCCION:
    AI/02_DECISIONES.md (D-005 GitHub Pages)
    README.md

=====================================================
REGLAS OBLIGATORIAS (aplicar siempre)
=====================================================
1. Sitio estatico con JS vanilla propio en `js/main.js`. NO agregar frameworks
   JS, Node, bundlers ni build tools sin reabrir la decision D-006.
2. Todo color, tipografia y espaciado sale de los tokens del design system en
   `css/Styles.css` (D-007). No hardcodear valores.
3. Identidad narrativa original ("La Ciudad Velada"): NO usar nombres, logos,
   runas ni assets de obras ajenas ni nombrar videojuegos (D-008).
4. Respetar la accesibilidad: foco visible dorado, `alt` en imagenes, y
   `prefers-reduced-motion` desactiva animaciones pesadas.
5. No romper el arranque sin JS: el contenido debe verse aunque `main.js` no
   corra (ver bloque `<noscript>` en `index.html`).
6. Si hay duda de arquitectura: NO decidir; detenerse, explicar el problema
   y proponer alternativas.
7. No auto-consolidar etapas: solo el TEAM LEAD confirma CONSOLIDADO.
   No modificar AI/01_ESTADO.md sin confirmacion.
8. Al terminar una tarea: verificar que el sitio cargue sin errores de consola
   y actualizar la memoria.
9. Commit solo bajo pedido explicito del TEAM LEAD.
