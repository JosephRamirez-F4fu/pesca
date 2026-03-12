/*
  Warnings:

  - You are about to drop the `other_cost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "other_cost";

-- CreateTable
CREATE TABLE "other_cost_travel" (
    "id" SERIAL NOT NULL,
    "id_travel" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "other_cost_travel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charger_operation" (
    "id" SERIAL NOT NULL,
    "id_travel" INTEGER NOT NULL,
    "id_vehicle" INTEGER NOT NULL,
    "footboard" DOUBLE PRECISION NOT NULL,
    "helper" DOUBLE PRECISION NOT NULL,
    "grocer" DOUBLE PRECISION NOT NULL,
    "charger" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "charger_operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "other_cost_charger_operation" (
    "id" SERIAL NOT NULL,
    "id_charger_operation" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "other_cost_charger_operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route" (
    "id" SERIAL NOT NULL,
    "init" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "oil_use" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_route" (
    "id" SERIAL NOT NULL,
    "id_vehicle" INTEGER NOT NULL,
    "id_routes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_routes" (
    "id" SERIAL NOT NULL,
    "id_vehicle_route" INTEGER NOT NULL,
    "id_route" INTEGER NOT NULL,
    "oil_use" INTEGER NOT NULL,
    "oil_cost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_route_other_cost" (
    "id" SERIAL NOT NULL,
    "id_vehicle_route" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_route_other_cost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "charger_operation_id_travel_key" ON "charger_operation"("id_travel");

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_id_boat_fkey" FOREIGN KEY ("id_boat") REFERENCES "boat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "other_cost_travel" ADD CONSTRAINT "other_cost_travel_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fishing" ADD CONSTRAINT "fishing_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charger_operation" ADD CONSTRAINT "charger_operation_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charger_operation" ADD CONSTRAINT "charger_operation_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "other_cost_charger_operation" ADD CONSTRAINT "other_cost_charger_operation_id_charger_operation_fkey" FOREIGN KEY ("id_charger_operation") REFERENCES "charger_operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route" ADD CONSTRAINT "vehicle_route_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_routes" ADD CONSTRAINT "vehicle_routes_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_routes" ADD CONSTRAINT "vehicle_routes_id_route_fkey" FOREIGN KEY ("id_route") REFERENCES "route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route_other_cost" ADD CONSTRAINT "vehicle_route_other_cost_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
