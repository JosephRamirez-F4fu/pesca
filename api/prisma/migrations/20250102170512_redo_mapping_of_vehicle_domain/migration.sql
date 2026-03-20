/*
  Warnings:

  - You are about to drop the column `id_vehicle` on the `charger_operation` table. All the data in the column will be lost.
  - Added the required column `id_vehicle` to the `vehicle_route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "charger_operation" DROP CONSTRAINT "charger_operation_id_vehicle_fkey";

-- AlterTable
ALTER TABLE "charger_operation" DROP COLUMN "id_vehicle";

-- AlterTable
ALTER TABLE "vehicle_route" ADD COLUMN     "id_vehicle" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicle_route" ADD CONSTRAINT "vehicle_route_id_vehicle_fkey" FOREIGN KEY ("id_vehicle") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
