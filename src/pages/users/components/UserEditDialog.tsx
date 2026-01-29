import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Box,
    Chip
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Role } from '@/models';
import type { ChangeEvent } from 'react';

interface UserEditDialogProps {
    open: boolean;
    onClose: () => void;
    formData: {
        name: string;
        userName: string;
        email: string;
        roleIds: number[];
    };
    roles: Role[];
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onRolesChange: (event: SelectChangeEvent<number[]>) => void;
    onSave: () => void;
}

export const UserEditDialog = ({
    open,
    onClose,
    formData,
    roles,
    onChange,
    onRolesChange,
    onSave
}: UserEditDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold' }}>Editar Usuario</DialogTitle>
            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Nombre"
                        name="name"
                        fullWidth
                        value={formData.name}
                        onChange={onChange}
                    />
                    <TextField
                        label="Nombre de Usuario"
                        name="userName"
                        fullWidth
                        value={formData.userName}
                        onChange={onChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={onChange}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="roles-label">Roles</InputLabel>
                        <Select
                            labelId="roles-label"
                            multiple
                            value={formData.roleIds}
                            onChange={onRolesChange}
                            input={<OutlinedInput label="Roles" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={roles.find(r => r.id === value)?.name || value}
                                            size="small"
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.id} value={role.id}>
                                    {role.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onSave} variant="contained" color="primary">
                    Guardar Cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
};
