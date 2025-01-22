'use client';

import React, { createContext, useContext, useState } from "react";
import { Inventory } from "../types/inventoryType";
import { InventoryService } from "../services/inventoryService";

type InventoryContextType = {
    isCreateFormOpen: boolean;
    openCreateForm: () => void;
    closeCreateForm: () => void;
    inventories: Inventory[];
    fetchInventories: (shopId: string) => Promise<void>;
    addInventory: (newInventory: Inventory) => void;
    updateInventory: (updatedInventory: Inventory) => void;
    deleteInventory: (inventoryId: string) => void;
};

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);    
const inventoryService = new InventoryService();

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [inventories, setInventories] = useState<Inventory[]>([]);

    const openCreateForm = () => setIsCreateFormOpen(true);
    const closeCreateForm = () => setIsCreateFormOpen(false);

    const fetchInventories = async (shopId: string) => {
        try {
            const data = await inventoryService.getAllInventories(shopId);
            setInventories(data);
        } catch (error) {
            console.error("Error al obtener inventarios:", error);
        }
    };

    const addInventory = (newInventory: Inventory) => {
        setInventories((prevInventories) => [...prevInventories, newInventory]);
    };

    const updateInventory = (updatedInventory: Inventory) => {
        setInventories((prev) =>
            prev.map((inventory) => (inventory.id === updatedInventory.id ? updatedInventory : inventory))
        );
    };

    const deleteInventory = (inventoryId: string) => {
        setInventories((prev) => prev.filter((inventory) => inventory.id !== inventoryId));
    };

    return (
        <InventoryContext.Provider value={{
            isCreateFormOpen,
            openCreateForm,
            closeCreateForm,
            inventories,
            fetchInventories,
            addInventory,
            updateInventory,
            deleteInventory,
        }}>
            {children}
        </InventoryContext.Provider>
    );
};

export const useInventory = () => {
    const context = useContext(InventoryContext);
    if (!context) {
        throw new Error("useInventory debe ser usado dentro de un InventoryProvider");
    }
    return context;
};
