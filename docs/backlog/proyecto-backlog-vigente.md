# Backlog vigente del proyecto

Este backlog refleja el estado despues del retiro de `cajas` y `ventas` legacy.

## Prioridades actuales

- Mantener y endurecer los modulos vigentes de `pesca`, `transporte`, `operacion` y `auth`.
- Revisar contratos backend de modulos activos para mantener alineacion entre Zod, DTOs, repositorios y Prisma.
- Mantener cobertura de navegacion y pruebas E2E sobre los flujos realmente operativos.

## Restricciones

- No abrir trabajo nuevo sobre `/ventas`, `/cajas`, `/sales` o `/boxes`.
- No reintroducir modelos Prisma legacy retirados.

## Siguiente paso recomendado

- Definir un backlog nuevo sobre necesidades vigentes del negocio usando unicamente modulos activos del repositorio.
