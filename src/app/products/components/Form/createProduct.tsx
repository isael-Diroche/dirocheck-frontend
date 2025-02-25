'use client';

import React, { useState } from 'react';
import { Product } from '@/app/products/types/productType';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/shop/components/Shared/dialog';
import { Button } from "@/app/shop/components/Shared/button";
import { ProductService } from '../../services/productService';
import { useProduct } from '../../hooks/productContext';

const productService = new ProductService();
interface CreateProductFormProps {
    shopId: string;
    isOpen: boolean;
    onClose: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ shopId, isOpen, onClose }) => {
    const { fetchProducts, addProduct } = useProduct();

    const [formData, setFormData] = useState<Product>({
        id: "0",
        shop: shopId,
        details: '',
        // category: 'none',
        price: 0,
        stock: 0,
        // unit_type: 'units',
        total: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
    
        // Añadir todos los campos al FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'image') {
                // Si no hay imagen, enviar null para que el backend asigne la predeterminada
                form.append(key, value || '');
            } else {
                form.append(key, value as any);
            }
        });
    
        try {
            // Envía los datos al backend
            const createdProduct = await productService.createProduct(shopId, formData);
            fetchProducts(shopId);
    
            // Limpiar el formulario después de crear el producto
            setFormData({
                id: "0",
                shop: shopId,
                details: '',
                // category: 'none',
                price: 0,
                stock: 0,
                // unit_type: 'units',
                total: 0,
            });
    
            addProduct(createdProduct);
            onClose();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
    

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">Crear Nuevo Produto</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="bg-white">
                        <div className="grid gap-4 py-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Details</label>
                                <input
                                    type="text"
                                    name="details"
                                    value={formData.details || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div> */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Unit Type</label>
                                <select
                                    name="unit_type"
                                    value={formData.unit_type}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                >
                                    <option value="units">Unidades</option>
                                    <option value="paqs">Paquetes</option>
                                    <option value="lbs">Libras</option>
                                </select>
                            </div> */}
                            {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div> */}
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white">
                                Crear Producto
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateProductForm;