import CardForm from "./CardForm"
import { useForm } from "react-hook-form";
import  { useState,useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import FieldError from "./FieldError";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Button from '@mui/material/Button';

const AddPagoForm = ({miembroData}) => {
     const [defaultValues, setDefaultValues] = useState({miembro:'',plan:'',monto:'',metodoPago:'',fechaPago:''});
     const {register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful,isDirty},reset, clearErrors,setValue
    } = useForm();
    const [msgError, setMsgError] = useState(null);
     const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data) => {
        console.log(data);
    }
    return (
        <CardForm title={'Registrar Pago' } colSize="12">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="text" className={"form-control"} placeholder="name@example.com" name="plan"
                                {...register("nombre", { required: true })}
                                defaultValue="Luis"
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
                           <input type="text" className={"form-control "+(isSubmitted?errors.monto?'is-invalid':'is-valid':'')} placeholder="First Name" {...register("monto",{
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
                                    {errors.monto && errors.monto.message}
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
                                <option value="" disabled selected>Elige un Metodo de Pago</option>
                                <option value="Efectivo">Efectivo</option>
                                <option value="Tarjeta">Tarjeta de Crédito</option>
                                <option value="Transferencia">Transferencia Bancaria</option>
                            </select>
                            <label htmlFor="metodo_pago">Metodo de Pago</label>
                            <div className="invalid-feedback">
                                {errors.metodo_pago && errors.metodo_pago.message} 
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-floating mb-3">
                            <input type="date" className={"form-control"} placeholder="name@example.com" name="fechaPago"/>
                            <label htmlFor="fechaPago" className="form-label">Fecha de Pago</label>
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
                            //disabled={!isDirty ? true : false}
                            loadingPosition="center"
                            endIcon={<FontAwesomeIcon icon={faUserPlus} size="2xs"  />}
                            variant="outlined"
                            >{'Registrar'}</LoadingButton>
                    </div>
                </div>
                
            </form>

        </CardForm>
    )
}
export default AddPagoForm