# Backlog refinado del sistema de ventas, deudas y cajas

## Convenciones de este backlog

Cada historia incluye:

- Objetivo funcional
- Reglas de negocio
- Dependencias
- Tareas backend
- Tareas frontend
- Tareas vistas/UX
- Validaciones
- Criterios de aceptación
- Riesgos

## EPIC 1. Cuadre de venta diario

### Story 1.1 Crear cabecera de cuadre del día

**Objetivo funcional**

Como operador, quiero crear el cuadre del día con fecha, carro y chofer para iniciar el control operativo.

**Reglas de negocio**

- Debe existir un estado inicial de cuadre en edición.
- La combinación fecha + carro no debe duplicarse si el negocio exige un único cuadre por jornada.
- El chofer debe corresponder al contexto operativo del carro o quedar marcado como selección manual.

**Dependencias**

- Catálogo de vehículos.
- Catálogo de personas/choferes.

**Tareas backend**

- Definir entidad `cuadre_venta`.
- Crear DTOs de creación, actualización y consulta.
- Crear endpoint para alta de cuadre.
- Exponer filtros por fecha, carro, chofer y estado.
- Incluir estado de cierre y campos de auditoría.

**Tareas frontend**

- Crear servicio para alta y consulta de cuadres.
- Crear tipos y mapeos de respuesta.
- Integrar formulario con validación de campos requeridos.

**Tareas vistas/UX**

- Diseñar formulario con fecha, carro, chofer y observaciones.
- Mostrar estado del cuadre: borrador, en edición, cerrado.

**Validaciones**

- Fecha obligatoria.
- Carro obligatorio.
- Chofer obligatorio.
- Observaciones opcionales con límite razonable de longitud.

**Criterios de aceptación**

- El usuario puede crear un cuadre y verlo luego en el listado.

**Riesgos**

- Ambigüedad del origen de chofer si hoy proviene de otro módulo.

### Story 1.2 Registrar detalle de productos vendidos

**Objetivo funcional**

Como operador, quiero registrar múltiples líneas de venta dentro del cuadre para calcular el total del día.

**Reglas de negocio**

- Cada línea representa una combinación de producto y especie/variación.
- El subtotal se calcula por línea.
- El cuadre debe soportar múltiples detalles editables.

**Dependencias**

- Catálogo de productos o definición temporal embebida si aún no existe maestro.

**Tareas backend**

- Definir entidad `cuadre_venta_detalle`.
- Relacionar detalle con `cuadre_venta`.
- Crear endpoints para agregar, editar y eliminar líneas.
- Incluir subtotal calculado por respuesta.

**Tareas frontend**

- Crear tabla editable para líneas múltiples.
- Permitir alta, edición y eliminación sin salir del formulario.
- Refrescar resumen de manera reactiva.

**Tareas vistas/UX**

- Mostrar filas con producto, especie, cajas, peso, precio y subtotal.
- Permitir agregar línea vacía rápida.

**Validaciones**

- Cantidad de cajas mayor a cero.
- Peso total mayor a cero.
- Precio no negativo.

**Criterios de aceptación**

- El sistema recalcula el subtotal de cada línea al modificar cantidad, peso o precio.

**Riesgos**

- Catálogo de especies todavía no identificado en el código actual.

### Story 1.3 Calcular totales del cuadre

**Objetivo funcional**

Como operador, quiero ver totales automáticos del día para evitar cálculos manuales.

**Reglas de negocio**

- El total del cuadre debe recalcularse al editar cualquier línea.
- El promedio peso/caja debe manejar división segura.

**Dependencias**

- Story 1.2 implementada.

**Tareas backend**

- Calcular peso total, cajas totales, promedio peso/caja y total económico.
- Retornar resumen agregado en endpoints de detalle y listado.

**Tareas frontend**

- Mostrar panel de resumen en tiempo real.
- Sincronizar resumen con cambios en la tabla de detalle.

**Tareas vistas/UX**

- Ubicar resumen en un bloque visible y persistente dentro del detalle.

**Validaciones**

- Evitar NaN o división por cero.

**Criterios de aceptación**

- Los totales cambian inmediatamente tras cualquier ajuste del detalle.

**Riesgos**

- Diferencias entre cálculo cliente-servidor si no se centraliza la fórmula.

### Story 1.4 Aplicar descuento, deuda y total final

**Objetivo funcional**

Como operador, quiero registrar descuento y deuda para cerrar correctamente el cuadre.

**Reglas de negocio**

- El descuento reduce el total del cuadre.
- La deuda se registra como parte del cierre, pero no reemplaza la cuenta corriente por cliente.
- El total final debe ser transparente para el operador.

