import React, { useEffect, useState } from 'react';
import { ProductService } from '../../services/productService';
import { Product } from '../../types/productType';
import { useProduct } from '../../hooks/productContext';
interface DeleteProductDialogProps {
    product: Product;
    shopId: string;
    onSubmit: (product: Product) => void;
}

const productService = new ProductService();

const DeleteProductDialog: React.FC<DeleteProductDialogProps> = ({ product, shopId, onSubmit }) => {
    // const [products, setProducts] = useState<Product[]>([]);
    // const [deletedProduct, setDeletedProduct] = useState<Product>(product);
    const { fetchProducts } = useProduct();

    const handleDelete = async (productId: string) => {
        try {
            await productService.deleteProduct(shopId, productId);
            fetchProducts(shopId);
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    // const fetchProducts = async () => {
    //     try {
    //         const data = await productService.getAllProducts(shopId);
    //         setProducts(data);
    //     } catch (error) {
    //         console.error("Error obteniendo productos:", error);
    //     }
    // };


    useEffect(() => {
        fetchProducts(shopId);
    }, [shopId]);

    return (
        <>
            <button
                onClick={() => handleDelete(product.id)}
                className="text-red-600 hover:underline ml-4"
            >
                Eliminar
            </button>
        </>
    );
};

export default DeleteProductDialog;
