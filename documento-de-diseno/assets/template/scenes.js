/* Escenarios de maqueta de {{NAME}}.
   Un escenario es el fondo que comparten muchas pantallas (un lienzo, una bandeja, un mapa, una tabla…).
   Se define una vez aquí y cada pantalla lo usa con <div class="ui-app" data-scene="nombre" data-…>.
   La función recibe (app, data, util) y devuelve el HTML que se inserta al principio de la .ui-app.
   data son los atributos data-* de la pantalla: úsalos para la selección, los estados, qué mostrar…
   Convenciones: data-sel="id1,id2", data-state="id:estado[=valor]", data-only / data-hide="ids", data-dim="ids", data-chrome="full|min|none". */
window.DOC_SCENES = {
  /* Marco de ventana mínimo: borra o adapta según la plataforma. */
  ventana(app, data) {
    if (data.chrome === 'none') return '';
    return '<div class="ui-traffic"><i></i><i></i><i></i></div>';
  }

  /* Ejemplo de forma (bórralo al crear el escenario real del producto):
  principal(app, data, { icon }) {
    const sel = (data.sel || '').split(',');
    const items = [ { id: 'a1', titulo: '…' }, { id: 'a2', titulo: '…' } ];
    return items.map(it => `<div class="… ${sel.includes(it.id) ? 'is-selected' : ''}">${it.titulo}</div>`).join('');
  }
  */
};
