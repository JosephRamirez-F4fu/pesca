/*
  Warnings:

  - You are about to drop the column `id_person` on the `vehicle_routes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vehicle_routes" DROP CONSTRAINT "vehicle_routes_id_person_fkey";

-- AlterTable
ALTER TABLE "vehicle_routes" DROP COLUMN "id_person";
