import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchAndLoad } from '@/hooks';
import { createUser } from '@/redux/states/user';
import { registerService } from '@/services/auth.service';
import { registerAdapter } from '../adapters/register.adapter';
import type { RegisterCredentials } from '@/services/auth.service';
import { useSnackbar } from 'notistack';

export const useRegister = () => {
    const { loading, callEndpoint } = useFetchAndLoad();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    // Tipo local que incluye confirmPassword para el formulario
    type RegisterFormData = RegisterCredentials & { confirmPassword: string };

    const [credentials, setCredentials] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

        if (!credentials.username.trim()) {
            newErrors.username = 'El nombre de usuario es requerido';
        } else if (credentials.username.length < 3) {
            newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
        }

        if (!credentials.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (!credentials.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (credentials.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (!credentials.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (credentials.password !== credentials.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name as keyof RegisterFormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            enqueueSnackbar('Por favor, corrige los errores en el formulario', { variant: 'error' });
            return;
        }

        try {
            const { confirmPassword, ...registerData } = credentials;
            const result = await callEndpoint(registerService(registerData));
            if (result.data && result.data.success) {
                const adaptedUser = registerAdapter(result.data);
                // Redux guarda automáticamente en localStorage (fuente de verdad única)
                dispatch(createUser(adaptedUser));
                enqueueSnackbar(result.data.message || '¡Registro exitoso! Bienvenido', { variant: 'success' });
                navigate('/home');
            } else {
                enqueueSnackbar('Error al registrar. Intenta nuevamente.', { variant: 'error' });
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Error al registrar. Intenta nuevamente.';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    return {
        credentials,
        loading,
        errors,
        handleChange,
        handleRegister
    };
};

