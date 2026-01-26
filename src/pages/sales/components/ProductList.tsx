import { Grid, Card, CardContent, CardActions, Typography, Button, Chip } from '@mui/material';
import { Add } from '@mui/icons-material';
import type { Product } from '@/models';

interface ProductListProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    loading?: boolean;
}

export const ProductList = ({ products, onAddToCart, loading }: ProductListProps) => {
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
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            opacity: product.active ? 1 : 0.6
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

                            {!product.active && (
                                <Chip
                                    label="No disponible"
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
                                disabled={!product.active}
                            >
                                Agregar
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
