import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useFetchAndLoad } from '@/hooks';
import { getProducts } from '@/services/product.services';
import { createSale } from '@/services/sale.services';
import { productsAdapter } from '@/adapters';
import { cartToSaleAdapter } from '@/adapters';
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
import { ProductSearch, ProductList, Cart, CartSummary } from './components';

export const Sales = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, callEndpoint } = useFetchAndLoad();

    // Estado local para productos
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [processingCheckout, setProcessingCheckout] = useState(false);

    // Obtener datos del carrito desde Redux
    const cartItems = useSelector((state: any) => state.cart as CartItem[]);
    const cartTotal = useSelector(selectCartTotal);
    const cartItemsCount = useSelector(selectCartItemsCount);

    // Cargar productos al montar el componente
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const response = await callEndpoint(getProducts());

            // Verificamos si la respuesta tiene la estructura { data: [productos], ... }
            // o si es directamente el array de productos.
            const responseData = response.data;
            const productList = Array.isArray(responseData.data)
                ? responseData.data
                : (Array.isArray(responseData) ? responseData : []);

            const adaptedProducts = productsAdapter(productList);
            // Solo mostrar productos activos en el POS
            const activeProducts = adaptedProducts.filter(p => p.active);
            setProducts(activeProducts);
            setFilteredProducts(activeProducts);

            // Mostrar mensaje de éxito si existe en el envoltorio de la respuesta
            if (responseData.message && responseData.success) {
                enqueueSnackbar(responseData.message, { variant: 'success' });
            }
        } catch (error: any) {

            if (axios.isCancel(error)) return;
            enqueueSnackbar('Error al cargar productos', { variant: 'error' });
            console.error('Error loading products:', error);
        }

    };

    // Manejar búsqueda de productos con filtrado local
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

    // Agregar producto al carrito
    const handleAddToCart = (product: Product) => {
        // Verificar si ya hay items en el carrito para este producto
        const cartItem = cartItems.find(item => item.product.id === product.id);
        const currentQty = cartItem ? cartItem.quantity : 0;

        if (currentQty >= product.stock) {
            enqueueSnackbar('No hay suficiente stock disponible', { variant: 'error' });
            return;
        }

        dispatch(addToCart(product));
        enqueueSnackbar(`${product.name} agregado al carrito`, { variant: 'success' });
    };

    // Incrementar cantidad
    const handleIncrement = (productId: number) => {
        dispatch(incrementQuantity(productId));
    };

    // Decrementar cantidad
    const handleDecrement = (productId: number) => {
        dispatch(decrementQuantity(productId));
    };

    // Eliminar del carrito
    const handleRemove = (productId: number) => {
        dispatch(removeFromCart(productId));
        enqueueSnackbar('Producto eliminado del carrito', { variant: 'info' });
    };

    // Procesar venta (checkout)
    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            enqueueSnackbar('El carrito está vacío', { variant: 'warning' });
            return;
        }

        setProcessingCheckout(true);
        try {
            // Convertir carrito a formato de venta (pasando el ID del usuario actual)
            const saleData = cartToSaleAdapter(cartItems, user.id);


            // Enviar venta al backend
            await callEndpoint(createSale(saleData));

            // Limpiar carrito
            dispatch(clearCart());

            // Recargar productos para actualizar stock real desde el servidor
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

    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const role = (user?.role || '').toString().toUpperCase();

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Punto de Venta
            </Typography>

            {/* Acciones por rol */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                {(role === 'MANAGER' || role === 'GERENTE' || role === 'ADMIN') && (
                    <>
                        <Button variant="contained" onClick={() => navigate('/product')}>Administrar Productos</Button>
                        <Button variant="outlined" onClick={() => navigate('/reports')}>Ver Reportes</Button>
                    </>
                )}
                {role === 'ADMIN' && (
                    <Button variant="text" onClick={() => navigate('/users')}>Administrar Usuarios</Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {/* Columna izquierda: Búsqueda y lista de productos */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                        <ProductSearch onSearch={handleSearch} />
                        <ProductList
                            products={filteredProducts}
                            onAddToCart={handleAddToCart}
                            loading={loading}
                        />
                    </Paper>
                </Grid>

                {/* Columna derecha: Carrito y resumen */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'sticky', top: 80 }}>
                        <Cart
                            items={cartItems}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            onRemove={handleRemove}
                        />

                        <CartSummary
                            total={cartTotal}
                            itemsCount={cartItemsCount}
                            onCheckout={handleCheckout}
                            loading={processingCheckout}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Sales;
