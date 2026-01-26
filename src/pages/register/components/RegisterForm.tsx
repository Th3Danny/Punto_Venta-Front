import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useRegister } from '../hooks/useRegister';
import { RegisterPaper } from '../styled-componets/Register.styled';
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
    const { credentials, loading, errors, handleChange, handleRegister } = useRegister();

    return (
        <RegisterPaper elevation={3}>
            <Typography variant="h4" align="center" fontWeight="bold" color="primary">
                Crear Cuenta
            </Typography>
            <Typography variant="body1" align="center" color="textSecondary">
                Regístrate para comenzar
            </Typography>

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <TextField
                    label="Nombre de Usuario"
                    name="username"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    value={credentials.username}
                    onChange={handleChange}
                    disabled={loading}
                    error={!!errors.username}
                    helperText={errors.username}
                />
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
                    error={!!errors.email}
                    helperText={errors.email}
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
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <TextField
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    value={credentials.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
                </Button>
            </form>

            <Typography variant="body2" align="center">
                ¿Ya tienes cuenta? <Link to="/" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión aquí</Link>
            </Typography>
        </RegisterPaper>
    );
};

