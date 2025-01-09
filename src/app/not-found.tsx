import React from "react";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center w-full">
            <h1 className="text-4xl font-bold text-gray-800">404 - Página No Encontrada</h1>
            <p className="text-gray-600 mt-4">
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <Link href="/">
                <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150">
                    Volver al Inicio
                </button>
            </Link>
        </div>
    );
};

export default NotFound;