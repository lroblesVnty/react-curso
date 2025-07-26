import CardForm from "../components/CardForm";
import { useForm } from "react-hook-form";
import  { useState,useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import FieldError from "../components/FieldError";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import { getPlansList } from "../services/gym.service";
import { addMember } from "../services/miembors.service";
import Swal from 'sweetalert2'
import { getResponseError } from "../models/errorUtils";

const AddMiembroForm = ({onUserAdded}) => {
    const {register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful,isDirty},reset, clearErrors,setValue
    } = useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [msgError, setMsgError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [plans, setPlans] = useState([]);
     const [defValues, setDefValues] = useState({nombre:'',apellido:'',edad:'',tel:''});

     const handleCloseModal = () => {
        setModalOpen(false);
    };

     useEffect(() => { 
        loadplans()
       
    },[]);//arreglo vacio para que no itere varias veces

    const loadplans=async ()=>{
        try {
            const resp= await getPlansList()
            if (resp.status==200 && resp.data) {
                setPlans(resp.data)
            }
        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title:error.message,
                showConfirmButton: true,
                allowOutsideClick:false,
            });
        }
    }


    const onSubmit = async (data) =>{
        console.log({isDirty})
        setIsLoading(true)
        data.plan_id=data.plan;
        delete data.plan
        if (isEdit) {
            if (isDirty) {
                console.log('editando')
                try {
                    const resp=await updateMember(data)
                    console.log(resp)
                    if (resp.status==200) {
                        if (onUserAdded) {
                            onUserAdded();
                        }
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title:'Actualizado Correctamente',
                            showConfirmButton: true,
                            allowOutsideClick:false,
                        });
                        setMsgError(null)
                        //setIsSucces(true)
                        setDefValues({nombre:'',apellido:'',edad:'',tel:''})
                        setIsEdit(false)
                    }

                } catch (error) {
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title:error.message,
                        showConfirmButton: true,
                        allowOutsideClick:false,
                    });
                    console.log(error)
                    if (error.response.status==422) {
                        setMsgError(getResponseError(error))
                    }
                }finally{
                    setIsLoading(false)
                }
            }
        }else{
            try {
                const resp= await addMember(data)
                console.log(resp)
                if (resp.status==201) {
                    if (onUserAdded) {
                            onUserAdded();
                    }
                    
                    // *** AQUI ES DONDE AGREGAS EL MENSAJE DE ÉXITO ***
                    Swal.fire({
                        icon: 'success',
                        title: '¡Usuario agregado!',
                        text: 'El nuevo usuario se ha registrado correctamente.',
                        showConfirmButton: false,
                        timer: 1500 // El mensaje se cerrará automáticamente después de 1.5 segundos
                    });
                    setMsgError(null)
                    //setIsSucces(true)
                    setDefValues({nombre:'',apellido:'',edad:'',tel:''})
                    setIsEdit(false)
                    reset()
                }
            } catch (error) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title:error.message,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
                console.log(error)
                console.log(error.response.data)
                // setMsgErrors(error.response.data.errors)
                if (error.response.status==422) {
                    setMsgError(getResponseError(error))
                    /*setMsgError({
                        ...msgError, // Copy other fields
                        ['data']: error.response.data.errors
                    });*/
                
                    /*setMsgError({
                        ...msgError, // Copy other fields
                        ['errors']: error.response.data.errors
                    });*/
                    //setMsgError(prevState => ({ ...prevState, data: [...prevState.data,error.response.data.errors]}));
                    //setMsgError(oldArray => [...oldArray,error.response.data.errors ]);
                }
            }finally{
                setIsLoading(false)
            }
        }
           
    
    }
    return (
         <CardForm title="Añadir Miembro" colSize="12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className={"form-control "+(isSubmitted?errors.nombre?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                    {...register("nombre",{
                                        validate: value =>value.trim() !="" || "El nombre no puede estar vacio",
                                        required: { value: true, message: "Ingresa el nombre" },
                                        //pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                        //minLength: { value: 3, message: "El nombre debe contener más de 3 caracteres" },
                                        maxLength:{value:100,message:"Solo se aceptan maximo 100 caracteres "}
                                    })}
                                    
                                />
                                <label htmlFor="exampleFormControlInput1" className="form-label">Nombre</label>
                                <div className="invalid-feedback">
                                    {errors.nombre && errors.nombre.message}
                                </div>
                                <FieldError message={msgError?.nombre} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className={"form-control "+(isSubmitted?errors.apellido?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                    {...register("apellido",{
                                        validate: value =>value.trim() !="" || "El apellido no puede estar vacio",
                                        required: { value: true, message: "Ingresa el apellido" },
                                        //pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                        //minLength: { value: 3, message: "El nombre debe contener más de 3 caracteres" },
                                        maxLength:{value:100,message:"Solo se aceptan maximo 100 caracteres "}
                                    })}
                                    
                                />
                                <label htmlFor="exampleFormControlInput1" className="form-label">Apellido</label>
                                <div className="invalid-feedback">
                                    {errors.apellido && errors.apellido.message}
                                </div>
                                <FieldError message={msgError?.apellido} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="number"  className={"form-control "+(isSubmitted?errors.edad?'is-invalid':'is-valid':'')} placeholder="First Name" {...register("edad",{
                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                required: { value: true, message: "Ingresa tu edad" },
                                max:{value:100,message:"Edad no válida"},
                                min:{value:11,message:"El miembro debe ser mayor de 10 años"},       
                                })} min="0" />
                                <label htmlFor="exampleFormControlInput1" className="form-label">Edad</label>
                                <div className="invalid-feedback">
                                    {errors.edad && errors.edad.message}
                                </div>
                                <FieldError message={msgError?.edad} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="tel" className={"form-control "+(isSubmitted?errors.tel?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                    {...register("tel",{
                                        validate: value =>value.trim() !="" || "El teléfono no puede estar vacio",
                                        required: { value: true, message: "Ingresa el teléfono" },
                                        minLength: { value: 10, message: "El teléfono debe contener mínimo 10 caracteres" },
                                        maxLength: { value: 12, message: "El teléfono debe contener máximo 12 caracteres" },
                                        //pattern:{value: /^[0-9]+$/,message:"Solo se apcetan números"},
                                    })}
                                />
                                <label htmlFor="exampleFormControlInput1" className="form-label">Teléfono</label>
                                <div className="invalid-feedback">
                                    {errors.tel && errors.tel.message}
                                </div>
                                <FieldError message={msgError?.tel} />
                            </div>
                        </div>
                    </div>
                     <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <select className={"form-select "+(isSubmitted?errors.plan?'is-invalid':'is-valid':'')} aria-label="Floating label select example"
                                {...register("plan",{
                                        required:"Selecciona un Plan"
                                    })} defaultValue=""
                                >
                                    <option value="" disabled>Elige un plan</option>
                                    {plans&&plans.map((val)=><option value={val.id} key={val.id}>{val.nombre_plan}</option>)}
                                    
                                
                                </select>
                                <label htmlFor="floatingSelect">Plan</label>
                                <div className="invalid-feedback">
                                    {errors.plan && errors.plan.message} 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <LoadingButton
                            sx={{'color':'white','bgcolor':'#f53d00',borderColor:'rgb(245, 61, 0)',
                                ':hover': {
                                    // bgcolor: '#09A28A', // theme.palette.primary.main
                                    bgcolor:'#ff5024',
                                    color: 'white',
                                    borderColor:'#ff5024'
                                },'.MuiLoadingButton-loadingIndicator':{
                                    color:'white'
                                }
                            ,}}
                            type="submit"
                            loading={isLoading}
                            disabled={!isDirty ? true : false}
                            loadingPosition="center"
                            endIcon={<FontAwesomeIcon icon={faUserPlus} size="2xs"  />}
                            variant="outlined"
                            >{isEdit ? 'Editar' : 'Agregar'}</LoadingButton>
                        </div>
                    </div>
                    
                </form>
                      
                    

        </CardForm>
  )
}
export default AddMiembroForm