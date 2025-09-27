import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;


const apiProductos = axios.create({
    baseURL: API_URL
});

export const  getPlansList=async ()=>{
    const response= await apiProductos.get('/plans') 
    return response
}

export const  getVisitasList=async ()=>{
    const response= await apiProductos.get('/visitas') 
    return response
}

export const  getVisitasByDate=async (date)=>{
    const endpoint=date?`/visitas/fecha?fecha=${date}`:'/visitas/fecha'
    const response= await apiProductos.get(endpoint) 
    return response
}

export const  addVisita=async (data)=>{
    const response= await apiProductos.post('/visitas', data) 
    return response

}
export const  closeVisita=async (visita)=>{
    const response= await apiProductos.get(`/visitas/${visita}/cerrar`) 
    return response
}

export const  getAsistenciaList=async ()=>{
    const response= await apiProductos.get('/asistencia') 
    return response
}

export const  getAsistenciasByDate=async (date)=>{
    const endpoint=date?`/asistencia/fecha?fecha=${date}`:'/asistencia/fecha'
    const response= await apiProductos.get(endpoint) 
    return response
}

export const  registerAsistencia=async (data)=>{
    const response= await apiProductos.post('/asistencia', data) 
    return response
}

export const  getAsistenciaByMiembro=async (miembroId)=>{
    const response= await apiProductos.get(`/asistencia/miembro/${miembroId}/hoy`) 
    return response
}

export const  closeAsistencia=async (visita)=>{
    const response= await apiProductos.get(`/asistencia/${visita}/cerrar`) 
    return response
}