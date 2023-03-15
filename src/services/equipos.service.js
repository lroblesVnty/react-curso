import axios from 'axios'
const apiProductos = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});

export const  getUsers=async ()=>{
    const response= await apiProductos.get('/users') 
    return response
}

export const  getProviders=async ()=>{
    const response= await apiProductos.get('/proveedor') 
    return response
}

export const  saveEquipo=async (data)=>{
    const response= await apiProductos.post('/equipo',data) 
    return response
}