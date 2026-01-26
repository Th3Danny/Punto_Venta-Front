import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
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

export const POS = () => {
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
            const adaptedProducts = productsAdapter(response.data);
            setProducts(adaptedProducts);
            setFilteredProducts(adaptedProducts);
        } catch (error: any) {
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
            // Convertir carrito a formato de venta
            const saleData = cartToSaleAdapter(cartItems);

            // Enviar venta al backend
            await callEndpoint(createSale(saleData));

            // Limpiar carrito
            dispatch(clearCart());

            enqueueSnackbar('Venta procesada exitosamente', { variant: 'success' });
        } catch (error: any) {
            enqueueSnackbar('Error al procesar la venta', { variant: 'error' });
            console.error('Error processing sale:', error);
        } finally {
            setProcessingCheckout(false);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Punto de Venta
            </Typography>

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

export default POS;
