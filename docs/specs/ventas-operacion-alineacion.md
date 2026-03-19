# Spec obsoleta: alineacion del modulo de ventas operativo

Este documento queda fuera de vigencia.

## Estado

- Estado: obsoleto
- Fecha de retiro: 2026-03-19
- Motivo: el proyecto retiro los dominios legacy de `ventas` y `cajas` en backend, frontend y base de datos.

## Decision vigente

- No se debe reinterpretar ni extender `client`, `loan`, `loan_detail`, `payment`, `control_boxes`, `control_place`, `boxes` o `boxes_return`.
- No se deben reabrir rutas `/sales/*`, `/boxes/*`, `/ventas` o `/cajas` como continuacion de este diseño.

## Referencia vigente

- La decision tecnica de retiro vive en [docs/specs/retiro-cajas-ventas-legacy.md](/Users/Joseph/Desktop/DEV/PESCA/docs/specs/retiro-cajas-ventas-legacy.md).
