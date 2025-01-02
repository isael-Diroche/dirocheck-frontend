'use client'

import ShopCreateForm from '../shop/components/createForm';
import ShopList from '../shop/components/shoplist';
import { useEffect, useState } from 'react';

export default function Home() {

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex w-full justify-between items-center mb-6">
                    <div className="flex flex-col justify-start items-start  gap-2">
                        <h1 className="text-4xl font-semibold text-gray-800 text-center mb-1 font-inter">Negocios</h1>
                        <p className="font-inter text-base text-gray-700">Selecciona un negocio para administrar</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-base font-inter hover:bg-blue-600 transition duration-100 ease-linear" >
                        Añadir Negocio
                    </button>
                </div>

                <div className="">
                    <ShopList />
                </div>
                
                <ShopCreateForm />
            </div>
        </>
    );
}