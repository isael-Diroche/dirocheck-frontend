'use client';
import React, { useEffect, useState } from 'react';
import { InventoryService } from "../lib/service";
import { Inventory } from "../lib/model";
// import UpdateForm from './updateForm';
import { ShopService } from '@/app/shop/lib/service';
import { Shop } from '@/app/shop/lib/model';

import Link from 'next/link';
import { BiTrash, BiEdit } from 'react-icons/bi';

const inventoryService = new InventoryService();
const shopService = new ShopService();

const InventoryList: React.FC<{ shopId: string, onInventoryCreated: () => void }> = ({ shopId, onInventoryCreated }) => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    // const [updatingInventory, setUpdatingInventory] = useState<Inventory | null>(null);
    const [shops, setShops] = useState<Shop[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const fetchShops = async () => {
        try {
            const data = await shopService.getAllShop();
            setShops(data);
        } catch (error) {
            console.error("Error obteniendo tiendas:", error);
        }
    };


    const fetchInventories = async () => {
        try {
            const data = await inventoryService.getAllInventories(shopId);
            setInventories(data);
        } catch (error) {
            console.error("Error obteniendo inventarios:", error);
        }
    };

    useEffect(() => {
        fetchShops();
        fetchInventories();
    }, []);

    useEffect(() => {
        fetchInventories();
    }, [onInventoryCreated]);

    const handleDelete = async (inventoryId: number) => {
        try {
            if (window.confirm("¿Está seguro de que desea eliminar este inventario?")) {
                // setInventories(inventories.filter(shop => shop.id !== inventoryId));
                await inventoryService.deleteInventory(shopId, inventoryId.toString());
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
                                <div key={inventory.id} className="">
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

            {/* {updatingProduct && (
                <UpdateForm
                    product={updatingProduct}
                    onSubmit={handleUpdateFormSubmit}
                    onCancel={handleCancelUpdate}
                    shops={shops}
                />
            )} */}

            {/* ELIMINAR */}
            {/* {isPopupOpen && selectedInventory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <UpdateForm inventory={selectedInventory} onClose={closePopup} onUpdate={handleUpdate} />
                    </div>
                </div>
            )} */}
        </>
    );
};

export default InventoryList;