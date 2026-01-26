import { Box, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useProducts } from './hooks/useProducts';
import { ProductCard } from './components/ProductCard';

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const { products, loading } = useProducts();

    return (
        <Box sx={{ padding: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Bienvenido a Cafetería KFE
            </Typography>
            
            {user && user.id && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Usuario: {user.name || user.email}
                </Typography>
            )}

            {/* Sección de Navegación */}
            <Grid container spacing={3} sx={{ marginTop: 2, marginBottom: 4 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/sales')}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Punto de Venta
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Gestiona las ventas y el carrito de compras
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/product')}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Productos
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Administra los productos disponibles
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/reports')}>
                        <CardContent>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Reportes
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Visualiza reportes y estadísticas de ventas
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Sección de Productos Destacados */}
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
                Productos Disponibles
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                    <CircularProgress />
                </Box>
            ) : products.length > 0 ? (
                <Grid container spacing={3} sx={{ marginTop: 2 }}>
                    {products.slice(0, 6).map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    No hay productos disponibles
                </Typography>
            )}
        </Box>
    );
};

export default Home;

