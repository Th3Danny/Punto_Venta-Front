export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  userName?: string;
  token?: string;
  role?: string; // Mantener para compatibilidad con componentes existentes
  roles?: Role[]; // Para el nuevo módulo de usuarios
}

export const UserEmptyState: User = {
  id: 0,
  name: '',
  email: '',
  userName: '',
  token: '',
  role: '',
  roles: []
};