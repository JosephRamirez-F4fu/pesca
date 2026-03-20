/*
  Warnings:

  - Made the column `id_travel` on table `fishing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "fishing" DROP CONSTRAINT "fishing_id_travel_fkey";

-- AlterTable
ALTER TABLE "fishing" ALTER COLUMN "id_travel" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "fishing" ADD CONSTRAINT "fishing_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
