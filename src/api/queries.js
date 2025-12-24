import { useQuery } from '@tanstack/react-query';
import { api } from './client';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/products/categories');
      return data; 
    },
    staleTime: 1000 * 60 * 10, 
  });
}

export function useProducts(category) {
  return useQuery({
    queryKey: category ? ['products', 'category', category] : ['products', 'all'],
    queryFn: async () => {
      const path = category ? `/products/category/${encodeURIComponent(category)}` : '/products';
      const { data } = await api.get(path);
      return data; 
    },
    keepPreviousData: true, 
    staleTime: 1000 * 60 * 5,
  });
}
