export interface User {
  id: number;
  name: string;
  email: string;
  token?: string;
  role?: string;
}

export const UserEmptyState: User = {
  id: 0,
  name: '',
  email: '',
  token: '',
  role: ''
};