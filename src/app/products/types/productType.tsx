
export type Product = {
    id: string;
    shop: string;
    image_url: any;
    details: string;
    category: string;
    price: number;
    stock: number;
    unit_type: 'units' | 'lbs' | 'paqs';
    image: File | null;
    total: number;
}