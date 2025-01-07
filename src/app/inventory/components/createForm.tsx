'use client'

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/axiosConfig';
import { Inventory } from "../lib/model";

import { Shop } from "@/app/shop/lib/model";
import { ShopService } from "@/app/shop/lib/service";
import { InventoryService } from "@/app/inventory/lib/service";
import { useRouter } from "next/navigation";

const shopService = new ShopService();
const inventoryService = new InventoryService();

interface InventoryCreationFormProps {
    shopId: string;
    onInventoryCreated: (inventory: Inventory) => void;
}

const InventoryCreationForm: React.FC<InventoryCreationFormProps & { onCancel: () => void }> = ({ shopId, onInventoryCreated, onCancel }) => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [newInventory, setNewInventory] = useState<Inventory>({
        id: 0,
        shop: shopId,
        products: [],
        name: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewInventory({ ...newInventory, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdInventory = await inventoryService.createInventory(shopId, newInventory);
            setInventories([...inventories, createdInventory]);
            setNewInventory({
                id: 0,
                shop: shopId,
                products: [],
                name: "",
            });
            onInventoryCreated(createdInventory);
            // setTimeout(() => setShowPopup(false), 3000);
        } catch (error) {
            console.error('Hubo un error creando el inventario:', error);
        }
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const formData = new FormData();

    //     // Añadir solo los campos que tienen valores
    //     Object.entries(newInventory).forEach(([key, value]) => {
    //         formData.append(key, value as any);
    //     });

    //     try {
    //         const response = await axiosInstance.post('inventory/', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });
    //         const createdInventory = response.data;
    //         setInventories([...inventories, createdInventory]);
    //         setNewInventory({
    //             id: 0,
    //             shop: shopId,
    //             products: [],
    //             name: "",
    //         });
    //         onInventoryCreated(createdInventory);
    //     } catch (error) {
    //         console.error('Error creating inventory:', error);
    //     }
    // };

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                const response = await axiosInstance.get('inventory/');
                setInventories(response.data);
            } catch (error) {
                console.error('Error fetching inventories:', error);
            }
        };
        fetchInventories();
    }, []);

    // ---------------------------------------------------------

    // const [selectedShop, setSelectedShop] = useState<string | null>(() => localStorage.getItem('selectedShop'));
    // const [creatingInventory, setCreatingInventory] = useState<boolean>(false);
    // const [shop, setShop] = useState<Shop | null>(null);
    // const [error, setError] = useState<string | null>(null);
    // const [refresh, setRefresh] = useState<boolean>(false);
    // const [newInventoryName, setNewInventoryName] = useState<string>("");

    // useEffect(() => {
    //     const shop = localStorage.getItem('selectedShop');
    //     setSelectedShop(shop);

    //     const fetchShop = async (shopId: string) => {
    //         try {
    //             const data = await shopService.getShop(shopId);
    //             setShop(data);
    //         } catch (error) {
    //             if (error instanceof Error) {
    //                 setError(error.message);
    //             } else {
    //                 setError("Ha ocurrido un error desconocido");
    //             }
    //             console.error("Error obteniendo negocio:", error);
    //         }
    //     };

    //     if (shop) {
    //         fetchShop(shop);
    //     }
    // }, [shop, refresh]);

    // const handleCreate = () => {
    //     setCreatingInventory(true);
    // };

    // const handleCancelCreate = () => {
    //     setCreatingInventory(false);
    //     setNewInventoryName(""); // Resetear el nombre al cancelar
    // };

    // const handleSaveInventory = async () => {
    //     if (!newInventoryName.trim()) {
    //         alert("El nombre del inventario no puede estar vacío.");
    //         return;
    //     }

    //     try {
    //         await inventoryService.createInventory(shop!.id, {
    //             id: 0,
    //             shop: selectedShop as string,
    //             name: newInventoryName,
    //             products: [],
    //             total: 0,
    //         });

    //         setCreatingInventory(false);
    //         setNewInventoryName(""); // Resetear el nombre tras guardar
    //         setRefresh(!refresh); // Refrescar la lista
    //     } catch (error) {
    //         console.error("Error creando inventario:", error);
    //         alert("Hubo un problema al crear el inventario. Intenta de nuevo.");
    //     }
    // };

    // const router = useRouter();

    // useEffect(() => {
    //     if (!selectedShop) {
    //         router.replace('/shop-selection');
    //     }
    // }, [router, selectedShop]);

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
                <h2 className='text-2xl font-bold mb-4'>Nuevo inventario</h2>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Nombre</label>
                    <input
                        type='text'
                        name='name'
                        value={newInventory.name || ''}
                        onChange={handleInputChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Productos</label>
                    <input
                        type='text'
                        name='products'
                        value={newInventory.products || ''}
                        onChange={handleInputChange}
                        className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
                    />
                </div>
                <div className='flex justify-end space-x-2'>
                    <button
                        onClick={onCancel}
                        className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700'
                    >
                        Cancelar
                    </button>
                    <button
                        type='submit'
                        className='"w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600'
                    >
                        Guardar
                    </button>
                </div>
            </form>

            {/* ------------------------------------------------- */}

            {/* {creatingInventory && shop && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-4">Nuevo inventario</h2>
                        <label className="block mb-2 text-gray-700">
                            Nombre del inventario
                        </label>
                        <input
                            type="text"
                            value={newInventoryName}
                            onChange={(e) => setNewInventoryName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            placeholder="Introduce el nombre del inventario"
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={handleCancelCreate}
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveInventory}
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
};

export default InventoryCreationForm;
