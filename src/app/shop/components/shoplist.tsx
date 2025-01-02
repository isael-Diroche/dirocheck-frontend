'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ShopService } from "../lib/service";
import { Shop } from "../lib/model";
import { BiTrash } from 'react-icons/bi';

const shopService = new ShopService();

const ShopList: React.FC = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [error, setError] = useState<string | null>(null);

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
        try {
            await shopService.deleteShop(id);
            setShops(shops.filter(shop => shop.id !== id));
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ha ocurrido un error desconocido");
            }
            console.error("Error eliminando negocio:", error);
        }
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

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay negocios disponibles.</p>
            )}
        </>
    );
};

export default ShopList;