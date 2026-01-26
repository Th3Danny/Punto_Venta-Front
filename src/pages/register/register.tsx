import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RegisterContainer } from './styled-componets/Register.styled';
import { RegisterForm } from './components/RegisterForm';

const Register = () => {
    const navigate = useNavigate();
    // Verificar desde Redux (fuente de verdad única)
    const user = useSelector((state: any) => state.user);

    // Si el usuario ya está autenticado, redirigir al POS
    useEffect(() => {
        if (user?.token && user?.id) {
            navigate('/pos', { replace: true });
        }
    }, [user, navigate]);

    return (
        <RegisterContainer>
            <RegisterForm />
        </RegisterContainer>
    );
};

export default Register;

