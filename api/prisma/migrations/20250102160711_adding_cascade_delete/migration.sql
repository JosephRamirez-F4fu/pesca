/*
  Warnings:

  - You are about to drop the column `assigned` on the `travel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "charger_operation" DROP CONSTRAINT "charger_operation_id_travel_fkey";

-- DropForeignKey
ALTER TABLE "fishing" DROP CONSTRAINT "fishing_id_travel_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_id_user_fkey";

-- DropForeignKey
ALTER TABLE "other_cost_charger_operation" DROP CONSTRAINT "other_cost_charger_operation_id_charger_operation_fkey";

-- DropForeignKey
ALTER TABLE "other_cost_travel" DROP CONSTRAINT "other_cost_travel_id_travel_fkey";

-- DropIndex
DROP INDEX "travel_code_key";

-- AlterTable
ALTER TABLE "travel" DROP COLUMN "assigned";

-- AddForeignKey
ALTER TABLE "other_cost_travel" ADD CONSTRAINT "other_cost_travel_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fishing" ADD CONSTRAINT "fishing_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charger_operation" ADD CONSTRAINT "charger_operation_id_travel_fkey" FOREIGN KEY ("id_travel") REFERENCES "travel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "other_cost_charger_operation" ADD CONSTRAINT "other_cost_charger_operation_id_charger_operation_fkey" FOREIGN KEY ("id_charger_operation") REFERENCES "charger_operation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
