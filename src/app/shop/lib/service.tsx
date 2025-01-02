import { Shop } from "@/app/shop/lib/model";
import { GenericService } from "@/app/shared/generic/service";

const API = "http://127.0.0.1:8000/api/v1";

export interface IShopService {
  getAllShop(): Promise<Shop[]>;
  getShop(shopId: string): Promise<Shop>;
  createShop(shop: Shop): Promise<Shop>;
  updateShop(shopId: string, shop: Shop): Promise<void>;
  deleteShop(shopId: string): Promise<void>;
}

export class ShopService implements IShopService {
  private shopService: GenericService<Shop>;

  constructor() {
    this.shopService = new GenericService<Shop>();
  }

  async getAllShop(): Promise<Shop[]> {
    const shops = await this.shopService.getAllItems(`${API}/shop`);
    if (!shops.length) {
      throw new Error("No se encontraron negocios");
    }
    return shops;
  }

  async getShop(shopId: string): Promise<Shop> {
    const shop = await this.shopService.getItem(`${API}/shop/${shopId}`);
    if (!shop) {
      throw new Error("No se encontró el negocio");
    }
    return shop;
  }

  async createShop(shop: Shop): Promise<Shop> {
    
    const created_shop = await this.shopService.createItem(`${API}/shop/`, shop);
    
    if (!created_shop) {
      throw new Error("No se pudo crear el negocio");
    }
    return created_shop;
  }

  async updateShop(shopId: string, shop: Shop): Promise<void> {
    const success = await this.shopService.updateItem(`${API}/shop/${shopId}`, shop);
    if (!success) {
      throw new Error("No se pudo actualizar el negocio");
    }
  }

  async deleteShop(shopId: string): Promise<void> {
    const url = `${API}/shop/${shopId}`.toString();
    const success = await this.shopService.deleteItem(url);
    if (!success) {
      throw new Error("No se pudo eliminar el negocio");
    }
  }
}
