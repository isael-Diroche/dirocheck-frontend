
import React, { useEffect, useState } from 'react';
import { ProductService } from "../lib/service";
import { Product } from "../lib/model";
import UpdateForm from './updateForm';
import { ShopService } from '@/app/shop/lib/service';
import { Shop } from '@/app/shop/lib/model';

const productService = new ProductService();
const shopService = new ShopService();

const ProductList: React.FC<{ shopId: string, onProductCreated: () => void }> = ({ shopId, onProductCreated }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [updatingProduct, setUpdatingProduct] = useState<Product | null>(null);
    const [shops, setShops] = useState<Shop[]>([]);

    const fetchShops = async () => {
        try {
            const data = await shopService.getAllShop();
            setShops(data);
        } catch (error) {
            console.error("Error obteniendo tiendas:", error);
        }
    };

    useEffect(() => {
        fetchShops();
    }, []);

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

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [onProductCreated]);

    const handleDelete = async (productId: number) => {
        try {
            await productService.deleteProduct(shopId, productId);
            fetchProducts();
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    const handleUpdate = (product: Product) => {
        setUpdatingProduct(product);
    };

    const handleUpdateFormSubmit = async (updatedProduct: Product) => {
        const originalShop = shops.find(shop => shop.id === shopId);
        const newShop = shops.find(shop => shop.id === updatedProduct.shop);

        if (originalShop && newShop && originalShop.id !== newShop.id) {
            const confirm = window.confirm(`Este producto dejará de aparecer en ${originalShop.name} y se pasará a ${newShop.name}. ¿Desea continuar?`);
            if (!confirm) {
                return;
            }
        }

        try {
            await productService.updateProduct(shopId, updatedProduct.id, updatedProduct);
            setUpdatingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error("Error actualizando producto:", error);
        }
    };

    const handleCancelUpdate = () => {
        setUpdatingProduct(null);
    };

    return (
        <>
            <div className="flex flex-col w-full mt-10">
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
                                Acciones
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
                                    <button
                                        onClick={() => handleUpdate(product)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Actualizar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-600 hover:underline ml-4"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {updatingProduct && (
                    <UpdateForm
                        product={updatingProduct}
                        onSubmit={handleUpdateFormSubmit}
                        onCancel={handleCancelUpdate}
                        shops={shops}
                    />
                )}

            </div>
        </>
    );
};

export default ProductList;