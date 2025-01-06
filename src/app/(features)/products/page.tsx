'use client';

import { Shop } from '@/app/shop/lib/model';
import { ShopService } from '@/app/shop/lib/service';
import React, { useEffect, useState } from 'react';
import ProductList from '@/app/product/components/productList';
import ProductCreationForm from '@/app/product/components/createForm';
import { useRouter } from 'next/navigation';

const shopService = new ShopService();

const ProductsPage: React.FC = () => {
    const [selectedShop, setSelectedShop] = useState<string | null>(() => localStorage.getItem('selectedShop'));
    const [creatingProduct, setCreatingProduct] = useState<boolean>(false);
    const [shop, setShop] = useState<Shop | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (!selectedShop) {
            // Si no hay un negocio seleccionado, redirigir a /shop-selection
            router.replace('/shop-selection');
        }
    }, [router, selectedShop]);

    useEffect(() => {
        const shop = localStorage.getItem('selectedShop');
        setSelectedShop(shop);

        const fetchShop = async (shopId: string) => {
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

        if (shop) {
            fetchShop(shop);
        }
    }, [shop, refresh]);

    const handleCreate = () => {
        setCreatingProduct(true);
    };

    const handleCancelCreate = () => {
        setCreatingProduct(false);
    };

    const handleProductCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            <div className="flex w-full items-center">
                <div className='container w-full flex flex-col items-start justify-center'>
                    <h1 className='text-3xl font-medium font-open text-gray-700 mb-2'>Productos de <b className='font-bold text-gray-800'>{shop?.name}</b></h1>
                    <p className='text-base text-gray-500 font-inter'>Bienvenido a la página de productos. Aquí puedes encontrar una variedad de artículos disponibles para administrar.</p>
                </div>
                <div className=''>
                    <button
                        onClick={() => handleCreate()}
                        className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded whitespace-nowrap'
                    >
                        Nuevo producto
                    </button>
                </div>
            </div>
            <div className='container w-full h-full flex flex-col items-center'>
                {shop ? (
                    <div className='w-full'>
                        <ProductList shopId={shop.id} onProductCreated={handleProductCreated} />
                    </div>
                ) : (
                    <p>{error ? error : "Loading..."}</p>
                )}
            </div>

            {creatingProduct && shop && (
                <ProductCreationForm
                    shopId={shop.id}
                    onProductCreated={handleProductCreated}
                    onCancel={handleCancelCreate}
                />
            )}
        </>
    );
};

export default ProductsPage;