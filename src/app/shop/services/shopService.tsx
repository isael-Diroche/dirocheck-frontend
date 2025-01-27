import { GenericService } from "@/shared/generic/service";
import { Shop } from "@/app/shop/types/shopType";
import API from "@/core/api";

export interface IShopService {
    getAllShops(): Promise<Shop[]>;
    getShop(shopId: string): Promise<Shop>;
    createShop(formData: FormData): Promise<Shop>;
    updateShop(formData: FormData, shopId: string): Promise<Shop>;
    deleteShop(shopId: string): Promise<void>;
}

export class ShopService implements IShopService {
    private shopService: GenericService<Shop>;
    static getAllShops: any;

    constructor() {
        this.shopService = new GenericService<Shop>();
    }

    // Utility to generate the full API URL
    private getShopUrl(shopId?: string): string {
        return shopId ? `${API}/shop/${shopId}/` : `${API}/shop/`;
    }

    async getAllShops(): Promise<Shop[]> {
        const shops = await this.shopService.getAllItems(this.getShopUrl());
        if (shops) {
            return shops;
        } else {
            throw new Error("No se encontraron negocios.");
        }
    }

    async getShop(shopId: string): Promise<Shop> {
        try {
            const shop = await this.shopService.getItem(this.getShopUrl(shopId));
            if (!shop) {
                throw new Error("No se encontró el negocio.");
            }
            return shop;
        } catch (error) {
            throw new Error(`Error al obtener el negocio: ${error instanceof Error ? error.message : "Desconocido"}`);
        }
    }

    async createShop(formData: FormData): Promise<Shop> {
        const response = await fetch(this.getShopUrl(), {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error creando la tienda');
        }
        return response.json(); // Asumiendo que el backend devuelve los datos de la tienda creada
    }

    async updateShop(formData: FormData, shopId: string): Promise<Shop> {
        const response = await fetch(this.getShopUrl(shopId), {
            method: 'PUT',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Error editando la tienda');
        }
        return response.json(); // Asumiendo que el backend devuelve los datos de la tienda creada
    }


    async deleteShop(shopId: string): Promise<void> {
        try {
            const success = await this.shopService.deleteItem(this.getShopUrl(shopId));
            if (!success) {
                throw new Error("No se pudo eliminar el negocio.");
            }
        } catch (error) {
            throw new Error(`Error al eliminar el negocio: ${error instanceof Error ? error.message : "Desconocido"}`);
        }
    }
}
