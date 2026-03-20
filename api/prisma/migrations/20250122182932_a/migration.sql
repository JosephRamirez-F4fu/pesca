/*
  Warnings:

  - You are about to drop the `boxes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `boxes_return` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `control_boxes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "boxes" DROP CONSTRAINT "boxes_id_control_boxes_fkey";

-- DropForeignKey
ALTER TABLE "boxes_return" DROP CONSTRAINT "boxes_return_id_boxes_fkey";

-- DropTable
DROP TABLE "boxes";

-- DropTable
DROP TABLE "boxes_return";

-- DropTable
DROP TABLE "control_boxes";
