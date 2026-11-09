# Tabla de estados: catálogo de columnas y cómo redactar las celdas

## Elegir las columnas

Elige del catálogo las columnas que se apliquen al menos a un objeto del producto. Un producto local sin red no necesita «Sin conexión». Una app sin cuentas no necesita «Sin sesión». Lo normal son entre 5 y 9 columnas.

| Columna | Pregunta que responde | Típica en |
|---|---|---|
| Vacío | ¿Qué se ve cuando no hay nada todavía? | listas, lienzos, búsquedas, campos |
| Cargando | ¿Qué se ve mientras llega? ¿A partir de cuánto tiempo se muestra? | todo lo que lee disco o red |
| Error | ¿Qué falló, qué texto sale y cuál es la salida? | lecturas, escrituras, integraciones |
| Sin conexión | ¿Qué sigue funcionando y qué se desactiva? | todo lo que usa red |
| Sin permiso | Permisos del sistema (archivos, cámara, ubicación) o de rol | apps nativas, multiusuario |
| Sin sesión | Sesión caducada o sin iniciar | apps con cuentas |
| Recurso perdido | Archivo movido, enlace roto, referencia a algo borrado | apps con archivos o referencias |
| No soportado | Formato, versión o dispositivo que no se admite | importaciones, multiplataforma |
| Desbordamiento | Textos larguísimos, miles de elementos, valores extremos | listas, tarjetas, campos |
| Conflicto | Dos ediciones a la vez, versión más nueva en otro sitio | sincronización, colaboración |
| Parcial | Solo una parte llegó o se guardó | importaciones, generación, subidas |
| Desactualizado | El resultado ya no refleja su origen | salidas, cachés, informes |
| Solo lectura | Se puede ver pero no editar, y por qué | ejemplos, permisos, versiones |

## Elegir las filas

Una fila por objeto del modelo. Si los tipos de un objeto fallan de forma distinta (una imagen y un enlace no se rompen igual), una fila por tipo. Añade filas para los procesos que tienen estados propios: búsqueda, generación, exportación, sincronización.

## Redactar una celda

Una buena celda dice, en este orden:

1. **Qué se ve:** el elemento afectado y su aspecto.
2. **El texto exacto**, entre comillas o con la clase `.copy`, con la voz de la marca.
3. **La salida:** botones entre corchetes, como `[Reintentar]` o `[Buscar…]`, o el comportamiento automático.
4. La referencia `S-xx` si hay pantalla.

Ejemplos de la forma:

- Bien: «Tarjeta discontinua con «No encuentro el archivo.» [Buscar…] [Quitar]».
- Bien: «Si tarda más de 300 ms, esqueletos; los elementos aparecen según cargan».
- Bien: «N/A: el texto es local y no depende de nada externo».
- Mal: «Error» (no dice qué se ve, qué dice ni cómo se sale).
- Mal: «N/A» (sin motivo). `check.py` lo rechaza.
- Mal: celda vacía. `check.py` la rechaza.

## Reglas generales que conviene fijar

- Un umbral para mostrar la carga (por ejemplo 300 ms) para que no parpadee.
- Nunca rechazar en silencio: lo no soportado entra igualmente, con una salida.
- Nunca perder trabajo: ante un error a mitad, se guarda lo que haya.
- Lo destructivo que no se puede deshacer pide confirmación; lo que se puede deshacer, no.
