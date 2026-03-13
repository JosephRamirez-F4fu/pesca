# Alineación funcional y técnica del módulo de ventas operativo

## Objetivo

Definir cómo el nuevo dominio de ventas, cuadres, deudas y cajas se alinea con la base actual del proyecto para permitir una implementación ordenada, con migración conceptual explícita y sin ambigüedad entre backend, frontend y vistas.

## Estado actual del repositorio

### Backend existente

- `api/src/sales` contiene `client`, `loan`, `loan_detail` y `payment`.
- `api/src/boxes` contiene `control_boxes`, `control_place`, `boxes` y `boxes_return`.
- `api/src/operation` expone vehículos utilizables como catálogo de carros.
- `api/src/shared` ya contiene `person`, utilizable como base para choferes u operadores.

### Frontend existente

- `App/src/core/router/index.tsx` reserva la ruta `ventas`, pero hoy la muestra como pendiente.
- `App/src/core/router/paths.ts` ya define `APP_ROUTES.sales`.
- El home ya presenta el acceso al módulo, pero no existe implementación funcional real.

## Dominio objetivo

### Nuevos bloques funcionales

#### `cuadre_venta`

Representa la cabecera de cierre operativo del día.

Campos esperados:

- id
- fecha_operacion
- id_carro
- id_chofer
- observaciones
- descuento
- deuda_generada
- total_peso
- total_cajas
- promedio_peso_caja
- total_economico
- total_final
- estado
- createdAt
- updatedAt

#### `cuadre_venta_detalle`

Representa una línea de producto o especie vendida dentro del cuadre.

Campos esperados:

- id
- id_cuadre_venta
- producto
- variacion
- cantidad_cajas
- peso_total
- precio_unitario_o_referencia
- subtotal

#### `venta`

Representa la captura rápida operativa que puede existir antes del cierre.

Campos esperados:

- id
- fecha_operacion
- id_cuadre_venta opcional
- producto
- variacion
- cantidad_cajas
- peso_total
- modo_peso
- precio
- subtotal
- id_cliente opcional
- metodo_pago
- tipo_venta
- estado_vinculacion

#### `venta_peso_caja`

Soporte para peso variable por caja.

Campos esperados:

- id
- id_venta
- numero_caja
- peso

#### `cliente`

Se mantiene como entidad del dominio comercial.

Campos mínimos:

- id
- nombre
- telefono
- observaciones
- estado

#### `movimiento_cuenta_corriente`

Reemplaza funcionalmente los conceptos separados de préstamo y pago.

Campos esperados:

- id
- id_cliente
- id_venta opcional
- tipo_movimiento
- metodo_pago opcional
- monto
- fecha_movimiento
- observacion
- saldo_acumulado derivado en consultas

#### `lote_cajas`

Representa el stock inicial del día.

Campos esperados:

- id
- fecha_operacion
- id_carro
- id_chofer
- cantidad_inicial
- observaciones

#### `movimiento_caja`

Representa la distribución del remanente de cajas al cierre.

Campos esperados:

- id
- id_lote_cajas
- tipo_movimiento
- cantidad
- destino
- observaciones

## Mapeo con el modelo actual

### Migrar o reemplazar

- `loan` pasa a ser antecedente conceptual de `movimiento_cuenta_corriente` tipo `credito`.
- `payment` pasa a ser antecedente conceptual de `movimiento_cuenta_corriente` tipo `pago`.
- `loan_detail` queda obsoleto frente al nuevo detalle de venta y al detalle de cuadre.
- `control_boxes` y `control_place` deben reinterpretarse bajo el nuevo flujo de cajas por jornada y cierre.

### Reusar

- `client` puede evolucionar a `cliente` conservando base de datos y endpoints si conviene.
- `vehicle` puede alimentar el selector de carro.
- `person` puede alimentar el selector de chofer o cobrador, según el flujo definido.

### Compatibilidad temporal esperada

- Puede existir convivencia transitoria entre endpoints viejos y nuevos.
- La documentación debe marcar claramente qué endpoints quedan legados, cuáles se adaptan y cuáles son nuevos.
- La transición debe priorizar contratos nuevos para frontend aunque internamente aún se apoye en tablas actuales.

## Contratos mínimos por backend

### Cuadres

Endpoints mínimos:

- `POST /sales/daily-balances`
- `GET /sales/daily-balances`
- `GET /sales/daily-balances/:id`
- `PATCH /sales/daily-balances/:id`
- `POST /sales/daily-balances/:id/details`
- `PATCH /sales/daily-balances/:id/details/:detailId`
- `DELETE /sales/daily-balances/:id/details/:detailId`
- `POST /sales/daily-balances/:id/close`

Respuestas mínimas:

- cabecera
- detalle
- totales calculados
- estado del cuadre
- resumen de cajas cuando aplique

