'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateProductForm from "./components/Form/createProduct";
import { useProduct } from "./hooks/productContext";
import ModuleHeader from "@/shared/ui/Header";
import { useShop } from "../shop/hooks/ShopContext";
import { ExportProductsButton } from "@/app/products/components/exportProductsButton";
import { Button } from "./components/Shared/button";
import { BiPlus } from "react-icons/bi";
import ExportProductsDialog from "./components/Dialog/exportProducts";


const ProductsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isCreateFormOpen, openCreateForm, closeCreateForm, products,
        isExportDialogOpen, closeExportDialog,
     } = useProduct();

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
                <>
                    <CreateProductForm
                        isOpen={isCreateFormOpen}
                        onClose={closeCreateForm}
                        shopId={shop.id}
                    />

                    <ExportProductsDialog
                        shop={shop}
                        isOpen={isExportDialogOpen}
                        onClose={closeExportDialog}
                    />
                </>
            )}

            <div className="flex flex-col gap-6 w-full h-full">
                <ModuleHeader title={"Productos"} description="Vista de todos los productos de tu negocio.">
                    <ExportProductsButton />
                    <Button onClick={openCreateForm} >
                        <BiPlus className="h-4 w-4" />
                        Añadir Nuevo
                    </Button>
                </ModuleHeader>

                <main className="flex w-full h-full">
                    {children}
                </main>
            </div>
        </>
    );
};

export default ProductsLayout;