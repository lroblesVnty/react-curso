const API='http://localhost/webServices/api-crud';
const TOKEN='0c111e14-f68f-43b9-b6b2-4eabff25a8ac';
import axios from 'axios'
import Swal from 'sweetalert2'

const apiProductos = axios.create({
    //baseURL: 'http://localhost/api-laravel/public/api'
    baseURL:'http://127.0.0.1:8000/api'
});

export default async  function guardar(data){
    const response=await fetch(API+'?insertar=1',{
        method:"POST",
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}
export const  getUsers=async ()=>{
    const response= await fetch(API+'?consultar=1',{
        method:"GET",
    })
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}

export const findUser=async(id)=>{
    const response= await fetch(API+'?buscar='+id)
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;

}

export  async  function updateUser(data){
    const response=await fetch(API+'?update=1',{
        method:"POST",
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}

export  async  function getEstados(url){
    console.log(url+'?token='+TOKEN);
    const response=await fetch(url+'?token='+TOKEN)
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}

export  async  function getEdos(){
    const response=await fetch('http://localhost/webServices/getEstados.php')
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}


export  async  function getMunicipio(edo){
    const response=await fetch('http://localhost/webServices/getMunicipioByEstado.php',{
        method:"POST",
        body:JSON.stringify({estado: edo})
    })
    .then(res=>res.json())
    .catch(error => {
        return error
    })
    
    return response;
}

export const  getProductos=async ()=>{
    try {
        const response= await apiProductos.get('/productos') 
        return response
    //console.log(response);
    } catch (error) {
    // console.error(error);
    return error
    }
}


export const  addProduct=async (data)=>{
    try {
        const response= await apiProductos.post('/productos',data) 
        return response
    //console.log(response);
    } catch (error) {
    // console.error(error);
    return error
    }
}
export const  getProductById=async (id)=>{
    try {
        const response= await apiProductos.get('/productos/'+id) 
        return response
    //console.log(response);
    } catch (error) {
    // console.error(error);
    return error
    }
}
export const  updateProduct=async (data)=>{
    try {
        const response= await apiProductos.put('/productos/'+data.id,data) 
        return response
    //console.log(response);
    } catch (error) {
    // console.error(error);
    return error
    }
}

export const  iniciarSesion=async (data)=>{
    /*try {
        const response= await apiProductos.post('/login',data) 
        return response
    //console.log(response);
    } catch (error) {
        
        return error
    }*/
    const response= await apiProductos.post('/login',data) 
    return response
}

export const  getUserProfile=async (token)=>{
    try {
        //axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
        const response= await apiProductos.get('/user-profile',{ headers: {"Authorization" : `Bearer ${token}`} }) 
        return response
    //console.log(response);
    } catch (error) {
        
        return error
    }
}
export const  saveVenta=async (data)=>{
    const response= await apiProductos.post('/ventas',data) 
    return response
}
export const  getSales=async ()=>{
    const response= await apiProductos.get('/ventas') 
    return response
}
export const  SaleDetail=async (id)=>{
    const response= await apiProductos.get('/ventas/'+id) 
    return response
}




export var showCargando=function () {//*funcion para crear el icono de cargando...
    Swal.fire({
        title: 'Cargando',
        //html:'Cargando',
        showConfirmButton: false,
        allowOutsideClick:false,
        willOpen:()=>{
            Swal.showLoading();
        },
        /* willClose: () => {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Correo enviado',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            }); 
        } */
    });
    
}
