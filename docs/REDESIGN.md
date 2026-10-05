# Rediseño del portafolio — Slate & Mist

Plan por fases para llevar el portafolio de un sitio de secciones fijas a una experiencia editorial, fluida y accesible, manteniendo la identidad original (slate `#2a3132` + mist `rgb(144 175 197)`).

## Visión

- **Oscuro primero, con una hoja de papel.** Hero, proyectos y contacto viven sobre el slate; "Sobre mí" es una hoja clara que se superpone con hombros redondeados, y contacto vuelve a subir encima. Es la alternancia oscuro/claro del sitio original convertida en capas físicas.
- **Tipografía con contraste.** Geist (UI y titulares, tracking negativo según tamaño), Instrument Serif en cursiva para la idea clave de cada titular y Geist Mono para índices y etiquetas.
- **Movimiento con física, no con duraciones.** Springs críticamente amortiguados por defecto, rebote solo después de un gesto con inercia, todo interrumpible. Basado en la skill `apple-design`.
- **Mostrar el trabajo, no esconderlo.** El carrusel se sustituye por una cuadrícula filtrable donde cada tarjeta se transforma en su detalle.

## Sistema de diseño

| Capa | Dónde | Notas |
| --- | --- | --- |
| Tokens (color, tipo, espacio, radios, sombras, motion) | `src/stylesheets/tokens.css` | Escalas `--ink-*` y `--mist-*` derivadas de la paleta original |
| Base y utilidades (`.container`, `.section`, `.button`, `.chip`, `.eyebrow`) | `src/stylesheets/base.css` | Grano de película global, foco visible, skip link |
| Presets de movimiento | `src/lib/motion.js` | `spring`, `springSnappy`, `springMomentum`, `project()` (proyección de Apple) |
| Primitivas | `src/modules/Sheet.js`, `Reveal.js`, `SectionHeader.js`, `Icon.js`, `LanguageToggle.js` | `Sheet` = bottom sheet arrastrable en móvil, diálogo centrado en escritorio |

## Fases

### Fase 0 — Fundamentos ✅
- [x] Tokens de diseño y estilos base; eliminado `index.css` y los estilos por sección antiguos.
- [x] Fuentes Geist / Geist Mono / Instrument Serif con `preconnect`.
- [x] `framer-motion` como motor de springs; eliminados Swiper, FontAwesome y react-icons (iconos SVG propios).
- [x] Idioma: detecta el del navegador, recuerda la elección y actualiza `<html lang>`.
- [x] Metadatos: descripción, Open Graph corregido, JSON-LD `Person`, `theme-color`.

### Fase 1 — Navegación y hero ✅
- [x] Barra flotante que se vuelve material translúcido al hacer scroll, con hilo de progreso.
- [x] Indicador de sección activa que se desliza entre enlaces (spring compartido).
- [x] Selector de idioma segmentado.
- [x] Menú móvil como bottom sheet: se arrastra para cerrar y decide por velocidad proyectada, no por posición.
- [x] Hero tipográfico: titular que se materializa palabra a palabra, resplandor mist que sigue al puntero, cuadrícula de dibujo, fila de metadatos y redes.

### Fase 2 — Proyectos ✅
- [x] Cuadrícula editorial (ritmo ancho / medio / medio) en lugar del carrusel.
- [x] Filtros por tecnología con conteos derivados de los datos y reordenamiento animado.
- [x] Detalle del proyecto: la imagen de la tarjeta viaja hasta el diálogo y vuelve al cerrar (`layoutId`).
- [x] Accesible por teclado; Escape, clic fuera, bloqueo de scroll y devolución del foco.

### Fase 3 — Sobre mí, contacto y footer ✅
- [x] Hoja clara con retrato en duotono mist (recupera color al pasar el cursor).
- [x] Principios de trabajo y "Toolbox" agrupado.
- [x] Contacto en dos columnas, validación en línea animada y botón con estados (enviar → enviando → enviado).
- [x] Footer con firma tipográfica a gran escala.

### Fase 4 — Accesibilidad y movimiento reducido ✅
- [x] `MotionConfig reducedMotion="user"`: con movimiento reducido se quitan desplazamientos y quedan fundidos.
- [x] `prefers-reduced-transparency`: superficies sólidas.
- [x] Hover solo en dispositivos con hover real; feedback `:active` en todo lo pulsable.

### Fase 5 — Rendimiento y SEO ✅
- [x] Imágenes responsivas: `vite-imagetools` genera variantes AVIF de 640/1024/1600 px en el build (`src/data/images.js`) y se sirven con `srcset`/`sizes`. En desarrollo y tests se usan los originales para que el arranque sea instantáneo.
- [x] Imagen Open Graph propia de 1200×630 (`public/og.png`, 45 kB) e iconos `favicon.svg`, 32, 180, 192 y 512 px. Eliminado `website.png` (1,4 MB).
- [x] Fuentes alojadas en el propio sitio (`@fontsource`): cero peticiones a Google Fonts.
- [x] `sitemap.xml`, `robots.txt` con sitemap, `og:locale:alternate`.
- [ ] Carga diferida de `ProjectDialog`: descartada por ahora, porque retrasaría la primera transformación tarjeta → diálogo.
- [ ] Auditoría Lighthouse en el sitio desplegado (objetivo ≥ 95).

### Fase 6 — Contenido ⏳ (necesita tu información)
- [ ] Revisar los textos nuevos (titular, "Abierto a nuevas colaboraciones", principios) y ajustarlos a tu voz y situación real.
- [ ] Ampliar `src/data/projects.js` con año, rol y resultado de cada proyecto.
- [ ] Casos de estudio de 2–3 proyectos clave (problema → proceso → resultado) en páginas propias.
- [ ] Enlazar el currículum como PDF descargable en lugar de un Google Doc editable.
- [ ] Testimonios de clientes o compañeros, si los hay.

### Fase 7 — Pulido de interacción 🟡
- [x] Navegar entre proyectos dentro del diálogo: botones Anterior/Siguiente, teclas ← / →, y deslizamiento horizontal en táctil que decide por velocidad proyectada. Respeta el filtro activo.
- [x] Tests con Vitest + Testing Library: formulario (validación, éxito, error), cuadrícula y filtros, diálogo y navegación, `Sheet` (Escape, scrim, foco, scroll), idioma y la función de proyección (17 tests).
- [ ] Tema claro opcional con transición suave entre temas.
- [ ] Revisión frame a frame de las animaciones en un iPhone real (arrastre del sheet y swipe entre proyectos).

### Fase 8 — Infraestructura 🟡
- [x] Migrado de Create React App a Vite 8 (build en `build/` para no tocar el hosting).
- [x] CI: `npm ci` en Node 20 con lint, tests y build.
- [ ] Actualizar a ESLint 9 / Stylelint 16 (configuración flat; airbnb aún no la soporta oficialmente).

## Decisiones tomadas

- **Sin secciones `sticky` de 100vh.** Recortaban contenido en pantallas bajas y obligaban a calcular el scroll a mano; ahora el flujo es normal y los anclajes usan `scroll-padding-top`.
- **Un único motor de movimiento.** Framer Motion cubre springs, gestos, layout compartido y movimiento reducido; las transiciones CSS quedan para hover y estados simples.
- **Stylelint:** se desactivaron `no-descending-specificity` y `custom-property-empty-line-before` (ruido en CSS por componente) y se permiten `svh`/`dvh`.
