
export type Product = {
    id: string;
    shop: string;
    details: string;
    category: string;
    price: number;
    stock: number;
    unit_type: 'units' | 'lbs' | 'paqs';
    total: number;
}