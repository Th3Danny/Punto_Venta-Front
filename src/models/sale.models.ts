import type { Product } from './product.models';

// Item del carrito de compras (producto + cantidad)
export interface CartItem {
    product: Product;
    quantity: number;
    subtotal: number; // precio * cantidad
}

// Modelo para crear una venta en el backend (Debe coincidir con SaleRequest.java)
export interface SaleRequest {
    atmId: number;   // ID del cajero/usuario
    items: SaleItemRequest[]; // Antes era 'details'
}

// Item de la venta (Debe coincidir con SaleDetailRequest.java)
export interface SaleItemRequest {
    productId: number;
    amount: number;
}


// Representación de una venta devuelta por el backend
export interface SaleResponse {
    id: number;
    date: string; // ISO LocalDateTime
    total: number;
    details: SaleDetail[];
}

// Detalle de producto en una venta devuelta por el backend
export interface SaleDetail {
    productId: number;
    productName: string;
    amount: number;
    unitPrice: number;
    subtotal: number;
}

// Respuesta envuelta del backend para ventas
export interface BackendSalesResponse {
    data: SaleResponse[];
    message: string;
    success: boolean;
    httpStatus: string;
}

// Estado vacío del carrito
export const CartEmptyState: CartItem[] = [];

