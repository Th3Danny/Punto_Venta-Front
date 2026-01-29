import { Container, Grid, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSales } from './hooks/useSales';
import { ProductSearch, ProductList, Cart, CartSummary } from './components';

export const Sales = () => {
    const navigate = useNavigate();
    const {
        loading,
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
        user
    } = useSales();

    const role = (user?.role || '').toString().toUpperCase();

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom color="primary">
                    Punto de Venta
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {(role === 'MANAGER' || role === 'CASHIER' || role === 'ADMIN') && (
                        <>
                            <Button variant="contained" onClick={() => navigate('/product')}>Administrar Productos</Button>
                            <Button variant="outlined" onClick={() => navigate('/reports')}>Ver Reportes</Button>
                        </>
                    )}
                    {role === 'ADMIN' && (
                        <Button variant="text" onClick={() => navigate('/users')}>Administrar Usuarios</Button>
                    )}
                </Box>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ mb: 3 }}>
                        <ProductSearch onSearch={handleSearch} />
                    </Box>
                    <ProductList
                        products={filteredProducts}
                        onAddToCart={handleAddToCart}
                        loading={loading}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        <Box className="glass-panel" sx={{ p: 1, borderRadius: 5, mb: 3 }}>
                            <Cart
                                items={cartItems}
                                onIncrement={handleIncrement}
                                onDecrement={handleDecrement}
                                onRemove={handleRemove}
                            />
                        </Box>

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
