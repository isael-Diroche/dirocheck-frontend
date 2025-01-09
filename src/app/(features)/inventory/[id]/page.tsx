'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Inventory } from '@/app/inventory/lib/model';
import { InventoryService } from "@/app/inventory/lib/service";
import { Shop } from '@/app/shop/lib/model';
import { ProductService } from '@/app/product/lib/service'; // Servicio para obtener detalles de los productos

const inventoryService = new InventoryService();
const productService = new ProductService(); // Instancia del servicio de productos

const InventoryDetails = () => {
    const params = useParams();
    const inventoryId = params.id;

    const [selectedShop, setSelectedShop] = useState<string | null>(() => localStorage.getItem('selectedShop'));
    const [shop, setShop] = useState<Shop | null>(null);
    const [selectedInventoryProducts, setSelectedInventoryProducts] = useState<any[]>([]); // Array de productos con información detallada
    const [inventory, setInventory] = useState<Inventory>({
        id: 0,
        shop: "",
        products: [],
        name: "",
        total: 0
    });

    useEffect(() => {
        const shop = localStorage.getItem('selectedShop');
        setSelectedShop(shop);

        fetchInventories(shop?.toString());

        if (inventoryId) {
            fetchSelectedInventoryProducts();
        }
    }, [inventoryId]);

    const fetchInventories = async (shopId?: string) => {
        try {
            const data = await inventoryService.getInventory(shopId, inventoryId?.toString());
            setInventory(data);
        } catch (error) {
            console.error("Error obteniendo inventarios:", error);
        }
    };

    const fetchSelectedInventoryProducts = async () => {
        try {
            const productIds = inventory.products ?? []; // IDs de productos del inventario
            if (productIds.length > 0 && selectedShop) {
                // Obtener detalles de los productos desde el ProductService
                const productDetails = await Promise.all(
                    productIds.map(async (productId) => {
                        // Llamar al método getProduct con los parámetros correctos (shopId y productId)
                        return await productService.getProduct(selectedShop, productId);
                    })
                );
                setSelectedInventoryProducts(productDetails); // Guardar los productos detallados
            }
        } catch (error) {
            console.error("Error obteniendo productos del inventario:", error);
        }
    };

    return (
        <>
            <div className="container">
                <h1>
                    Inventario: {inventoryId?.toString()} del negocio: {selectedShop} llamado: {inventory?.name}
                </h1>
                <div>
                    <h2>Productos en el inventario:</h2>
                    {selectedInventoryProducts.length > 0 ? (
                        <ul>
                            {selectedInventoryProducts.map((product, index) => (
                                <li key={index}>
                                    <strong>{product.name}</strong> - {product.description}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay productos en este inventario.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default InventoryDetails;
