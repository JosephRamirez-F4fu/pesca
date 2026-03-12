-- AlterTable
ALTER TABLE "charger_operation" ADD COLUMN     "date_canceled" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "other_cost_travel" ADD COLUMN     "is_added" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "travel" ADD COLUMN     "fishing_date_canceled" TIMESTAMP(3),
ADD COLUMN     "is_concluded" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oil_date_canceled" TIMESTAMP(3),
ADD COLUMN     "oil_remaining" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "oil_vehicle" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "oil_vehicle_date_canceled" TIMESTAMP(3),
ADD COLUMN     "oil_vehicle_price" DOUBLE PRECISION NOT NULL DEFAULT 0;
