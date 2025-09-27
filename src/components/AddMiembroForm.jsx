import CardForm from "../components/CardForm";
import { useForm } from "react-hook-form";
import  { useState,useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import FieldError from "../components/FieldError";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';
import { getPlansList } from "../services/gym.service";
import { addMember, updateMember } from "../services/miembors.service";
import Swal from 'sweetalert2'
import { getResponseError } from "../models/errorUtils";
import { use } from "react";

const AddMiembroForm = ({onUserAdded,isEditing=false,userData=null}) => {
    const [defaultValues, setDefaultValues] = useState({nombre:'',apellido:'',edad:'',tel:'',plan:''});
   /* var plan=isEditing && userData?.plan || userData.plan_id;
    userData.plan=plan;
    console.log(userData)*/
    const {register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful,isDirty},reset, clearErrors,setValue
    } = useForm({ defaultValues: isEditing ? userData : defaultValues});
    const [isLoading, setIsLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [msgError, setMsgError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [plans, setPlans] = useState([]);
    //TODO VERIFICAR QUE CARGUE EL PLAN SELECCIONADO EN EL SELECT

     const handleCloseModal = () => {
        setModalOpen(false);
    };

     useEffect(() => { 
        loadplans()
        console.log(userData)
        console.log({isEditing})
       
    },[]);//arreglo vacio para que no itere varias veces

   // useEffect para manejar la inicialización del formulario
    useEffect(() => {
        if (isEditing && userData && plans.length > 0) {
            reset({
            plan: userData.plan,
            // otros campos si es necesario
        });
        }
    }, [isEditing, userData, plans, reset]); // ← importante incluir `plans`



   

    /*useEffect(() => {
        if (isEditing && userData) {
            // Si estamos editando y tenemos userData, resetea el formulario con esos datos.
            reset(userData);
        } else if (!isEditing) {
        // Si no estamos editando (modo agregar), resetea los campos a vacíos.
            reset(defaultValues);
        }
    }, [userData, isEditing, reset]); // Añade 'reset' a las dependencias porque es una función memoizada de useForm*/

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
        if (isEditing) {
            if (isDirty) {
                data.id=userData.id;
                console.log('editando')
                console.log(data)
                try {
                    const resp=await updateMember(data)
                    console.log(resp)
                    if (resp.status==200) {
                        if (onUserAdded) {
                            onUserAdded();
                        }
                        Swal.fire({
                            icon: 'success',
                            title: '¡Usuario agregado!',
                            text: 'El usuario se ha actualizado correctamente.',
                            showConfirmButton: false,
                            timer: 1500 // El mensaje se cerrará automáticamente después de 1.5 segundos
                        });
                        setMsgError(null)
                        //setIsSucces(true)
                        setDefaultValues({nombre:'',apellido:'',edad:'',tel:'',plan:''})
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
                    setDefaultValues({nombre:'',apellido:'',edad:'',tel:''})
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
         <CardForm title={isEditing ? 'Editar Miembro' : 'Agregar Miembro'} colSize="12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col">
                            <div className="form-floating mb-3">
                                <input type="text" className={"form-control "+(isSubmitted?errors.nombre?'is-invalid':'is-valid':'')} placeholder="name@example.com" autocomplete="off"  
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
                                <input type="text" className={"form-control "+(isSubmitted?errors.apellido?'is-invalid':'is-valid':'')} placeholder="name@example.com" autocomplete="off"  
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
                                <input type="number"  className={"form-control "+(isSubmitted?errors.edad?'is-invalid':'is-valid':'')} placeholder="First Name" autocomplete="off" {...register("edad",{
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
                                <input type="tel" className={"form-control "+(isSubmitted?errors.tel?'is-invalid':'is-valid':'')} placeholder="name@example.com" autocomplete="off"
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
                                    })}
                                name="plan" id="plan"
                                >
                                    <option value="" disabled>Elige un plan</option>
                                    {plans&&plans.map((val)=><option value={Number(val.id)} key={val.id}>{val.nombre_plan}</option>)}
                                    
                                
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
                            >{isEditing ? 'Editar' : 'Agregar'}</LoadingButton>
                        </div>
                    </div>
                    
                </form>
                      
                    

        </CardForm>
  )
}
export default AddMiembroForm