"use client"

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/products/components/Shared/table"
import { Button } from "@/app/products/components/Shared/button"
import { Input } from "@/app/products/components/Shared/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/products/components/Shared/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/products/components/Shared/select"
import { MoreHorizontal, Edit, Save, X, Trash2, ChevronLeft, ChevronRight, Filter, Search } from "lucide-react"
import { ProductService } from "@/app/products/services/productService";
import { Product } from "../types/productType";
import { useProduct } from "../hooks/productContext";

const productService = new ProductService();

const ITEMS_PER_PAGE = 8
interface ProductsTableProps {
	shopId: string;
}

export default function ProductsTable({ shopId }: ProductsTableProps) {
	const { products, fetchProducts, deleteProduct } = useProduct();

	// useEffect(() => {
	// 	fetchProducts(shopId);
	// }, []);

	const [editingProductId, setEditingProductId] = useState<string | null>(null)
	const [editedProduct, setEditedProduct] = useState<Product | null>(null)

	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [filters, setFilters] = useState({
		stock: "",
		price: "",
		category: "",
		search: "",
	})
	const [currentPage, setCurrentPage] = useState(1)
	const [showFilters, setShowFilters] = useState(false)

	useEffect(() => {
		// Filtrar productos cuando cambian los filtros o la lista de productos
		const filtered = products.filter(product =>
			(filters.stock === "" || product.stock >= parseInt(filters.stock)) &&
			(filters.price === "" || product.price <= parseInt(filters.price)) &&
			(filters.category === "all" || product.category.toLowerCase().includes(filters.category.toLowerCase())) &&
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
			fetchProducts(shopId);
			setEditingProductId(null);
			setEditedProduct(null)
		} catch (error) {
			console.error("Error actualizando producto:", error);
		}
	}

	const handleCancelEdit = () => {
		setEditingProductId(null)
		setEditedProduct(null)
	}

	const handleDelete = async (productId: string) => {
		try {
			await productService.deleteProduct(shopId, productId); // Llamada al backend para eliminar el producto
			deleteProduct(productId); // Actualiza el estado global para que se muestre instantaneamente
		} catch (error) {
			console.error("Error eliminando producto:", error);
		}
	};

	const handleFilterChange = (field: string, value: string) => {
		setFilters(prev => ({ ...prev, [field]: value }))
	}

	return (
		<>
			{products.length === 0 ? (
				<>
					<div className="flex w-full h-full items-center justify-center flex-col gap-4">
						<h1 className="text-xl font-open font-semibold text-gray-800">No hay productos disponibles para este negocio.</h1>
					</div>
				</>
			) : (
				<>
					<div className="h-full">
						<div className="mb-4 flex items-center justify-between">
							<div className="flex justify-between w-full flex-row-reverse items-center">
								<Button
									variant={showFilters ? "default" : "outline"}
									size="sm"
									onClick={() => setShowFilters(!showFilters)}
								>
									<Filter className="mr-2 h-4 w-4" />
									Filtros
								</Button>
								<div className="relative">
									<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground text-gray-500" />
									<Input
										value={filters.search}
										placeholder="Buscar por detalles"
										onChange={(e) => handleFilterChange("search", e.target.value)}
										className="pl-9 w-[300px] max-w-sm placeholder:font-golos font-golos text-md"
									/>
								</div>
							</div>
						</div>
						{showFilters && (
							<div className="mb-4 flex items-center gap-2 justify-end">
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
								<Select onValueChange={(value) => handleFilterChange("category", value)}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Filtrar por categoria" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">Todos</SelectItem>
										<SelectItem value="none">Sin categoria</SelectItem>
										<SelectItem value="cereales">Cereales</SelectItem>
										<SelectItem value="papeleria">Papeleria</SelectItem>
										<SelectItem value="herrería">Herreria</SelectItem>
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
						<div className="border rounded-lg">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Cantidad</TableHead>
										<TableHead>tipo</TableHead>
										<TableHead className="text-start">Detalles</TableHead>
										<TableHead>Costo</TableHead>
										<TableHead>Total</TableHead>
										{/* <TableHead>imagen</TableHead> */}
										<TableHead>Categoria</TableHead>
										<TableHead>Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{paginatedProducts.map((product) => (
										<TableRow key={product.id} className={editingProductId === product.id ? "bg-gray-50" : ""}>
											<TableCell width={24} className="text-center w-24">
												{editingProductId === product.id ? (
													<Input
														type="number"
														value={editedProduct?.stock}
														onChange={(e) => handleInputChange("stock", parseInt(e.target.value))}
														className="w-20 text-center"
													/>
												) : (
													product.stock
												)}
											</TableCell>
											<TableCell width={24} className="text-center w-24">
												{editingProductId === product.id ? (
													<select
														name="unit_type"
														value={editedProduct?.unit_type}
														onChange={(e) => handleInputChange("unit_type", e.target.value)}
														className="text-center bg-transparent"
													>
														<option value="units">Unidades</option>
														<option value="paqs">Paquetes</option>
														<option value="lbs">Libras</option>
													</select>
												) : (
													product.unit_type
												)}
											</TableCell>
											<TableCell className="text-start">
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
														className="w-24 text-center mx-auto	"
													/>
												) : (
													product.price
												)}
											</TableCell>
											<TableCell>{product.total}</TableCell>
											{/* <TableCell className="text-center">
												<Image
													src={product.image || image_default}
													alt={product.details}
													width={48}
													height={48}
													className="rounded-full mx-auto"
												/>
											</TableCell> */}
											<TableCell>
												<span className="rounded-full border-mantis-500 text-mantis-700 hover:text-white hover:bg-mantis-500 border py-1 px-3">
													{product.category}
												</span>
											</TableCell>
											<TableCell className="w-40">
												{editingProductId === product.id ? (
													<div className="flex space-x-2 justify-center">
														<Button size="sm" onClick={handleSaveEdit}>
															<Save className="w-4 h-4" />
														</Button>
														<Button size="sm" variant="outline" onClick={handleCancelEdit}>
															<X className="w-4 h-4" />
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
								<div className="flex flex-row w-full items-center justify-between px-3">
									<div className="">
										<p className="text-gray-800 text-sm font-medium">
											Mostrando {paginatedProducts.length} de {filteredProducts.length}
										</p>
									</div>
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
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};