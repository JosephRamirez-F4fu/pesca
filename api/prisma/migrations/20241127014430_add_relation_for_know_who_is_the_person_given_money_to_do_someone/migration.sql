/*
  Warnings:

  - Added the required column `id_person` to the `charger_operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_person` to the `other_cost_charger_operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_person` to the `other_cost_travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_person` to the `travel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_person` to the `vehicle_route_other_cost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_person` to the `vehicle_routes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charger_operation" ADD COLUMN     "id_person" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "other_cost_charger_operation" ADD COLUMN     "id_person" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "other_cost_travel" ADD COLUMN     "id_person" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "travel" ADD COLUMN     "id_person" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_route_other_cost" ADD COLUMN     "id_person" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vehicle_routes" ADD COLUMN     "id_person" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "other_cost_travel" ADD CONSTRAINT "other_cost_travel_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charger_operation" ADD CONSTRAINT "charger_operation_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "other_cost_charger_operation" ADD CONSTRAINT "other_cost_charger_operation_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_routes" ADD CONSTRAINT "vehicle_routes_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route_other_cost" ADD CONSTRAINT "vehicle_route_other_cost_id_person_fkey" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
