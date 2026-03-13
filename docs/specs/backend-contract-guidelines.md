# Criterio de contratos backend

## Objetivo

Definir una regla estable para diseñar y mantener contratos HTTP en el backend sin mezclar responsabilidades entre `create` y `update`.

## Problema que se quiere evitar

En varios módulos del repositorio aparecieron contratos donde:

- `POST` exige campos que el repositorio ignora.
- `PUT` reutiliza el mismo body de `POST` aunque no actualiza las mismas propiedades.
- El schema Zod, el DTO, la entidad y Prisma describen subconjuntos distintos del mismo recurso.
- La API obliga FKs o campos derivados que no deberían ser responsabilidad del cliente en todas las operaciones.

Este drift hace que el contrato publicado por la API deje de representar el comportamiento real del sistema.

## Regla principal

Separar contratos de `create` y `update` cuando el conjunto de campos requeridos o persistidos no sea exactamente el mismo.

Aplicar esta separación en todas las capas expuestas:

- schema Zod
- tipo inferido del body
- DTO de dominio
- firma de use case
- firma de repositorio

## Cuándo crear DTOs y schemas distintos

Crear `Create...Dto` y `Update...Dto` distintos cuando ocurra cualquiera de estos casos:

- `create` necesita una FK que `update` no modifica.
- `create` usa defaults de Prisma o del dominio para campos que el cliente no debería enviar.
- `update` permite cambiar campos operativos o de estado que no participan en `create`.
- `create` inicializa relaciones hijas automáticamente.
- hay campos calculados, derivados o de auditoría que no deben venir del cliente.

Si `create` y `update` persisten exactamente los mismos campos y con la misma semántica, se puede reutilizar el mismo contrato.

## Reglas por tipo de campo

### Foreign keys

- Pedir la FK en `create` solo cuando la relación se define al crear el recurso.
- No pedir la FK en `update` si el repositorio no la cambia.
- Si cambiar la FK es un caso válido de negocio, debe existir de forma explícita en el contrato de `update`.

### Defaults y campos inicializados por el sistema

- No pedir en `create` campos que Prisma resuelve con `@default(...)`.
- No pedir en `create` campos que el repositorio fija manualmente con valores iniciales.
- No pedir `createdAt`, `updatedAt` ni equivalentes si no son controlados por el cliente.

### Estados operativos

- Si un estado nace por default y luego cambia durante el ciclo de vida, dejarlo fuera de `create` y modelarlo en `update` o en una acción específica.
- Si el cambio de estado tiene reglas propias, preferir endpoints de intención explícita antes que sobrecargar `PUT`.

### Campos derivados

- No incluir en body de entrada campos calculados, totales, resúmenes o valores redundantes.
- Esos campos pueden existir en respuestas, pero no deben aceptarse como fuente de verdad del cliente.

## Patrón recomendado

### Presentation

- Definir `resourceCreateBodySchema` y `resourceUpdateBodySchema` por módulo cuando los contratos difieran.
- Exportar tipos inferidos separados para cada operación.
- Validar cada ruta con el schema que corresponda a su operación real.

### Domain

- Definir DTOs específicos de `create` y `update` cuando cambien campos o semántica.
- Evitar reutilizar `Create...Dto` en `update` solo por conveniencia.

### Repository

- La firma del repositorio debe aceptar exactamente los campos que persiste en esa operación.
- Si una propiedad no se escribe en `update`, no debe estar en el DTO de `update`.

### Entities

- Las entidades deben reflejar el shape real de persistencia y lectura.
- Mantener tipos compatibles con Prisma, especialmente fechas y nullables.

## Checklist de revisión

Antes de cerrar un módulo, verificar:

- `POST` y `PUT` usan el mismo schema solo si la persistencia es realmente simétrica.
- ningún body obliga campos ignorados por el controller o repositorio.
- ningún DTO de entrada incluye propiedades inexistentes en Prisma.
- ninguna entidad tipa fechas como `string` si Prisma entrega `Date`.
- los defaults del sistema no se exponen como requeridos al cliente.
- las FKs solo se exigen en operaciones que realmente las usan.

## Patrón de implementación

1. Revisar `schema.prisma` o el modelo real persistido.
2. Comparar controller, schema Zod, DTOs y repositorio.
3. Separar `create` y `update` si el comportamiento no es idéntico.
4. Ajustar los bodies de rutas para reflejar la operación real.
5. Ejecutar build para confirmar que no queden contratos viejos colgando.

## Casos del repositorio que motivan esta regla

- `fishing_operation/travel`: `create` persistía un subconjunto menor que `update`.
- `fishing_operation/other_cost_travel`: `update` no necesitaba `id_travel`.
- `transportation/vehicle_route` y `vehicle_routes`: el contrato exponía campos que Prisma no tenía.
- `operation/charger_operation`: `create` solo usaba `id_travel`, pero el schema exigía payload completo.
- `operation/other_cost_charger_operation`: el body aceptaba `id_person` sin persistencia real.
- `boxes/boxes` y `boxes/control_place`: `update` heredaba FKs de `create` que el repositorio no modificaba.

## Excepción permitida

Si `create` y `update` son exactamente simétricos y probablemente seguirán siéndolo, se puede mantener un solo DTO y un solo schema.

Esa decisión debe ser explícita y verificable contra:

- schema Zod
- DTO
- repositorio
- Prisma

## Documento relacionado

- [Alineación funcional y técnica del módulo de ventas operativo](/Users/Joseph/Desktop/DEV/PESCA/docs/specs/ventas-operacion-alineacion.md)
