'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShopContextType {
    selectedShop: string | null;
    setSelectedShop: (shopId: string | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

interface ShopProviderProps {
    children: ReactNode;
}

export const ShopProvider: React.FC<ShopProviderProps> = ({ children }) => {
    const [selectedShop, setSelectedShop] = useState<string | null>(null);

    return (
        <ShopContext.Provider value={{ selectedShop, setSelectedShop }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = (): ShopContextType => {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop debe usarse dentro de un ShopProvider');
    }
    return context;
};
