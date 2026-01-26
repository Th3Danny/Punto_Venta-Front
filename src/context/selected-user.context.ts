import type { User } from '../models';
import { createContext } from 'react';

export const SelectedUserContext = createContext({
    selectedUser: {} as User,
    setSelectedUser: (_user: User) => {},
});