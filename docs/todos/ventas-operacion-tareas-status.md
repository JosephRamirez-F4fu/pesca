# Lista de tareas y estado: ventas, cuadres, deudas y cajas

## Convenciones de estado

- `Pendiente`: no iniciada
- `En progreso`: iniciada pero no cerrada
- `Bloqueada`: depende de otra tarea o decisión
- `Completada`: terminada y validada

Estado inicial asumido para este documento: todas las tareas quedan en `Pendiente`.

## Fase 1. Cuadre diario y venta rápida base

| ID | Área | Tarea | Estado | Dependencia |
| --- | --- | --- | --- | --- |
| F1-01 | Backend | Definir entidad `cuadre_venta` y su relación con carro y chofer | Pendiente | Ninguna |
| F1-02 | Backend | Definir entidad `cuadre_venta_detalle` con cálculo de subtotal | Pendiente | F1-01 |
| F1-03 | Backend | Crear DTOs de alta, edición, listado y detalle de cuadre | Pendiente | F1-01 |
| F1-04 | Backend | Implementar endpoints CRUD base para cuadres | Pendiente | F1-03 |
| F1-05 | Backend | Implementar endpoints para agregar, editar y eliminar líneas de detalle | Pendiente | F1-02 |
| F1-06 | Backend | Centralizar cálculo de peso total, cajas totales, promedio y total económico | Pendiente | F1-05 |
| F1-07 | Backend | Agregar campos de descuento, deuda generada y total final al cuadre | Pendiente | F1-06 |
| F1-08 | Backend | Definir entidad `venta` para captura rápida | Pendiente | Ninguna |
| F1-09 | Backend | Implementar endpoints de venta rápida y consulta de ventas pendientes | Pendiente | F1-08 |
| F1-10 | Backend | Implementar vinculación de venta rápida al cuadre | Pendiente | F1-04, F1-09 |
| F1-11 | Frontend | Crear módulo real de `ventas` en el router | Pendiente | F1-04 |
| F1-12 | Frontend | Crear servicios y tipos de cuadres | Pendiente | F1-04 |
| F1-13 | Frontend | Crear vista listado de cuadres con filtros | Pendiente | F1-12 |
| F1-14 | Frontend | Crear vista formulario de cuadre | Pendiente | F1-12 |
| F1-15 | Frontend | Crear tabla editable de detalle de venta | Pendiente | F1-14 |
| F1-16 | Frontend | Crear panel de resumen con cálculos en tiempo real | Pendiente | F1-15 |
| F1-17 | Frontend | Crear vista de captura rápida de ventas | Pendiente | F1-09 |
| F1-18 | Frontend | Crear panel de ventas pendientes dentro del detalle de cuadre | Pendiente | F1-10, F1-14 |
| F1-19 | UX/Vistas | Diseñar flujo operativo entre listado, captura rápida y detalle de cuadre | Pendiente | F1-11 |
| F1-20 | QA | Validar creación, edición, recálculo y consulta de cuadre | Pendiente | F1-18 |

## Fase 2. Cuenta corriente y deudas

| ID | Área | Tarea | Estado | Dependencia |
| --- | --- | --- | --- | --- |
| F2-01 | Backend | Ajustar o extender entidad `cliente` con campos faltantes | Pendiente | Ninguna |
| F2-02 | Backend | Definir entidad `movimiento_cuenta_corriente` | Pendiente | F2-01 |
| F2-03 | Backend | Implementar generación automática de crédito desde venta a crédito | Pendiente | F1-09, F2-02 |
| F2-04 | Backend | Implementar registro de pagos y recálculo de saldo | Pendiente | F2-02 |
| F2-05 | Backend | Implementar endpoint de estado de cuenta con saldo acumulado | Pendiente | F2-03, F2-04 |
| F2-06 | Frontend | Crear servicios y tipos de clientes | Pendiente | F2-01 |
| F2-07 | Frontend | Crear listado y formulario de clientes | Pendiente | F2-06 |
| F2-08 | Frontend | Incorporar selección obligatoria de cliente en ventas a crédito | Pendiente | F2-03, F1-17 |
| F2-09 | Frontend | Crear vista estado de cuenta por cliente | Pendiente | F2-05 |
| F2-10 | Frontend | Crear formulario de pago desde estado de cuenta | Pendiente | F2-05 |
| F2-11 | UX/Vistas | Definir lectura cronológica del kardex y saldo visible | Pendiente | F2-09 |
| F2-12 | QA | Validar crédito automático, registro de pago y saldo actualizado | Pendiente | F2-10 |

