"use client"

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/products/components/ui/table"
import { Button } from "@/app/products/components/ui/button"
import { Input } from "@/app/products/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/products/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/products/components/ui/select"
import { MoreHorizontal, Edit, Save, X, Trash2, ChevronLeft, ChevronRight, Filter, Plus } from "lucide-react"
import { ProductService } from "@/app/products/lib/service";
import CreateProductForm from "@/app/products/components/actions/createProductForm";
import { Product } from "../lib/model";
const productService = new ProductService();

const ITEMS_PER_PAGE = 9

const ProductsTable: React.FC<{ shopId: string; onProductCreated: () => void }> = ({ shopId, onProductCreated }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [editingProductId, setEditingProductId] = useState<number | null>(null)
	const [editedProduct, setEditedProduct] = useState<Product | null>(null)

	const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
	const [filters, setFilters] = useState({
		stock: "",
		price: "",
		search: "",
	})
	const [currentPage, setCurrentPage] = useState(1)
	const [showFilters, setShowFilters] = useState(false)

	const fetchProducts = async () => {
		try {
			const data = await productService.getAllProducts(shopId);
			setProducts(data);
		} catch (error) {
			console.error("Error obteniendo productos:", error);
		}
	};

	useEffect(() => {
		// Llamada inicial para cargar productos
		fetchProducts();
	}, []); // Solo se ejecuta una vez al montar el componente

	useEffect(() => {
		// Filtrar productos cuando cambian los filtros o la lista de productos
		const filtered = products.filter(product =>
			(filters.stock === "" || product.stock >= parseInt(filters.stock)) &&
			(filters.price === "" || product.price <= parseInt(filters.price)) &&
			(filters.search === "" || product.details.toLowerCase().includes(filters.search.toLowerCase()))
		);
	
		setFilteredProducts(filtered);
		setCurrentPage(1); 
	}, [filters, products]);

	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE
	)

	const handleEditClick = (product: Product) => {
		setEditingProductId(product.id)
		setEditedProduct({ ...product })
	}

	const handleInputChange = (field: keyof Product, value: string | number) => {
		if (editedProduct) {
			setEditedProduct({ ...editedProduct, [field]: value })
		}
	}

	const handleSaveEdit = async () => {
		if (editingProductId === null) return;

		try {
			await productService.updateProduct(shopId, editingProductId, editedProduct as Product);
			fetchProducts();
			setEditingProductId(null);
			setEditedProduct(null)
		} catch (error) {
			console.error("Error actualizando producto:", error);
		}
	}

	const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
	const [creatingProduct, setCreatingProduct] = useState<boolean>(false);

	const handleProductCreated = (newProduct: Product) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };
	const handleCancelCreate = () => {
		setCreatingProduct(false);
	};

	const handleCancelEdit = () => {
		setEditingProductId(null)
		setEditedProduct(null)
	}

	const handleDelete = async (id: number) => {
		setProducts(products.filter((p) => p.id !== id))
		try {
			await productService.deleteProduct(shopId, id);
			fetchProducts();
		} catch (error) {
			console.error("Error eliminando producto:", error);
		}
	}

	const handleFilterChange = (field: string, value: string) => {
		setFilters(prev => ({ ...prev, [field]: value }))
	}

	return (
		<>
			<div className="container mx-auto py-10 h-full">
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setShowFilters(!showFilters)}
						>
							<Filter className="mr-2 h-4 w-4" />
							{showFilters ? "Ocultar filtros" : "Mostrar filtros"}
						</Button>
						<Input
							placeholder="Buscar por detalles"
							value={filters.search}
							onChange={(e) => handleFilterChange("search", e.target.value)}
							className="max-w-sm"
						/>
					</div>
					<Button
						onClick={() => setIsCreateFormOpen(true)}
					>
						<Plus className="mr-2 h-4 w-4" />
						Nuevo Producto
					</Button>
				</div>
				{showFilters && (
					<div className="mb-4 flex items-center space-x-4">
						<Select onValueChange={(value) => handleFilterChange("stock", value)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filtrar por cantidad" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="0">Todos</SelectItem>
								<SelectItem value="10">10+</SelectItem>
								<SelectItem value="20">20+</SelectItem>
							</SelectContent>
						</Select>
						<Select onValueChange={(value) => handleFilterChange("price", value)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filtrar por precio" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="10000">Todos</SelectItem>
								<SelectItem value="50">Hasta $50</SelectItem>
								<SelectItem value="100">Hasta $100</SelectItem>
								<SelectItem value="1000">Hasta $1000</SelectItem>
							</SelectContent>
						</Select>
					</div>
				)}
				<Table>
					<TableHeader>
						<TableRow className="bg-mantis-500 hover:bg-mantis-600 border-mantis-700 text-mantis-50 ">
							<TableHead>Cantidad</TableHead>
							<TableHead>Detalles</TableHead>
							<TableHead>Costo</TableHead>
							<TableHead>Total</TableHead>
							<TableHead>Categoria</TableHead>
							<TableHead>Acciones</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginatedProducts.map((product) => (
							<TableRow key={product.id}>
								<TableCell>
									{editingProductId === product.id ? (
										<Input
											type="number"
											value={editedProduct?.stock}
											onChange={(e) => handleInputChange("stock", parseInt(e.target.value))}
											className="w-20"
										/>
									) : (
										product.stock
									)}
								</TableCell>
								<TableCell>
									{editingProductId === product.id ? (
										<Input
											type="text"
											value={editedProduct?.details}
											onChange={(e) => handleInputChange("details", e.target.value)}
										/>
									) : (
										product.details
									)}
								</TableCell>
								<TableCell>
									{editingProductId === product.id ? (
										<Input
											type="number"
											value={editedProduct?.price}
											onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
											className="w-24"
										/>
									) : (
										product.price
									)}
								</TableCell>
								<TableCell>{product.total}</TableCell>
								<TableCell>
									<span className="rounded-full border-mantis-500 text-mantis-700 hover:text-white hover:bg-mantis-500 border py-2 px-4">{product.category}</span>
								</TableCell>
								<TableCell>
									{editingProductId === product.id ? (
										<div className="flex space-x-2">
											<Button size="sm" onClick={handleSaveEdit}>
												<Save className="w-4 h-4 mr-1" />
												Guardar
											</Button>
											<Button size="sm" variant="outline" onClick={handleCancelEdit}>
												<X className="w-4 h-4 mr-1" />
												Cancelar
											</Button>
										</div>
									) : (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Abrir menú</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => handleEditClick(product)}>
													<Edit className="mr-2 h-4 w-4" />
													<span>Editar</span>
												</DropdownMenuItem>
												<DropdownMenuItem onClick={() => handleDelete(product.id)}>
													<Trash2 className="mr-2 h-4 w-4" />
													<span>Eliminar</span>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{totalPages > 1 && (
					<div className="flex items-center justify-end space-x-2 py-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-4 w-4" />
							Anterior
						</Button>
						<div className="text-sm font-medium">
							Página {currentPage} de {totalPages}
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
							disabled={currentPage === totalPages}
						>
							Siguiente
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				)}
			</div>
			{shopId && (
				<CreateProductForm
					isOpen={isCreateFormOpen}
					onClose={() => setIsCreateFormOpen(false)}
					shopId={shopId}
					onProductCreated={handleProductCreated}
					onCancel={handleCancelCreate}
				/>
			)}
		</>
	);
};

export default ProductsTable;