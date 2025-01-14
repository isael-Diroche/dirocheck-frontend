'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shop } from '@/app/shop/lib/model';
import { ShopService } from '@/app/shop/lib/service';
import ProductList from '@/app/product/components/productList';
import ProductCreationForm from '@/app/product/components/createForm';

const shopService = new ShopService();

const ShopPage: React.FC = () => {
    const { shopId } = useParams<{ shopId: string }>();
    const [creatingProduct, setCreatingProduct] = useState<boolean>(false);
    const [shop, setShop] = useState<Shop | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);

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

    const handleCreate = () => {
        setCreatingProduct(true);
    };

    const handleCancelCreate = () => {
        setCreatingProduct(false);
    };

    useEffect(() => {
        fetchShop();
    }, [refresh]);

    const handleProductCreated = () => {
        setRefresh(!refresh);
    };

    return (
        <>
            <div className='w-full h-svh'>
                <div className="flex w-full justify-between items-center">
                    <div className="">
                        <h1 className='text-2xl font-inter font-medium text-gray-800'>{shop?.name}</h1>
                    </div>
                    <button
                        onClick={() => handleCreate()}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded'
                    >
                        Crear Producto
                    </button>
                </div>

                {shop ? (
                    <div className='w-full'>
                        <ProductList shopId={shopId} onProductCreated={handleProductCreated} />
                    </div>
                ) : (
                    <p>{error ? error : "Loading..."}</p>
                )}

                {creatingProduct && (
                    <ProductCreationForm
                        shopId={shopId}
                        onProductCreated={handleProductCreated}
                        onCancel={handleCancelCreate}
                    />
                )}

            </div>
        </>
    );
};

export default ShopPage;
