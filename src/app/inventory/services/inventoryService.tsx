import { GenericService } from "@/shared/generic/service";
import { Inventory } from "../types/inventoryType";
import API from "@/core/api";

export interface IInventoryService {
    getAllInventories(shopId: string): Promise<Inventory[]>;
    getInventory(shopId: string, inventoryId: string): Promise<Inventory>;
    createInventory(shopId: string, inventory: Inventory): Promise<Inventory>;
    updateInventory(shopId: string, inventoryId: string, inventory: Inventory): Promise<void>;
    deleteInventory(shopId: string, inventoryId: string): Promise<void>;
}

export class InventoryService implements IInventoryService {
    private inventoryService: GenericService<Inventory>;
    static getAllInventories: any;

    constructor() {
        this.inventoryService = new GenericService<Inventory>();
    }

    private getInventoryUrl(inventoryId?: string): string {
        return inventoryId ? `${API}/inventory/${inventoryId}/` : `${API}/inventory/`;
    }

    async getAllInventories(shopId: string): Promise<Inventory[]> {
        const inventories = await this.inventoryService.getAllItems(this.getInventoryUrl());
        if (inventories) {
            const shop_inventories: Inventory[] = inventories.filter((inventory) => inventory.shop == shopId)
            return shop_inventories;
        } else {
            throw new Error("No se encontraron inventarios");
        }
    }

    async getInventory(shopId?: string, inventoryId?: string): Promise<Inventory> {
        const inventory = await this.inventoryService.getItem(this.getInventoryUrl(inventoryId));
        if (inventory && inventory.shop == shopId) {
            return inventory;
        } else {
            throw new Error("No se encontró inventario para este negocio");
        }
    }

    async createInventory(shopId: string, inventory: Inventory): Promise<Inventory> {
        inventory.shop = shopId;
        if (inventory.shop != shopId) {
            throw new Error("Error agregando inventario a este negocio");
        }
        const created_inventory = await this.inventoryService.createItem(this.getInventoryUrl(), inventory);

        if (!created_inventory) {
            throw new Error("No se puedo crear el inventario");
        }
        return created_inventory;
    }

    async updateInventory(shopId: string, inventoryId: string, inventory: Inventory): Promise<void> {
        await this.getInventory(shopId, inventoryId); // Verifica que el inventario exista
        const success = await this.inventoryService.updateItem(this.getInventoryUrl(inventoryId), inventory);

        if (!success) {
            throw new Error("No se pudo actualizar el inventario");
        }
    }

    async deleteInventory(shopId: string, inventoryId: string): Promise<void> {
        await this.getInventory(shopId, inventoryId);
        const success = await this.inventoryService.deleteItem(this.getInventoryUrl(inventoryId));

        if (!success) {
            throw new Error("No se pudo eliminar el inventario");
        }
    }
}