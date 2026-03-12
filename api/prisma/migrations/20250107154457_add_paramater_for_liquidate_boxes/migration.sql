/*
  Warnings:

  - Added the required column `hasLiquid` to the `boxes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "boxes" DROP CONSTRAINT "boxes_id_control_boxes_fkey";

-- DropForeignKey
ALTER TABLE "boxes_return" DROP CONSTRAINT "boxes_return_id_boxes_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_route_balance" DROP CONSTRAINT "vehicle_route_balance_id_vehicle_route_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_route_detail" DROP CONSTRAINT "vehicle_route_detail_id_vehicle_route_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_route_money" DROP CONSTRAINT "vehicle_route_money_id_vehicle_route_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_route_other_cost" DROP CONSTRAINT "vehicle_route_other_cost_id_vehicle_route_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_routes" DROP CONSTRAINT "vehicle_routes_id_route_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_routes" DROP CONSTRAINT "vehicle_routes_id_vehicle_route_fkey";

-- DropForeignKey
ALTER TABLE "vehicle_routes_oil_use" DROP CONSTRAINT "vehicle_routes_oil_use_id_vehicle_route_fkey";

-- AlterTable
ALTER TABLE "boxes" ADD COLUMN     "hasLiquid" BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE "vehicle_route_detail" ADD CONSTRAINT "vehicle_route_detail_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route_money" ADD CONSTRAINT "vehicle_route_money_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route_balance" ADD CONSTRAINT "vehicle_route_balance_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_routes" ADD CONSTRAINT "vehicle_routes_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_routes" ADD CONSTRAINT "vehicle_routes_id_route_fkey" FOREIGN KEY ("id_route") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_route_other_cost" ADD CONSTRAINT "vehicle_route_other_cost_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle_routes_oil_use" ADD CONSTRAINT "vehicle_routes_oil_use_id_vehicle_route_fkey" FOREIGN KEY ("id_vehicle_route") REFERENCES "vehicle_route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_id_control_boxes_fkey" FOREIGN KEY ("id_control_boxes") REFERENCES "control_boxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes_return" ADD CONSTRAINT "boxes_return_id_boxes_fkey" FOREIGN KEY ("id_boxes") REFERENCES "boxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
