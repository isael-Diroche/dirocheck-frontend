'use client'

import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';

const ForwardBackButtons: React.FC = () => {
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    useEffect(() => {
        const updateNavigationState = () => {
            setCanGoBack(window.history.state !== null);
            setCanGoForward(window.history.length > 1);
        };

        window.addEventListener('popstate', updateNavigationState);
        updateNavigationState();

        return () => {
            window.removeEventListener('popstate', updateNavigationState);
        };
    }, []);

    return (
        <div className="flex items-center gap-5">
            <button
                onClick={() => canGoBack && window.history.back()}
                className={`transition-opacity ${canGoBack ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-default'}`}
                type="button"
            >
                <BiArrowBack className="w-4 h-4 text-gray-800" />
            </button>
            <button
                onClick={() => canGoForward && window.history.forward()}
                className={`transition-opacity ${canGoForward ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-default'}`}
            >
                <BiArrowBack className="w-4 h-4 text-gray-800 rotate-180" />
            </button>
        </div>
    );
};

export default ForwardBackButtons;
