import { Shop } from "@/app/shop/lib/model";
import { GenericService } from "@/shared/generic/service";

const API = "http://127.0.0.1:8000/api/v1";

export interface IShopService {
    getAllShop(): Promise<Shop[]>;
    getShop(shopId: string): Promise<Shop>;
    createShop(formData: FormData): Promise<Shop>;
    updateShop(updatedShop: Shop): Promise<Shop>;
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

    async updateShop(updatedShop: Shop): Promise<Shop> {
        if (!updatedShop.id) {
            throw new Error("El ID de la tienda es obligatorio para actualizarla.");
        }

        const formData = new FormData();

        // Agrega los campos al FormData
        Object.entries(updatedShop).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value as any);
            }
        });

        // Realiza la solicitud PUT o PATCH
        const url = this.getShopUrl(updatedShop.id)
        const response = await fetch(url, {
            method: "PATCH", // Usa PATCH si solo deseas actualizar campos específicos
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error al actualizar la tienda. Revisa la información enviada.");
        }

        // Devuelve la tienda actualizada
        return response.json();
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
