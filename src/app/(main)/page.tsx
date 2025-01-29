'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shop } from '../shop/types/shopType';
import { ShopService } from '../shop/services/shopService';
import { useProduct } from '../products/hooks/productContext';

const shopService = new ShopService();

export default function Home() {
    const [shop, setShop] = useState<Shop>();
    const [error, setError] = useState<string | null>(null);
    const [selectedShop, setSelectedShop] = useState<string | null>(null);
    const { products, fetchProducts } = useProduct();


    const router = useRouter();

    useEffect(() => {
        const shop = typeof window !== 'undefined' ? localStorage.getItem('selectedShop') : null;
        setSelectedShop(shop);

        if (!shop) {
            router.replace('/shop-selection');
        } else {
            fetchProducts(shop);
        }
    }, [router]);

    useEffect(() => {
        const fetchShops = async () => {
            if (!selectedShop) return;

            try {
                const data = await shopService.getShop(selectedShop);
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

        fetchShops();
    }, [selectedShop]);

    return (
        <>
            <div className="container flex w-full flex-col justify-center items-center h-full">
                <h1 className="text-2xl font-semibold font-inter text-gray-800 mb-2">
                    Bienvenido a {shop?.name || "su negocio"}
                </h1>
                <p className="text-base text-gray-500 font-inter">
                    Aquí podrás crear inventarios y productos para la gestión de tu negocio.
                </p>
                Total de productos: None
            </div>
        </>
    );
}
