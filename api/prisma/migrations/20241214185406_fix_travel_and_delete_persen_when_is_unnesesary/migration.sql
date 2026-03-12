/*
  Warnings:

  - You are about to drop the column `id_person` on the `charger_operation` table. All the data in the column will be lost.
  - You are about to drop the column `id_person` on the `other_cost_charger_operation` table. All the data in the column will be lost.
  - You are about to drop the column `id_boat` on the `travel` table. All the data in the column will be lost.
  - You are about to drop the column `id_person` on the `travel` table. All the data in the column will be lost.
  - You are about to drop the `boat` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `travel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `travel_cost` to the `charger_operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `travel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "charger_operation" DROP CONSTRAINT "charger_operation_id_person_fkey";

-- DropForeignKey
ALTER TABLE "other_cost_charger_operation" DROP CONSTRAINT "other_cost_charger_operation_id_person_fkey";

-- DropForeignKey
ALTER TABLE "other_cost_travel" DROP CONSTRAINT "other_cost_travel_id_person_fkey";

-- DropForeignKey
ALTER TABLE "travel" DROP CONSTRAINT "travel_id_boat_fkey";

-- DropForeignKey
ALTER TABLE "travel" DROP CONSTRAINT "travel_id_person_fkey";

-- AlterTable
ALTER TABLE "charger_operation" DROP COLUMN "id_person",
ADD COLUMN     "travel_cost" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "other_cost_charger_operation" DROP COLUMN "id_person";

-- AlterTable
ALTER TABLE "travel" DROP COLUMN "id_boat",
DROP COLUMN "id_person",
ADD COLUMN     "code" TEXT NOT NULL,
ALTER COLUMN "oil_charge" SET DEFAULT 0,
ALTER COLUMN "oil_charger_price" SET DEFAULT 0,
ALTER COLUMN "oil_consume" SET DEFAULT 0,
ALTER COLUMN "oil_consume_price" SET DEFAULT 0,
ALTER COLUMN "oil_current" SET DEFAULT 0,
ALTER COLUMN "provisions_cost" SET DEFAULT 0;

-- DropTable
DROP TABLE "boat";

-- CreateIndex
CREATE UNIQUE INDEX "travel_code_key" ON "travel"("code");
