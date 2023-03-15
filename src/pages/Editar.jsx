import {useParams} from 'react-router-dom'
import {useState ,useEffect} from 'react';
import { findUser, updateUser } from '../models/modelo';
import estilos from '../styles/input.module.css'
import Swal from 'sweetalert2'
import { useForm,useFormState } from "react-hook-form";
const Editar = () => {
    const [datos, setDatos] = useState({isUpload:false,data:[]})
    const {userId}=useParams()
    const [user,setUser]=useState({
        nombre:"",
        mail:"",
        edad:""
    });
    const {
        register,
        handleSubmit,
        formState: { errors,dirtyFields,isDirty},
        watch,
        reset
    } = useForm();
   /* const { dirtyFields } = useFormState({
        control
    });*/
   
    const expresiones={
        nombre: /^[a-zA-ZÁ-ÿ\s]{5,100}$/,//letras mayusculas y minusculas con acentos, min 5 y maximo 100 caracteres
        mail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        edad:/^([1-9]|[1-9]\\d|100)$/
    }
    const getData=async ()=>{
        const resp= await findUser(userId)
        if (resp.success) {
            setUser({
                nombre:resp.data.nombre,
                mail:resp.data.mail,
                edad:resp.data.edad,
                idUser:userId
            });
           
            let defaultValues = {};
            defaultValues.nombre = resp.data.nombre;
            defaultValues.edad = resp.data.edad;
            defaultValues.mail = resp.data.mail;
            reset({ ...defaultValues });
           
            
        }
    }
    useEffect(() => {
        
        getData()
        
        
        
    },[]);//arreglo vacio para que no itere varias 
    
    const onSubmit = async (data) => {
        if (isDirty) {
            data.idUser=userId;
            
            const resp= await updateUser(data)
            console.log(resp);
            if (resp.success) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title:resp.msg,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
            }else{
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title:resp.errorMsg,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
            }
        }
        else{
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title:'Realiza algún cambio',
                showConfirmButton: true,
                allowOutsideClick:false,
            });
        }
        
        

    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card text-center text-bg-dark">
                        <div className="card-header fs-2">
                            Editar Usuario
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(errors.nombre?'is-invalid ':'is-valid ')+estilos.inputStyle} placeholder="First Name" {...register("nombre",{
                                                validate: value =>value.trim() !="" || "El nombre debe contener más de 5 caracteres",
                                                pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                                minLength: { value: 5, message: "El nombre debe contener más de 5 caracteres" },
                                                required: { value: true, message: "Ingrese el nombre" },
                                                maxLength:{value:100,message:"Solo se aceptan maximo 100 caracteres "}
                                            })}  />
                                            <label htmlFor="floatingInput" className={estilos.labelStyle}>Nombre</label>
                                            
                                            <div className="invalid-feedback text-start">
                                                {errors.nombre && errors.nombre.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="form-floating mb-3">
                                            <input type="email" className={"form-control "+(errors.mail?'is-invalid ':'is-valid ')+estilos.inputStyle}  placeholder="First Name" {...register("mail",{
                                                pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "El mail no tiene el formato correcto" },
                                                required: { value: true, message: "Ingresa tu email" },
                                            })}  />
                                            <label htmlFor="floatingInput" className={estilos.labelStyle}>Mail</label>
                                            <div className="invalid-feedback text-start">
                                                {errors.mail && errors.mail.message} {/* se renderiza solo si la variable errors.mail existe */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="form-floating mb-3">
                                            <input type="number" className={"form-control "+(errors.edad?'is-invalid ':'is-valid ')+estilos.inputStyle} placeholder="First Name" {...register("edad",{
                                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                required: { value: true, message: "Ingresa tu edad" },
                                                max:{value:150,message:"Edad no válida"},
                                                min:{value:1,message:"Edad invalida"},
                                            
                                            })}  />
                                            <label htmlFor="floatingInput" className={estilos.labelStyle}>Edad</label>
                                            <div className="invalid-feedback text-start">
                                                {errors.edad && errors.edad.message} 
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="row align-items-center justify-content-center mt-4 mb-3">
                                    <div className="col-lg-6 text-center">
                                        <div className="d-grid gap-2">
                                            <button className={"btn "+estilos.btnStyle} id="btn-edit" type="submit"  disabled={!isDirty ? true : false}>Editar</button>
                                        </div>
                                    </div>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    
    )
}

export default Editar