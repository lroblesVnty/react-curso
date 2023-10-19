import axios from 'axios'
const apiGym = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


export const  addMember=async (data)=>{
    const response= await apiGym.post('/miembro',data) 
    return response
}

export const  getMembers=async ()=>{
    const response= await apiGym.get('/miembro') 
    return response
}
