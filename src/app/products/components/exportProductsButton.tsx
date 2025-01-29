"use client";

import { BiCloudUpload } from "react-icons/bi";
import { Button } from "./Shared/button";
import { useProduct } from "../hooks/productContext";

interface ExportProductsButtonProps {
  // products: Product[];
}

export function ExportProductsButton({}: ExportProductsButtonProps) {
  const { openExportDialog } = useProduct();
  // const shop_id = localStorage.getItem("selectedShop");

  return (
    <Button variant="outline" onClick={() => openExportDialog()}>
      <BiCloudUpload />
      Exportar
    </Button>
  );
}
