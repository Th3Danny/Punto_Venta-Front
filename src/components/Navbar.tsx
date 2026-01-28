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

    // Obtener usuario de Redux 
    const user = useSelector((state: any) => state.user);

    // Rutas donde no se debe mostrar el Navbar
    const hideNavbarRoutes = ['/', '/register'];
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && user?.token && user?.id;

    const handleLogout = () => {
        // Limpiar usuario de Redux 
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

                <Button color="inherit" onClick={() => navigate('/sales')}>
                    Punto de Venta
                </Button>

                {/* Productos: solo para MANAGER y ADMIN */}
                {['ADMIN', 'MANAGER', 'CASHIER'].includes((user?.role || '').toString().toUpperCase()) && (
                    <Button color="inherit" onClick={() => navigate('/product')}>
                        Productos
                    </Button>
                )}

                {/* Mostrar Reportes solo a ADMIN y MANAGER */}
                {['ADMIN', 'MANAGER', 'CASHIER'].includes((user?.role || '').toString().toUpperCase()) && (
                    <Button color="inherit" onClick={() => navigate('/reports')}>
                        Reportes
                    </Button>
                )}

                {/* Usuarios: solo ADMIN */}
                {['ADMIN'].includes((user?.role || '').toString().toUpperCase()) && (
                    <Button color="inherit" onClick={() => navigate('/users')}>
                        Usuarios
                    </Button>
                )}

                {/* Badge con cantidad de items en carrito */}
                <IconButton color="inherit" onClick={() => navigate('/sales')}>
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
