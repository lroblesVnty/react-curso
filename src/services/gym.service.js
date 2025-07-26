import axios from 'axios'
const apiProductos = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});

export const  getPlansList=async ()=>{
    const response= await apiProductos.get('/plans') 
    return response
}
