"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateProductForm from "./components/Form/createProduct";
import { useProduct } from "./hooks/productContext";
import ModuleHeader from "@/shared/ui/Header";
import { useShop } from "../shop/hooks/ShopContext";
import { ExportProductsButton } from "@/app/products/components/exportProductsButton";
import { Button } from "./components/Shared/button";
import { BiPlus } from "react-icons/bi";
import ExportProductsDialog from "./components/Dialog/exportProducts";
import ImportProductsDialog from "./components/Dialog/importProducts";
import { ImportProductsButton } from "./components/importProductsButton";

const ProductsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    isCreateFormOpen,
    openCreateForm,
    closeCreateForm,
    products,
    isExportDialogOpen,
    closeExportDialog,
    isImportDialogOpen,
    openImportDialog,
    closeImportDialog,
    importProducts,
  } = useProduct();

  const { shop, fetchShop } = useShop();
  const router = useRouter();

  useEffect(() => {
    const selected_shop = localStorage.getItem("selectedShop");

    if (!selected_shop) {
      router.replace("/shop-selection");
    } else {
      fetchShop(selected_shop);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (shop) {
      try {
        await importProducts(shop.id, file);
        console.log("Archivo importado exitosamente");
      } catch (error) {
        console.error("Error al importar el archivo:", error);
      }
    }
  };

  return (
    <>
      {shop && (
        <>
          <ImportProductsDialog
            shop={shop}
            isOpen={isImportDialogOpen}
            onClose={closeImportDialog}
            onFileUpload={handleFileUpload}
          />
          <CreateProductForm
            isOpen={isCreateFormOpen}
            onClose={closeCreateForm}
            shopId={shop.id}
          />

          <ExportProductsDialog
            shop={shop}
            isOpen={isExportDialogOpen}
            onClose={closeExportDialog}
          />
        </>
      )}

      <div className="flex flex-col gap-6 w-full h-full">
        <ModuleHeader
          title={"Productos"}
          description="Vista de todos los productos de tu negocio."
        >
          <ExportProductsButton />
          <Button onClick={openImportDialog}>
            <BiPlus className="h-4 w-4" />
            Importar Productos
          </Button>
          <Button onClick={openCreateForm}>
            <BiPlus className="h-4 w-4" />
            Añadir Nuevo
          </Button>
        </ModuleHeader>

        <main className="flex w-full h-full">{children}</main>
      </div>
    </>
  );
};

export default ProductsLayout;
