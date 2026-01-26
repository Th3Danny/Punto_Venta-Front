import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '@/hooks';
import { createUser } from '@/redux/states/user';
import { loginService } from '@/services/auth.service';
import { loginAdapter } from '../adapters/login.adapter';
import type { LoginCredentials } from '@/services/auth.service';
import { useSnackbar } from 'notistack';

export const useLogin = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const result = await callEndpoint(loginService(credentials));
            if (result.data && result.data.success) {
                const adaptedUser = loginAdapter(result.data);
                // Redux guarda automáticamente en localStorage (fuente de verdad única)
                dispatch(createUser(adaptedUser));
                enqueueSnackbar(result.data.message || '¡Bienvenido!', { variant: 'success' });
                navigate('/home');
            } else {
                enqueueSnackbar('Error de autenticación. Verifica tus credenciales.', { variant: 'error' });
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Error de autenticación. Verifica tus credenciales.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    return {
        credentials,
        loading,
        handleChange,
        handleLogin
    };
};
