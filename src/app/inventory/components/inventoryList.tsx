'use client';

import React, { useEffect, useState } from 'react';
import { InventoryService } from "../services/inventoryService";
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { useInventory } from '../hooks/inventoryContext';

// import { Inventory } from "../types/inventoryType";
import { ShopService } from '@/app/shop/services/shopService';
import { Shop } from '@/app/shop/types/shopType';
// import CreateInventoryForm from './Form/createInventory';
// import { Button } from '@/app/shop/components/ui/button';
// import { useProduct } from '@/app/products/hooks/useProduct';

const inventoryService = new InventoryService();
// const shopService = new ShopService();

interface InventoryListProps {
	shopId: string;
}

export default function InventoryList({ shopId }: InventoryListProps) {
    const { inventories, fetchInventories, deleteInventory } = useInventory();
    // const [inventories, setInventories] = useState<Inventory[]>([]);
    // const [shops, setShops] = useState<Shop[]>([]);
    // const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

    // Fetch all shops once when the component mounts
    // const fetchShops = async () => {
    //     try {
    //         const data = await shopService.getAllShop();
    //         setShops(data);
    //     } catch (error) {
    //         console.error("Error obteniendo tiendas:", error);
    //     }
    // };

    // Fetch inventories for the current shop
    // const fetchInventories = async () => {
    //     try {
    //         const data = await inventoryService.getAllInventories(shopId);
    //         setInventories(data);
    //     } catch (error) {
    //         console.error("Error obteniendo inventarios:", error);
    //     }
    // };

    useEffect(() => {
        fetchInventories(shopId); // Llamada inicial para cargar inventarios
    }, []);

    // Handle delete inventory
    // const handleDelete = async (inventoryId: string) => {
    //     try {
    //         if (window.confirm("¿Está seguro de que desea eliminar este inventario?")) {
    //             await inventoryService.deleteInventory(shopId, inventoryId);
    //             fetchInventories(); // Refresh inventory list after deletion
    //         }
    //     } catch (error) {
    //         console.error("Error eliminando inventario:", error);
    //     }
    // };

    const handleDelete = async (inventoryId: string) => {
		try {
			await inventoryService.deleteInventory(shopId, inventoryId); // Llamada al backend para eliminar el producto
			deleteInventory(inventoryId); // Actualiza el estado global para que se muestre instantaneamente
		} catch (error) {
			console.error("Error eliminando inventario:", error);
		}
	};

    // const handleInventoryCreated = (newInventory: Inventory) => {
    //     setInventories((prevInventories) => [...prevInventories, newInventory]);
    // };

    // const [creatingInventory, setCreatingInventory] = useState<boolean>(false);

    // const handleCancelCreate = () => {
    //     setCreatingInventory(false);
    // };

    return (
        <>
            {inventories.length === 0 ? (
                <>
                    <div className="flex w-full h-full items-center justify-center flex-col gap-4">
                        <h1 className="text-xl font-open font-semibold text-gray-800">No hay inventarios disponibles para este negocio.</h1>
                    </div>
                </>
            ) : (
                <>
                    {/* <Button
                        onClick={() => setIsCreateFormOpen(true)}
                        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded whitespace-nowrap'
                    >
                        Crear Inventario
                    </Button> */}

                    <ul className="grid grid-cols-3 gap-4">
                        {inventories.map((inventory, index) => (
                            <li key={index} className='w-full flex'>
                                <Link href={`/inventory/${inventory.id}`} className="w-full h-full text-blue-600 hover:underline rounded-md border p-4">
                                    <div key={inventory.id}>
                                        {inventory.name}
                                    </div>
                                </Link>
                                <button onClick={() => handleDelete(inventory.id)}>
                                    <BiTrash />
                                </button>
                                {/* <button onClick={() => handleUpdate(inventory)}>
                                    <BiEdit />
                                </button> */}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};
