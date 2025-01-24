import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from "@/app/products/components/Shared/button"

interface ModuleHeaderProps {
    title: string;
    description?: string;
    buttonLabel?: string;
    buttonFunction?: () => void;
}

export default function ModuleHeader({ title, description, buttonLabel, buttonFunction }: ModuleHeaderProps) {


    return (
        <>
            <header className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-golos font-semibold text-gray-800 capitalize">{title}</h1>
                    <p className="text-sm font-golos font-normal text-gray-600">{description}</p>
                </div>
                {buttonLabel && buttonFunction &&
                    (
                        <Button
                            onClick={buttonFunction}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            {buttonLabel}
                        </Button>
                    )
                }
            </header>
        </>
    );
};
