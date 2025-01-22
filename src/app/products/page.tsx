'use client';

import { Shop } from '@/app/shop/lib/model';
import { ShopService } from '@/app/shop/lib/service';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductsTable from '@/app/products/components/productsTable';
import { Product } from './types/productTypes';

const shopService = new ShopService();

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [shop, setShop] = useState<Shop | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const router = useRouter();

    const handleProductCreated = (newProduct: Product) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

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
                    <ProductsTable shopId={shop.id} onProductCreated={handleProductCreated} />
                )}
            </div>
        </>
    );
};

export default ProductsPage;
