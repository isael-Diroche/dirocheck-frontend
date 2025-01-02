import React, { useEffect, useState } from 'react';
import { ProductService } from "../lib/service";
import { Product } from "../lib/model";

const productService = new ProductService();

const ProductList: React.FC<{ shopId: string }> = ({ shopId }) => {
    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = async () => {
        try {
            const data = await productService.getAllProducts(shopId);
            setProducts(data);
        } catch (error) {
            console.error("Error obteniendo productos:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [shopId]);

    return (
        <>
            <div className="flex flex-col w-full">
                <h1 className='mb-5 font-inter text-gray-800 font-semibold'>Estos son tus productos</h1>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-800 uppercase bg-gray-50">
                        <tr className='font-inter'>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Cantidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Detalles
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Costo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Shop
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className='font-inter'>
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-${product.id}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label
                                            htmlFor={`checkbox-${product.id}`}
                                            className="sr-only"
                                        >
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {product.stock}
                                </td>
                                <td className="px-6 py-4">{product.details}</td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">
                                    {product.total}
                                </td>
                                <td className="px-6 py-4">
                                    {product.shop}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProductList;