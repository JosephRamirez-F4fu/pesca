-- DropForeignKey
ALTER TABLE "fishing" DROP CONSTRAINT "fishing_id_travel_fkey";

-- AlterTable
ALTER TABLE "fishing" ALTER COLUMN "id_travel" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "fishing" ADD CONSTRAINT "fishing_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
