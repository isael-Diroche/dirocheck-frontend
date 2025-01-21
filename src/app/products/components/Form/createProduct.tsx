'use client';

import React, { useEffect, useState } from 'react';
// import axiosInstance from '@/core/axiosConfig';
import { Product } from '@/app/products/types/productTypes';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/app/shop/components/ui/dialog';
import { Button } from "@/app/shop/components/ui/button";
import { ProductService } from '../../services/productService';

const productService = new ProductService();
interface CreateProductFormProps {
    shopId: string;
    onProductCreated: (product: Product) => void;
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ shopId, onProductCreated, isOpen, onClose, onCancel }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState<Product>({
        id: "0",
        shop: shopId,
        image_url: null,
        details: '',
        category: 'none',
        price: 0,
        stock: 0,
        unit_type: 'units',
        expiration_date: null,
        image: null,
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

        // Añadir solo los campos que tienen valores
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'image' && !value) {
                return;
            }
            form.append(key, value as any);
        });

        try {
            const createdProduct = await productService.createProduct(shopId, formData);

            // Actualizar la lista de productos
            setProducts((prevProducts) => [...prevProducts, createdProduct]);

            // Limpiar el formulario
            setFormData({
                id: "0",
                shop: shopId,
                image_url: null,
                details: '',
                category: 'none',
                price: 0,
                stock: 0,
                unit_type: 'units',
                expiration_date: null,
                image: null,
                total: 0,
            });
            onProductCreated(createdProduct);
            onClose();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = products;
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

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
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category || ''}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
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
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Unit Type</label>
                                <select
                                    name="unit_type"
                                    value={formData.unit_type}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                >
                                    <option value="units">Unidades</option>
                                    <option value="lbs">Libras</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                                <input
                                    type="date"
                                    name="expiration_date"
                                    value={formData.expiration_date || Date.now()}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" onClick={onClose} className="bg-green-500 hover:bg-green-600 text-white">
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