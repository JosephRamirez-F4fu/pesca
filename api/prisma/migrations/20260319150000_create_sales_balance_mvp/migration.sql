CREATE TABLE "sale_driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_driver_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sale_vehicle" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_vehicle_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sale_balance" (
    "id" SERIAL NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,
    "id_sale_driver" INTEGER NOT NULL,
    "id_sale_vehicle" INTEGER NOT NULL,
    "boxes_arrived" INTEGER NOT NULL DEFAULT 0,
    "boxes_sold" INTEGER NOT NULL DEFAULT 0,
    "boxes_remaining" INTEGER NOT NULL DEFAULT 0,
    "total_weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gross_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "average_weight_per_box" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_balance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "sale_balance_detail" (
    "id" SERIAL NOT NULL,
    "id_sale_balance" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "variation" TEXT,
    "boxes_sold" INTEGER NOT NULL DEFAULT 0,
    "weight_sold" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "unit_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "line_total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sale_balance_detail_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "sale_driver_name_key" ON "sale_driver"("name");
CREATE UNIQUE INDEX "sale_vehicle_code_key" ON "sale_vehicle"("code");
CREATE UNIQUE INDEX "sale_vehicle_plate_key" ON "sale_vehicle"("plate");
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");

ALTER TABLE "sale_balance" ADD CONSTRAINT "sale_balance_id_sale_driver_fkey" FOREIGN KEY ("id_sale_driver") REFERENCES "sale_driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "sale_balance" ADD CONSTRAINT "sale_balance_id_sale_vehicle_fkey" FOREIGN KEY ("id_sale_vehicle") REFERENCES "sale_vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "sale_balance_detail" ADD CONSTRAINT "sale_balance_detail_id_sale_balance_fkey" FOREIGN KEY ("id_sale_balance") REFERENCES "sale_balance"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "sale_balance_detail" ADD CONSTRAINT "sale_balance_detail_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