**Dependencias**

- Totales calculados.
- Integración posterior con cuenta corriente.

**Tareas backend**

- Agregar campos de descuento, deuda generada y total final al cuadre.
- Recalcular resumen final al actualizar dichos campos.

**Tareas frontend**

- Crear inputs monetarios para descuento y deuda.
- Mostrar desglose antes y después de ajustes.

**Tareas vistas/UX**

- Incluir tarjeta de resumen final con total bruto, descuento, deuda y total neto.

**Validaciones**

- No permitir montos negativos.
- No permitir que descuento exceda el total económico salvo regla explícita.

**Criterios de aceptación**

- El usuario puede revisar el resumen final antes del cierre.

**Riesgos**

- Confusión entre deuda del cuadre y crédito asociado a un cliente específico.

### Story 1.5 Consultar cuadres diarios

**Objetivo funcional**

Como operador, quiero revisar cuadres anteriores y su detalle.

**Reglas de negocio**

- El historial debe soportar filtros operativos.
- El detalle debe exponer resumen económico y estado del cuadre.

**Dependencias**

- Historias 1.1 a 1.4.

**Tareas backend**

- Crear endpoint listado paginado o filtrable.
- Crear endpoint de detalle por id.

**Tareas frontend**

- Construir vista de listado con filtros.
- Navegar a vista detalle.

**Tareas vistas/UX**

- Mostrar fecha, carro, chofer, total, deuda y estado.

**Validaciones**

- Manejar filtros vacíos y resultados sin coincidencias.

**Criterios de aceptación**

- El usuario puede filtrar por fecha y carro y abrir un cuadre específico.

**Riesgos**

- Volumen creciente de datos si no se define paginación.

## EPIC 2. Sistema de anotador y venta rápida

### Story 2.1 Crear venta rápida

**Objetivo funcional**

Como operador, quiero registrar una venta rápida sin detener la operación del día.

**Reglas de negocio**

- La venta rápida nace independiente del cuadre y puede vincularse después.
- Debe registrar producto, cajas, peso, precio, cliente opcional y método de pago.

**Dependencias**

- Catálogo de productos.
- Catálogo de clientes.

**Tareas backend**

- Definir entidad `venta`.
- Crear endpoint de alta rápida y consulta.
- Marcar estado de vinculación al cuadre.

**Tareas frontend**

- Crear formulario ligero de captura.
- Implementar guardado rápido y confirmación visual.

**Tareas vistas/UX**

- Optimizar flujo para teclado y mínima cantidad de clics.

**Validaciones**

- Producto requerido.
- Cajas y peso válidos.
- Método de pago requerido.

**Criterios de aceptación**

- La venta queda registrada y lista para asociarse al día operativo.

**Riesgos**

- Sobrecarga del formulario si se mezclan datos de cierre con captura rápida.

### Story 2.2 Soporte de peso estándar por caja

**Objetivo funcional**

Como operador, quiero usar un peso estándar por caja para registrar más rápido.

**Reglas de negocio**

- El peso total se deriva de cajas x peso estándar.
- El usuario debe poder ver y corregir el cálculo.

**Dependencias**

- Venta rápida base.

**Tareas backend**

- Aceptar modo de captura estándar.
- Calcular peso total y total económico.

**Tareas frontend**

- Permitir seleccionar modo estándar.
- Recalcular peso total al cambiar cajas o peso estándar.

**Tareas vistas/UX**

- Mostrar claramente fórmula aplicada.

**Validaciones**

- Cajas mayores a cero.
- Peso estándar mayor a cero.

**Criterios de aceptación**

- El peso total se obtiene automáticamente sin ingresar pesos por caja.

### Story 2.3 Soporte de peso variable por caja

**Objetivo funcional**

Como operador, quiero registrar pesos individuales para manejar cajas con pesos distintos.

**Reglas de negocio**

- La cantidad de pesos debe coincidir con la cantidad de cajas.
- El total económico se basa en el peso acumulado.

**Dependencias**

- Venta rápida base.

**Tareas backend**

- Definir entidad `venta_peso_caja` o estructura equivalente.
- Guardar pesos individuales vinculados a la venta.

**Tareas frontend**

- Construir tabla de pesos por caja.
- Recalcular total de peso y total económico.

**Tareas vistas/UX**

- Facilitar ingreso secuencial de pesos.

**Validaciones**

- Número de filas igual al total de cajas.
- Ningún peso individual puede ser cero o negativo.

**Criterios de aceptación**

- El sistema suma pesos individuales y actualiza el total sin intervención manual.

