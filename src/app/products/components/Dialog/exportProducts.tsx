'use client';

import { Button } from "@/app/products/components/Shared/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/app/shop/components/Shared/dialog";
import { Shop } from "@/app/shop/types/shopType";
import { useProduct } from "../../hooks/productContext";
import * as XLSX from "xlsx";
import { useShop } from "@/app/shop/hooks/ShopContext";
import { BiSolidDownload } from "react-icons/bi";
// const shopService = new ShopService();
// const productService = new ProductService();

interface ExportProductsDialogProps {
    shop: Shop
    isOpen: boolean;
    onClose: () => void;
}

export default function ExportProductsDialog({ shop, isOpen, onClose }: ExportProductsDialogProps) {
    const {
        products,
        closeExportDialog,
    } = useProduct();

    const handleExportToExcel = () => {
        try {
            const file_name = `${shop.name.toLowerCase().replace(' ', '-')}-products.xlsx`;
            // Crear una hoja de cálculo con los datos de los productos
            const worksheet = XLSX.utils.json_to_sheet(products);

            // Crear un libro de trabajo (workbook) y agregar la hoja
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

            // Generar un archivo Excel y descargarlo
            XLSX.writeFile(workbook, file_name);
        } catch (error) {
            console.error("Error", error);
        } finally {
            closeExportDialog();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Exportar productos</DialogTitle>
                    <DialogDescription>
                        <p>
                            {products.length > 1 ? (
                                <>
                                    Al exportar los productos, se generará un <strong>archivo</strong> con la información actual de los {products.length} productos. ¿Confirmas la exportación?
                                </>
                            ) : (
                                <>
                                    Son muy pocos productos para exportar
                                </>
                            )}
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="destructive" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="default" onClick={handleExportToExcel} disabled={products.length <= 1}>
                        <BiSolidDownload size={16} className="mr-2" />
                        Descargar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

