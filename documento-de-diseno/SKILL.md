---
name: documento-de-diseno
description: Crea (o actualiza) el documento de diseño de un producto como un HTML que hace de fuente única de verdad de la interfaz. Incluye el modelo de objetos, el recorrido completo del usuario con todas las pantallas e interacciones, el diagrama de estados de la superficie principal, una tabla de estados objeto × estado sin huecos, los contratos de datos e integraciones (IA, API, exportación), los tokens en formato W3C DTCG que generan el CSS, los componentes reales que usarán la app y las maquetas, la marca temporal, las convenciones de la plataforma, las decisiones y una verificación automática. Úsala siempre que el usuario pida un documento de diseño, un design doc, un sistema de diseño con su recorrido, «todas las pantallas de la app», un user journey con pantallas, una spec de UI, una «fuente única de verdad» de la interfaz, o quiera fijar la UI antes de programar una app o web, aunque no diga «documento de diseño». También cuando quiera cambiar la UI de un proyecto que ya tiene este documento: el cambio va primero al documento.
---

# Documento de diseño (fuente única de verdad de la interfaz)

Esta skill produce una carpeta de diseño dentro del proyecto. Su centro es un `index.html` que describe cada pantalla, estado e interacción del producto con los **mismos archivos de componentes y tokens que usará la app**. Por eso el documento y la app no pueden separarse sin que se note.

La amplitud la decide el proyecto: cuántas fases tiene el recorrido, cuántas pantallas, qué objetos, qué columnas de estados, qué contratos y qué plataforma. Nada de eso viene fijado aquí. Esta skill aporta el método, las normas de calidad y las herramientas.

## Normas que se mantienen en cualquier proyecto

1. **Aquí primero.** El documento es la fuente única de verdad. Cualquier cambio de interfaz se hace antes en el documento, se enseña al usuario, se aprueba y solo entonces pasa a la app. Al terminar, guarda esta regla en la memoria del proyecto si hay sistema de memoria.
2. **Todo tiene ID estable:** fases `J1…Jn`, pantallas `S-01…S-NN`, componentes `C-01…`, decisiones `D-01…` y principios `P1…`. El código citará estos ID.
3. **Los archivos mandan.** `tokens.json` (DTCG) genera `tokens.css` y `tokens.js`; `ui.css` contiene los componentes. Las maquetas y las demos se construyen con esas clases, nunca con imitaciones.
4. **Ningún hueco sin respuesta.** La tabla de estados no puede tener celdas vacías. «N/A» solo vale con su motivo.
5. **Verificable sin opinión.** `check.py` comprueba la tabla, el contraste AA en todos los temas, los ID y enlaces, y las salidas de ejemplo.
6. **Material real antes que inventado.** Si faltan datos reales del usuario, usa un ejemplo verosímil, márcalo como ficticio en la portada y deja el criterio «recorrerlo con un caso real» como pendiente. Nunca hagas pasar un ejemplo por real.

## Flujo de trabajo

### 1. Reunir el material (antes de dibujar)

Lee lo que ya exista: conversación, briefs, maquetas previas, código, marca. Después identifica lo que falta y pregúntalo en un solo mensaje, ofreciendo un valor por defecto para cada punto:

- **Qué hace el producto** y para quién (trabajos que resuelve).
- **Plataforma:** macOS, iOS/iPadOS, Android, web, Windows o varias. Condiciona ventanas, menús, gestos y convenciones.
- **Dirección visual:** referencias, temas (día/noche), densidad. Si hay maquetas previas, se extraen los tokens de ahí.
- **Marca:** si existe, se documenta; si no, se propone una **temporal** y mínima.
- **Material crudo:** un caso real del usuario (carpeta, datos, entregables pasados). Es lo que más profundidad da. Si no lo hay, se sigue con un ejemplo ficticio marcado.
- **Integraciones:** IA, API, sincronización, pagos o exportación. Cada una tendrá su contrato.
- **Idioma** del documento: el del usuario.

Si el usuario ya dio todo esto en la conversación, no lo vuelvas a preguntar.

### 2. Montar la carpeta

```bash
python3 <skill>/scripts/scaffold.py <carpeta-destino> --name "Nombre del producto" --lang es
```

Copia las plantillas de `assets/template/` (índice, CSS y JS del documento, `ui.css` base, iconos, tokens iniciales y herramientas) y sustituye el nombre y el idioma. La carpeta por defecto es `diseno/`, o `design/` si el proyecto está en inglés. Nunca sobrescribe sin `--force`.

### 3. Decidir la forma del documento

Antes de escribir, fija en una lista corta:

