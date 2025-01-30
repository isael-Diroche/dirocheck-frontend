"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateProductForm from "./components/Form/createProduct";
import { useProduct } from "./hooks/productContext";
import ModuleHeader from "@/shared/ui/Header";
import { useShop } from "../shop/hooks/ShopContext";
import { ExportProductsButton } from "@/app/products/components/exportProductsButton";
import { Button } from "./components/Shared/button";
import { BiCloudDownload, BiCloudUpload, BiPlus } from "react-icons/bi";
import ExportProductsDialog from "./components/Dialog/exportProducts";
import ImportProductsDialog from "./components/Dialog/importProducts";
import { ImportProductsButton } from "./components/importProductsButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/Shared/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

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
		closeImportDialog,
		importProducts,
		openExportDialog,
		openImportDialog,
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
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Abrir menú</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => openExportDialog()}>
								<BiCloudUpload className="mr-2 h-4 w-4" />
								<span>Exportar</span>
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => openImportDialog()}>
								<BiCloudDownload className="mr-2 h-4 w-4" />
								<span>Importar</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* <ExportProductsButton /> */}
					{/* <ImportProductsButton /> */}

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
