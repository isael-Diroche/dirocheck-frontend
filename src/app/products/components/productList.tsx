import React, { useEffect, useState } from "react";
import { ProductService } from "../services/productService";
import { Product } from "../types/productTypes";

const productService = new ProductService();

const ProductList: React.FC<{ shopId: string; onProductCreated: () => void }> = ({
    shopId,
    onProductCreated,
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});

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
    }, [shopId, onProductCreated]);

    const handleEditClick = (product: Product) => {
        setEditingProductId(product.id);
        setEditedProduct({ ...product });
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
        setEditedProduct({});
    };

    const handleSaveEdit = async () => {
        if (editingProductId === null) return;

        try {
            await productService.updateProduct(shopId, editingProductId, editedProduct as Product);
            fetchProducts();
            setEditingProductId(null);
        } catch (error) {
            console.error("Error actualizando producto:", error);
        }
    };

    const handleInputChange = (field: keyof Product, value: string | number) => {
        setEditedProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleDelete = async (productId: string) => {
        try {
            await productService.deleteProduct(shopId, productId);
            fetchProducts();
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    return (
        <div className="flex flex-col w-full mt-10">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-800 font-inter uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Cantidad</th>
                        <th scope="col" className="px-6 py-3">Detalles</th>
                        <th scope="col" className="px-6 py-3">Costo</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                        <th scope="col" className="px-6 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className="font-inter rounded-lg">
                            <td
                                contentEditable={editingProductId === product.id}
                                suppressContentEditableWarning
                                onInput={(e) =>
                                    handleInputChange("stock", (e.target as HTMLDivElement).innerText)
                                }
                                className={`px-6 py-4 ${editingProductId === product.id
                                    ? "border-2 border-blue-400 bg-blue-50 focus:outline-none inside"
                                    : ""
                                    }`}
                            >
                                {editingProductId === product.id
                                    ? editedProduct.stock
                                    : product.stock}
                            </td>
                            <td
                                contentEditable={editingProductId === product.id}
                                suppressContentEditableWarning
                                onInput={(e) =>
                                    handleInputChange("details", (e.target as HTMLDivElement).innerText)
                                }
                                className={`px-6 py-4 ${editingProductId === product.id
                                    ? "border-2 border-blue-400 bg-blue-50 focus:outline-none"
                                    : ""
                                    }`}
                            >
                                {editingProductId === product.id
                                    ? editedProduct.details
                                    : product.details}
                            </td>
                            <td
                                contentEditable={editingProductId === product.id}
                                suppressContentEditableWarning
                                onInput={(e) =>
                                    handleInputChange("price", parseFloat((e.target as HTMLDivElement).innerText))
                                }
                                className={`px-6 py-4 ${editingProductId === product.id
                                    ? "border-2 border-blue-400 bg-blue-50 focus:outline-none"
                                    : ""
                                    }`}
                            >
                                {editingProductId === product.id
                                    ? editedProduct.price
                                    : product.price}
                            </td>
                            <td className="px-6 py-4">{product.total}</td>
                            <td className="px-6 py-4">
                                {editingProductId === product.id ? (
                                    <>
                                        <button
                                            onClick={handleSaveEdit}
                                            className="text-green-600 hover:underline"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="text-red-600 hover:underline ml-4"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:underline ml-4"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
