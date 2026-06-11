import { apiClient } from './config';

export const productsService = {
  // Obtener todos los productos
  getAll: async () => {
    const response = await apiClient.get('/products');
    return response.data; // Axios ya parseó el JSON automáticamente
  },

  // Obtener un producto por ID
  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // Eliminar un producto
  delete: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  }
};