import { useForm } from "react-hook-form";
import CardForm from "./CardForm";
import { addVisita } from "../services/gym.service";
import { applyBackendErrors } from "../utils/formErrors";
import Swal from "sweetalert2";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import PostAddIcon from '@mui/icons-material/PostAdd';
import styles from '../styles/PagoFormStyles.css'
import { formatDateTimeLocal } from "../utils/formateDateTimeLocal";
import { splitDateTime } from "../utils/dateUtils";

const AddVisitaForm = ({openModal,onUserAdded}) => {
    const {register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful,isDirty},reset, clearErrors,setError
        } = useForm();
        const [isLoading, setIsLoading] = useState(false);

     const onSubmit = async (data) => {
        console.log(data);
        //const fechaFormateada = formatDateTimeLocal(data.visited_at);
        //console.log('Fecha formateada:', fechaFormateada);
        const {fecha, hora} = splitDateTime(data.visited_at);
        
        const payload = {
            ...data,
            fecha_visita: fecha,
            hora_entrada: hora+':00' // Agregar segundos como ':00'
        };
        //console.log(payload);
       
        setIsLoading(true);
        try {
            const response = await addVisita(payload);
            if (response.status === 201) {
                if (onUserAdded) {
                            onUserAdded();
                }
                Swal.fire({
                    icon: 'success',
                    title: '¡Visita agregada!',
                    text: 'La visita se ha agregado correctamente.',
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
    <CardForm title={'Agregar Visita'} colSize="12">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col">
                    <div className="form-floating mb-3">
                        <input type="text" className={"form-control "+(isSubmitted?errors.usuario?'is-invalid':'is-valid':'')} placeholder="name@example.com" name="usuario"
                            {...register("usuario", { 
                                validate: value =>value.trim() !="" || "El nombre no puede estar vacio",
                                required: { value: true, message: "Ingresa el nombre" },
                                pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                minLength: { value: 3, message: "El nombre debe contener más de 3 caracteres" },
                                maxLength:{value:100,message:"Solo se aceptan maximo 100 caracteres "}
                                }
                            )}
                        />
                        <label htmlFor="exampleFormControlInput1" className="form-label">Usuario</label>
                        <div className="invalid-feedback">
                            {errors.usuario && errors.usuario?.message}
                        </div>
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
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-floating mb-3">
                    <input type="datetime-local" className={"form-control "+(isSubmitted?errors.visited_at?'is-invalid':'is-valid':'')}  placeholder="name@example.com" name="visited_at"
                        {...register("visited_at", {
                            required: "La fecha es obligatoria",
                            validate: {
                                //noFuturo: value => new Date(value) <= new Date() || "No se permite una fecha futura",
                                //rangoValido: value => new Date(value) >= new Date("2022-01-01") || "Debe ser posterior a 01/01/2022"
                            }
                            })
                        }


                    />
                    <label htmlFor="visited_at" className="form-label">Fecha Visita</label>
                    <div className="invalid-feedback">
                        {errors.visited_at && errors.visited_at?.message}
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="d-grid gap-2 col-6 mx-auto">
                    <LoadingButton
                   
                    type="submit"
                    loading={isLoading}
                    disabled={!isDirty ? true : false}
                    loadingPosition="center"
                    endIcon={<PostAddIcon />}
                    variant="outlined"
                    >{'Registrar'}</LoadingButton>
                </div>
            </div>
        </form>
    </CardForm>
  );
};

export default AddVisitaForm;
