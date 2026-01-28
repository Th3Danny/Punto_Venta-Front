import type { Product } from '@/models';

export const productAdapter = (product: any): Product => ({
    id: product.id,
    name: product.name,
    description: product.description || '',
    stock: Number(product.stock),
    price: Number(product.price),
    active: (product.active ?? true) && Number(product.stock) > 0
});

// Adaptador para lista de productos
export const productsAdapter = (products: any[]): Product[] => products.map(productAdapter);


