-- AlterTable
ALTER TABLE "travel" ADD COLUMN     "id_boat" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "travel" ADD CONSTRAINT "travel_id_boat_fkey" FOREIGN KEY ("id_boat") REFERENCES "boat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
