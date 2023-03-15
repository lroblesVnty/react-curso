import axios from 'axios'
const apiProductos = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


export const  getTotSales=async ()=>{
    const response= await apiProductos.get('/ventasTotal') 
    return response
}