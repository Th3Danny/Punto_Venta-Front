import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type User, UserEmptyState } from '@/models';

// Función para obtener el usuario del localStorage al iniciar
const getInitialUser = (): User => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
        try {
            return JSON.parse(userStr);
        } catch {
            return UserEmptyState;
        }
    }
    
    return UserEmptyState;
};

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialUser(),
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
        const user = action.payload;
        // Guardar en localStorage
        localStorage.setItem('user', JSON.stringify(user));
        if (user.token) {
            localStorage.setItem('token', user.token);
        }
        return user;
    },
    modifyUser: (state, action: PayloadAction<Partial<User>>) => {
        const updatedUser = { ...state, ...action.payload };
        // Actualizar localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        if (updatedUser.token) {
            localStorage.setItem('token', updatedUser.token);
        }
        return updatedUser;
    },
    resetUser: () => {
        // Limpiar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return UserEmptyState;
    }
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;