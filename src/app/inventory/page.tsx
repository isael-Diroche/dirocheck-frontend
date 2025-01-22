'use client'

import { Shop } from '@/app/shop/lib/model';
import { ShopService } from '@/app/shop/lib/service';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InventoryList from "@/app/inventory/components/inventoryList";

const shopService = new ShopService();

const InventoryPage = () => {
    const [shop, setShop] = useState<Shop | null>(null);
    const [refresh, setRefresh] = useState<boolean>(false);
    const router = useRouter();

    const fetchShop = async (shopId: string) => {
        try {
            const data = await shopService.getShop(shopId);
            setShop(data);
        } catch (error) {
            console.error("Error obteniendo negocio:", error);
        }
    };

    useEffect(() => {
        const shop = localStorage.getItem('selectedShop');

        if (!shop) {
            router.replace('/shop-selection');
        } else {
            fetchShop(shop);
        }
    }, [refresh]);

    return (
        <>
            <div className="w-full h-full">
                {shop && (
                    <InventoryList shopId={shop.id} />
                )}
            </div>
        </>
    );
};

export default InventoryPage;