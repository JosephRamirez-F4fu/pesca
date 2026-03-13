# Plan MVP de ventas, cuadres, deudas y cajas

## Resumen

Este plan define la implementación documental del nuevo módulo operativo de ventas bajo un rediseño limpio del dominio. El objetivo es reemplazar el placeholder actual de `ventas` en frontend con un módulo real y, al mismo tiempo, dejar trazada la migración conceptual desde los modelos existentes en backend para ventas, deudas y cajas.

La ejecución se ordena por fases MVP para reducir riesgo operativo y permitir entregas parciales útiles:

1. Cuadre diario y venta rápida base
2. Cuenta corriente y deudas
3. Cierre de cajas y distribución de remanente
4. Ajustes UX, reportes y endurecimiento funcional

## Fases de implementación

### Fase 1. Cuadre diario y venta rápida base

**Objetivo**

Poner en producción el flujo mínimo para registrar el día operativo, capturar ventas rápidas y consolidarlas en un cuadre consultable.

**Alcance**

- Crear `cuadre_venta` y `cuadre_venta_detalle` como núcleo del cierre del día.
- Crear `venta` como registro operativo rápido desacoplado del cierre inmediato.
- Permitir asociación entre venta rápida y cuadre del día.
- Habilitar vistas reales del módulo `ventas` en frontend.

**Entregables**

- Registro de cuadre con fecha, carro, chofer y observaciones.
- Registro de detalle con múltiples líneas.
- Cálculo automático de subtotal, peso total, cajas totales, promedio por caja y total económico.
- Captura rápida de venta con modo estándar y soporte posterior para vincularla al cuadre.
- Lista e historial básico de cuadres.

**Dependencias**

- Reuso de catálogos actuales de vehículos y personas desde `api/src/operation` y `api/src/shared`.
- Reserva de rutas ya existente en `App/src/core/router/index.tsx` y `App/src/core/router/paths.ts`.

**Criterio de salida**

Un operador puede registrar ventas del día y cerrar un cuadre sin cálculos manuales.

### Fase 2. Cuenta corriente y deudas

**Objetivo**

Unificar créditos y pagos bajo una cuenta corriente clara por cliente, con saldo calculado y trazabilidad.

**Alcance**

- Mantener `cliente` como entidad del dominio de ventas.
- Incorporar `movimiento_cuenta_corriente` como sustituto funcional de `loan` y `payment`.
- Generar automáticamente movimientos de crédito desde ventas a plazo.
- Registrar pagos y recalcular saldo.

**Entregables**

- Alta y edición de clientes.
- Estado de cuenta por cliente.
- Historial cronológico de movimientos con saldo acumulado.
- Reglas para impedir deuda sin cliente.

**Criterio de salida**

El sistema refleja el saldo vigente del cliente sin cálculos externos.

### Fase 3. Cajas y cierre operativo

**Objetivo**

Incorporar el control de cajas al cierre del día como parte obligatoria del cuadre.

**Alcance**

- Crear `lote_cajas` para stock inicial diario por carro y chofer.
- Crear `movimiento_caja` para permanencia, traslado o salida.
- Calcular cajas usadas a partir de ventas/cuadre.
- Calcular remanente y bloquear cierre si la distribución no cuadra.

**Entregables**

- Registro de lote inicial.
- Resumen de cajas usadas y restantes.
- Vista de distribución final.
- Historial de movimientos por fecha, carro y tipo.

**Criterio de salida**

El cuadre no se puede cerrar si la distribución final de cajas es inconsistente.

### Fase 4. Endurecimiento y experiencia operativa

**Objetivo**

Mejorar usabilidad, robustez y cobertura del flujo completo antes de una expansión funcional mayor.

**Alcance**

- Afinar navegación y persistencia de filtros.
- Agregar estados vacíos, carga y error en vistas de ventas.
- Documentar reportes operativos básicos.
- Definir cobertura E2E del flujo principal.

**Entregables**

- Ajustes visuales y de copy para operación diaria.
- Pruebas E2E del circuito de venta, deuda y cajas.
- Consolidación de nombres funcionales entre backend y frontend.

## Cambios clave por capa

### Backend

- Incorporar nuevos agregados para cuadre, venta y cuenta corriente.
- Mantener explícita la migración conceptual desde `loan`, `loan_detail`, `payment`, `control_boxes` y `control_place`.
- Definir endpoints CRUD y de consulta con respuestas enriquecidas por totales, saldo y estado de cierre.
- Aplicar validaciones cruzadas entre ventas, deuda y cajas.

### Frontend

- Reemplazar el placeholder de `/ventas/*` por un módulo con rutas reales.
- Crear vistas para listado, captura, detalle, cierre y estado de cuenta.
- Mostrar cálculos en tiempo real y feedback inmediato de inconsistencias.

### Vistas

- Listado de cuadres
- Formulario de cuadre
- Detalle de cuadre
- Captura rápida de ventas
- Listado de clientes
- Estado de cuenta por cliente
- Cierre y distribución de cajas

## Interfaces y contratos a documentar

- `cuadre_venta`: alta, edición, detalle, cierre, listado y consulta por filtros.
- `venta`: alta rápida, consulta, edición, vinculación a cuadre y clasificación por forma de pago.
- `cliente`: CRUD y consulta resumida.
- `movimiento_cuenta_corriente`: registro de crédito, pago, consulta por cliente y saldo.
- `lote_cajas`: alta y consulta por jornada.
- `movimiento_caja`: distribución de remanente y trazabilidad.

Cada contrato debe incluir DTOs de entrada, DTOs de respuesta, reglas de validación, errores esperados y campos calculados.

## Pruebas y aceptación

### Casos felices

- Crear cuadre y guardar cabecera.
- Registrar múltiples líneas de venta.
- Recalcular totales al editar detalle.
- Aplicar descuento y deuda.
- Consultar histórico y detalle del cuadre.
- Registrar venta rápida y asociarla al día.
- Generar crédito y registrar pago.
- Cerrar cajas con distribución completa.

### Casos de consistencia

- Rechazar números negativos en descuento, deuda, cajas y montos.
- Rechazar peso variable con cantidad de cajas inconsistente.
- Rechazar crédito sin cliente asociado.
- Rechazar cierre cuando la suma de distribución no coincide con remanente.

### Casos de integración

- La venta rápida impacta el cuadre del día.
- La venta a crédito genera movimiento de cuenta corriente.
- El pago reduce el saldo acumulado.
- Las cajas usadas coinciden con lo vendido y con el remanente distribuido.

### Casos frontend

- Navegación correcta desde `/ventas`.
- Persistencia de filtros operativos.
- Edición de líneas múltiples sin perder cálculos.
- Mensajes de carga, vacío y error consistentes.

## Supuestos y decisiones

- El proyecto seguirá usando español como lenguaje funcional de negocio.
- El dominio nuevo se documenta como rediseño limpio, no como simple renombrado del modelo actual.
- La migración será primero conceptual y contractual; la implementación podrá convivir temporalmente con módulos legados.
- Los catálogos de carro y chofer se apoyarán inicialmente en estructuras ya existentes de vehículos y personas.
- El backlog detallado vive en `docs/backlog/ventas-operacion-backlog.md`.
- La alineación técnica y de migración vive en `docs/specs/ventas-operacion-alineacion.md`.
