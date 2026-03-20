export interface SaleDriver {
  id: number;
  name: string;
  phone: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SaleVehicle {
  id: number;
  code: string;
  plate: string;
  description: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  name: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SaleBalanceDetail {
  id: number;
  id_product: number;
  product_name: string;
  variation: string | null;
  boxes_sold: number;
  weight_sold: number;
  unit_price: number;
  line_total: number;
  createdAt: string;
  updatedAt: string;
}

export interface SaleBalanceSummary {
  id: number;
  sale_date: string;
  boxes_arrived: number;
  boxes_sold: number;
  empty_boxes: number;
  calculated_boxes_sold: number;
  boxes_remaining: number;
  total_weight: number;
  gross_total: number;
  average_weight_per_box: number;
  notes: string | null;
  status: "draft" | "closed";
  createdAt: string;
  updatedAt: string;
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
}

export interface SaleBalance extends SaleBalanceSummary {
  details: SaleBalanceDetail[];
}

export interface CreateSaleDriverDto {
  name: string;
  phone?: string;
}

export interface UpdateSaleDriverDto extends CreateSaleDriverDto {
  is_active: boolean;
}

export interface CreateSaleVehicleDto {
  code: string;
  plate: string;
  description?: string;
}

export interface UpdateSaleVehicleDto extends CreateSaleVehicleDto {
  is_active: boolean;
}

export interface CreateProductDto {
  name: string;
}

export interface UpdateProductDto extends CreateProductDto {
  is_active: boolean;
}

export interface CreateSaleBalanceDto {
  sale_date: string;
  id_sale_driver: number;
  id_sale_vehicle: number;
  boxes_arrived: number;
  boxes_sold: number;
  empty_boxes?: number;
  notes?: string;
}

export interface UpdateSaleBalanceDto extends CreateSaleBalanceDto {
  status: "draft" | "closed";
}

export interface CreateSaleBalanceDetailDto {
  id_product: number;
  variation?: string | null;
  boxes_sold?: number;
  weight_sold: number;
  unit_price: number;
}

export type UpdateSaleBalanceDetailDto = CreateSaleBalanceDetailDto;
