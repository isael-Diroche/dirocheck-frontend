"use client"

import { useEffect, useState } from "react"
import ShopCard from "@/app/shop/components/ShopCard"
import { ShopService } from "@/app/shop/services/shopService";
import CreateShopForm from "@/app/shop/components/Form/createShop";
import { Shop } from "@/app/shop/types/shopType";
import { useShop } from "@/app/shop/hooks/ShopContext";
import { Button } from "@/app/products/components/Shared/button";

const shopService = new ShopService();

export default function ShopSelectionPage() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [error, setError] = useState<string | null>(null);

    const {
        openCreateForm,
    } = useShop();

    const handleUpdateShop = async (updatedShop: Shop) => {
        // Actualizar el estado con el negocio modificado
        setShops(prevShops =>
            prevShops.map(shop => (shop.id === updatedShop.id ? updatedShop : shop))
        );
    };

    const handleDelete = async (id: string) => {
        setShops(prevShops => prevShops.filter(shop => shop.id !== id));
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

    const handleShopCreated = (newShop: Shop) => {
        setShops((prevShops) => [...prevShops, newShop]);
    };

    useEffect(() => {
        fetchShops();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl text-gray-800 font-semibold font-golos">Seleccionar negocio</h1>
                <Button
                    onClick={openCreateForm}
                >
                    Crear negocio
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shops.map((shop) => (
                    <ShopCard
                        key={shop.id}
                        shop={shop}
                        onUpdate={handleUpdateShop}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <CreateShopForm
                onShopCreated={handleShopCreated}
            />
        </div>
    )
}

