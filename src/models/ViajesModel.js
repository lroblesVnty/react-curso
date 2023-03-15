const API='http://localhost/apiViajes/';
import axios from 'axios'

export default async  function getEdos(){
    const response=await fetch(API+'estados')
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}

export  async  function getViajes(data){
    const response=await fetch(API+'viajes',{
       
        method: 'POST', 
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}

export  async  function buscarViajes(data){
    try {
        const response= await axios.post(API+'viajes',data) 
        return response
       //console.log(response);
    } catch (error) {
       // console.error(error);
       return error
    }
}


export const  selectBoletos=async (id)=>{
    try {
        const response= await axios.get(API+'obtenerBoletos/'+id) 
        return response
       //console.log(response);
    } catch (error) {
       // console.error(error);
       return error
    }
}

export const  getEstados=async ()=>{
   /* const response= await axios.get(API+'estados') 
    .then(function (resp) {
        // handle success
        //console.log(response);
        //return resp
    })
    .catch(function (error) {
        // handle error
        //console.log(error);
        return error.message
    })
    return response*/
    try {
        const response= await axios.get(API+'estados') 
        return response
       //console.log(response);
    } catch (error) {
       // console.error(error);
       return error
    }
}
