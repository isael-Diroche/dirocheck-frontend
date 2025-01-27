"use client"

import { useState, useEffect } from "react"
import { ShopService } from "../../services/shopService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/shop/components/Shared/dialog"
import { Label } from "@radix-ui/react-label";
import { Shop } from "../../types/shopType";
import { Button } from "../Shared/button";
import { Input } from "../Shared/input";
import { useShop } from "../../hooks/ShopContext";
import default_image from "@/public/images/image_default.webp"

const shopService = new ShopService();

interface UpdateShopFormProps {
    shop: Shop
    onShopUpdated: (shop: Shop) => void;
}

export function UpdateShopForm({ shop, onShopUpdated }: UpdateShopFormProps) {
    const {
        updateShopStatus,
        closeUpdateForm,
        updateFormStates,
        openDeleteDialog,
    } = useShop();
    const [formData, setFormData] = useState<Shop>(
        {
            id: shop.id || "",
            name: shop.name || "",
            address: shop.address || "",
            contact_number: shop.contact_number || "",
            type: shop.type || "",
            image: shop.image || null,
        }
    )

    const [imageFile, setImageFile] = useState<File | null>();
    const isUpdateFormOpen = updateFormStates[shop.id] || false;
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // setFormData({ ...formData, [name]: value });
        setFormData(prev => ({ ...prev, [name]: value }))
    };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target
    // }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file); // Guardar el archivo seleccionado
            setPreviewImage(URL.createObjectURL(file));    
        }
    }

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         const file = e.target.files[0];
    //         setImageFile(file); // Guardar el archivo seleccionado
    //         setPreviewImage(URL.createObjectURL(file)); // Generar URL para la vista previa
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();

        // Añadir solo los campos que tienen valores y no son imagen
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "image") return; // Omitir imagen aquí
            form.append(key, value as any);
        });

        // Si se seleccionó una imagen, agregarla al FormData
        if (imageFile) {
            form.append("image", imageFile);
        }

        try {
            const updatedShop = await shopService.updateShop(form, formData.id);
            updateShopStatus(formData);
            console.log("Negocio actualizado:", formData)
            onShopUpdated(updatedShop);
        } catch (error) {
            console.error("Error actualizando la tienda:", error)
        } finally {
            closeUpdateForm(formData.id);
        }
    }

    useEffect(() => {
        setFormData(shop);
    }, [shop]);

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
                        <img
                            src={ previewImage || formData.image || default_image}
                            alt="Vista previa de la tienda"
                            className="w-full h-auto"
                        />

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
                        <Button type="button" variant="destructive" onClick={() => openDeleteDialog(shop.id)}>
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
