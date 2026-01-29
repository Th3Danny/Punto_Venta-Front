import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axios from 'axios';

import { useFetchAndLoad } from '@/hooks';
import { getProducts } from '@/services/product.services';
import { createSale } from '@/services/sale.services';
import { cartToSaleAdapter, salesProductsAdapter } from '../adapters/sales.adapter';
import {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    selectCartTotal,
    selectCartItemsCount
} from '@/redux/states/cart';
import type { Product, CartItem } from '@/models';

export const useSales = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, callEndpoint } = useFetchAndLoad();

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [processingCheckout, setProcessingCheckout] = useState(false);

    const user = useSelector((state: any) => state.user);
    const cartItems = useSelector((state: any) => state.cart as CartItem[]);
    const cartTotal = useSelector(selectCartTotal);
    const cartItemsCount = useSelector(selectCartItemsCount);

    const loadProducts = async () => {
        try {
            const response = await callEndpoint(getProducts());
            const responseData = response.data;
            const productList = Array.isArray(responseData.data)
                ? responseData.data
                : (Array.isArray(responseData) ? responseData : []);

            const adaptedProducts = salesProductsAdapter(productList);

            setProducts(adaptedProducts);
            setFilteredProducts(adaptedProducts);

            if (responseData.message && responseData.success) {
                enqueueSnackbar(responseData.message, { variant: 'success' });
            }
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            enqueueSnackbar('Error al cargar productos', { variant: 'error' });
            console.error('Error loading products:', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleSearch = useCallback((query: string) => {
        if (!query.trim()) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [products]);

    const handleAddToCart = (product: Product) => {
        const cartItem = cartItems.find(item => item.product.id === product.id);
        const currentQty = cartItem ? cartItem.quantity : 0;

        if (currentQty >= product.stock) {
            enqueueSnackbar('No hay suficiente stock disponible', { variant: 'error' });
            return;
        }

        dispatch(addToCart(product));
        enqueueSnackbar(`${product.name} agregado al carrito`, { variant: 'success' });
    };

    const handleIncrement = (productId: number) => {
        const product = products.find(p => p.id === productId);
        const cartItem = cartItems.find(item => item.product.id === productId);

        if (product && cartItem && cartItem.quantity >= product.stock) {
            enqueueSnackbar('No hay más stock disponible', { variant: 'warning' });
            return;
        }

        dispatch(incrementQuantity(productId));
    };

    const handleDecrement = (productId: number) => {
        dispatch(decrementQuantity(productId));
    };

    const handleRemove = (productId: number) => {
        dispatch(removeFromCart(productId));
        enqueueSnackbar('Producto eliminado del carrito', { variant: 'info' });
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            enqueueSnackbar('El carrito está vacío', { variant: 'warning' });
            return;
        }

        setProcessingCheckout(true);
        try {
            const saleData = cartToSaleAdapter(cartItems, user.id);
            await callEndpoint(createSale(saleData));

            dispatch(clearCart());
            await loadProducts();

            enqueueSnackbar('Venta procesada exitosamente', { variant: 'success' });
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            const errorMessage = error.response?.status === 403
                ? (error.response?.data?.message || 'No estás autorizado para realizar esta acción')
                : (error.response?.data?.message || error.message || 'Error al procesar la venta');
            enqueueSnackbar(errorMessage, { variant: 'error' });
            console.error('Error processing sale:', error);
        } finally {
            setProcessingCheckout(false);
        }
    };

    return {
        loading,
        products,
        filteredProducts,
        processingCheckout,
        cartItems,
        cartTotal,
        cartItemsCount,
        handleSearch,
        handleAddToCart,
        handleIncrement,
        handleDecrement,
        handleRemove,
        handleCheckout,
        loadProducts,
        user
    };
};
