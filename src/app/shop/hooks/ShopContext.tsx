'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ShopService } from '../services/shopService';
import { Shop } from '../types/shopType';

interface ShopContextType {
    shop: Shop | null;
    shops: Shop[];
    fetchShop: (shopId: string) => Promise<void>;
    fetchShops: () => Promise<void>;
    addShopStatus: (newShop: Shop) => void;
    updateShopStatus: (updatedShop: Shop) => void;
    deleteShopStatus: (shopId: string) => void;
    isCreateFormOpen: boolean;
    openCreateForm: () => void;
    closeCreateForm: () => void;
    isUpdateFormOpen: boolean;
    updateFormStates: Record<string, boolean>;
    openUpdateForm: (shopId: string) => void;
    closeUpdateForm: (shopId: string) => void;

    isDeleting: boolean;
    setIsDeleting: (isDeleting: boolean) => void;

    deleteFormStates: Record<string, boolean>;
    openDeleteDialog: (shopId: string) => void;
    closeDeleteDialog: (shopId: string) => void;
}

const shopService = new ShopService();
const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [shop, setShop] = useState<Shop | null>(null);
    const [shops, setShops] = useState<Shop[]>([]);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
    const openCreateForm = () => setIsCreateFormOpen(true);
    const closeCreateForm = () => setIsCreateFormOpen(false);

    const [isDeleting, setIsDeleting] = useState(false)

    const [deleteFormStates, setDeleteFormStates] = useState<Record<string, boolean>>({});

    const openDeleteDialog = (shopId: string) => {
        setUpdateFormStates((prev) => ({ ...prev, [shopId]: false })); // Cerrar el formulario de edición si está abierto
        setDeleteFormStates((prev) => ({ ...prev, [shopId]: true })); // Abrir el diálogo de confirmación de eliminación
    };

    const closeDeleteDialog = (shopId: string) => {
        setDeleteFormStates((prev) => ({ ...prev, [shopId]: false }));
    };

    const [updateFormStates, setUpdateFormStates] = useState<Record<string, boolean>>({});

    const openUpdateForm = (shopId: string) => {
        setUpdateFormStates((prev) => ({ ...prev, [shopId]: true }));
    };

    const closeUpdateForm = (shopId: string) => {
        setUpdateFormStates((prev) => ({ ...prev, [shopId]: false }));
    };

    const fetchShops = async () => {
        try {
            const data = await shopService.getAllShops();
            setShops(data);
        } catch (error) {
            console.error("Error al obtener los negocios desde el context:", error);
        }
    };

    const fetchShop = async (shopId: string) => {
        try {
            const data = await shopService.getShop(shopId);
            setShop(data);
        } catch (error) {
            console.error("Error obteniendo negocio:", error);
        }
    };

    const addShopStatus = (newShop: Shop) => {
        setShops((prevShops) => [...prevShops, newShop]);
    };

    const updateShopStatus = async (updatedShop: Shop) => {
        // Actualizar el estado con el negocio modificado
        setShops(prevShops =>
            prevShops.map(shop => (shop.id === updatedShop.id ? updatedShop : shop))
        );
    };

    const deleteShopStatus = async (shopId: string) => {
        setShops(prevShops => prevShops.filter(shop => shop.id !== shopId));
    };

    return (
        <ShopContext.Provider value={{
            shop,
            shops,
            fetchShop,
            fetchShops,
            addShopStatus,
            updateShopStatus,
            deleteShopStatus,
            isCreateFormOpen,
            openCreateForm,
            closeCreateForm,
            isUpdateFormOpen,
            updateFormStates,
            openUpdateForm,
            closeUpdateForm,
            isDeleting,
            setIsDeleting,
            deleteFormStates,
            openDeleteDialog,
            closeDeleteDialog,
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop debe usarse dentro de un ShopProvider');
    }
    return context;
};