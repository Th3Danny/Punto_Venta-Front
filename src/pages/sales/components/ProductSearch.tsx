import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState, useEffect } from 'react';

interface ProductSearchProps {
    onSearch: (query: string) => void;
}

export const ProductSearch = ({ onSearch }: ProductSearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce: esperar 500ms después de que el usuario deje de escribir
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(searchTerm);
        }, 500);

        // Limpiar timeout si el usuario sigue escribiendo
        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch]);

    return (
        <TextField
            fullWidth
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
            sx={{ mb: 3 }}
        />
    );
};

export default ProductSearch;
