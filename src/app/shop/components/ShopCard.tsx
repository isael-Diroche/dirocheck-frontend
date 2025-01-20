"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/app/shop/components/ui/card"
import { Button } from "@/app/shop/components/ui/button"
import { CalendarIcon, MapPinIcon, PhoneIcon, InfoIcon, Edit2Icon } from "lucide-react"
import { Badge } from "@/app/shop/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/shop/components/ui/tooltip"
import { UpdateShopForm } from "./actions/updateShopForm"
import { Shop } from "../lib/model"
import { useRouter } from "next/navigation"
import default_image from "@/public/image/image_default.webp"

interface ShopCardProps {
    shop: Shop
    onUpdate: (updatedShop: Shop) => void;
    onDelete: (id: string) => void;
}

export default function ShopCard({ shop, onUpdate, onDelete }: ShopCardProps) {
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)
    const router = useRouter();

    const handleSelectShop = (shopId: string) => {
        localStorage.setItem('selectedShop', shopId);
        window.dispatchEvent(new Event('shop-updated')); // Evento personalizado
        router.push('/');
    };

    return (
        <Card className="overflow-hidden">
            <div className="relative">
                {
                    shop.image ? (
                        <Image
                            src={shop.image}
                            alt={shop.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                        />

                    ) : (
                        <Image
                            src={default_image}
                            alt={shop.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover"
                        />
                    )
                }

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 left-2 h-8 w-8 bg-white bg-opacity-50 hover:bg-opacity-75"
                            >
                                <InfoIcon className="h-4 w-4" />
                                <span className="sr-only">Más información</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="space-y-2 text-sm">
                                <p className="flex items-center">
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    Creado: {new Date(shop.created_at).toLocaleDateString()}
                                </p>
                                <p className="flex items-center">
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    Última actualización: {new Date(shop.updated_at).toLocaleDateString()}
                                </p>
                                <p className="flex items-center">
                                    <PhoneIcon className="w-4 h-4 mr-2" />
                                    {shop.contact_number}
                                </p>
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-white bg-opacity-50 hover:bg-opacity-75"
                    onClick={() => setIsUpdateFormOpen(true)}
                >
                    <Edit2Icon className="h-4 w-4" />
                    <span className="sr-only">Editar tienda</span>
                </Button>
                <Badge className="absolute bottom-2 right-2 bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
                    {shop.type}
                </Badge>
            </div>
            <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{shop.name}</h2>
                <p className="flex items-center text-sm text-gray-600">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {shop.address}
                </p>
            </CardContent>
            <CardFooter className="p-4 bg-gray-50">
                <Button
                    onClick={() => handleSelectShop(shop.id)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Seleccionar
                </Button>
            </CardFooter>

            <UpdateShopForm
                isOpen={isUpdateFormOpen}
                onClose={() => setIsUpdateFormOpen(false)}
                shop={shop}
                onUpdate={onUpdate}
                onDelete={onDelete}
            />
        </Card>
    )
}

