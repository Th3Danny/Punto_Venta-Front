import { Box, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    return (
        <Box sx={{ padding: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                Bienvenido a Cafetería KFE
            </Typography>
            
            {user && user.id && (
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Usuario ID: {user.id}
                </Typography>
            )}

            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/pos')}>
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
                    <Card sx={{ height: '100%', cursor: 'pointer' }} onClick={() => navigate('/products')}>
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
        </Box>
    );
};

export default Home;

