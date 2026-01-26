import type { Product } from './product.models';

// Item del carrito de compras (producto + cantidad)
export interface CartItem {
    product: Product;
    quantity: number;
    subtotal: number; // precio * cantidad
}

// Modelo para crear una venta en el backend
export interface SaleRequest {
    items: SaleItemRequest[];
    total: number;
}

// Item individual de la venta para enviar al backend
export interface SaleItemRequest {
    productId: number;
    quantity: number;
    price: number;
}

// Estado vacío del carrito
export const CartEmptyState: CartItem[] = [];
