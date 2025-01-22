'use client';

import { Plus } from "lucide-react";
import { Button } from "../products/components/Shared/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Inventory } from "./types/inventoryType";
import CreateInventoryForm from "./components/Form/createInventory";
import { ShopService } from "../shop/lib/service";
import { Shop } from "../shop/lib/model";
import { useInventory } from "@/app/inventory/hooks/useInventory";

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
                <header className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[28px] font-golos font-semibold text-gray-800">Inventarios</h1>
                        <p className="text-sm font-golos font-normal text-gray-600">
                            Vista de todos los inventarios de tu negocio.
                        </p>
                    </div>
                    <Button variant="default" onClick={openCreateForm}>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Inventario
                    </Button>
                </header>

                <main className="flex w-full h-full">
                    {children}
                </main>
            </div>
        </>
    );
};

export default InventoryLayout;