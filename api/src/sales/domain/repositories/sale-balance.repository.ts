import { Prisma } from "@prisma/client";
import { db } from "../../../core/config/db";
import {
  badRequest,
  notFound,
} from "../../../shared/domain/errors/http.error";
import {
  SaleBalanceCreateBody,
  SaleBalanceDetailCreateBody,
  SaleBalanceDetailUpdateBody,
  SaleBalanceUpdateBody,
} from "../../presentation/sales.schemas";

type SaleBalanceDetailRecord = {
  id: number;
  id_product: number;
  variation: string | null;
  boxes_sold: number;
  weight_sold: number;
  unit_price: number;
  line_total: number;
  createdAt: Date;
  updatedAt: Date;
  product: {
    id: number;
    name: string;
  };
};

type SaleBalanceRecord = {
  id: number;
  sale_date: Date;
  boxes_arrived: number;
  boxes_sold: number;
  empty_boxes: number;
  boxes_remaining: number;
  total_weight: number;
  gross_total: number;
  average_weight_per_box: number;
  notes: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  driver: {
    id: number;
    name: string;
  };
  vehicle: {
    id: number;
    code: string;
    plate: string;
    description: string | null;
  };
  details?: SaleBalanceDetailRecord[];
};

const detailInclude = {
  product: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;

const balanceInclude = {
  driver: {
    select: {
      id: true,
      name: true,
    },
  },
  vehicle: {
    select: {
      id: true,
      code: true,
      plate: true,
      description: true,
    },
  },
  details: {
    include: detailInclude,
    orderBy: {
      createdAt: "asc",
    },
  },
} as const;

type TxClient = Prisma.TransactionClient;

export class SaleBalanceRepository {
  private toLineTotal(detail: { weight_sold: number; unit_price: number }) {
    return Number((detail.weight_sold * detail.unit_price).toFixed(2));
  }

  private mapDetail(detail: SaleBalanceDetailRecord) {
    return {
      id: detail.id,
      id_product: detail.id_product,
      product_name: detail.product.name,
      variation: detail.variation,
      boxes_sold: detail.boxes_sold,
      weight_sold: detail.weight_sold,
      unit_price: detail.unit_price,
      line_total: detail.line_total,
      createdAt: detail.createdAt,
      updatedAt: detail.updatedAt,
    };
  }

  private mapBalance(balance: SaleBalanceRecord) {
    const calculatedBoxesSold =
      balance.details?.reduce((sum, detail) => sum + detail.boxes_sold, 0) ?? 0;

    return {
      id: balance.id,
      sale_date: balance.sale_date,
      boxes_arrived: balance.boxes_arrived,
      boxes_sold: balance.boxes_sold,
      empty_boxes: balance.empty_boxes,
      calculated_boxes_sold: calculatedBoxesSold,
      boxes_remaining: balance.boxes_remaining,
      total_weight: balance.total_weight,
      gross_total: balance.gross_total,
      average_weight_per_box: balance.average_weight_per_box,
      notes: balance.notes,
      status: balance.status,
      createdAt: balance.createdAt,
      updatedAt: balance.updatedAt,
      driver: balance.driver,
      vehicle: balance.vehicle,
      details: balance.details?.map((detail) => this.mapDetail(detail)) ?? [],
    };
  }

  private async ensureHeaderReferences(
    id_sale_driver: number,
    id_sale_vehicle: number
  ) {
    const [driver, vehicle] = await Promise.all([
      db.sale_driver.findUnique({ where: { id: id_sale_driver } }),
      db.sale_vehicle.findUnique({ where: { id: id_sale_vehicle } }),
    ]);

    if (!driver || !driver.is_active) {
      throw badRequest("Sale driver is not available.");
    }

    if (!vehicle || !vehicle.is_active) {
      throw badRequest("Sale vehicle is not available.");
    }
  }

  private async recalculate(tx: TxClient, balanceId: number) {
    const balance = await tx.sale_balance.findUnique({
      where: { id: balanceId },
      include: {
        details: true,
      },
    });

    if (!balance) {
      throw notFound("Sale balance not found.");
    }

    const totalWeight = balance.details.reduce(
      (sum, detail) => sum + detail.weight_sold,
      0
    );
    const grossTotal = Number(
      balance.details.reduce((sum, detail) => sum + detail.line_total, 0).toFixed(2)
    );
    const boxesRemaining =
      balance.boxes_arrived - balance.boxes_sold - balance.empty_boxes;

    if (boxesRemaining < 0) {
      throw badRequest(
        "Boxes sold plus empty boxes cannot exceed boxes arrived."
      );
    }

    const averageWeightPerBox =
      balance.boxes_sold > 0
        ? Number((totalWeight / balance.boxes_sold).toFixed(4))
        : 0;

    await tx.sale_balance.update({
      where: { id: balanceId },
      data: {
        boxes_remaining: boxesRemaining,
        total_weight: Number(totalWeight.toFixed(4)),
        gross_total: grossTotal,
        average_weight_per_box: averageWeightPerBox,
      },
    });
  }

  async create(data: SaleBalanceCreateBody) {
    await this.ensureHeaderReferences(data.id_sale_driver, data.id_sale_vehicle);

    if (data.boxes_sold + (data.empty_boxes ?? 0) > data.boxes_arrived) {
      throw badRequest(
        "Boxes sold plus empty boxes cannot exceed boxes arrived."
      );
    }

    const created = await db.sale_balance.create({
      data: {
        sale_date: data.sale_date,
        id_sale_driver: data.id_sale_driver,
        id_sale_vehicle: data.id_sale_vehicle,
        boxes_arrived: data.boxes_arrived,
        boxes_sold: data.boxes_sold,
        empty_boxes: data.empty_boxes ?? 0,
        boxes_remaining:
          data.boxes_arrived - data.boxes_sold - (data.empty_boxes ?? 0),
        notes: data.notes?.trim() || null,
      },
      include: balanceInclude,
    });

    return this.mapBalance(created as SaleBalanceRecord);
  }

  async findAll() {
    const balances = await db.sale_balance.findMany({
      include: {
        driver: balanceInclude.driver,
        vehicle: balanceInclude.vehicle,
        details: {
          select: {
            boxes_sold: true,
          },
        },
      },
      orderBy: [{ sale_date: "desc" }, { id: "desc" }],
    });

    return balances.map((balance) => ({
      id: balance.id,
      sale_date: balance.sale_date,
      boxes_arrived: balance.boxes_arrived,
      boxes_sold: balance.boxes_sold,
      empty_boxes: balance.empty_boxes,
      calculated_boxes_sold: balance.details.reduce(
        (sum, detail) => sum + detail.boxes_sold,
        0
      ),
      boxes_remaining: balance.boxes_remaining,
      total_weight: balance.total_weight,
      gross_total: balance.gross_total,
      average_weight_per_box: balance.average_weight_per_box,
      notes: balance.notes,
      status: balance.status,
      createdAt: balance.createdAt,
      updatedAt: balance.updatedAt,
      driver: balance.driver,
      vehicle: balance.vehicle,
    }));
  }

  async findById(id: number) {
    const balance = await db.sale_balance.findUnique({
      where: { id },
      include: balanceInclude,
    });

    if (!balance) {
      throw notFound("Sale balance not found.");
    }

    return this.mapBalance(balance as SaleBalanceRecord);
  }

  async update(id: number, data: SaleBalanceUpdateBody) {
    await this.ensureHeaderReferences(data.id_sale_driver, data.id_sale_vehicle);

    if (data.boxes_sold + (data.empty_boxes ?? 0) > data.boxes_arrived) {
      throw badRequest(
        "Boxes sold plus empty boxes cannot exceed boxes arrived."
      );
    }

    await db.$transaction(async (tx) => {
      const existing = await tx.sale_balance.findUnique({ where: { id } });

      if (!existing) {
        throw notFound("Sale balance not found.");
      }

      await tx.sale_balance.update({
        where: { id },
        data: {
          sale_date: data.sale_date,
          id_sale_driver: data.id_sale_driver,
          id_sale_vehicle: data.id_sale_vehicle,
          boxes_arrived: data.boxes_arrived,
          boxes_sold: data.boxes_sold,
          empty_boxes: data.empty_boxes ?? 0,
          notes: data.notes?.trim() || null,
          status: data.status,
        },
      });

      await this.recalculate(tx, id);
    });

    return this.findById(id);
  }

  async delete(id: number) {
    const existing = await db.sale_balance.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      throw notFound("Sale balance not found.");
    }

    await db.sale_balance.delete({
      where: { id },
    });

    return {
      ok: true,
    };
  }

  async createDetail(balanceId: number, data: SaleBalanceDetailCreateBody) {
    return db.$transaction(async (tx) => {
      const balance = await tx.sale_balance.findUnique({
        where: { id: balanceId },
      });

      if (!balance) {
        throw notFound("Sale balance not found.");
      }

      const product = await tx.product.findUnique({
        where: { id: data.id_product },
      });

      if (!product || !product.is_active) {
        throw badRequest("Product is not available.");
      }

      await tx.sale_balance_detail.create({
        data: {
          id_sale_balance: balanceId,
          id_product: data.id_product,
          variation: data.variation?.trim() || null,
          boxes_sold: data.boxes_sold,
          weight_sold: data.weight_sold,
          unit_price: data.unit_price,
          line_total: this.toLineTotal(data),
        },
      });

      await this.recalculate(tx, balanceId);

      const updated = await tx.sale_balance.findUnique({
        where: { id: balanceId },
        include: balanceInclude,
      });

      if (!updated) {
        throw notFound("Sale balance not found.");
      }

      return this.mapBalance(updated as SaleBalanceRecord);
    });
  }

  async updateDetail(
    balanceId: number,
    detailId: number,
    data: SaleBalanceDetailUpdateBody
  ) {
    return db.$transaction(async (tx) => {
      const detail = await tx.sale_balance_detail.findUnique({
        where: { id: detailId },
      });

      if (!detail || detail.id_sale_balance !== balanceId) {
        throw notFound("Sale balance detail not found.");
      }

      const product = await tx.product.findUnique({
        where: { id: data.id_product },
      });

      if (!product || !product.is_active) {
        throw badRequest("Product is not available.");
      }

      await tx.sale_balance_detail.update({
        where: { id: detailId },
        data: {
          id_product: data.id_product,
          variation: data.variation?.trim() || null,
          boxes_sold: data.boxes_sold,
          weight_sold: data.weight_sold,
          unit_price: data.unit_price,
          line_total: this.toLineTotal(data),
        },
      });

      await this.recalculate(tx, balanceId);

      const updated = await tx.sale_balance.findUnique({
        where: { id: balanceId },
        include: balanceInclude,
      });

      if (!updated) {
        throw notFound("Sale balance not found.");
      }

      return this.mapBalance(updated as SaleBalanceRecord);
    });
  }

  async deleteDetail(balanceId: number, detailId: number) {
    return db.$transaction(async (tx) => {
      const detail = await tx.sale_balance_detail.findUnique({
        where: { id: detailId },
      });

      if (!detail || detail.id_sale_balance !== balanceId) {
        throw notFound("Sale balance detail not found.");
      }

      await tx.sale_balance_detail.delete({
        where: { id: detailId },
      });

      await this.recalculate(tx, balanceId);

      const updated = await tx.sale_balance.findUnique({
        where: { id: balanceId },
        include: balanceInclude,
      });

      if (!updated) {
        throw notFound("Sale balance not found.");
      }

      return this.mapBalance(updated as SaleBalanceRecord);
    });
  }
}
