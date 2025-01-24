"use client"

import { useEffect } from "react"
import ShopCard from "@/app/shop/components/ShopCard"
import CreateShopForm from "@/app/shop/components/Form/createShop";
import { Shop } from "@/app/shop/types/shopType";
import { useShop } from "@/app/shop/hooks/ShopContext";
import { Button } from "@/app/products/components/Shared/button";
import { Plus } from "lucide-react";

export default function ShopSelectionPage() {
    const {
        shops,
        fetchShops,
        addShop,
        openCreateForm,
    } = useShop();

    const handleShopCreated = (newShop: Shop) => {
        addShop(newShop);
        fetchShops();
    };

    useEffect(() => {
        fetchShops();
    }, []);

    return (
        <div className="flex flex-col gap-6 w-full h-full">
            <header className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-golos font-semibold text-gray-800">Seleccionar negocio</h1>
                    <p className="text-sm font-golos font-normal text-gray-600">
                        Vista de todos los negocios.
                    </p>
                </div>
                <Button variant="default" onClick={openCreateForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Negocio
                </Button>
            </header>

            <main className="flex w-full h-full">
                {shops.length === 0 ? (
                    <>
                        <div className="flex w-full h-full items-center justify-center flex-col gap-4">
                            <h1 className="text-xl font-open font-semibold text-gray-800">No hay negocios disponibles.</h1>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-fit">
                            {shops.map((shop) => (
                                <ShopCard key={shop.id} shop={shop} />
                            ))}
                        </div>
                    </>
                )}
            </main>

            <CreateShopForm
                onShopCreated={handleShopCreated}
            />
        </div>
    )
}

