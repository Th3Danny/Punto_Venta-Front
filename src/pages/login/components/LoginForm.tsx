import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import { LoginPaper } from '../styled-componets/Login.styled';
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    const { credentials, loading, handleChange, handleLogin } = useLogin();

    return (
        <LoginPaper elevation={3}>
            <Typography variant="h4" align="center" fontWeight="bold" color="primary">
                Punto de Venta
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
                Inicia sesión para continuar
            </Typography>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    value={credentials.email}
                    onChange={handleChange}
                    disabled={loading}
                />
                <TextField
                    label="Contraseña"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ py: 1.5 }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
                </Button>
            </form>

            <Typography variant="body2" align="center">
                ¿No tienes cuenta? <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>Regístrate aquí</Link>
            </Typography>
        </LoginPaper>
    );
};
