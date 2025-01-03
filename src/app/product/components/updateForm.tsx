import React, { useEffect, useState } from 'react';
import { Product } from '../lib/model';
import { Shop } from '@/app/shop/lib/model';

interface UpdateFormProps {
    product: Product;
    shops: Shop[];
    onSubmit: (product: Product) => void;
    onCancel: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ product, shops, onSubmit, onCancel }) => {
    const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (updatedProduct.shop.toString() !== product.shop.toString()) {
            const newShop = shops.find(shop => shop.id.toString() === updatedProduct.shop)?.name;
            if (window.confirm(`Este producto dejará de aparecer en este negocio y se pasará a ${newShop}. ¿Desea continuar?`)) {
                onSubmit(updatedProduct);
            }
        } else {
            onSubmit(updatedProduct);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h2 className="text-lg font-semibold">Actualizar Producto</h2>
            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                <input
                    type="number"
                    name="stock"
                    value={updatedProduct.stock}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Detalles</label>
                <input
                    type="text"
                    name="details"
                    value={updatedProduct.details}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Costo</label>
                <input
                    type="number"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                    {showAdvanced ? 'Ocultar Avanzados' : 'Mostrar Avanzados'}
                </button>
            </div>
            {showAdvanced && (
                <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700">Shop</label>
                    <select
                        name="shop"
                        value={updatedProduct.shop}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    >
                        {shops.map(shop => (
                            <option key={shop.id} value={shop.id}>
                                {shop.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="mt-4 flex justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Actualizar
                </button>
            </div>
        </form>
    );
};

export default UpdateForm;
