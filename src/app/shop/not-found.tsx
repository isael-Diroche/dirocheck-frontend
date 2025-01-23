import React from "react";
import Link from "next/link";
import { Button } from "../products/components/Shared/button";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center w-full">
            <h1 className="text-4xl font-bold text-gray-800">404 - Página No Encontrada</h1>
            <p className="text-gray-600 mt-4">
                Lo sentimos, la página de negocios no existe.
            </p>
            <Link href="/products">
                <Button>Volver a productos</Button>
            </Link>
        </div>
    );
};

export default NotFound;