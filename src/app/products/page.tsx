'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductsTable from '@/app/products/components/productsTable';
import { useShop } from '../shop/hooks/ShopContext';

const ProductsPage: React.FC = () => {
    const router = useRouter();
    const {shop} = useShop();

    useEffect(() => {
        const selected_shop = localStorage.getItem('selectedShop');

        if (!selected_shop) {
            router.replace('/shop-selection');
        }
    }, []);

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