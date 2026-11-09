# Maquetas a escala con componentes reales

## El patrón

Cada pantalla se dibuja a su **tamaño real** dentro de un marco que la escala para que quepa en la columna del documento:

```html
<figure class="shot" id="S-07">
  <div class="scr">
    <div class="ui-app" style="width:1000px;height:625px">
      … componentes de ui.css colocados con position:absolute …
    </div>
  </div>
  <figcaption><span class="id">S-07</span><b>Título.</b> Comportamiento que la imagen no enseña.</figcaption>
</figure>
```

`doc.js` mide el ancho de `.scr`, aplica `transform: scale(k)` a la `.ui-app` y ajusta la altura del marco. Así:

- Las maquetas se escriben en píxeles reales: lo que mide 36 px en la app mide 36 px aquí.
- Sirven las mismas clases de `ui.css` que importa la app.

Tamaños de referencia para la `.ui-app`:

| Dispositivo | Tamaño |
|---|---|
| Escritorio | 1000 × 625 (16:10); ventana grande 1280 × 800 |
| Tableta | 1024 × 768 o 1180 × 820 |
| Móvil | 390 × 844 |

Usa `.shots2` para poner dos móviles o dos variantes en paralelo.

**Clases de la plantilla:** `ui.css` usa el prefijo `ui-`; si el proyecto ya tiene uno, cámbialo en todos los archivos. La raíz es `.ui-app` (y `.ui-app.bg` para ventanas sin lienzo). Las piezas que se colocan dentro de la app (`.ui-float`, `.ui-menu`, `.ui-panel`, `.ui-toast`…) usan `position:absolute` respecto a `.ui-app`. En la app real, `.ui-app` es la ventana entera: el mismo CSS sirve en los dos sitios.

## Escenarios reutilizables (`scenes.js`)

Si muchas pantallas comparten el mismo fondo con datos (un lienzo, una bandeja de entrada, un mapa, una tabla), no lo copies en cada una. Regístralo una vez:

```js
// scenes.js — propio de cada proyecto
window.DOC_SCENES = {
  bandeja(app, o) {            // o = app.dataset (data-sel, data-state, data-only…)
    return `<div class="ui-list">…</div>`;   // HTML que se inserta al principio de la .ui-app
  }
};
```

```html
<div class="ui-app" data-scene="bandeja" data-sel="m-3" data-state="m-5:error" style="width:1000px;height:625px">
  <!-- aquí solo lo que cambia en esta pantalla: un menú, una hoja, un aviso -->
</div>
```

Convenciones de los atributos que conviene mantener:

- `data-sel`: ID seleccionados, separados por comas.
- `data-state`: `id:estado[=valor]`, separados por comas.
- `data-only` / `data-hide`: ID a mostrar u ocultar.
- `data-dim`: ID que quedan encendidos al filtrar; el resto se apaga.
- `data-chrome`: `full` / `min` / `none`, para el marco de ventana y las piezas fijas.

Los datos del escenario son **del dominio del proyecto** y deben parecer reales. Si son ficticios, la portada lo dice.

## Problemas conocidos y su solución

- **La tipografía del documento se cuela en las maquetas.** Reglas como `h2 { font-family: serif }` del documento ganan a las de `ui.css`. En `doc.css`, los estilos de texto genéricos van con especificidad cero, como `:where(main) h3 {…}`, y los títulos de sección con selectores acotados (`.sec header h2`).
- **Componentes absolutos dentro de las demos.** En las fichas, los componentes deben quedarse en el flujo: `.demo .ui-float, .demo .ui-menu, … { position: relative; inset: auto; transform: none; }`. Ya está en la plantilla.
- **Los enlaces con ancla no llegan a su sitio.** Las maquetas cambian de alto al escalarse después de cargar. `doc.js` vuelve a desplazarse al ancla tras escalar. No lo quites.
- **Un elemento flotante tapa lo que señala.** Antes de colocar un menú o un editor emergente, calcula dónde cae el elemento: `x_pantalla = tx + x_mundo × zoom`. Pon el elemento flotante al lado y no encima. Si no cabe, desplaza el escenario (`data-tx`, `data-ty`).
- **La página del cliente sigue el tema de la app.** Lo que representa la salida para un tercero (una página, un correo) tiene sus propios colores. Sus esqueletos y fondos no deben usar los tokens de la app, o en modo noche salen barras oscuras sobre papel claro.
- **Iconos que no se entienden a 20 px.** Revisa los iconos de estado (error, perdido, sin conexión) a su tamaño real. Si hace falta, usa variantes más simples.
- **Imágenes de ejemplo en salidas para terceros.** Si se incrustan como `data:` URI, codifica espacios (`%20`) y comillas (`%27`), o el validador del W3C falla.
- **El documento no se ve sin servidor.** Los archivos se cargan con rutas relativas y `tokens.js` (no `fetch`), así que también funciona abriéndolo con doble clic. Aun así, revísalo con `python3 -m http.server`.

## Revisar en el navegador del panel

- Revisa cada pantalla en **día**, **noche** y **móvil (375 px)**. Comprueba con JS que `document.documentElement.scrollWidth <= innerWidth`, para que no haya desplazamiento horizontal.
- Si la captura no cambia tras desplazarte, carga la URL con una consulta nueva y el ancla (`index.html?v=N#S-12`) y haz la captura dos veces: la primera puede salir en blanco.
- Emular un ancho mayor que el panel puede congelar las capturas. Usa el tamaño del panel o el preajuste `mobile`, y vuelve a `desktop` al terminar.
- Para comprobar datos (contraste, número de celdas), usa JS en lugar de leer capturas.
