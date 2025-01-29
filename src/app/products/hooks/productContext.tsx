'use client';

import React, { createContext, useContext, useState } from "react";
import { Product } from "../types/productType";
import { ProductService } from "../services/productService";

type ProductContextType = {
    products: Product[];
    fetchProducts: (shopId: string) => Promise<void>;

    // Estados para el Dialog de Creacion de productos
    openCreateForm: () => void;
    closeCreateForm: () => void;
    isCreateFormOpen: boolean;

    // Estados de actualizacion
    addProduct: (newProduct: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (productId: string) => void;

    // Estados para el dialogo de exportar productos
    openExportDialog: () => void;
    closeExportDialog: () => void;
    isExportDialogOpen: boolean;

};

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const productService = new ProductService();

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const fetchProducts = async (shopId: string) => {
        try {
            const data = await productService.getAllProducts(shopId);
            setProducts(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

    // CREATE PRODUCTS DIALOG
    const openCreateForm = () => setIsCreateFormOpen(true);
    const closeCreateForm = () => setIsCreateFormOpen(false);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);

    // Estados de actualizacion
    const addProduct = (newProduct: Product) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prev) =>
            prev.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
        );
    };

    const deleteProduct = (productId: string) => {
        setProducts((prev) => prev.filter((product) => product.id !== productId));
    };

    // EXPORT PRODUCTS DIALOG
    const openExportDialog = () => setIsExportDialogOpen(true);
    const closeExportDialog = () => setIsExportDialogOpen(false);
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

    return (
        <ProductContext.Provider value={{
            products,
            fetchProducts,

            // Estados para el Dialog de Creacion de productos
            openCreateForm,
            closeCreateForm,
            isCreateFormOpen,

            // Estados de actualizacion
            addProduct,
            updateProduct,
            deleteProduct,

            // Estados para el dialogo de exportar productos
            openExportDialog,
            closeExportDialog,
            isExportDialogOpen,
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct debe ser usado dentro de un ProductProvider");
    }
    return context;
};