'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Shop } from '../shop/lib/model';
import { ShopService } from '../shop/lib/service';
import ShopCreateForm from '../shop/components/createForm';

const shopService = new ShopService();

export default function ShopSelection() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    // const [selectedShop, setSelectedShop] = useState<string | null>(null);
    const router = useRouter();

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
            console.error("Error obteniendo negocio:", error);
        }
    };


    // const handleShopSelection = (shopId: string) => {
    //     // Guardar el negocio seleccionado en localStorage
    //     localStorage.setItem('selectedShop', shopId);
    //     setSelectedShop(shopId);

    //     // Recargar la página
    //     // window.location.reload();

    //     // Redirigir al Home principal
    //     router.replace('/');
    // };


    const handleAddShopClick = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };

    const handleSelectShop = (shopId: string) => {
        localStorage.setItem('selectedShop', shopId);
        window.dispatchEvent(new Event('shop-updated')); // Evento personalizado
        router.push('/');
    };

    useEffect(() => {
        fetchShops();
    }, []);

    return (
        <>
            <div className="container w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-lg">
                <h1 className="text-3xl font-bold mb-10 font-open text-gray-800">Selecciona un negocio</h1>
                {shops.length === 0 ? (
                    <p>Cargando negocios...</p>
                ) : (
                    <div className="grid w-[80%] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {shops.map((shop: any) => (
                            <button
                                key={shop.id}
                                onClick={() => handleSelectShop(shop.id)}
                                className="p-4 border rounded shadow hover:bg-gray-200"
                            >
                                {shop.name}
                            </button>
                        ))}
                        <button
                            onClick={handleAddShopClick}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md text-base font-inter hover:bg-blue-600 transition duration-100 ease-linear"
                        >
                            Añadir Negocio
                        </button>
                    </div>
                )}
            </div>

            {isFormVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <ShopCreateForm />
                        <button
                            onClick={handleCloseForm}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md text-base font-inter hover:bg-red-600 transition duration-100 ease-linear"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
