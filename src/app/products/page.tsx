'use client';

import { Shop } from '@/app/shop/types/shopType';
import { ShopService } from '@/app/shop/services/shopService';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductsTable from '@/app/products/components/productsTable';

const shopService = new ShopService();

const ProductsPage: React.FC = () => {
    const [shop, setShop] = useState<Shop | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const router = useRouter();

    const fetchShop = async (shopId: string) => {
        try {
            const data = await shopService.getShop(shopId);
            setShop(data);
        } catch (error) {
            console.error("Error obteniendo negocio:", error);
        }
    };

    useEffect(() => {
        const shop = localStorage.getItem('selectedShop');

        if (!shop) {
            router.replace('/shop-selection');
        } else {
            fetchShop(shop);
        }
    }, [refresh]);

    return (
        <>
            <div className="w-full h-full">
                {shop && (
                    <ProductsTable shopId={shop.id} />
                )}
            </div>
        </>
    );
};

export default ProductsPage;