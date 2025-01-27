"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Shop } from "../shop/types/shopType";
import CreateProductForm from "./components/Form/createProduct";
import { useProduct } from "./hooks/productContext";
import { Product } from "./types/productType";
import { ShopService } from "../shop/services/shopService";
import ModuleHeader from "@/shared/ui/Header";

const shopService = new ShopService();

const ProductsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isCreateFormOpen, openCreateForm, closeCreateForm, addProduct } = useProduct();
    const [shop, setShop] = useState<Shop | null>(null);
    const router = useRouter();

    const handleProductCreated = (newProduct: Product) => {
        addProduct(newProduct);
    };

    const fetchShop = async (shopId: string) => {
        try {
            const data = await shopService.getShop(shopId);
            setShop(data);
        } catch (error) {
            console.error("Error obteniendo negocio:", error);
        }
    };

    useEffect(() => {
        const shop = localStorage.getItem("selectedShop");

        if (!shop) {
            router.replace("/shop-selection");
        } else {
            fetchShop(shop);
        }
    }, []);

    return (
        <>
            {shop && (
                <CreateProductForm
                    isOpen={isCreateFormOpen}
                    onClose={closeCreateForm}
                    shopId={shop.id}
                    onProductCreated={handleProductCreated}
                />
            )}

            <div className="flex flex-col gap-6 w-full h-full">

                <ModuleHeader
                    title="Productos"
                    description="Vista de todos los productos de tu negocio."
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