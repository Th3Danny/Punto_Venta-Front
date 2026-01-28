import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '@/models';

// Estado inicial del carrito vacío
const initialState: CartItem[] = [];

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Agregar producto al carrito
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;
            // Verificar si el producto ya existe en el carrito
            const existingItem = state.find(item => item.product.id === product.id);

            if (existingItem) {
                // Si existe, incrementar cantidad y recalcular subtotal e iva
                existingItem.quantity += 1;
                existingItem.subTotal = existingItem.quantity * existingItem.product.price;
                existingItem.iva = existingItem.subTotal * 0.16;
            } else {
                // Si no existe, agregarlo con cantidad 1
                const subTotal = product.price;
                state.push({
                    product,
                    quantity: 1,
                    subTotal: subTotal,
                    iva: subTotal * 0.16
                });
            }
        },

        // Eliminar producto del carrito
        removeFromCart: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            return state.filter(item => item.product.id !== productId);
        },

        // Actualizar cantidad de un producto
        updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { productId, quantity } = action.payload;
            const item = state.find(item => item.product.id === productId);

            if (item && quantity > 0) {
                item.quantity = quantity;
                item.subTotal = item.quantity * item.product.price;
                item.iva = item.subTotal * 0.16;
            }
        },

        // Incrementar cantidad en 1
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const item = state.find(item => item.product.id === productId);

            if (item) {
                item.quantity += 1;
                item.subTotal = item.quantity * item.product.price;
                item.iva = item.subTotal * 0.16;
            }
        },

        // Decrementar cantidad en 1
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const productId = action.payload;
            const item = state.find(item => item.product.id === productId);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.subTotal = item.quantity * item.product.price;
                item.iva = item.subTotal * 0.16;
            }
        },

        // Limpiar todo el carrito (después de completar venta)
        clearCart: () => initialState
    }
});

// Exportar acciones
export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart
} = cartSlice.actions;

// Selector para obtener el total del carrito
export const selectCartTotal = (state: { cart: CartItem[] }): number =>
    state.cart.reduce((total, item) => total + item.subTotal, 0);

// Selector para obtener la cantidad de items en el carrito
export const selectCartItemsCount = (state: { cart: CartItem[] }): number =>
    state.cart.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
