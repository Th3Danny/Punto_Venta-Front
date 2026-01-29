import { useState, useEffect, type ChangeEvent } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useFetchAndLoad } from '@/hooks';
import { getAllUsers, updateUser, deleteUser as deleteUserService, getAllRoles } from '@/services/user.services';
import { usersListAdapter } from '../adapters/user.adapter';
import type { User, Role } from '@/models';
import type { SelectChangeEvent } from '@mui/material';

export const useUsers = () => {
    // State for users and roles list
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const { loading, callEndpoint } = useFetchAndLoad();
    const { enqueueSnackbar } = useSnackbar();

    // State for Edit Dialog
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editFormData, setEditFormData] = useState({
        name: '',
        userName: '',
        email: '',
        roleIds: [] as number[]
    });

    const getUsers = async () => {
        try {
            const response = await callEndpoint(getAllUsers());
            const data = response.data.data;
            setUsers(usersListAdapter(data));
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            enqueueSnackbar(error.message || 'Error al cargar usuarios', { variant: 'error' });
        }
    };

    const getRolesList = async () => {
        try {
            const response = await callEndpoint(getAllRoles());
            setRoles(response.data.data);
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            console.error('Error fetching roles:', error);
        }
    };

    const handleOpenEdit = (user: User) => {
        setSelectedUser(user);
        setEditFormData({
            name: user.name,
            userName: user.userName || '',
            email: user.email,
            roleIds: user.roles?.map(r => r.id) || []
        });
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedUser(null);
    };

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRolesChange = (event: SelectChangeEvent<number[]>) => {
        const value = event.target.value;
        setEditFormData(prev => ({
            ...prev,
            roleIds: typeof value === 'string' ? value.split(',').map(Number) : value,
        }));
    };

    const onSaveEdit = async () => {
        if (selectedUser) {
            try {
                const dataToSave = {
                    name: editFormData.name,
                    userName: editFormData.userName,
                    email: editFormData.email,
                    roleIds: editFormData.roleIds
                };
                await callEndpoint(updateUser(selectedUser.id, dataToSave));
                enqueueSnackbar('Usuario actualizado correctamente', { variant: 'success' });
                handleCloseEdit();
                getUsers();
            } catch (error: any) {
                if (axios.isCancel(error)) return;
                enqueueSnackbar(error.message || 'Error al actualizar usuario', { variant: 'error' });
            }
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await callEndpoint(deleteUserService(id));
            enqueueSnackbar('Usuario eliminado correctamente', { variant: 'success' });
            getUsers();
        } catch (error: any) {
            if (axios.isCancel(error)) return;
            enqueueSnackbar(error.message || 'Error al eliminar usuario', { variant: 'error' });
        }
    };

    useEffect(() => {
        getUsers();
        getRolesList();
    }, []);

    return {
        users,
        roles,
        loading,
        openEdit,
        editFormData,
        handleOpenEdit,
        handleCloseEdit,
        handleFormChange,
        handleRolesChange,
        onSaveEdit,
        handleDeleteUser
    };
};
