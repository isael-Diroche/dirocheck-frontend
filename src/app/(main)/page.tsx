'use client'

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const selectedShop = localStorage.getItem('selectedShop');

    useEffect(() => {
        if (!selectedShop) {
            // Si no hay un negocio seleccionado, redirigir a /shop-selection
            router.replace('/shop-selection');
        }
    }, [router]);

    // Mostrar el contenido del negocio si está seleccionado
    if (!selectedShop) return null; // Mostrar nada mientras se redirige

    return (
        <>
            <div className="container flex w-full flex-col justify-center items-center h-full">
                <h1 className='text-2xl font-semibold font-inter text-gray-800 mb-2'>Bienvenido a {selectedShop}</h1>
                <p className='text-base text-gray-500 font-inter'>Aqui podras crear inventarios y productos para la gestion de tu negocio.</p>
                Total de productos: None
            </div>
        </>
    );
}