### Ventas rápidas

Endpoints mínimos:

- `POST /sales/quick-sales`
- `GET /sales/quick-sales`
- `GET /sales/quick-sales/:id`
- `PATCH /sales/quick-sales/:id`
- `POST /sales/quick-sales/:id/link-daily-balance`

### Clientes y cuenta corriente

Endpoints mínimos:

- `GET /sales/clients`
- `POST /sales/clients`
- `PATCH /sales/clients/:id`
- `GET /sales/clients/:id/account-statement`
- `POST /sales/account-movements`

Respuestas mínimas:

- saldo actual
- movimientos cronológicos
- saldo acumulado por movimiento

### Cajas

Endpoints mínimos:

- `POST /boxes/daily-lots`
- `GET /boxes/daily-lots`
- `GET /boxes/daily-lots/:id`
- `POST /boxes/daily-lots/:id/movements`
- `GET /boxes/movements`

## Reglas de negocio transversales

- No permitir montos negativos.
- No permitir pesos o cajas negativos.
- No permitir venta a crédito sin cliente.
- No permitir inconsistencia entre cantidad de cajas y pesos por caja.
- No permitir cierre de cuadre con distribución de cajas incompleta.
- No duplicar asociación de venta rápida a un mismo cuadre.
- Centralizar fórmulas de resumen en backend para evitar divergencia con frontend.

## Alineación frontend y vistas

### Rutas a incorporar en `ventas`

- `/ventas`
- `/ventas/cuadres`
- `/ventas/cuadres/nuevo`
- `/ventas/cuadres/:id`
- `/ventas/ventas-rapidas`
- `/ventas/clientes`
- `/ventas/clientes/:id/estado-cuenta`
- `/ventas/cajas`

### Vistas requeridas

#### Listado de cuadres

- Propósito: consultar jornadas registradas.
- Datos: fecha, carro, chofer, total, deuda, estado.
- Acciones: filtrar, crear nuevo, abrir detalle.
- Estados: carga, vacío, error.

#### Formulario y edición de cuadre

- Propósito: crear o actualizar cabecera y detalle.
- Datos: cabecera, líneas, resumen.
- Acciones: agregar línea, editar, eliminar, guardar.
- Validaciones visibles: requeridos, negativos, consistencia de campos.

#### Detalle de cuadre y cierre

- Propósito: revisar el cierre completo del día.
- Datos: resumen económico, deuda, cajas usadas, remanente.
- Acciones: vincular ventas rápidas, cerrar, revisar distribución de cajas.

#### Captura rápida de ventas

- Propósito: registrar ventas con mínima fricción.
- Datos: producto, cajas, peso, precio, cliente, método de pago.
- Acciones: guardar, seguir registrando, asociar luego.

#### Listado de clientes

- Propósito: administrar cartera de clientes.
- Datos: nombre, teléfono, saldo actual.
- Acciones: crear, editar, abrir estado de cuenta.

#### Estado de cuenta de cliente

- Propósito: visualizar historial de deuda y pagos.
- Datos: movimientos, saldo acumulado, saldo actual.
- Acciones: registrar pago, filtrar por fecha.

#### Cierre y distribución de cajas

- Propósito: cerrar la trazabilidad de cajas del día.
- Datos: lote inicial, cajas usadas, remanente, movimientos.
- Acciones: distribuir, validar, confirmar cierre.

## Correcciones explícitas por capa

### Backend

- Normalizar nombres del dominio comercial para reducir ambigüedad entre `loan` y deuda real de cliente.
- Separar deuda comercial de cualquier estructura heredada ligada a operación de carga.
- Evitar que el control de cajas siga modelado solo como lugares y retornos sin contexto de jornada.

### Frontend

- Sustituir la pantalla pendiente de ventas por un router funcional.
- Mantener coherencia visual con módulos de pesca, cajas y transporte.
- Priorizar formularios reactivos y resumen en tiempo real para operación diaria.

### Vistas y experiencia

- La captura rápida debe ser más simple que la pantalla de cuadre.
- El detalle de cuadre debe actuar como centro de consolidación, no como formulario sobrecargado.
- El estado de cuenta debe priorizar lectura cronológica y saldo visible.

## Pruebas funcionales requeridas

- Crear cuadre desde cero y cerrar jornada.
- Registrar ventas rápidas estándar y variables.
- Vincular ventas al cuadre y validar resumen.
- Generar crédito desde una venta.
- Registrar pago y actualizar saldo.
- Registrar lote inicial, consumir cajas y distribuir remanente.
- Verificar bloqueos por inconsistencias de negocio.

## Documentos relacionados

- Plan general: `docs/plans/ventas-cuadre-mvp-plan.md`
- Backlog refinado: `docs/backlog/ventas-operacion-backlog.md`
