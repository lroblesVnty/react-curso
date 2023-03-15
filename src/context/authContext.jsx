import { createContext,useContext, useState,useEffect} from "react";
import {getUserProfile, iniciarSesion} from '../models/modelo'
export const authContext = createContext();

export const useAuth=()=>{
    const context=useContext(authContext)
    return context

}
export function AuthProvaider({ children }) {
    const userLocalStorage=window.localStorage.getItem('userActive')
    const [userActive,setUserActive]=useState(userLocalStorage);
    
    /*async function getUserActive(){
        const token=window.localStorage.getItem('userActive')
        const resp=await getUserProfile(token);
        if (resp.status==200) {
            setUserActive(resp.data.data)
        }else{
            setUserActive(null)
            console.log('userActive null');
        }
    }*/
    
    /*useEffect(() => {
        console.log('inicia le auth context')
       console.log({userActive})
        const getUserActive  = async () => {
            const token=window.localStorage.getItem('userActive')
            const resp=await getUserProfile(token);
            console.log(resp)
            if (resp.status==200) {
                setUserActive(resp.data.data)
                console.log('estado actualizado')
            }else{
                setUserActive(null)
                console.log('userActive null');
            }
        };
          return () => getUserActive();
      
        
        
    }, []);*/
    // window.localStorage.getItem('userActive')
   
    const login =(data)=>{
        //const resp= login(data)
        return iniciarSesion(data)


       /*const response=await fetch('http://localhost/webServices/api-crud?login=1',{
            method:"POST",
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(resp=>{
            console.log(resp);
            if (resp.success) {
                setUserActive(resp.credenciales)
                window.localStorage.setItem("userActive",resp.credenciales.name)
                
                
            }
           
            return resp;
        })
        .catch(error => {
            return error
        })
        
        return response;*/
    }
    const logout=()=>{
        window.localStorage.removeItem('userActive');
        setUserActive(null)
    }
        //console.log(userName+" "+pass)
       
    return <authContext.Provider value={{ userActive,login,logout, setUserActive}}>{children}</authContext.Provider>;
}
function iniciarSesionn(user) {
    fetch('http://localhost/webServices/api-crud?login=1',{
            method:"POST",
            body:JSON.stringify(user)
    })
    .then(response => response.json())
    .then(dataResponse=>{
        console.log(dataResponse);
        if (dataResponse.success) {
            /* setUsuario({rol:dataResponse.rol,name:dataResponse.name})   */
            var dt={rol:dataResponse.rol,name:dataResponse.name}
            return dt             

        }
    })
    .catch(error => {
        alert(error)
    })
}