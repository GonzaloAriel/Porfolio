FORMATO: 1.0

## Reglas

Guardar problemas conocidos que no estan resueltos.

Un problema resuelto se mueve a RESUELTOS con causa y solucion: es patron
a no repetir.

## Problemas

- P-005: `README.md` esta vacio (solo el titulo "# Porfolio"), no explica como
  ejecutar, publicar ni la estructura del proyecto. Afecta a: documentacion
  general.

- P-007: Las tipografias (Google Fonts, D-009) y el audio dependen de servicios
  externos/red. Sin conexion el sitio cae a serif del sistema y no hay sonido.
  Afecta a: identidad visual (tipografia). Bajo riesgo (fallbacks definidos).

- P-008: El fondo del hero usa solo CSS/SVG (niebla y siluetas). Si se quiere el
  "loop de niebla con catedrales" del brief original, faltan assets (imagen/video).
  Afecta a: Hero. Decision pendiente del TEAM LEAD.

- P-009: El stack de JKTURNOS esta incompleto. El TEAM LEAD indico "[completar:
  Entity Framework Core / APIs REST / HTML / CSS / JavaScript / otras]". Por ahora
  la tarjeta lista solo C#, ASP.NET Core y SQL Server. Afecta a: Bestiario.

- P-010: La URL de LinkedIn aportada (`https://linkedin.com/in/-gonzalo-ariel-acuña`)
  tiene un guion inicial y un caracter no-ASCII (ñ); conviene verificar que sea la
  URL publica correcta. Afecta a: Contacto.

## RESUELTOS

- P-001: Los enlaces del menu no funcionaban (secciones sin `id`). Causa:
  `index.html` no tenia atributos `id` en las secciones. Solucion: se agrego
  `id` a cada seccion (`#sobre-mi`, `#proyectos`, `#habilidades`, `#experiencia`,
  `#educacion`, `#contacto`) y la nav usa anchors con scroll suave.
  Resuelto 2026-10-11.

- P-002: El formulario redirigia a localhost en produccion. Causa: campo oculto
  `_next` con valor `http://127.0.0.1:5500/`. Solucion: se elimino el campo
  `_next`. Resuelto 2026-10-11.

- P-003: `body` usaba `height: 120vh`. Causa: valor fijo pensado para el fondo.
  Solucion: el nuevo design system usa `min-height: 100vh` en `body`.
  Resuelto 2026-10-11.

- P-004: Bloque "Certificaciones" con tres `<ul>` separadas. Causa: markup
  ad-hoc. Solucion: se reescribio como listas semanticas unicas
  (`tome-list` y `seal-list`). Resuelto 2026-10-11.

- P-006: Comillas literales dentro del `<title>`. Causa: texto con comillas
  escapadas como caracteres. Solucion: `<title>` limpio sin comillas.
  Resuelto 2026-10-11.
