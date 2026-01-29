import type { User } from '@/models';

export const userAdapter = (user: any): User => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        roles: user.roles || []
    };
};

export const usersListAdapter = (users: any[]): User[] => {
    return users.map(userAdapter);
};
