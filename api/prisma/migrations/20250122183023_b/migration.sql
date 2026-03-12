-- CreateTable
CREATE TABLE "control_boxes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "date_arrive" TIMESTAMP(3) NOT NULL,
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "control_boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "control_place" (
    "id" SERIAL NOT NULL,
    "id_control_boxes" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date_arrive" TIMESTAMP(3) NOT NULL,
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "hasLiquid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "control_place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boxes" (
    "id" SERIAL NOT NULL,
    "id_control_place" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boxes_return" (
    "id" SERIAL NOT NULL,
    "id_boxes" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "boxes_return_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "control_place" ADD CONSTRAINT "control_place_id_control_boxes_fkey" FOREIGN KEY ("id_control_boxes") REFERENCES "control_boxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes" ADD CONSTRAINT "boxes_id_control_place_fkey" FOREIGN KEY ("id_control_place") REFERENCES "control_place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boxes_return" ADD CONSTRAINT "boxes_return_id_boxes_fkey" FOREIGN KEY ("id_boxes") REFERENCES "boxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
