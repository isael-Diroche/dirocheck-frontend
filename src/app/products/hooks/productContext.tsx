'use client';

import React, { createContext, useContext, useState } from "react";
import { Product } from "../types/productType";
import { ProductService } from "../services/productService";

type ProductContextType = {
    isCreateFormOpen: boolean;
    openCreateForm: () => void;
    closeCreateForm: () => void;
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    fetchProducts: (shopId: string) => Promise<void>;
    addProduct: (newProduct: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (productId: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);    
const productService = new ProductService();

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const openCreateForm = () => setIsCreateFormOpen(true);
    const closeCreateForm = () => setIsCreateFormOpen(false);

    const fetchProducts = async (shopId: string) => {
        try {
            const data = await productService.getAllProducts(shopId);
            setProducts(data);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };

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

    return (
        <ProductContext.Provider value={{
            isCreateFormOpen,
            openCreateForm,
            closeCreateForm,
            products,
            setProducts,
            fetchProducts,
            addProduct,
            updateProduct,
            deleteProduct,
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