import { Box, Typography, Grid, Card, CircularProgress, Paper, Avatar, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    PointOfSale,
    Inventory,
    Assessment,
    Coffee,
    EmojiFoodBeverage
} from '@mui/icons-material';
import { useProducts } from './hooks/useProducts';
import { ProductCard } from './components/ProductCard';

const Home = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const user = useSelector((state: any) => state.user);
    const { products, loading } = useProducts();

    const quickActions = [
        {
            title: 'Punto de Venta',
            desc: 'Gestiona ventas y carrito de compras',
            icon: <PointOfSale sx={{ fontSize: 40 }} />,
            path: '/sales',
            color: theme.palette.primary.main
        },
        {
            title: 'Administrar Productos',
            desc: 'Control de inventario y precios',
            icon: <Inventory sx={{ fontSize: 40 }} />,
            path: '/product',
            color: theme.palette.secondary.main
        },
        {
            title: 'Reportes y Analíticas',
            desc: 'Estadísticas y desempeño de ventas',
            icon: <Assessment sx={{ fontSize: 40 }} />,
            path: '/reports',
            color: '#795548'
        }
    ];

    return (
        <Box sx={{ pb: 6 }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 4, md: 8 },
                    mb: 6,
                    borderRadius: '0 0 40px 40px',
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Coffee sx={{ position: 'absolute', right: -20, top: -20, fontSize: 200, opacity: 0.1, transform: 'rotate(-15deg)' }} />
                <EmojiFoodBeverage sx={{ position: 'absolute', left: -20, bottom: -20, fontSize: 150, opacity: 0.1, transform: 'rotate(15deg)' }} />

                <Grid container spacing={4} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                            Cafetería KFE
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2, opacity: 0.9 }}>
                            {user?.name ? `Hola, ${user.name}. ¡Qué bueno verte!` : 'Bienvenido al panel de gestión.'}
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600 }}>
                            Optimiza tus operaciones diarias, revisa tu inventario en tiempo real y analiza el crecimiento de tu negocio desde un solo lugar.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ maxWidth: 1200, margin: '0 auto', px: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                    Acceso Rápido
                </Typography>

                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {quickActions.map((action, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card
                                onClick={() => navigate(action.path)}
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', p: 2, width: '100%' }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: `${action.color}15`,
                                            color: action.color,
                                            width: 70,
                                            height: 70,
                                            mr: 3
                                        }}
                                    >
                                        {action.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {action.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {action.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
                    <Typography variant="h5" fontWeight="bold">
                        Productos Destacados
                    </Typography>
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{ cursor: 'pointer', fontWeight: 600 }}
                        onClick={() => navigate('/product')}
                    >
                        Ver inventario completo →
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : products.length > 0 ? (
                    <Grid container spacing={3}>
                        {products.slice(0, 6).map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', bgcolor: 'transparent', borderStyle: 'dashed' }}>
                        <Typography variant="body1" color="textSecondary">
                            Aún no hay productos registrados.
                        </Typography>
                    </Paper>
                )}
            </Box>
        </Box>
    );
};
export default Home;
