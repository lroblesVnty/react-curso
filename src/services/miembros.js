import { publicApi } from './config';

export const miembrosService = {
  // Obtener todos los miembros
  getAll: async () => {
    const response = await publicApi.get('/status/miembro');
    //return response.data; // Axios ya parseó el JSON automáticamente
    return response; // Axios ya parseó el JSON automáticamente
  },

  // Obtener un miembro por ID
  getById: async (id) => {
    const response = await publicApi.get(`/miembro/${id}`);
    return response.data;
  },

  // Crear un nuevo miembro
  create: async (data) => {
    const response = await publicApi.post('/miembro', data);
    return response.data;
  },

  // Eliminar un producto
  delete: async (id) => {
    const response = await publicApi.delete(`/miembro/${id}`);
    return response.data;
  }
};