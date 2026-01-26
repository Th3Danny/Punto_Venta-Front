// Modelo de Producto basado en la entidad del backend
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    active: boolean;
}

// Estado vacío para inicialización
export const ProductEmptyState: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    active: true
};
