'use client';

import { Shop } from '@/app/shop/lib/model';
import { ShopService } from '@/app/shop/lib/service';
import React, { useEffect, useState } from 'react';
import ProductList from '@/app/products/components/productList';
import CreateProductForm from '@/app/products/components/actions/createProductForm';
import { useRouter } from 'next/navigation';
import ProductsTable from '@/app/products/components/improved-products-table';

const shopService = new ShopService();

const ProductsPage: React.FC = () => {
    // const [selectedShop, setSelectedShop] = useState<string | null>(() => localStorage.getItem('selectedShop'));

    const [shop, setShop] = useState<Shop | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const router = useRouter();

    const fetchShop = async (shopId: string) => {
        try {
            const data = await shopService.getShop(shopId);
            setShop(data); // Actualiza la información del negocio
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message); // Manejo del error
            } else {
                setError("Ha ocurrido un error desconocido");
            }
            console.error("Error obteniendo negocio:", error);
        }
    };

    useEffect(() => {
        const shop = localStorage.getItem('selectedShop');
        if (!shop) {
            router.replace('/shop-selection');
        }
        // setSelectedShop(shop);

        if (shop) {
            fetchShop(shop);
        }
    }, [refresh]);


    const handleProductCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            {shop && (
                <ProductsTable shopId={shop.id} onProductCreated={handleProductCreated} />
            )}
        </>
    );
};

export default ProductsPage;