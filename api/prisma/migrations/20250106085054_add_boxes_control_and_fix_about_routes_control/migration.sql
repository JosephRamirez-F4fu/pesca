/*
  Warnings:

  - You are about to drop the column `id_charge_operation` on the `vehicle_route` table. All the data in the column will be lost.
  - You are about to drop the column `id_person` on the `vehicle_route_other_cost` table. All the data in the column will be lost.
  - You are about to drop the column `oil_cost` on the `vehicle_routes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "loan" DROP CONSTRAINT "loan_id_charge_operation_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_route" DROP CONSTRAINT "vehicle_route_id_charge_operation_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_route_other_cost" DROP CONSTRAINT "vehicle_route_other_cost_id_person_fkey";

-- AlterTable
ALTER TABLE "vehicle_route" DROP COLUMN "id_charge_operation";

-- AlterTable
ALTER TABLE "vehicle_route_other_cost" DROP COLUMN "id_person";

-- AlterTable
ALTER TABLE "vehicle_routes" DROP COLUMN "oil_cost",
ALTER COLUMN "oil_use" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "vehicle_route_detail" (
    "id" SERIAL NOT NULL,
    "id_vehicle_route" INTEGER NOT NULL,
    "dateInit" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" TIMESTAMP(3),
    "taxes_out" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "taxes_in" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_route_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_route_money" (
    "id" SERIAL NOT NULL,
    "id_vehicle_route" INTEGER NOT NULL,
    "money" DOUBLE PRECISION NOT NULL,
    "givenby" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_route_money_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_route_balance" (
    "id" SERIAL NOT NULL,
    "id_vehicle_route" INTEGER NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "place" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_route_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle_routes_oil_use" (
    "id" SERIAL NOT NULL,
    "id_vehicle_route" INTEGER NOT NULL,
    "oil_use" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicle_routes_oil_use_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "control_boxes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "date_arrive" TIMESTAMP(3) NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "control_boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boxes" (
    "id" SERIAL NOT NULL,
    "color" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reported_by" TEXT NOT NULL,
    "id_control_boxes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boxes_return" (
    "id" SERIAL NOT NULL,
    "id_boxes" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boxes_return_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_route_detail_id_vehicle_route_key" ON "vehicle_route_detail"("id_vehicle_route");

-- AddForeignKey
ALTER TABLE "vehicle_route_detail" ADD CONSTRAINT "vehicle_route_detail_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route_money" ADD CONSTRAINT "vehicle_route_money_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route_balance" ADD CONSTRAINT "vehicle_route_balance_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_routes_oil_use" ADD CONSTRAINT "vehicle_routes_oil_use_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_id_control_boxes_fkey" FOREIGN KEY ("id_control_boxes") REFERENCES "control_boxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes_return" ADD CONSTRAINT "boxes_return_id_boxes_fkey" FOREIGN KEY ("id_boxes") REFERENCES "boxes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
