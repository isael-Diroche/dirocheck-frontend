'use client'

import { Shop } from "@/app/shop/lib/model";
import { ShopService } from "@/app/shop/lib/service";
import React, { useEffect, useState } from 'react';
import InventoryList from "@/app/inventory/components/inventoryList";
import InventoryCreationForm from "@/app/inventory/components/createForm";
import { useRouter } from "next/navigation";

const shopService = new ShopService();


import { InventoryService } from "@/app/inventory/lib/service";
// import { Inventory } from "@/app/inventory/lib/model";
// import { useEffect, useState } from "react";
const inventoryService = new InventoryService();

const InventoryPage = () => {
    const [selectedShop, setSelectedShop] = useState<string | null>(() => localStorage.getItem('selectedShop'));
    const [creatingInventory, setCreatingInventory] = useState<boolean>(false);
    const [shop, setShop] = useState<Shop | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (!selectedShop) {
            router.replace('/shop-selection');
        }
    }, [router, selectedShop]);


    useEffect(() => {
        const shop = localStorage.getItem('selectedShop');
        setSelectedShop(shop);

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

        if (shop) {
            fetchShop(shop);
        }
    }, [shop, refresh]);

    const handleCreate = () => {
        setCreatingInventory(true);
    };

    const handleCancelCreate = () => {
        setCreatingInventory(false);
    };

    const handleInventoryCreated = () => {
        setRefresh(!refresh);
    };


    // ---------------------------------------------------------

    // const [inventory, setInventory] = useState<Inventory | null>(null);
    // const [inventoryName, setInventoryName] = useState<string>('');

    // if (!selectedShop) {
    //     return <p>No se ha seleccionado un inventario.</p>;
    // }

    // if (!selectedShop) return null;

    // const handleFormSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (shop) {
    //         try {
    //             await inventoryService.createInventory(shop.id, Inventory);
    //             handleInventoryCreated();
    //         } catch (error) {
    //             setError('Error creando inventario');
    //         }
    //     }
    // };

    return (
        <>
            <div>
                <div className="flex w-full items-center">
                    <div className="container w-full flex flex-col items-start justify-center">
                        <h1 className="text-2xl text-gray-800 font-semibold font-open">Inventarios de {shop?.name}</h1>
                        <p className='text-base text-gray-500 font-inter'>Bienvenido a la página de inventarios. Aquí encontrarás los diferentes inventarios de tu negocio seleccionado.</p>
                    </div>
                    <button
                        onClick={() => handleCreate()}
                        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded whitespace-nowrap'
                    >
                        Nuevo inventario
                    </button>
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

            {creatingInventory && shop && (
                <InventoryCreationForm
                    shopId={shop.id}
                    onInventoryCreated={handleInventoryCreated}
                    onCancel={handleCancelCreate}
                />
            )}
        </>
    );
};

export default InventoryPage;
