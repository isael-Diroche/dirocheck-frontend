'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ShopService } from "../lib/service";
import { Shop } from "../lib/model";
import { BiTrash, BiEdit } from 'react-icons/bi';
import UpdateForm from './updateForm';

const shopService = new ShopService();

const ShopList: React.FC = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const fetchShops = async () => {
        try {
            const data = await shopService.getAllShop();
            setShops(data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ha ocurrido un error desconocido");
            }
            console.error("Error obteniendo negocios:", error);
        }
    };

    const deleteShop = async (id: string) => {
        if (window.confirm("¿Está seguro de que desea eliminar este negocio?")) {
            setShops(shops.filter(shop => shop.id !== id));
            await shopService.deleteShop(id);
        }
    };

    const openPopup = (shop: Shop) => {
        setSelectedShop(shop);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setSelectedShop(null);
        setIsPopupOpen(false);
    };

    const handleUpdate = async () => {
        await fetchShops();
        closePopup();
    };

    useEffect(() => {
        fetchShops();
    }, []);

    return (
        <>
            {shops.length > 0 ? (
                <ul className="grid grid-cols-3 gap-4">
                    {shops.map((shop, index) => (
                        <li key={index} className='w-full flex'>
                            <Link href={`/${shop.id}`} className="w-full h-full text-blue-600 hover:underline rounded-md border p-4">
                                <div key={shop.id} className="">
                                    {shop.name}
                                </div>
                            </Link>
                            <button onClick={() => deleteShop(shop.id)}>
                                <BiTrash />
                            </button>
                            <button onClick={() => openPopup(shop)}>
                                <BiEdit />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay negocios disponibles.</p>
            )}

            {isPopupOpen && selectedShop && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <UpdateForm shop={selectedShop} onClose={closePopup} onUpdate={handleUpdate} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ShopList;