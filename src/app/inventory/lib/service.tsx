import { GenericService } from "@/app/shared/generic/service";
import { Inventory } from "./model";

const API = "http://127.0.0.1:8000/api/v1";

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

    async getAllInventories(shopId: string): Promise<Inventory[]> {
        const inventories = await this.inventoryService.getAllItems(`${API}/inventory`);
        if (!inventories.length) {
            throw new Error("No se encontraron inventarios");
        }

        const shop_inventories: Inventory[] = inventories.filter((inventory) => inventory.shop == shopId)
        return shop_inventories;
    }

    async getInventory(shopId?: string, inventoryId?: string): Promise<Inventory> {
        const inventory = await this.inventoryService.getItem(`${API}/inventory/${inventoryId}`);
        if (!inventory) {
            throw new Error("No se encontró el inventario");
        }

        if (inventory.shop != shopId) throw new Error("No se encontró inventario para este negocio");
        return inventory;
    }

    async createInventory(shopId: string, inventory: Inventory): Promise<Inventory> {
        inventory.shop = shopId;
        if (inventory.shop != shopId) {
            throw new Error("Error agregando inventario a este negocio");
        }
        const created_inventory = await this.inventoryService.createItem(`${API}/inventory/`, inventory);

        if (!created_inventory) {
            throw new Error("No se puedo crear el inventario");
        }
        return created_inventory;
    }

    async updateInventory(shopId: string, inventoryId: string, inventory: Inventory): Promise<void> {
        await this.getInventory(shopId, inventoryId); // Verifica que el inventario exista
        const success = await this.inventoryService.updateItem(`${API}/inventory/${inventoryId}/`, inventory);

        if (!success) {
            throw new Error("No se pudo actualizar el inventario");
        }
    }

    async deleteInventory(shopId: string, inventoryId: string ): Promise<void> {
        await this.getInventory(shopId, inventoryId); // Verifica que el inventario exista
        const success = await this.inventoryService.deleteItem(`${API}/inventory/${inventoryId}/`);

        if (!success) {
            throw new Error("No se pudo eliminar el inventario");
        }
    }
}