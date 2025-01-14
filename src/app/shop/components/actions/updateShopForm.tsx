"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/shop/components/ui/dialog"
import { Button } from "@/app/shop/components/ui/button"
import { Input } from "@/app/shop/components/ui/input"
import { Label } from "@/app/shop/components/ui/label"
import { Shop } from "../../lib/model"
import { ShopService } from "../../lib/service"

const shopService = new ShopService();

interface UpdateShopFormProps {
    isOpen: boolean
    onClose: () => void
    shop: Shop
    onUpdate: (updatedShop: Shop) => void;
}

export function UpdateShopForm({ isOpen, onClose, shop, onUpdate }: UpdateShopFormProps) {
    const [formData, setFormData] = useState(shop)
    const [imageFile, setImageFile] = useState<File>()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Actualizar el objeto Shop con los nuevos datos
        const updatedShop: Shop = {
            ...formData,
            image: imageFile || undefined,
        }

        try {
            // Llamar al servicio para actualizar la tienda
            await shopService.updateShop(updatedShop)
            onUpdate(updatedShop);
            console.log("Tienda actualizada:", updatedShop)
            onClose()
        } catch (error) {
            console.error("Error actualizando la tienda:", error)
        }
    }

    useEffect(() => {
        setFormData(shop)
    }, [shop])

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Actualizar Tienda</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Imagen</Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="contact_number">Teléfono</Label>
                            <Input
                                id="contact_number"
                                name="contact_number"
                                value={formData.contact_number}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Input
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                            Actualizar Tienda
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
