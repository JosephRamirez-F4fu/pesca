/*
  Warnings:

  - You are about to drop the column `amount` on the `loan_detail` table. All the data in the column will be lost.
  - You are about to drop the column `capacity` on the `vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `id_vehicle` on the `vehicle_route` table. All the data in the column will be lost.
  - Added the required column `boxes` to the `charger_operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `charger_operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_charge_operation` to the `loan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mount` to the `loan_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_charge_operation` to the `vehicle_route` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vehicle_route" DROP CONSTRAINT "vehicle_route_id_vehicle_fkey";

-- AlterTable
ALTER TABLE "charger_operation" ADD COLUMN     "boxes" INTEGER NOT NULL,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "loan" ADD COLUMN     "id_charge_operation" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "loan_detail" DROP COLUMN "amount",
ADD COLUMN     "mount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "vehicle" DROP COLUMN "capacity";

-- AlterTable
ALTER TABLE "vehicle_route" DROP COLUMN "id_vehicle",
ADD COLUMN     "id_charge_operation" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicle_route" ADD CONSTRAINT "vehicle_route_id_charge_operation_fkey" FOREIGN KEY ("id_charge_operation") REFERENCES "charger_operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_id_charge_operation_fkey" FOREIGN KEY ("id_charge_operation") REFERENCES "charger_operation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
