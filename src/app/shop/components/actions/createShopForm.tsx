"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/app/shop/components/ui/dialog"
import { Button } from "@/app/shop/components/ui/button"
import { Input } from "@/app/shop/components/ui/input"
import { Label } from "@/app/shop/components/ui/label"
import { ShopService } from "../../lib/service"
import { Shop } from "../../lib/model"

const shopService = new ShopService();

export function CreateShopForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const [shops, setShops] = useState<Shop[]>([]);
	const [formData, setFormData] = useState<Shop>({
		id: "0",
		name: "",
		address: "",
		contact_number: "",
		type: "",
	})
	const [imageFile, setImageFile] = useState<File | null>(null)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value });
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImageFile(e.target.files[0])
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const form = new FormData();

		// Añadir solo los campos que tienen valores
		Object.entries(formData).forEach(([key, value]) => {
			if (key === 'image' && !value) {
				return;
			}
			form.append(key, value as any);
		});

		// Si se seleccionó una imagen, agregarla al FormData
		if (imageFile) {
			form.append("image", imageFile);
		}

		try {
			// Enviar el FormData a través del servicio
			const createdShop = await shopService.createShop(form);

			setShops([...shops, createdShop]);
			setFormData({
				id: "0",
				name: "",
				address: "",
				contact_number: "",
				type: "",
			});
			setImageFile(null);
			alert("Formulario enviado con exito!");
		} catch (error) {
			console.error("Error creando la tienda:", error);
		}
		onClose();
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="text-center">Crear Nueva Tienda</DialogTitle>
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
							Crear Tienda
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}

