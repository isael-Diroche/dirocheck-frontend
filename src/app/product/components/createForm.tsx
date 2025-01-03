'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '@/app/axiosConfig';
import { Product } from '@/app/product/lib/model';

interface ProductCreationFormProps {
    shopId: string;
    onProductCreated: (product: Product) => void;
}

const ProductCreationForm: React.FC<ProductCreationFormProps & { onCancel: () => void }> = ({ shopId, onProductCreated, onCancel }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
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
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files) {
            setNewProduct({ ...newProduct, [name]: files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        // Añadir solo los campos que tienen valores
        Object.entries(newProduct).forEach(([key, value]) => {
            if (key === 'image' && !value) {
                return;
            }
            formData.append(key, value as any);
        });

        try {
            const response = await axiosInstance.post('product/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const createdProduct = response.data;
            setProducts([...products, createdProduct]);
            setNewProduct({
                id: 0,
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
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('product/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Details</label>
                    <input
                        type="text"
                        name="details"
                        value={newProduct.details || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={newProduct.category || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Unit Type</label>
                    <select
                        name="unit_type"
                        value={newProduct.unit_type}
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
                        value={newProduct.expiration_date || Date.now()}
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
                <button
                    onClick={onCancel}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </>
    );
};

export default ProductCreationForm;