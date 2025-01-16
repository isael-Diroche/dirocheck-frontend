'use client';

import React, { useEffect, useState } from 'react';
import { InventoryService } from "../lib/service";
import { Inventory } from "../lib/model";
import { ShopService } from '@/app/shop/lib/service';
import { Shop } from '@/app/shop/lib/model';

import Link from 'next/link';
import { BiTrash, BiEdit } from 'react-icons/bi';

const inventoryService = new InventoryService();
const shopService = new ShopService();

const InventoryList: React.FC<{ shopId: string, onInventoryCreated: () => void }> = ({ shopId, onInventoryCreated }) => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [shops, setShops] = useState<Shop[]>([]);

    // Fetch all shops once when the component mounts
    const fetchShops = async () => {
        try {
            const data = await shopService.getAllShop();
            setShops(data);
        } catch (error) {
            console.error("Error obteniendo tiendas:", error);
        }
    };

    // Fetch inventories for the current shop
    const fetchInventories = async () => {
        try {
            const data = await inventoryService.getAllInventories(shopId);
            setInventories(data);
        } catch (error) {
            console.error("Error obteniendo inventarios:", error);
        }
    };

    // First useEffect to fetch data on mount
    useEffect(() => {
        fetchShops();
        fetchInventories();
    }, [shopId]);  // Depend only on shopId to re-fetch inventories when it changes

    // Handle delete inventory
    const handleDelete = async (inventoryId: number) => {
        try {
            if (window.confirm("¿Está seguro de que desea eliminar este inventario?")) {
                await inventoryService.deleteInventory(shopId, inventoryId.toString());
                fetchInventories(); // Refresh inventory list after deletion
            }
        } catch (error) {
            console.error("Error eliminando inventario:", error);
        }
    };

    return (
        <>
            {inventories.length > 0 ? (
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
            ) : (
                <p>No hay inventarios disponibles.</p>
            )}
        </>
    );
};

export default InventoryList;
