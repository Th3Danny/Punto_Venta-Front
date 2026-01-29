import type { AxiosCall } from '@/models';
import { loadAbort } from '@/utils';
import apiAxiosInstance from './api.service';

export const getAllUsers = (): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get('/users', {
            signal: controller.signal
        }),
        controller
    };
};

export const getUserById = (id: number): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get(`/users/${id}`, {
            signal: controller.signal
        }),
        controller
    };
};

export const updateUser = (id: number, userData: any): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.put(`/users/${id}`, userData, {
            signal: controller.signal
        }),
        controller
    };
};

export const deleteUser = (id: number): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.delete(`/users/${id}`, {
            signal: controller.signal
        }),
        controller
    };
};

export const getAllRoles = (): AxiosCall<any> => {
    const controller = loadAbort();
    return {
        call: apiAxiosInstance.get('/users/roles', {
            signal: controller.signal
        }),
        controller
    };
};
