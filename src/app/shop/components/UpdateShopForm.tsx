"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shop } from "../lib/model"
import { ShopService } from "../lib/service"

const shopService = new ShopService();

interface UpdateShopFormProps {
    isOpen: boolean
    onClose: () => void
    shop: Shop
}

export function UpdateShopForm({ isOpen, onClose, shop }: UpdateShopFormProps) {
    const [formData, setFormData] = useState(shop)
    const [imageFile, setImageFile] = useState<File | null>(null)

    useEffect(() => {
        setFormData(shop)
    }, [shop])

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

        // Crear un objeto FormData
        const form = new FormData()
        
		// Añadir solo los campos que tienen valores
		Object.entries(formData).forEach(([key, value]) => {
			if (key === 'image' && !value) {
				return;
			}
			form.append(key, value as any);
		});

        // Si se seleccionó una imagen, agregarla al FormData
        if (imageFile) {
            form.append("image", imageFile)
        }

        // Enviar los datos al backend (aquí simplemente se imprime para ejemplo)
        try {
            // Aquí normalmente enviarías el FormData al backend usando fetch o axios
            // Ejemplo con fetch:
            if(!shop.id)
                return;
            const response = await shopService.updateShop(shop.id, shop)

            // if (!response) {
            //     throw new Error("Error al actualizar la tienda")
            // }

            // Si la respuesta es correcta, puedes procesar los datos como sea necesario
            const updatedShop = await response
            console.log("Tienda actualizada:", updatedShop)

            // Cerrar el formulario después de la actualización
            onClose()
        } catch (error) {
            console.error("Error actualizando la tienda:", error)
        }
    }

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
                            <Label htmlFor="contactNumber">Teléfono</Label>
                            <Input
                                id="contactNumber"
                                name="contactNumber"
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
