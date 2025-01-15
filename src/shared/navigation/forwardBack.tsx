'use client'

import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';

const ForwardBackButtons: React.FC = () => {
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    useEffect(() => {
        const updateNavigationState = () => {
            setCanGoBack(window.history.state !== null && window.history.length > 1);
            setCanGoForward(false); // La API del navegador no ofrece un acceso directo al estado de "puedo ir hacia adelante"
        };

        // Actualiza el estado inicial al montar el componente
        updateNavigationState();

        // Escucha eventos de navegación (hacia atrás/adelante)
        window.addEventListener('popstate', updateNavigationState);

        // Limpia el evento al desmontar
        return () => {
            window.removeEventListener('popstate', updateNavigationState);
        };
    }, []);

    return (
        <div className="flex items-center gap-5">
            {/* Botón para ir hacia atrás */}
            <button
                onClick={() => canGoBack && window.history.back()}
                disabled={!canGoBack} // Deshabilita si no se puede ir hacia atrás
                className={`transition-opacity ${canGoBack ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                type="button"
            >
                <BiArrowBack className="w-4 h-4 text-gray-800" />
            </button>

            {/* Botón para ir hacia adelante */}
            <button
                onClick={() => canGoForward && window.history.forward()}
                disabled={!canGoForward} // Deshabilita si no se puede ir hacia adelante
                className={`transition-opacity ${canGoForward ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                type="button"
            >
                <BiArrowBack className="w-4 h-4 text-gray-800 rotate-180" />
            </button>
        </div>
    );
};

export default ForwardBackButtons;
