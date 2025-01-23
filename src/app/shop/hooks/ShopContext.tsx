'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ShopService } from '../services/shopService';
import { Shop } from '../types/shopType';

interface ShopContextType {
    shops: Shop[];
    fetchShops: () => Promise<void>;
    isCreateFormOpen: boolean;
    openCreateForm: () => void;
    closeCreateForm: () => void;
    isUpdateFormOpen: boolean;
    updateFormStates: Record<string, boolean>;
    openUpdateForm: (shopId: string) => void;
    closeUpdateForm: (shopId: string) => void;
}

const shopService = new ShopService();
const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
    const openCreateForm = () => setIsCreateFormOpen(true);
    const closeCreateForm = () => setIsCreateFormOpen(false);

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

    return (
        <ShopContext.Provider value={{
            shops,
            fetchShops,
            isCreateFormOpen,
            openCreateForm,
            closeCreateForm,
            isUpdateFormOpen,
            updateFormStates,
            openUpdateForm,
            closeUpdateForm,
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