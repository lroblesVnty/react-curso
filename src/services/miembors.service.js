import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

const apiGym = axios.create({
    baseURL: API_URL
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

export const  addPago=async (data)=>{
    const response= await apiGym.post('/pago',data) 
    return response
}
