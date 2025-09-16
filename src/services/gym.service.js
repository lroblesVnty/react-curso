import axios from 'axios'
const apiProductos = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
   // baseURL:'http://127.0.0.1:8000/api'
     baseURL:'https://laravel-production-424f.up.railway.app/api'
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