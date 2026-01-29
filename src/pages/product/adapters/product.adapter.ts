import { productAdapter, productsAdapter } from '@/adapters';
import type { Product } from '@/models';

export const productManagerAdapter = (product: any): Product => {
    return productAdapter(product);
};

export const productManagerListAdapter = (products: any[]): Product[] => {
    return productsAdapter(products);
};
