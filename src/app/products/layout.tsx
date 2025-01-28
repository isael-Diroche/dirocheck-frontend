"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CreateProductForm from "./components/Form/createProduct";
import { useProduct } from "./hooks/productContext";
import { Product } from "./types/productType";
import ModuleHeader from "@/shared/ui/Header";
import { useShop } from "../shop/hooks/ShopContext";

const ProductsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isCreateFormOpen, openCreateForm, closeCreateForm, products } = useProduct();
    
    const { shop, fetchShop } = useShop();
    const router = useRouter();

    useEffect(() => {
        const selected_shop = localStorage.getItem("selectedShop");

        if (!selected_shop) {
            router.replace("/shop-selection");
        } else {
            fetchShop(selected_shop);
        }
    }, []);

    return (
        <>
            {shop && (
                <CreateProductForm
                    isOpen={isCreateFormOpen}
                    onClose={closeCreateForm}
                    shopId={shop.id}
                />
            )}

            <div className="flex flex-col gap-6 w-full h-full">
                <ModuleHeader
                    title="Productos"
                    description={`Vista de todos los productos de tu negocio.`}
                    buttonLabel="Nuevo Producto"
                    buttonFunction={openCreateForm}
                />

                <main className="flex w-full h-full">
                    {children}
                </main>
            </div>
        </>
    );
};

export default ProductsLayout;