import type { CartItem, SaleRequest, SaleItemRequest } from '@/models';

// Adaptador para convertir el carrito a formato de venta para el backend
export const cartToSaleAdapter = (cartItems: CartItem[]): SaleRequest => {
    const items: SaleItemRequest[] = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
    }));

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    return {
        items,
        total
    };
};
