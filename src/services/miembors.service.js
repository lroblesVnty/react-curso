import axios from 'axios'
const apiGym = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});


export const  addMember=async (data)=>{
    const response= await apiGym.post('/miembro',data) 
    return response
}

export const  getMember=async (id)=>{
    const response= await apiGym.get('/miembro/'+id); 
    return response
}

export const  getMembers=async ()=>{
   // const response= await apiGym.get('/miembro') 
    const response= await apiGym.get('/status/miembro') 
    return response
}

export const  updateMember=async (data)=>{
    const response= await apiGym.put('/miembro/'+data.id,data) 
    return response
}

export const  miembroStatus=async (id)=>{
    const response= await apiGym.get('/miembro/'+id+'/status') 
    return response
}

export const  getPlans=async ()=>{
    const response= await apiGym.get('/membresia') 
    return response
}

export const  addPlan=async (data)=>{
    const response= await apiGym.post('/plan',data) 
    return response
}
