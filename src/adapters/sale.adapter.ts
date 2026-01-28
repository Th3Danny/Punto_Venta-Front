import type { CartItem, SaleRequest, SaleItemRequest } from '@/models';

// Adaptador para convertir el carrito a formato de venta para el backend
export const cartToSaleAdapter = (cartItems: CartItem[], userId: number): SaleRequest => {
    const items: SaleItemRequest[] = cartItems.map(item => {
        const unitPrice = item.product.price;
        const amount = item.quantity;
        const subTotal = unitPrice * amount;
        const iva = subTotal * 0.16; // 16% IVA

        return {
            productId: item.product.id,
            amount,
            subTotal,
            iva
        };
    });

    return {
        atmId: userId,
        items
    };
};