## Fase 3. Control de cajas y cierre operativo

| ID | Área | Tarea | Estado | Dependencia |
| --- | --- | --- | --- | --- |
| F3-01 | Backend | Definir entidad `lote_cajas` para stock inicial diario | Pendiente | Ninguna |
| F3-02 | Backend | Definir entidad `movimiento_caja` para distribución final | Pendiente | F3-01 |
| F3-03 | Backend | Implementar cálculo de cajas usadas desde ventas/cuadre | Pendiente | F1-05, F3-01 |
| F3-04 | Backend | Implementar cálculo de remanente y validación de cierre | Pendiente | F3-02, F3-03 |
| F3-05 | Backend | Implementar endpoints de lote diario y movimientos de caja | Pendiente | F3-04 |
| F3-06 | Frontend | Crear servicios y tipos para lotes y movimientos de cajas | Pendiente | F3-05 |
| F3-07 | Frontend | Crear formulario de stock inicial de cajas | Pendiente | F3-06 |
| F3-08 | Frontend | Mostrar cajas usadas y remanente dentro del detalle del cuadre | Pendiente | F3-04, F1-14 |
| F3-09 | Frontend | Crear vista de distribución de cajas restantes | Pendiente | F3-06 |
| F3-10 | Frontend | Crear historial de movimientos de cajas con filtros | Pendiente | F3-05 |
| F3-11 | UX/Vistas | Diseñar visualización de consumo, remanente y distribución | Pendiente | F3-08, F3-09 |
| F3-12 | QA | Validar bloqueo de cierre cuando la distribución no coincide | Pendiente | F3-10 |

## Fase 4. Endurecimiento, reportes y salida a operación

| ID | Área | Tarea | Estado | Dependencia |
| --- | --- | --- | --- | --- |
| F4-01 | Backend | Normalizar nombres y contratos del nuevo dominio comercial | Pendiente | F1-10, F2-05, F3-05 |
| F4-02 | Backend | Consolidar validaciones cruzadas entre ventas, deuda y cajas | Pendiente | F1-10, F2-05, F3-05 |
| F4-03 | Frontend | Persistir filtros relevantes por vistas operativas | Pendiente | F1-13, F2-09, F3-10 |
| F4-04 | Frontend | Completar estados de carga, vacío y error en todas las vistas de ventas | Pendiente | F1-18, F2-10, F3-10 |
| F4-05 | Frontend | Ajustar navegación final del módulo `ventas` desde home y navbar | Pendiente | F1-11 |
| F4-06 | UX/Vistas | Revisar consistencia visual y copy del módulo completo | Pendiente | F4-04 |
| F4-07 | QA | Diseñar y ejecutar pruebas E2E del flujo completo | Pendiente | F4-05 |
| F4-08 | Documentación | Actualizar backlog, spec y estado de avance al cierre de cada fase | Pendiente | Continua |

## Resumen por estado

| Estado | Cantidad |
| --- | ---: |
| Pendiente | 52 |
| En progreso | 0 |
| Bloqueada | 0 |
| Completada | 0 |

## Siguiente corte recomendado

Priorizar este primer bloque para iniciar implementación:

1. `F1-01` a `F1-10` para cerrar contratos backend del flujo base.
2. `F1-11` a `F1-18` para reemplazar el placeholder de ventas.
3. `F1-20` para validar el flujo de cuadre y venta rápida antes de pasar a deuda y cajas.
