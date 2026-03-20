import { api } from "../../core/api";
import type {
  CreateProductDto,
  CreateSaleBalanceDetailDto,
  CreateSaleBalanceDto,
  CreateSaleDriverDto,
  CreateSaleVehicleDto,
  Product,
  SaleBalance,
  SaleBalanceSummary,
  SaleDriver,
  SaleVehicle,
  UpdateProductDto,
  UpdateSaleBalanceDetailDto,
  UpdateSaleBalanceDto,
  UpdateSaleDriverDto,
  UpdateSaleVehicleDto,
} from "../types";

export class SalesService {
  async getDrivers(): Promise<SaleDriver[]> {
    const response = await api.get("/sales/drivers");
    return response.data;
  }

  async createDriver(data: CreateSaleDriverDto): Promise<SaleDriver> {
    const response = await api.post("/sales/drivers", data);
    return response.data;
  }

  async updateDriver(id: number, data: UpdateSaleDriverDto): Promise<SaleDriver> {
    const response = await api.patch(`/sales/drivers/${id}`, data);
    return response.data;
  }

  async getVehicles(): Promise<SaleVehicle[]> {
    const response = await api.get("/sales/vehicles");
    return response.data;
  }

  async createVehicle(data: CreateSaleVehicleDto): Promise<SaleVehicle> {
    const response = await api.post("/sales/vehicles", data);
    return response.data;
  }

  async updateVehicle(
    id: number,
    data: UpdateSaleVehicleDto
  ): Promise<SaleVehicle> {
    const response = await api.patch(`/sales/vehicles/${id}`, data);
    return response.data;
  }

  async getProducts(search?: string): Promise<Product[]> {
    const response = await api.get("/sales/products", {
      params: search?.trim() ? { q: search.trim() } : undefined,
    });
    return response.data;
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    const response = await api.post("/sales/products", data);
    return response.data;
  }

  async updateProduct(id: number, data: UpdateProductDto): Promise<Product> {
    const response = await api.patch(`/sales/products/${id}`, data);
    return response.data;
  }

  async getBalances(): Promise<SaleBalanceSummary[]> {
    const response = await api.get("/sales/balances");
    return response.data;
  }

  async getBalanceById(id: number): Promise<SaleBalance> {
    const response = await api.get(`/sales/balances/${id}`);
    return response.data;
  }

  async createBalance(data: CreateSaleBalanceDto): Promise<SaleBalance> {
    const response = await api.post("/sales/balances", data);
    return response.data;
  }

  async updateBalance(id: number, data: UpdateSaleBalanceDto): Promise<SaleBalance> {
    const response = await api.patch(`/sales/balances/${id}`, data);
    return response.data;
  }

  async deleteBalance(id: number): Promise<{ ok: true }> {
    const response = await api.delete(`/sales/balances/${id}`);
    return response.data;
  }

  async createBalanceDetail(
    balanceId: number,
    data: CreateSaleBalanceDetailDto
  ): Promise<SaleBalance> {
    const response = await api.post(`/sales/balances/${balanceId}/details`, data);
    return response.data;
  }

  async updateBalanceDetail(
    balanceId: number,
    detailId: number,
    data: UpdateSaleBalanceDetailDto
  ): Promise<SaleBalance> {
    const response = await api.patch(
      `/sales/balances/${balanceId}/details/${detailId}`,
      data
    );
    return response.data;
  }

  async deleteBalanceDetail(balanceId: number, detailId: number): Promise<SaleBalance> {
    const response = await api.delete(
      `/sales/balances/${balanceId}/details/${detailId}`
    );
    return response.data;
  }
}

export const salesService = new SalesService();
