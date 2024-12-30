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
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-bold mb-6 text-center">Dirochéck - Inventory</h1>

                <ul className="grid grid-cols-4 gap-4">
                    <li className='flex border-b-2 border-gray-300 col-span-4'>
                        <div className="py-2 px-4 font-bold font-inter">Cantidad</div>
                        <div className="py-2 px-4 font-bold font-inter">Detalles</div>
                        <div className="py-2 px-4 font-bold font-inter">Costo</div>
                        <div className="py-2 px-4 font-bold font-inter">Total</div>
                    </li>
                    {products.map((product, index) => (
                        <li key={index} className="flex border-b-2 border-gray-300 text-gray-600 hover:bg-gray-100 text-base col-span-4">
                            <div className="py-2 px-4 font-medium font-inter">{product.stock}</div>
                            <div className="py-2 px-4 font-medium font-inter">{product.details}</div>
                            <div className="py-2 px-4 font-medium font-inter">{product.price}</div>
                            <div className="py-2 px-4 font-inter text-gray-900 font-bold">${product.total}</div>
                        </li>
                    ))}
                </ul>
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
                            value={newProduct.price || 0}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock || 0}
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
                            value={newProduct.expiration_date || ''}
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
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </>
    );
}
