'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shop } from '@/app/shop/lib/model';
import { ShopService } from '@/app/shop/lib/service';
import ProductList from '@/app/product/components/productList';

const shopService = new ShopService();

const ShopPage: React.FC = () => {
    const { shopId } = useParams<{ shopId: string }>();

    const [shop, setShop] = useState<Shop | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchShop = async () => {
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

    useEffect(() => {
        fetchShop();
    }, []);

    return (
        <>
            <div className='w-full'>
                <h2 className='text-3xl font-inter font-semibold mb-3'>{shop?.name}</h2>

                {shop ? (
                    <div className='w-full'>
                        <ProductList shopId={shopId} />
                    </div>
                ) : (
                    <p>{error ? error : "Loading..."}</p>
                )}
            </div>
        </>
    );
};

export default ShopPage;
