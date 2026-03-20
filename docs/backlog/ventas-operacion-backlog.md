# Backlog obsoleto: ventas, deudas y cajas legacy

Este documento queda retirado del backlog activo.

## Estado

- Estado: obsoleto
- Fecha de retiro: 2026-03-19
- Motivo: el sistema actual de `cajas` quedó fuera de uso y el sistema actual de `ventas` nunca se integró funcionalmente.

## Efecto sobre el proyecto

- No se deben implementar historias, tareas ni épicas descritas aquí.
- Las rutas `/ventas/*` y `/cajas/*` salieron del frontend.
- Los prefijos `/sales/*` y `/boxes/*` salieron del backend.
- Los modelos Prisma asociados a esos dominios se retiran del esquema activo.

## Referencia vigente

- La decisión técnica de retiro vive en [docs/specs/retiro-cajas-ventas-legacy.md](/Users/Joseph/Desktop/DEV/PESCA/docs/specs/retiro-cajas-ventas-legacy.md).
- El backlog activo del repositorio vive en [docs/backlog/proyecto-backlog-vigente.md](/Users/Joseph/Desktop/DEV/PESCA/docs/backlog/proyecto-backlog-vigente.md).
