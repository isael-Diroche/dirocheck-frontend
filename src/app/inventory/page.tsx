'use client'

import { Shop } from "@/app/shop/lib/model";
import { ShopService } from "@/app/shop/lib/service";
import React, { useEffect, useState } from 'react';
import InventoryList from "@/app/inventory/components/inventoryList";
// import { useRouter } from "next/navigation";

const shopService = new ShopService();

import CreateInventoryForm from "./components/actions/createInventoryForm";
import { Button } from "../shop/components/ui/button";

const InventoryPage = () => {
    const [selectedShop, setSelectedShop] = useState<string | null>(() => localStorage.getItem('selectedShop'));
    const [creatingInventory, setCreatingInventory] = useState<boolean>(false);
    const [shop, setShop] = useState<Shop | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

    const fetchShop = async (shopId: string) => {
        try {
            const data = await shopService.getShop(shopId);
            setShop(data);
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
        const shopFromStorage = localStorage.getItem('selectedShop');
        if (shopFromStorage) {
            setSelectedShop(shopFromStorage);
            fetchShop(shopFromStorage);
        }
    }, []);

    useEffect(() => {
        if (selectedShop) {
            fetchShop(selectedShop);
        }
    }, [selectedShop, refresh]);

    const handleCreate = () => {
        setCreatingInventory(true);
    };

    const handleCancelCreate = () => {
        setCreatingInventory(false);
    };

    const handleInventoryCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            <div>
                <div className="flex w-full items-center">
                    <div className="container w-full flex flex-col items-start justify-center">
                        <h1 className="text-2xl text-gray-800 font-semibold font-open">Inventarios de {shop?.name}</h1>
                        <p className='text-base text-gray-500 font-inter'>Bienvenido a la página de inventarios. Aquí encontrarás los diferentes inventarios de tu negocio seleccionado.</p>
                    </div>
                    <Button
                        onClick={() => setIsCreateFormOpen(true)}
                        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded whitespace-nowrap'
                    >
                        Crear Inventario
                    </Button>
                </div>
                <div className="container w-full h-full flex flex-col items-center">
                    {shop ? (
                        <div className='w-full'>
                            <InventoryList
                                shopId={shop.id}
                                onInventoryCreated={handleInventoryCreated}
                            />
                            <p>Listando inventarios para el negocio: {shop.name}</p>
                        </div>
                    ) : (
                        <p>{error ? error : "Cargando..."}</p>
                    )}
                </div>
            </div>

            {shop && (
                <CreateInventoryForm
                    isOpen={isCreateFormOpen}
                    onClose={() => setIsCreateFormOpen(false)}
                    shopId={shop.id}
                    onInventoryCreated={handleInventoryCreated}
                    onCancel={handleCancelCreate}
                />
            )}
        </>
    );
};

export default InventoryPage;
