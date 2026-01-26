import type { Product } from '@/models';

// Adaptador para transformar datos del backend al frontend
// En caso de que el backend use snake_case o estructura diferente
export const productAdapter = (product: any): Product => ({
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: Number(product.price),
    active: product.active ?? true
});

// Adaptador para lista de productos
export const productsAdapter = (products: any[]): Product[] =>
    products.map(productAdapter);
