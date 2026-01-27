import type { CartItem, SaleRequest, SaleItemRequest } from '@/models';

// Adaptador para convertir el carrito a formato de venta para el backend
export const cartToSaleAdapter = (cartItems: CartItem[], userId: number): SaleRequest => {
    const items: SaleItemRequest[] = cartItems.map(item => ({
        productId: item.product.id,
        amount: item.quantity
    }));

    return {
        atmId: userId,
        items
    };
};



