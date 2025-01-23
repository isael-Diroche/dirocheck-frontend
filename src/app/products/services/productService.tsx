import { GenericService } from "@/shared/generic/service";
import { Product } from "../types/productType";
import API from "@/core/api";

export interface IProductService {
    getAllProducts(shopId: string): Promise<Product[]>;
    getProduct(shopId: string, productId: string): Promise<Product>;
    createProduct(shopId: string, product: Product): Promise<Product>;
    updateProduct(shopId: string, productId: string, product: Product): Promise<void>;
    deleteProduct(shopId: string, productId: string): Promise<void>;
}

export class ProductService implements IProductService {
    private productService: GenericService<Product>;
    static getAllProducts: any;
    
    constructor() {
        this.productService = new GenericService<Product>();
    }

    private getProductUrl(productId?: string): string {
        return productId ? `${API}/product/${productId}/` : `${API}/product/`;
    }

    async getAllProducts(shopId: string): Promise<Product[]> {
        const products = await this.productService.getAllItems(this.getProductUrl());
        if (products) {
            const shop_products: Product[] = products.filter((product) => product.shop == shopId)
            return shop_products;
        } else {
            throw new Error("No se encontraron productos");
        }
    }

    async getProduct(shopId: string, productId: string): Promise<Product> {
        const product = await this.productService.getItem(this.getProductUrl(productId));
        if (product && product.shop == shopId) {
            return product;
        } else {
            throw new Error("No se encontró producto para este negocio");
        }
    }

    async createProduct(shopId: string, product: Product): Promise<Product> {
        product.shop = shopId;
        if (product.shop != shopId) {
            throw new Error("Error agregando producto a este negocio");
        }
        const created_product = await this.productService.createItem(this.getProductUrl(), product);

        if (!created_product) {
            throw new Error("No se puedo crear el producto");
        }
        return created_product;
    }

    async updateProduct(shopId: string, productId: string, product: Product): Promise<void> {
        await this.getProduct(shopId, productId); // Verifica que el producto exista
        const success = await this.productService.updateItem(this.getProductUrl(productId), product);

        if (!success) {
            throw new Error("No se pudo actualizar el producto");
        }
    }

    async deleteProduct(shopId: string, productId: string): Promise<void> {
        await this.getProduct(shopId, productId);
        const success = await this.productService.deleteItem(this.getProductUrl(productId));

        if (!success) {
            throw new Error("No se pudo eliminar el producto");
        }
    }
}