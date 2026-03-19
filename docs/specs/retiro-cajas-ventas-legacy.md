# Retiro de modulos legacy de cajas y ventas

## Decision

El proyecto retira de forma definitiva los sistemas legacy de `cajas` y `ventas`.

## Alcance del retiro

- Backend: se eliminan los routers y modulos fuente de `/boxes` y `/sales`.
- Frontend: se eliminan las rutas `/cajas` y `/ventas`, junto con su navegacion asociada.
- Base de datos: se retiran del schema activo los modelos `client`, `loan`, `loan_detail`, `payment`, `control_boxes`, `control_place`, `boxes` y `boxes_return`.
- Documentacion: el backlog, plan y TODOs que expandian esos dominios quedan marcados como obsoletos.

## Motivo

- `cajas` quedo fuera de uso operativo.
- `ventas` nunca llego a integrarse funcionalmente en la aplicacion.
- Mantener esos dominios en codigo, rutas y backlog generaba deuda tecnica y direccion falsa para el proyecto.

## Regla a futuro

- No reutilizar estos modulos como base para trabajo nuevo.
- Si en el futuro se necesita una nueva capacidad comercial o de control fisico, debe disenarse como un dominio nuevo y documentarse desde cero.

## Actualizacion 2026-03-19

- Tambien se retiraron `person` y `notification` por falta de uso actual en los modulos activos.
