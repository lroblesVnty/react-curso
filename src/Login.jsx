import Images from './assets/imagenes';
import  {useState,useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {AuthContext} from './context/authContext'
import estilos from './styles/login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faSignInAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


function Login() {
    //console.log('[ENV] API_URL:', import.meta.env.VITE_API_URL);
    const location=useLocation()
    //const { userActive,login,setUserActive} = useAuth();
    const {login} = useContext(AuthContext);
   
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    const [error, setError] = useState(null);
    const [espera, setEspera] = useState(false)
    const navigate = useNavigate();
    const handleChange=({target:{name,value}})=>{
        setUser({...user,[name]:value})
    
    }
    const handleSubmit =async e =>{
        e.preventDefault();
        setEspera(true)
        try {
            const resp=await login(user)
            console.log({resp})
            if (resp.success) {
                console.info('todo ok')   
                /*window.localStorage.setItem("userActive",resp.data.access_token)
                window.localStorage.setItem("userId",resp.data.data.id)
                setUserActive( window.localStorage.getItem("userActive"))*/
                //console.log({userActive});
                //if (location.state?.from) {// if location.state  null accede a la porpiedad FROM
                    //navigate(location.state.from);
                    
                //}else{
                 //   navigate("/menu");
                //}*/
                navigate("/");
                console.info('login correcto')
            }else {
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title:resp.error.msg,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
                //console.error('errrrorr'+resp.response.status)
            }
            
        } catch (error) {
            console.error({error})
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title:error.message,
                showConfirmButton: true,
                allowOutsideClick:false,
            });
        }
        setEspera(false)
        
     
       

        
        
        /*try {
            await login(user)
            console.log('respuesta de evento onsubmit')
            
            
            
        } catch (error) {
            console.log(error+'cxzcxzcx');
        }*/

        /*
        setEspera(true)
        const resp= await login(user)
        console.log(resp)
        if (resp.success) {
            if (location.state?.from) {// if location.state  null accede a la porpiedad FROM
                navigate(location.state.from);
                
            }
            else{
                navigate("/menu");
            }
            console.log({userActive});
            
        }else{
            setError(resp.errorMsg)
        }
        setEspera(false)
       */
       
            
    }
   
    
    return(
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center py-5">
            <div className="row align-items-center justify-content-center mb-4 mt-4 w-100" >
                <div className="col-lg-4 col-sm-4 col-md-6 text-start justify-content-center text-center mb-3">
                    <img src={Images.crashBash} className="img-fluid" alt="..." />
                </div>
                <div className='col-lg-4 col-sm-10 col-md-6'>
                    <div className="card shadow-lg p-3 text-bg-dark" >
                        <div className="card-body">
                            {/* <h5 className="card-title">Card title</h5> */}
                            <form  onSubmit={handleSubmit}>
                                <div className="input-group mt-5" >
                                        <span className={"input-group-text  border-left-0 "+estilos.spanEstilo}>
                                        <FontAwesomeIcon icon={faUserCircle} size="2x" className={estilos.iconStyle}/>
                                    </span>
                                    <input type="text" className={"form-control "+estilos.inputStyle} id={estilos.username} name="email"  placeholder="Usuario" onChange={handleChange}  autoCapitalize="off" maxLength="30"/>
                                </div>
                                <div className="input-group mt-5" >
                                    <span className={"input-group-text  border-left-0 "+estilos.spanEstilo}>
                                        <FontAwesomeIcon icon={faLock} size="2x" className={estilos.iconStyle}/>
                                    </span>
                                    <input type="password" className={"form-control "+estilos.inputStyle}  id={estilos.pass}  name="password"  placeholder="Password" onChange={handleChange} autoComplete="off" maxLength="100" required/>
                                </div>
                                <div className="col-lg-12 text-center mt-5 mb-5">
                                    <button type='submit' disabled={espera}  className="btn  btn-lg" id={estilos.bt_entrar}>
                                        <FontAwesomeIcon icon={faSignInAlt}  className={estilos.iconStyle}/>
                                        &nbsp;Entrar
                                    </button>
            
                                </div>
                                {
                                    error &&
                                    <div className="alert alert-danger text-center" role="alert">
                                        {error}
                                    </div>
            
                                }
            
                            </form>
            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}


/* function CargarDatos() {
    const [count, setCount] = useState(0);
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => 
        console.log(json)

    )
    .catch(error => {
        alert(error)
    })
} */

export default Login;