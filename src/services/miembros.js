import { privateApi, publicApi } from './config';

export const miembrosService = {
  // Obtener todos los miembros
  getAll: async () => {
    const response = await publicApi.get('/status/miembro');
    return response.data; // Axios ya parseó el JSON automáticamente
   
  },

  // Obtener un miembro por ID
  getById: async (id) => {
    const response = await publicApi.get(`/miembro/${id}`);
    return response.data;
  },

  // Crear un nuevo miembro
  create: async (data) => {
    const response = await privateApi.post('/miembro', data);
    return response.data;
  },
  // actualizar un  miembro
  update: async (id, data) => {
    const response = await privateApi.put(`/miembro/${id}`, data);
    return response.data;
  },

  // Eliminar un producto
  delete: async (id) => {
    const response = await privateApi.delete(`/miembro/${id}`);
    return response.data;
  }
};