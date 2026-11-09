# Convenciones por plataforma

Para cada plataforma del producto, documenta en la sección 10 al menos lo que sigue. Si algo no aplica, dilo.

## Común a todas

- **Deshacer y rehacer:** qué cubre, cuántos pasos, nombre de la acción en el menú o el aviso.
- **Guardado:** automático o explícito, copias y recuperación.
- **Accesibilidad:**
  - lector de pantalla: orden de lectura, nombres accesibles y cómo se expone una superficie libre como un lienzo o un mapa;
  - reducir movimiento;
  - aumentar contraste;
  - uso completo con teclado o con control por botón;
  - tamaño de texto.
- **Arrastrar hacia fuera y compartir:** qué se entrega (archivo original, texto, enlace).
- **Destructivo:** qué pide confirmación y qué se resuelve con deshacer.
- **Tamaños mínimos:** ventana o pantalla más pequeña soportada y cómo se adapta.

## macOS

- **Barra de menús completa:** la app (Acerca de, Ajustes `⌘,`, Ocultar, Salir), Archivo, Edición, Visualización, los menús propios, Ventana y Ayuda. Cada opción con su atajo.
- **Ventana:**
  - con barra de título o sin ella (semáforos sobre el contenido: deja unos 84 px libres a la izquierda);
  - pestañas;
  - restauración del estado al reabrir.
- Ventana de **Ajustes** estándar con pestañas.
- **Diálogos del sistema** (Abrir, Guardar, Compartir), nunca imitados. **Hojas** para tareas modales y **alertas** solo para lo irreversible.
- **Atajos sin modificador** solo en superficies sin texto activo, y que se puedan desactivar.
- Acento del sistema, modo día y noche, vista previa con la barra espaciadora, arrastrar desde y hacia Finder.

## iOS / iPadOS

- **Navegación:** pestañas, pila o barra lateral en iPad. Gestos del sistema reservados (bordes).
- **Objetivos táctiles** de 44 pt como mínimo.
- **Hojas** con distintos altos, menús contextuales con pulsación larga y acciones al deslizar.
- **Dynamic Type** y teclado: qué pasa al aparecer.
- **Permisos** con su texto previo, que explica por qué se piden.
- **iPad:** puntero, teclado físico, ventanas divididas y Apple Pencil si aplica.

## Android

- **Navegación:** atrás del sistema (y su gesto predictivo), barra inferior o cajón.
- **Material:** botón flotante, avisos con acción y hojas inferiores, si se adopta.
- Objetivos de 48 dp, escala de fuente del sistema y modo oscuro.
- Permisos en contexto y comportamiento al girar la pantalla o redimensionar.

## Web

- **Puntos de corte** y comportamiento entre 320 y 1440 px o más.
- **URL** de cada pantalla: qué es enlazable, historial y atrás.
- Foco visible, orden de tabulación, saltar al contenido, roles ARIA y anuncios en vivo.
- **Carga:** primera pintura, esqueletos y comportamiento sin JavaScript si aplica.
- Navegadores soportados, impresión y `prefers-color-scheme` / `prefers-reduced-motion`.

## Windows

- **Barra de título** con los controles a la derecha y menú o cinta.
- Atajos con `Ctrl`, `Alt` para los menús y `F` para la ayuda.
- Escalado de pantalla (100–200 %), modo de alto contraste y Narrador.