### Story 2.4 Asociar venta a cliente y forma de pago

**Objetivo funcional**

Como operador, quiero clasificar la venta como contado o crédito para reflejar correctamente la deuda.

**Reglas de negocio**

- Si la venta es a crédito, debe requerir cliente.
- Si es contado, no debe generar movimiento de deuda.

**Dependencias**

- Cliente disponible.
- Cuenta corriente definida en EPIC 3.

**Tareas backend**

- Agregar clasificación de pago a `venta`.
- Generar movimiento crédito cuando corresponda.

**Tareas frontend**

- Mostrar selector de cliente condicionado al tipo de venta.
- Reflejar resultado del registro en pantalla.

**Tareas vistas/UX**

- Hacer visible el impacto de una venta a crédito.

**Validaciones**

- No permitir crédito sin cliente.

**Criterios de aceptación**

- Una venta a crédito deja rastro en cuenta corriente.

### Story 2.5 Vincular ventas rápidas al cuadre

**Objetivo funcional**

Como operador, quiero consolidar ventas rápidas dentro del cuadre del día.

**Reglas de negocio**

- Una venta no debe vincularse más de una vez al mismo cierre.
- La vinculación debe recalcular totales.

**Dependencias**

- Cuadre diario y venta rápida base.

**Tareas backend**

- Exponer endpoint de vinculación y desvinculación.
- Recalcular resumen del cuadre.

**Tareas frontend**

- Mostrar ventas pendientes de asociar.
- Permitir selección múltiple o individual.

**Tareas vistas/UX**

- Incluir panel “ventas pendientes” dentro del detalle del cuadre.

**Validaciones**

- No permitir duplicidad de asociación.

**Criterios de aceptación**

- Las ventas vinculadas impactan automáticamente en el resumen del día.

## EPIC 3. Gestión de deudas y cuenta corriente

### Story 3.1 Administrar clientes

**Objetivo funcional**

Como operador, quiero registrar y editar clientes para asociar ventas y deudas.

**Reglas de negocio**

- El cliente es requisito para cualquier venta a crédito.

**Dependencias**

- Revisión del modelo actual `client`.

**Tareas backend**

- Reusar o ajustar entidad `cliente`.
- Completar campos básicos, teléfono y observaciones si corresponde.

**Tareas frontend**

- Crear listado y formulario de clientes.

**Tareas vistas/UX**

- Permitir búsqueda rápida por nombre y teléfono.

**Validaciones**

- Nombre obligatorio.

**Criterios de aceptación**

- El cliente puede seleccionarse desde la venta.

### Story 3.2 Registrar movimientos de crédito

**Objetivo funcional**

Como operador, quiero generar crédito en la cuenta corriente cuando una venta queda pendiente de cobro.

**Reglas de negocio**

- El crédito debe quedar asociado a cliente y venta origen.
- Debe registrar monto y fecha efectiva.

**Dependencias**

- Venta a crédito.

**Tareas backend**

- Crear `movimiento_cuenta_corriente` tipo `credito`.
- Asociarlo a venta y cliente.

**Tareas frontend**

- Mostrar confirmación del movimiento generado.

**Tareas vistas/UX**

- Reflejar visualmente la deuda creada.

**Validaciones**

- Cliente obligatorio.
- Monto mayor a cero.

**Criterios de aceptación**

- Toda venta a crédito produce un movimiento visible en el estado de cuenta.

### Story 3.3 Registrar pagos

**Objetivo funcional**

Como operador, quiero registrar pagos de clientes para actualizar el saldo pendiente.

**Reglas de negocio**

- El pago descuenta saldo.
- Debe registrar fecha y método de pago.

**Dependencias**

- Cuenta corriente activa.

**Tareas backend**

- Crear movimiento tipo `pago`.
- Recalcular saldo acumulado.

**Tareas frontend**

- Crear formulario de pago desde estado de cuenta o cliente.

**Tareas vistas/UX**

- Mostrar saldo antes y después del pago.

**Validaciones**

- Monto mayor a cero.

**Criterios de aceptación**

- El pago se ve reflejado en el saldo del cliente inmediatamente.

### Story 3.4 Consultar saldo y kardex del cliente

**Objetivo funcional**

Como operador, quiero ver el historial completo de créditos y pagos con saldo acumulado.

**Reglas de negocio**

- El kardex debe ordenarse cronológicamente.
- El saldo acumulado debe calcularse secuencialmente.

**Dependencias**

- Créditos y pagos implementados.

**Tareas backend**

- Exponer endpoint de estado de cuenta.
- Incluir saldo actual y saldo acumulado por fila.

