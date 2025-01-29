"use client";

import { Button } from "@/app/products/components/Shared/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/app/shop/components/Shared/dialog";
import { Shop } from "@/app/shop/types/shopType";
import { BiSolidCloud } from "react-icons/bi";
import { useRef, useState } from "react";

interface ImportProductsDialogProps {
    shop: Shop;
    isOpen: boolean;
    onClose: () => void;
    onFileUpload: (file: File) => Promise<void>;
}

export default function ImportProductsDialog({
    shop,
    isOpen,
    onClose,
    onFileUpload,
}: ImportProductsDialogProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            if (!file.name.match(/\.(xlsx|xls)$/)) {
                alert("Por favor, selecciona un archivo válido (.xlsx o .xls).");
                return;
            }

            setIsUploading(true);

            try {
                await onFileUpload(file);
                onClose(); // Cerrar el diálogo después de una importación exitosa
            } catch (error) {
                console.error("Error al importar productos:", error);
                alert(
                    "Hubo un problema al importar los productos. Por favor, inténtalo de nuevo."
                );
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Importar productos</DialogTitle>
                    <DialogDescription>
                        Sube un archivo <strong>Excel</strong> con los datos de los
                        productos para agregarlos a la tienda <strong>{shop.name}</strong>.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="default"
                        onClick={triggerFileInput}
                        disabled={isUploading}
                    >
                        <BiSolidCloud size={16} className="mr-2" />
                        {isUploading ? "Subiendo..." : "Seleccionar archivo"}
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".xlsx, .xls"
                        className="hidden"
                    />
                    <Button
                        variant="destructive"
                        onClick={onClose}
                        disabled={isUploading}
                    >
                        {isUploading ? "Procesando..." : "Cancelar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
