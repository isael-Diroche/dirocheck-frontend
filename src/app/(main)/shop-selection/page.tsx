"use client"

import { useEffect, useState } from "react"
import ShopCard from "@/app/shop/components/ShopCard"
import { CreateShopForm } from "@/app/shop/components/actions/createShopForm"
import { Button } from "@/app/shop/components/ui/button"
import { Shop } from "../../shop/lib/model"
import { ShopService } from "../../shop/lib/service"

const shopService = new ShopService();

export default function ShopSelectionPage() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

    const handleUpdateShop = async (updatedShop: Shop) => {
        // Actualizar el estado con el negocio modificado
        setShops(prevShops =>
            prevShops.map(shop => (shop.id === updatedShop.id ? updatedShop : shop))
        );
    };

    const fetchShops = async () => {
        handleUpdateShop;
        try {
            const data = await shopService.getAllShop();
            setShops(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ha ocurrido un error desconocido");
            }
            console.error("Error obteniendo negocio:", error);
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Select a Business</h1>
                <Button onClick={() => setIsCreateFormOpen(true)}>Crear negocio</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop) => (
                    <ShopCard key={shop.id} shop={shop} onUpdate={handleUpdateShop} />
                ))}
            </div>
            <CreateShopForm isOpen={isCreateFormOpen} onClose={() => setIsCreateFormOpen(false)} />
        </div>
    )
}

