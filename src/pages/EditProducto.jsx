import {useParams} from 'react-router-dom'
import {useState ,useEffect} from 'react';
import {  getProductById, updateProduct } from '../models/modelo';
import estilos from '../styles/input.module.css'
import Swal from 'sweetalert2'
import { useForm,useFormState } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const EditProducto = () => {
    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(false)
    const {productId: productId}=useParams()
    
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
   
    
    const getData=async ()=>{
       
        const resp= await getProductById(productId)
        console.log(resp)
       
        if (resp.status==200) {
            let defaultValues = {};
            defaultValues.descripcion = resp.data.descripcion;
            defaultValues.precio = resp.data.precio;
            defaultValues.stock = resp.data.stock;
            console.log(datos)
            reset({...defaultValues});
           
            
        }
    }
    useEffect(() => {
        
        getData()
        console.log(datos)
        
        
    },[]);//arreglo vacio para que no itere varias 
    const handleChange=(e)=>{
        const inputName=e.target.name
        //e.classList.("my-class");
        if (errors[inputName]) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        }else{
            e.target.classList.add("is-valid");
            e.target.classList.remove("is-invalid");
        }

    }
    console.log(errors)
    const onSubmit = async (data) => {
        if (isDirty) {
            data.id=productId;//add id to array
            setLoading(true);
            
            const resp= await updateProduct(data)
            setLoading(false);
            console.log(resp);
            if (resp.status==200) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title:'Actualizado correctamente',
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
            }else{
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title:'Ocurrió un error',
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
                <div className="col-lg-6">
                    <div className="card text-center">
                        <div className="card-header fs-4">
                            Editar Producto
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(errors.descripcion?'is-invalid ':'')} placeholder="First Name" {...register("descripcion",{
                                                validate: value =>value.trim() !="" || "Ingresa la descripción",
                                                pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                                required: { value: true, message: "Ingrese el nombre" },
                                                maxLength:{value:100,message:"Solo se aceptan maximo 100 caracteres "},
                                                onChange: (e) => handleChange(e)
                                            })}  />
                                            <label htmlFor="floatingInput" className={estilos.labelStyle}>Descripción</label>
                                            
                                            <div className="invalid-feedback text-start">
                                                {errors.descripcion && errors.descripcion.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="number" className={"form-control "+(errors.precio?'is-invalid ':'')}  placeholder="First Name" {...register("precio",{
                                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                required: { value: true, message: "Ingresa el precio" },
                                                min:{value:1,message:"Precio invalido"},
                                                onChange: (e) => handleChange(e)
                                            })}  />
                                            <label htmlFor="floatingInput" className={estilos.labelStyle}>Precio</label>
                                            <div className="invalid-feedback text-start">
                                                {errors.mail && errors.mail.message} {/* se renderiza solo si la variable errors.mail existe */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="number" className={"form-control "+(errors.stock?'is-invalid ':' ')} placeholder="First Name" {...register("stock",{
                                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                required: { value: true, message: "Ingresa tu edad" },
                                                min:{value:1,message:"Stock invalido"},
                                                onChange: (e) => handleChange(e)
                                            
                                            })}  />
                                            <label htmlFor="floatingInput" className={estilos.labelStyle}>Stock</label>
                                            <div className="invalid-feedback text-start">
                                                {errors.stock && errors.stock.message} 
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="row align-items-center justify-content-center mt-4 mb-3">
                                    
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                      
                                        <LoadingButton
                                        sx={{'color':'white','backgroundColor':'rgb(2, 185, 155)',
                                            ':hover': {
                                                // bgcolor: '#09A28A', // theme.palette.primary.main
                                                bgcolor:'rgb(4, 138, 115)',
                                                color: 'white',
                                            }
                                        ,}}
                                        type="submit"
                                        disabled={!isDirty ? true : false}
                                        loading={loading}
                                        loadingPosition="center"
                                        endIcon={<FontAwesomeIcon icon={faPen} size="sm"  />}
                                        variant="contained"
                                        >Agregar</LoadingButton>
                                        
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

export default EditProducto