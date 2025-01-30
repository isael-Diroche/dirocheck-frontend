import { Plus } from 'lucide-react';
import React, { ReactNode } from 'react';

interface ModuleHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
}

export default function ModuleHeader({ title, description, children }: ModuleHeaderProps) {
    return (
        <>
            <header className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-golos font-semibold text-gray-800 capitalize">{title}</h1>
                    <p className="text-sm font-golos font-normal text-gray-600">{description}</p>
                </div>
                <div className="flex gap-2 items-center">
                    {children}
                </div>
            </header>
        </>
    );
};
