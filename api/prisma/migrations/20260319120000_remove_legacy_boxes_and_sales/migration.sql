-- Retiro definitivo de los dominios legacy de cajas y ventas.
DROP TABLE IF EXISTS "boxes_return" CASCADE;
DROP TABLE IF EXISTS "boxes" CASCADE;
DROP TABLE IF EXISTS "control_place" CASCADE;
DROP TABLE IF EXISTS "control_boxes" CASCADE;
DROP TABLE IF EXISTS "loan_detail" CASCADE;
DROP TABLE IF EXISTS "loan" CASCADE;
DROP TABLE IF EXISTS "payment" CASCADE;
DROP TABLE IF EXISTS "client" CASCADE;