- **Objetos** del modelo (de 4 a 15 suele ser lo normal).
- **Fases del recorrido**, desde la primera apertura hasta volver otro día. Un producto pequeño puede tener 4; uno grande, 10 o más. Incluye siempre la primera vez, el trabajo principal, el resultado o entrega, y la vuelta (segundo día, datos que cambiaron, ajustes, borrar).
- **Pantallas por fase:** una pantalla es una vista o un estado que el usuario ve. Los estados de error y vacío importantes también lo son.
- **Columnas de la tabla de estados**, elegidas del catálogo de `references/estados.md`. Solo las que se apliquen al menos a un objeto.
- **Superficie principal** para el diagrama de estados: lienzo, editor, reproductor, formulario de varios pasos, mapa…
- **Contratos:** uno por integración.
- **Componentes:** los que aparecen en las pantallas, ni uno más.

Lee `references/metodo.md` para el contenido y el nivel de exigencia de cada sección.

### 4. Escribir el documento

Orden de las secciones del `index.html`: las condicionales se omiten si no aplican y se renumeran.

| # | Sección | Cuándo |
|---|---------|--------|
| 00 | Cómo usar este documento (reglas, estado, pendientes) | siempre |
| 01 | Principios y plataforma | siempre |
| 02 | Modelo de objetos (diagrama SVG y reglas) | siempre |
| 03 | Mapa del recorrido, y una sección por fase J1…Jn | siempre |
| 04 | Diagrama de estados de la superficie principal | si hay interacción no trivial |
| 05 | Tabla de estados | siempre |
| 06 | Contratos (IA, API, exportación…) y especificación de las salidas | si hay integraciones o salidas |
| 07 | Sistema de diseño: tokens, color, contraste, tipografía, espaciado, radios, sombras, movimiento e iconos | siempre |
| 08 | Componentes: ficha viva de cada uno | siempre |
| 09 | Marca (temporal o existente) | siempre |
| 10 | Convenciones de la plataforma | siempre |
| 11 | Decisiones, con alternativas descartadas | siempre |
| 12 | Verificación e historial | siempre |

Cada fase lleva: introducción, pantallas como maquetas a escala con pie (`S-xx`, título y comportamiento), una tabla de interacciones (acción → resultado) y los textos de la interfaz. Para construir maquetas que no se rompan, sigue `references/maquetas.md`. Recoge muchos errores ya cometidos y resueltos.

Mientras escribes:

- **Tokens:** edita `tokens.json` y regenera con `python3 <carpeta>/tools/build_tokens.py`. No edites `tokens.css` a mano.
- **Componentes:** añádelos a `ui.css` con el prefijo `ui-` (o el del proyecto) y estados como `.is-<estado>`.
- **Maquetas que comparten escenario** (un lienzo, una bandeja, un mapa): define el escenario una vez en `scenes.js` y reutilízalo con atributos `data-*`. Así cada pantalla describe solo lo que cambia.
- **Plataforma:** recorre la lista de `references/plataformas.md`.
- **Salidas para terceros** (HTML exportado, correos, PDF): escribe al menos un ejemplo en `ejemplo/` que siga su contrato, para que `check.py` lo valide.

### 5. Verificar

```bash
python3 <carpeta>/tools/check.py            # huecos «⟨…⟩» sin rellenar, estructura, tabla de estados, contraste, ID y enlaces, ejemplos
python3 <carpeta>/tools/check.py --w3c      # además valida los ejemplos en validator.w3.org
```

`--w3c` envía el HTML de ejemplo a un servicio externo. Úsalo solo si el ejemplo no contiene datos reales o privados del usuario, o si el usuario lo ha aprobado. Después:

- Anota los resultados en la sección de verificación.
- Arregla los tokens hasta que pase el contraste. Lo habitual es separar el acento en tinte, texto y relleno, y oscurecer el texto secundario.
- Abre el documento con un servidor local (`python3 -m http.server`) y revísalo en día, noche y móvil, sin desplazamiento horizontal. Los consejos sobre el navegador del panel están en `references/maquetas.md`.

### 6. Entregar y pedir aprobación

Resume qué hay (fases, pantallas, celdas, componentes), qué pasa y qué queda pendiente. Lista las decisiones marcadas como **Propuesta** que necesitan el OK del usuario. Pregunta si se aprueba antes de tocar la app.

## Actualizar un documento existente

1. Lee el documento y su historial.
2. Haz el cambio en el documento: pantallas, estados, componentes y tokens.
3. Sube la versión: parche para corregir, menor para pantallas o componentes nuevos, mayor para cambios de modelo o plataforma. Añade una fila al historial.
4. Vuelve a ejecutar `check.py`, enseña el cambio y pide aprobación.
5. Solo entonces lleva el cambio a la app, citando los ID afectados.

## Archivos de la skill

- `references/metodo.md`: qué debe contener cada sección y cómo saber si está bien. Léelo antes de escribir.
- `references/estados.md`: catálogo de columnas de estado y cómo redactar las celdas.
- `references/maquetas.md`: construir maquetas a escala con componentes reales; problemas conocidos y sus soluciones.
- `references/plataformas.md`: convenciones por plataforma (macOS, iOS/iPadOS, Android, web, Windows).
- `scripts/scaffold.py`: crea la carpeta de diseño desde las plantillas.
- `assets/template/`: plantillas genéricas, sin contenido de ningún producto.
