import { useSelector } from 'react-redux';
import type { CartItem, Product } from '@/models';
import { Button, Card, CardActions, CardContent, Chip, Grid, Grid2, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    loading?: boolean;
}

export const ProductList = ({ products, onAddToCart, loading }: ProductListProps) => {
    const cartItems = useSelector((state: any) => state.cart as CartItem[]);

    const getRemainingStock = (product: Product) => {
        const cartItem = cartItems.find(item => item.product.id === product.id);
        const cartQuantity = cartItem ? cartItem.quantity : 0;
        return product.stock - cartQuantity;
    };

    if (loading) {
        return <Typography>Cargando productos...</Typography>;
    }

    if (products.length === 0) {
        return (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
                No se encontraron productos
            </Typography>
        );
    }

    return (
        <Grid2 container spacing={2}>
            {products.map((product) => {
                const remainingStock = getRemainingStock(product);
                const isOutOfStock = remainingStock <= 0;

                return (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                opacity: product.active && !isOutOfStock ? 1 : 0.6
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" component="div" gutterBottom>
                                    {product.name}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {product.description || 'Sin descripción'}
                                </Typography>

                                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                                    ${product.price.toFixed(2)}
                                </Typography>

                                <Typography variant="body2" color={isOutOfStock ? 'error.main' : 'text.secondary'} sx={{ fontWeight: isOutOfStock ? 'bold' : 'normal' }}>
                                    Stock disponible: {remainingStock}
                                </Typography>

                                {(!product.active || isOutOfStock) && (
                                    <Chip
                                        label={isOutOfStock ? "Agotado" : "No disponible"}
                                        color="error"
                                        size="small"
                                        sx={{ mt: 1 }}
                                    />
                                )}
                            </CardContent>

                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => onAddToCart(product)}
                                    disabled={!product.active || isOutOfStock}
                                >
                                    {isOutOfStock ? 'Sin Stock' : 'Agregar'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })}
        </Grid2>
    );
};

export default ProductList;
