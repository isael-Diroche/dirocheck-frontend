'use client';

import React, { createContext, useContext, useState } from "react";
import { Product } from "../types/productType";
import { ProductService } from "../services/productService";
import * as XLSX from "xlsx";

type ProductContextType = {
    products: Product[];
    fetchProducts: (shopId: string) => Promise<void>;

    // Estados para el Dialog de Creación de productos
    openCreateForm: () => void;
    closeCreateForm: () => void;
    isCreateFormOpen: boolean;

    // Estados de actualización
    addProduct: (newProduct: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (productId: string) => void;

    // Estados para el Dialog de exportar productos
    openExportDialog: () => void;
    closeExportDialog: () => void;
    isExportDialogOpen: boolean;

    // Estados para el Dialog de importar productos
    openImportDialog: () => void;
    closeImportDialog: () => void;
    isImportDialogOpen: boolean;

    // Importación de productos
    importProducts: (shopId: string, file: File) => Promise<void>;
    isImporting: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const productService = new ProductService();

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [isImporting, setIsImporting] = useState(false);

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

    // Estados de actualización
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

    // IMPORT PRODUCTS DIALOG
    const openImportDialog = () => setIsImportDialogOpen(true);
    const closeImportDialog = () => setIsImportDialogOpen(false);

    // IMPORT PRODUCTS
    const importProducts = async (shopId: string, file: File) => {
        setIsImporting(true);

        try {
            // Leer el archivo Excel y convertirlo a JSON
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const importedProducts: Product[] = XLSX.utils.sheet_to_json(worksheet);

            // Crear productos uno por uno
            for (const product of importedProducts) {
                const newProduct = await productService.createProduct(shopId, product);
                addProduct(newProduct);
            }
        } catch (error) {
            console.error("Error al importar productos:", error);
        } finally {
            setIsImporting(false);
        }
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                fetchProducts,

                // Estados para el Dialog de Creación de productos
                openCreateForm,
                closeCreateForm,
                isCreateFormOpen,

                // Estados de actualización
                addProduct,
                updateProduct,
                deleteProduct,

                // Estados para el Dialog de exportar productos
                openExportDialog,
                closeExportDialog,
                isExportDialogOpen,

                // Estados para el Dialog de importar productos
                openImportDialog,
                closeImportDialog,
                isImportDialogOpen,

                // Importación de productos
                importProducts,
                isImporting,
            }}
        >
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
