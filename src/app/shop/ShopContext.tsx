'use client';

import React, { createContext, use, useContext, useState } from 'react';

interface ShopContextType {
    selectedShop: string | null;
    setSelectedShop: (shopId: string | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedShop, setSelectedShop] = useState<string | null>(null);

    return (
        <ShopContext.Provider value={{ selectedShop, setSelectedShop }}>
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
