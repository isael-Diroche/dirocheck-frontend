"use client"

import { useState, useEffect } from "react"
import { ShopService } from "../../services/shopService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/shop/components/Shared/dialog"
import { Label } from "@radix-ui/react-label";
import { Shop } from "../../types/shopType";
import { Button } from "../Shared/button";
import { Input } from "../Shared/input";
import { useShop } from "../../hooks/ShopContext";

const shopService = new ShopService();

interface UpdateShopFormProps {
    shop: Shop
}

export function UpdateShopForm({ shop }: UpdateShopFormProps) {
    const {
        updateShop,
        deleteShop,
        closeUpdateForm,
        updateFormStates,
    } = useShop();
    const [formData, setFormData] = useState(shop)
    const [imageFile, setImageFile] = useState<File>()
    const isUpdateFormOpen = updateFormStates[shop.id] || false;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await shopService.deleteShop(id);
            deleteShop(id);
        } catch (error) {
            console.error("Error eliminando la tienda:", error);
        } finally {
            closeUpdateForm(id);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Actualizar el objeto Shop con los nuevos datos
        const updateForm: Shop = {
            ...formData,
            image: imageFile,
        }

        try {
            await shopService.updateShop(updateForm)
            updateShop(updateForm);
            console.log("Negocio actualizado:", updateForm)
            closeUpdateForm(updateForm.id)
        } catch (error) {
            console.error("Error actualizando la tienda:", error)
        }
    }

    useEffect(() => {
        setFormData(shop)
    }, [shop])

    return (
        <Dialog open={isUpdateFormOpen} onOpenChange={() => closeUpdateForm(shop.id)}>
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
                    <DialogFooter className="flex flex-col justify-between items-center">
                        <Button type="button" variant="destructive" onClick={() => handleDelete(shop.id)}>
                            Eliminar
                        </Button>
                        <div className="flex gap-2 justify-end w-full">
                            <Button type="button" variant="outline" onClick={() => closeUpdateForm(shop.id)}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                                Actualizar Tienda
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