**Tareas frontend**

- Construir vista de estado de cuenta.

**Tareas vistas/UX**

- Incorporar filtros por rango de fecha.

**Validaciones**

- Manejar cliente sin movimientos.

**Criterios de aceptación**

- El operador puede revisar deuda histórica y saldo vigente sin cálculos externos.

## EPIC 4. Control de cajas operativo

### Story 4.1 Registrar lote inicial de cajas

**Objetivo funcional**

Como operador, quiero registrar el stock inicial de cajas del día para controlar consumo y remanente.

**Reglas de negocio**

- El lote inicial debe quedar asociado a fecha, carro y chofer.

**Dependencias**

- Catálogos operativos.

**Tareas backend**

- Crear entidad `lote_cajas`.
- Crear endpoint de alta y consulta por jornada.

**Tareas frontend**

- Crear formulario de stock inicial.

**Tareas vistas/UX**

- Integrar el lote inicial dentro del flujo del cuadre.

**Validaciones**

- Cantidad inicial no negativa.

**Criterios de aceptación**

- El sistema muestra cuántas cajas disponibles tiene la jornada.

### Story 4.2 Calcular cajas usadas

**Objetivo funcional**

Como operador, quiero conocer cuántas cajas se usaron a partir de las ventas registradas.

**Reglas de negocio**

- Las cajas usadas se calculan desde ventas/cuadre, no manualmente.

**Dependencias**

- Detalle de ventas.

**Tareas backend**

- Calcular cajas usadas agregando ventas del día.

**Tareas frontend**

- Mostrar indicador de cajas consumidas.

**Tareas vistas/UX**

- Integrar el cálculo en el resumen del cierre.

**Validaciones**

- Evitar doble conteo al vincular ventas rápidas y detalle manual.

**Criterios de aceptación**

- El sistema informa el total de cajas usadas sin intervención del usuario.

### Story 4.3 Calcular remanente y distribuir cajas

**Objetivo funcional**

Como operador, quiero definir el destino de las cajas restantes para cerrar el día con trazabilidad.

**Reglas de negocio**

- El remanente es stock inicial menos cajas usadas.
- La distribución puede ser combinada.

**Dependencias**

- Lote inicial y cajas usadas.

**Tareas backend**

- Crear entidad `movimiento_caja`.
- Permitir tipos: permanece, traslado, salida.

**Tareas frontend**

- Crear formulario de distribución del remanente.

**Tareas vistas/UX**

- Mostrar contador restante en tiempo real mientras se distribuye.

**Validaciones**

- La suma distribuida debe coincidir con el remanente.

**Criterios de aceptación**

- El operador no puede cerrar mientras existan cajas sin asignar.

### Story 4.4 Consultar historial de cajas

**Objetivo funcional**

Como operador, quiero revisar el historial de movimientos de cajas por fecha, carro y tipo.

**Reglas de negocio**

- El historial debe permitir rastrear origen y destino.

**Dependencias**

- Movimiento de caja implementado.

**Tareas backend**

- Exponer listado filtrable de lotes y movimientos.

**Tareas frontend**

- Construir vista histórica con filtros.

**Tareas vistas/UX**

- Mostrar relación entre jornada, consumo y distribución final.

**Validaciones**

- Manejar ausencia de resultados.

**Criterios de aceptación**

- El usuario puede revisar qué ocurrió con las cajas de una jornada específica.

## Fase 4 transversal. UX, reportes y endurecimiento

### Story 5.1 Consolidar navegación y vistas reales del módulo ventas

**Tareas backend**

- Confirmar contratos estables para consumo del frontend.

**Tareas frontend**

- Reemplazar placeholder de `/ventas/*` por rutas reales.
- Mantener compatibilidad con navegación actual del home.

**Tareas vistas/UX**

- Unificar lenguaje visual con el resto de módulos operativos.

### Story 5.2 Mejorar filtros, estados y feedback

**Tareas backend**

- Soportar filtros consistentes por fecha, carro, cliente y estado.

**Tareas frontend**

- Persistir filtros relevantes de operación.
- Manejar estados de carga, vacío y error.

**Tareas vistas/UX**

- Resaltar inconsistencias en tiempo real sin bloquear edición prematuramente.

### Story 5.3 Cobertura de pruebas E2E

**Pruebas de aceptación**

- Crear cuadre, registrar detalle y cerrar correctamente.
- Registrar venta rápida a contado y a crédito.
- Generar deuda, registrar pago y verificar saldo.
- Cerrar cajas con remanente distribuido.
- Validar que el sistema impide inconsistencias de peso, deuda y cajas.
