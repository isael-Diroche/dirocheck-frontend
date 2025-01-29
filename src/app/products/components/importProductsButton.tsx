import { BiCloudDownload } from "react-icons/bi";
import { Button } from "./Shared/button";
import { useProduct } from "../hooks/productContext";

export function ImportProductsButton() {
	const { openImportDialog } = useProduct();

	return (
		<Button variant="outline" onClick={() => openImportDialog()}>
			<BiCloudDownload />
			Importar
		</Button>
	);
}
