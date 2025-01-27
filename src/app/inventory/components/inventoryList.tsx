'use client';

import React, { useEffect } from 'react';
import { InventoryService } from "../services/inventoryService";
import Link from 'next/link';
import { BiTrash } from 'react-icons/bi';
import { useInventory } from '../hooks/inventoryContext';

const inventoryService = new InventoryService();

interface InventoryListProps {
	shopId: string;
}

export default function InventoryList({ shopId }: InventoryListProps) {
    const { inventories, fetchInventories, deleteInventory } = useInventory();

    useEffect(() => {
        fetchInventories(shopId);
    }, []);

    const handleDelete = async (inventoryId: string) => {
		try {
			await inventoryService.deleteInventory(shopId, inventoryId); // Llamada al backend para eliminar el producto
			deleteInventory(inventoryId); // Actualiza el estado global para que se muestre instantaneamente
		} catch (error) {
			console.error("Error eliminando inventario:", error);
		}
	};

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
