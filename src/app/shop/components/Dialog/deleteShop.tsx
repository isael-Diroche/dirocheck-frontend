"use client"

import { Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../Shared/dialog"
import { Button } from "@/app/products/components/Shared/button"
import { useShop } from "../../hooks/ShopContext"
import { Shop } from "../../types/shopType"
import { ShopService } from "../../services/shopService"

const shopService = new ShopService();

interface DeleteShopDialogProps {
    shop: Shop
}

export default function DeleteShopDialog({ shop }: DeleteShopDialogProps) {
    const {
        isDeleting,
        setIsDeleting,
        deleteFormStates,
        closeDeleteDialog,
        deleteShopStatus,
    } = useShop();

    const isDeleteDialogOpen = deleteFormStates[shop.id] || false;

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await shopService.deleteShop(shop.id);
            deleteShopStatus(shop.id);
        } catch (error) {
            console.error("Error eliminando el negocio:", error);
        } finally {
            setIsDeleting(false);
            closeDeleteDialog(shop.id);
        }
    }

    return (
        <Dialog open={isDeleteDialogOpen} onOpenChange={() => closeDeleteDialog(shop.id)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirmar Eliminación</DialogTitle>
                    <DialogDescription>
                    Al eliminar <b className="font-semibold text-gray-800">{shop.name}</b> no podrás recuperarlo. ¿Confirmas la eliminación?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => closeDeleteDialog(shop.id)}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                        <Trash2 size={16} className="mr-2" />   
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

