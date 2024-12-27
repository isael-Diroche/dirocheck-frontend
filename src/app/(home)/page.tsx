'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '@/app/axiosConfig';

export default function Home() {
    interface Product {
        image_url: any;
        details: string;
        category: string;
        price: number;
        stock: number;
        unit_type: 'units' | 'lbs';
        expiration_date: string | null;
        image: File | null;
        total: number;
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({
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
            setProducts([...products, response.data]);
            setNewProduct({
                details: '',
                category: 'none',
                price: 0,
                stock: 0,
                unit_type: 'units',
                expiration_date: null,
                image: null,
                total: 0,
            });
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Dirochéck - Inventory</h1>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.details}
                                className="w-32 h-32 object-cover"
                            />
                        )}
                        {product.details} - {product.price} - {product.category}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Details</label>
                    <input
                        type="text"
                        name="details"
                        value={newProduct.details}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Unit Type</label>
                    <select
                        name="unit_type"
                        value={newProduct.unit_type}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="units">Unidades</option>
                        <option value="lbs">Libras</option>
                    </select>
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                    <input
                        type="date"
                        name="expiration_date"
                        value={newProduct.expiration_date || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
