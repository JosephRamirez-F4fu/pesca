-- AlterTable
ALTER TABLE "vehicle_route_detail" ADD COLUMN     "id_next_route" INTEGER;

-- AddForeignKey
ALTER TABLE "vehicle_route_detail" ADD CONSTRAINT "vehicle_route_detail_id_next_route_fkey" FOREIGN KEY ("id_next_route") REFERENCES "vehicle_route_detail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
