import type { Product } from './product.models';

// Item del carrito de compras (producto + cantidad)
export interface CartItem {
    product: Product;
    quantity: number;
    iva: number;
    subTotal: number;
}


export interface SaleRequest {
    atmId: number;   
    items: SaleItemRequest[]; 
}


export interface SaleItemRequest {
    productId: number;
    amount: number;
    subTotal: number;
    iva: number;
}


export interface SaleResponse {
    id: number;
    date: string;
    total: number;
    details: SaleDetail[];
}


export interface SaleDetail {
    productId: number;
    productName: string;
    amount: number;
    unitPrice: number;
    iva: number;
    subTotal: number;
}


export interface BackendSalesResponse {
    data: SaleResponse[];
    message: string;
    success: boolean;
    httpStatus: string;
}


export const CartEmptyState: CartItem[] = [];
