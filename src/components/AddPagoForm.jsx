import CardForm from "./CardForm"
import { useForm } from "react-hook-form";
import  { useState,useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import FieldError from "./FieldError";
import AddCardIcon from '@mui/icons-material/AddCard';
import Button from '@mui/material/Button';
import { addPago } from "../services/miembors.service";
import Swal from 'sweetalert2'
import { getResponseError } from "../models/errorUtils";
import { applyBackendErrors } from "../utils/formErrors";
import styles from '../styles/PagoFormStyles.css'

const AddPagoForm = ({miembroData,openModal}) => {
     const [defaultValues, setDefaultValues] = useState({miembro:miembroData.nombre+' '+miembroData.apellido,plan:'',monto:'',metodoPago:'',fechaPago:''});
     const {register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful,isDirty},reset, clearErrors,setError
    } = useForm();
    const [msgError, setMsgError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [backendError, setBackendError] = useState(false);

    



    useEffect(() => {
        if (miembroData) {
            console.log('entriii'+miembroData.nombre)
            reset({
            miembro: `${miembroData.nombre} ${miembroData.apellido}`,
            plan: miembroData.plan.nombre_plan,
            monto: '',
            metodo_pago: '',
            fechaPago: ''
            });
        }
    }, [miembroData, reset]);




    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data);
        const newData={miembro_id:miembroData.id,plan_id:miembroData.plan.id,monto:data.monto,metodo_pago:data.metodo_pago,}
        //fecha_pago:data.fechaPago}
        console.log(newData)
        try {
            
            const response = await addPago(newData);
            if (response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Usuario agregado!',
                    text: 'El usuario se ha actualizado correctamente.',
                    customClass: {
                        popup: styles['swal-popup-z']
                    },
                    //target: document.body, // Asegura que se renderice en el body
                    showConfirmButton: false,
                    returnFocus: false,
                    timer: 1500 // El mensaje se cerrará automáticamente después de 1.5 segundos
                 });
                reset();
                openModal(false);
            }
        } catch (error) {
            console.log(error);
           
            console.log(error)
            if (error.response.status==422) {
                //setBackendError(true);
                //setMsgError(getResponseError(error))
                const backendErrors = error?.response?.data?.errors;
                if (backendErrors) {
                    clearErrors()
                    applyBackendErrors(backendErrors, setError);
                }

            }else{
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title:error.message,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                    //target: document.body, // Asegura que se renderice en el body
                });
            }
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <CardForm title={'Registrar Pago' } colSize="12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" className={"form-control"} placeholder="name@example.com" name="plan"
                                {...register("miembro", { required: true })}
                                readOnly
                            />
                            <label htmlFor="exampleFormControlInput1" className="form-label">Miembro</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                     <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" className={"form-control"} placeholder="name@example.com" name="plan"
                                {...register("plan", { required: true })}
                                defaultValue="Basico"
                                readOnly
                            />
                            <label htmlFor="plan" className="form-label">Plan</label>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                           <input type="text" className={"form-control "+(isSubmitted?errors.monto?'is-invalid':'is-valid':'')}  placeholder="First Name" {...register("monto",{
                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                required: { value: true, message: "Ingresa el monto" },
                                validate: (value) => {
                                const regex = /^\d{1,6}(\.\d{1,2})?$/;
                                if (!regex.test(value)) {
                                return "Máximo 6 enteros y 2 decimales";
                                }
                                if (parseFloat(value) <= 0) {
                                return "Debe ser mayor que cero";
                                }
                                return true;
                                }
                                })}/>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Monto</label>
                                <div className="invalid-feedback">
                                    {errors.monto && errors.monto?.message}
                                </div>
                                <FieldError message={msgError?.monto} />
                        </div>
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <select className={"form-select "+(isSubmitted?errors.metodo_pago?'is-invalid':'is-valid':'')} aria-label="Floating label select example"
                            {...register("metodo_pago",{
                                    required:"Selecciona un Metodo de Pago",
                                })}
                            name="metodo_pago" id="metodo_pago"
                            >
                                <option value="" disabled>Elige un Metodo de Pago</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Tarjeta">Tarjeta de Crédito</option>
                                <option value="Transferencia">Transferencia Bancaria</option>
                            </select>
                            <label htmlFor="metodo_pago">Metodo de Pago</label>
                            <div className="invalid-feedback">
                                {errors.metodo_pago && errors.metodo_pago?.message} 
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="date" className={"form-control "+(isSubmitted?errors.fechaPago?'is-invalid':'is-valid':'')}  placeholder="name@example.com" name="fechaPago"
                                {...register("fechaPago", {
                                    required: "La fecha es obligatoria",
                                    validate: {
                                        //noFuturo: value => new Date(value) <= new Date() || "No se permite una fecha futura",
                                        rangoValido: value => new Date(value) >= new Date("2022-01-01") || "Debe ser posterior a 01/01/2022"
                                    }
                                    })
                                }


                            />
                            <label htmlFor="fechaPago" className="form-label">Fecha de Pago</label>
                            <div className="invalid-feedback">
                                {errors.fechaPago && errors.fechaPago?.message}
                            </div>
                            <FieldError message={msgError?.fechaPago} />
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
                            endIcon={<AddCardIcon />}
                            variant="outlined"
                            >{'Registrar'}</LoadingButton>
                    </div>
                </div>
                
            </form>

        </CardForm>
    )
}
export default AddPagoForm