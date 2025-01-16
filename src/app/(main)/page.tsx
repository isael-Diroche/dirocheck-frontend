'use client'

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { Shop } from '../shop/lib/model';
import { ShopService } from '../shop/lib/service';

const shopService = new ShopService();

export default function Home() {
    const [shop, setShop] = useState<Shop>();
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const selectedShop = localStorage.getItem('selectedShop');

    const fetchShops = async () => {
        // handleUpdateShop;
        try {
            if (selectedShop) {
                const data = await shopService.getShop(selectedShop);
                setShop(data);
            }
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
        fetchShops();
        if (!selectedShop) {
            router.replace('/shop-selection');
        }
    }, [router]);

    if (!selectedShop) return null;

    return (
        <>
            <div className="container flex w-full flex-col justify-center items-center h-full">
                <h1 className='text-2xl font-semibold font-inter text-gray-800 mb-2'>Bienvenido a {shop?.name}</h1>
                <p className='text-base text-gray-500 font-inter'>Aqui podras crear inventarios y productos para la gestion de tu negocio.</p>
                Total de productos: None
            </div>
        </>
    );
}