import { Shop } from "@/app/shop/lib/model";
import { GenericService } from "@/app/shared/generic/service";

const API = "http://127.0.0.1:8000/api/v1";

export interface IShopService {
    getAllShop(): Promise<Shop[]>;
    getShop(shopId: string): Promise<Shop>;
    createShop(formData: FormData): Promise<Shop>;
    updateShop(shopId: string, shop: Shop): Promise<void>;
    deleteShop(shopId: string): Promise<void>;
}

export class ShopService implements IShopService {
    private shopService: GenericService<Shop>;

    constructor() {
        this.shopService = new GenericService<Shop>();
    }

    // Utility to generate the full API URL
    private getShopUrl(shopId?: string): string {
        return shopId ? `${API}/shop/${shopId}/` : `${API}/shop/`;
    }

    async getAllShop(): Promise<Shop[]> {
        try {
            const shops = await this.shopService.getAllItems(this.getShopUrl());
            if (shops.length === 0) {
                throw new Error("No se encontraron negocios.");
            }
            return shops;
        } catch (error) {
            throw new Error(`Error al obtener los negocios: ${error instanceof Error ? error.message : "Desconocido"}`);
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

    async updateShop(shopId: string, shop: Shop): Promise<void> {
        try {
            const success = await this.shopService.updateItem(this.getShopUrl(shopId), shop);
            if (!success) {
                throw new Error("No se pudo actualizar el negocio.");
            }
        } catch (error) {
            throw new Error(`Error al actualizar el negocio: ${error instanceof Error ? error.message : "Desconocido"}`);
        }
    }

    // async updateShop(formData: FormData, shopId: string ): Promise<boolean> {
    //     try {
    //         const response = await fetch(this.getShopUrl(shopId), {
    //             method: "PUT",
    //             body: formData,
    //         });

    //         if (!response.ok) {
    //             throw new Error("Error en la solicitud de actualización");
    //         }
    //         return true; 
    //     } catch (error) {
    //         console.error("Error al actualizar el item:", error);
    //         return false;
    //     }
    // }

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
