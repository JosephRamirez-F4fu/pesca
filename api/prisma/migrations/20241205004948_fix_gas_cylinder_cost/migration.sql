/*
  Warnings:

  - Made the column `gas_cylinder_cost` on table `travel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "travel" ALTER COLUMN "gas_cylinder_cost" SET NOT NULL;
