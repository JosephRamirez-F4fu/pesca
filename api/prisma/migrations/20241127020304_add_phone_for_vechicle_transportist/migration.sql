/*
  Warnings:

  - Added the required column `phone` to the `vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "phone" TEXT NOT NULL;
