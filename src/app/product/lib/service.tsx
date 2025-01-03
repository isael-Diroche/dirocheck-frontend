import { Product } from "@/app/product/lib/model";
import { GenericService } from "@/app/shared/generic/service";

const API = "http://127.0.0.1:8000/api/v1";


export interface IProductService {
    getAllProducts(shopId: string): Promise<Product[]>;
    getProduct(shopId: string, productId: number): Promise<Product>;
    createProduct(shopId: string, product: Product): Promise<Product>;
    updateProduct(shopId: string, productId: number, product: Product): Promise<void>;
    deleteProduct(shopId: string, productId: number): Promise<void>;
}

export class ProductService implements IProductService {
    private productService: GenericService<Product>;
    static getAllProducts: any;

    constructor() {
        this.productService = new GenericService<Product>();
    }

    async getAllProducts(shopId: string): Promise<Product[]> {
        const products = await this.productService.getAllItems(`${API}/product`);
        if (!products.length) {
            throw new Error("No se encontraron productos");
        }
        const shop_products: Product[] = products.filter((product) => product.shop == shopId)
        return shop_products;
    }

    async getProduct(shopId: string, productId: number): Promise<Product> {
        const product = await this.productService.getItem(`${API}/product/${productId}/`);
        if (!product) {
            throw new Error("No se encontró el producto");
        }

        if (product.shop != shopId) throw new Error("No se encontró producto para este negocio");
        return product;
    }

    async createProduct(shopId: string, product: Product): Promise<Product> {
        product.shop = shopId;
        if (product.shop != shopId) {
            throw new Error("Error agregando producto a este negocio");
        }
        const created_product = await this.productService.createItem(`${API}/product/`, product);

        if (!created_product) {
            throw new Error("No se puedo crear el producto");
        }
        return created_product;
    }

    async updateProduct(shopId: string, productId: number, product: Product): Promise<void> {
        await this.getProduct(shopId, productId); // Verifica que el producto exista
        const success = await this.productService.updateItem(`${API}/product/${productId}/`, product);

        if (!success) {
            throw new Error("No se pudo actualizar el producto");
        }
    }

    async deleteProduct(shopId: string, productId: number): Promise<void> {
        await this.getProduct(shopId, productId); // Verifica que el producto exista
        const success = await this.productService.deleteItem(`${API}/product/${productId}/`);

        if (!success) {
            throw new Error("No se pudo eliminar el producto");
        }
    }
}
