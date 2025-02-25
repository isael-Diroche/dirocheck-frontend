'use client';

import { Plus } from "lucide-react";
import { Button } from "../products/components/Shared/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Inventory } from "./types/inventoryType";
import CreateInventoryForm from "./components/Form/createInventory";
import { ShopService } from "../shop/services/shopService";
import { Shop } from "../shop/types/shopType";
import { useInventory } from "@/app/inventory/hooks/inventoryContext";
import ModuleHeader from "@/shared/ui/Header";

const shopService = new ShopService();

const InventoryLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isCreateFormOpen, openCreateForm, closeCreateForm, addInventory } = useInventory();
    const [shop, setShop] = useState<Shop | null>(null);
    const router = useRouter();

    const handleInventoryCreated = (newInventory: Inventory) => {
        addInventory(newInventory);
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
            {
                shop && (
                    <CreateInventoryForm
                        isOpen={isCreateFormOpen}
                        onClose={closeCreateForm}
                        shopId={shop.id}
                        onInventoryCreated={handleInventoryCreated}
                    />
                )
            }

            <div className="flex flex-col gap-6 w-full h-full">

                {/* <ModuleHeader
                    title="Inventarios"
                    description=""
                    buttonLabel="Nuevo Inventario"
                    buttonFunction={openCreateForm}
                /> */}

                <ModuleHeader
                    title="Inventarios"
                    description="Vista de todos los inventarios de tu negocio."
                >
                    <Button onClick={openCreateForm}>Nuevo Inventario</Button>
                </ModuleHeader>

                <main className="flex w-full h-full">
                    {children}
                </main>
            </div>
        </>
    );
};

export default InventoryLayout;