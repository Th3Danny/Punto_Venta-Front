import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart, ExitToApp } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '@/redux/states/user';
import { selectCartItemsCount } from '@/redux/states/cart';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Obtener cantidad de items en el carrito desde Redux
    const cartItemsCount = useSelector(selectCartItemsCount);
    
    // Obtener usuario de Redux (fuente de verdad única)
    const user = useSelector((state: any) => state.user);
    
    // Rutas donde no se debe mostrar el Navbar
    const hideNavbarRoutes = ['/', '/register'];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && user?.token && user?.id;

    const handleLogout = () => {
        // Limpiar usuario de Redux (esto también limpia localStorage)
        dispatch(resetUser());
        // Redirigir al login
        navigate('/');
    };

    // No mostrar Navbar en login/register o si no hay usuario autenticado
    if (!shouldShowNavbar) {
        return null;
    }

    return (
        <AppBar position="sticky" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Cafetería KFE
                </Typography>

                <Button color="inherit" onClick={() => navigate('/pos')}>
                    Punto de Venta
                </Button>

                <Button color="inherit" onClick={() => navigate('/products')}>
                    Productos
                </Button>

                <Button color="inherit" onClick={() => navigate('/reports')}>
                    Reportes
                </Button>

                {/* Badge con cantidad de items en carrito */}
                <IconButton color="inherit" onClick={() => navigate('/pos')}>
                    <Badge badgeContent={cartItemsCount} color="error">
                        <ShoppingCart />
                    </Badge>
                </IconButton>

                <IconButton color="inherit" onClick={handleLogout} title="Cerrar sesión">
                    <ExitToApp />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
