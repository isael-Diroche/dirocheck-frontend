"use client";

import { Plus } from "lucide-react";
import { Button } from "./components/Shared/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Shop } from "../shop/lib/model";
import CreateProductForm from "./components/Form/createProduct";
import { useProduct } from "./hooks/useProduct";
import { Product } from "./types/productTypes";
import { ShopService } from "../shop/lib/service";
import { ProductService } from "./services/productService";

const productService = new ProductService();
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

            <div className="flex flex-col gap-6 w-full h-auto">
                <header className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[28px] font-golos font-semibold text-gray-800">Productos</h1>
                        <p className="text-sm font-golos font-normal text-gray-600">
                            Vista de todos los productos de tu negocio.
                        </p>
                    </div>
                    <Button variant="default" onClick={openCreateForm}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Producto
                    </Button>
                </header>

                <div className="flex w-full h-full">{children}</div>
            </div>
        </>
    );
};

export default ProductsLayout;