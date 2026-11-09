# Método: qué lleva cada sección y cómo saber si está bien

Índice: [00 Portada](#00) · [01 Principios](#01) · [02 Modelo](#02) · [03 Recorrido](#03) · [04 Diagrama de estados](#04) · [05 Tabla de estados](#05) · [06 Contratos](#06) · [07 Sistema](#07) · [08 Componentes](#08) · [09 Marca](#09) · [10 Plataforma](#10) · [11 Decisiones](#11) · [12 Verificación](#12)

La idea de fondo: un profesional no empieza por las pantallas. Empieza por **qué cosas existen** (objetos), **qué hace el usuario con ellas** (recorrido) y **en qué estados puede estar cada una**. Las pantallas salen de ahí. El documento se construye en ese orden, aunque se lea de arriba abajo.

<a id="00"></a>
## 00 · Portada y cómo usar el documento

- Título del producto, versión (`v0.1.0` la primera) y estado («Borrador · pendiente de tu OK»).
- Las tres reglas: aquí primero, todo tiene ID, los archivos mandan.
- Si se usa un ejemplo ficticio, un aviso que lo diga y explique qué falta para sustituirlo por un caso real.

**Está bien si** alguien que llega sin contexto entiende para qué sirve la página y cómo se cambia.

<a id="01"></a>
## 01 · Principios y plataforma

- De 3 a 6 principios con ID (`P1…`). Cada uno dice **qué significa en la interfaz**, no en abstracto. Ejemplo de la forma: «P2 · La interfaz aparece cuando hace falta: los controles flotan y el panel solo entra con selección».
- La plataforma elegida y lo que implica para el documento: ventanas, menús, gestos, tamaños mínimos. Si es una propuesta, enlaza su decisión `D-xx` marcada como **Propuesta**.

**Está bien si** cada principio sirve para decidir un empate real entre dos diseños.

<a id="02"></a>
## 02 · Modelo de objetos

- Un diagrama SVG en línea con cajas por objeto, flechas con cardinalidad (`1→n`, `0..1`, `n↔n`) y colores de los tokens. Debe leerse en día y en noche.
- Una tabla de reglas por objeto: cómo se crea y se borra, dónde se guarda, de qué depende, y qué pasa con sus hijos al borrarlo.
- Si hay elementos de varios tipos, lista los tipos y lo que tienen en común.

**Está bien si** cada pantalla del recorrido muestra, crea o cambia alguno de estos objetos, y no aparece en las pantallas ningún objeto que no esté aquí.

<a id="03"></a>
## 03 · Recorrido (mapa y una sección por fase)

**El mapa:** una fila de tarjetas `J1…Jn` con el rango de pantallas de cada fase. Opcionalmente, una curva de esfuerzo por fase, que marca dónde hay que cuidar más el diseño.

**Las fases:** el número lo da el producto. Comprueba que el recorrido cubre:

- La **primera vez**: bienvenida, permisos, configuración mínima y qué se puede saltar.
- El **primer objeto** principal: crearlo, y su estado vacío con pistas.
- **Meter** contenido: todas las puertas de entrada (arrastrar, pegar, importar, escribir, buscar).
- El **trabajo principal**: seleccionar, editar, organizar, relacionar, buscar, filtrar y previsualizar.
- **Producir el resultado**, si el producto tiene salida: generar, revisar, corregir, exportar y compartir.
- **Volver otro día**: reabrir, datos que han cambiado o desaparecido, ajustes, y borrar con confirmación.

**Cada fase lleva:**

1. Una cabecera con el ID, un título con intención (no solo «Pantalla de X») y un párrafo de qué pasa.
2. **Pantallas:** maquetas a escala con `figure.shot#S-xx`. Pie de foto: `S-xx`, el título en negrita y el comportamiento que la imagen no enseña (tiempos, qué se recuerda, a dónde lleva). Pon dos en paralelo (`.shots2`) cuando sean variantes.
3. **Interacciones:** tabla acción → resultado. Incluye ratón, teclado, gestos, arrastrar y soltar, y cada caso límite de la fase.
4. **Textos** de la interfaz de los momentos clave, con la voz de la marca.

Numera las pantallas seguidas por todo el documento. Si una pantalla aparece en dos fases, se enlaza (`<a href="#S-04">`) en lugar de repetirla.

**Está bien si** se puede seguir con el dedo desde abrir la app hasta entregar y volver, sin saltos («¿y cómo llego aquí?») y sin pantallas que no se sabe de dónde salen.

<a id="04"></a>
## 04 · Diagrama de estados de la superficie principal

- Un SVG con los modos de la superficie: uno o dos centrales (por ejemplo Reposo y Seleccionado) y el resto alrededor. Los modos que bloquean, como hojas y vistas previas, van con borde discontinuo.
- Una tabla de transiciones: desde, evento, hacia y efecto. Es la referencia que se implementa (por ejemplo con XState) con los mismos nombres.
- Reglas globales: qué hace `Esc`, qué cubre deshacer, qué pasa con la selección al desplazarse.

Si el producto no tiene una superficie con modos (un formulario simple, por ejemplo), se omite la sección y se dice en la portada.

<a id="05"></a>
## 05 · Tabla de estados

Ver `estados.md`. Filas: cada objeto, y sus tipos cuando se comportan distinto. Columnas: las del catálogo que se apliquen. Cada celda contiene **qué se ve, el texto exacto entre comillas y la salida** («[Reintentar]», «[Buscar…]»), o una referencia a la pantalla `S-xx`. La tabla lleva `id="matrix"` para que `check.py` la lea.

<a id="06"></a>
## 06 · Contratos

Uno por integración: IA, API externas, sincronización, pagos, importación y exportación.

- **Entrada y salida** con un ejemplo en JSON real del dominio.
- **Reglas:** privacidad (qué sale y qué nunca sale), fidelidad (qué no puede inventarse), transmisión o progreso, reintentos, límites, y cómo se detecta que algo ha quedado desactualizado.
- **Errores**, cada uno con su texto y su salida.
- **Salidas para terceros** (HTML exportado, PDF, correos): son un segundo sistema de diseño. Fija si son autocontenidas, su tipografía, color, accesibilidad, tamaños de pantalla y si deben ser válidas. Incluye un ejemplo en `ejemplo/` incrustado con un `<iframe>`.

Patrón recomendado con IA: que la IA devuelva **datos estructurados** y que la app los pinte con plantillas propias. Así la salida es coherente, segura y editable por partes. Si se elige otra cosa, regístralo en una decisión.

<a id="07"></a>
## 07 · Sistema de diseño

Las tablas se leen de `tokens.js`; no se escriben a mano. Debe haber:

- **Color:** neutros (fondo, superficies, tinta en tres niveles, líneas), acento separado en tinte, texto y relleno, estados (peligro, aviso, éxito) y, si hace falta, una paleta de categorías. Cada token con su valor en día y en noche y su uso.
- **Contraste:** pares calculados en vivo con el tema activo, más la comprobación de `check.py` en todos los temas. Los pares se declaran en `tokens.json → $extensions.doc.contrast`.
- **Tipografía:** escala con nombre, tamaño, muestra y uso. Para cada familia, decir para qué se usa.
- **Espaciado, radios, tamaños de control, sombras, movimiento** (duraciones y curvas), y qué cambia con «reducir movimiento».
- **Iconos:** rejilla con su nombre y su equivalente en la plataforma nativa, si lo hay.

<a id="08"></a>
## 08 · Componentes

Una ficha por componente: `div.comp#C-xx` con:

- Una cabecera (nombre y clase CSS).
- Una **demo viva** (`div.demo.ui-app`) con todas las variantes y estados forzados mediante clases `.is-hover`, `.is-disabled`, `.is-loading`…
- Una **especificación** en tres columnas: variantes o uso, estados o comportamiento, y teclado y accesibilidad.

Solo los componentes que aparecen en las pantallas. Si un componente se ve en una pantalla pero no tiene ficha, falta la ficha.

<a id="09"></a>
## 09 · Marca

- **Si no hay marca, una temporal mínima:** el porqué del nombre, la idea del icono, el icono a sus tamaños (los grandes completos y los pequeños simplificados), una prueba en contexto (el icono entre otros en el Dock o la pantalla de inicio), un logotipo, uno a tres colores de marca y la **voz**: así sí / así no, con ejemplos de textos reales de la interfaz.
- **Si hay marca,** se documenta tal cual y se dice dónde se aplica.
- Por lo general, el color de marca no sustituye al acento del sistema en la interfaz. Si se decide lo contrario, se registra la decisión.

<a id="10"></a>
## 10 · Convenciones de la plataforma

Recorre `plataformas.md`: menús, atajos o gestos, deshacer, guardado, ventanas o navegación, arrastrar hacia fuera, compartir, accesibilidad (lector de pantalla, movimiento, contraste, teclado) y tamaños mínimos.

<a id="11"></a>
## 11 · Decisiones

`div.dec#D-xx`: el título, la decisión, el porqué y las alternativas descartadas con su motivo. Se marcan:

- **Propuesta**, si necesitan el OK del usuario.
- **Cambia respecto a…**, si corrigen algo anterior (una maqueta previa, una versión anterior del documento).

<a id="12"></a>
## 12 · Verificación e historial

- Tabla de criterios: el criterio, cómo se comprueba (sin depender de opiniones) y su estado. Los automáticos (`data-check`) se rellenan con el resultado de `check.py`. Los humanos quedan como pendientes con su condición: recorrerlo con un caso real, que lo entienda un destinatario externo, una prueba con 3 a 5 usuarios, y comparar capturas de la app con el documento cuando la app exista.
- Historial: versión, fecha y cambios.
