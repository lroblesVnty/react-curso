import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import guardar,{ getEdos, getMunicipio } from "../models/modelo";
import estilos from '../styles/input.module.css'
import Swal from 'sweetalert2'
import NavBar from "../components/NavBar";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {  styled } from '@mui/material/styles';
const pages=['Consultar','Products','Blog']
var top100Films = [];
const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'rgb(2, 185, 155)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(25, 135, 84)',
      },
      '&:hover fieldset': {
        borderColor: 'rgb(25, 135, 84)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'rgb(2, 185, 155)',
        boxShadow:'0 0 0 0.2rem rgba(4, 206, 172, 0.25)'
      },
     
    }, 
    '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
    },
    '& input:invalid:focus + fieldset': {
        borderColor:'red !important'
    },
  });
const FormValidation = () => {
    const {
        register,
        handleSubmit,
        formState: { errors},
        watch,
        reset,
        control
    } = useForm();
   /* const { dirtyFields } = useFormState({
        control,
    });*/
    
    const onSubmit = async (data) =>{
        const resp= await guardar(data)
        console.log(resp);
        if (resp.success) {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title:resp.msg,
                showConfirmButton: true,
                allowOutsideClick:false,
            });
            reset();
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
    //const [estado, setEstado] = useState(null)
    const [municipios, setMunicipios] = useState(null)
    const [estados, setEstados] = useState(null)
    const [estado, setEstado] = useState(null)
    const handleChangeEstado=(e)=>{
       // setEstado(e.target.value)
        getMuni(e.target.value)
    }
    const getMuni=async (edo)=>{
        const resp= await getMunicipio(edo)
        if (resp.response) {
            setMunicipios(resp.response.municipios);
        }
    }
   
    const fillEdos=async ()=>{
        const resp= await getEdos()
        if (resp.response) {
            setEstados(resp.response.estados);
            top100Films=resp.response.estados
        }
    }
   
    useEffect(() => {
        
        fillEdos()
        
       
        
    },[]);//arreglo vacio para que no itere varias 
    return (
        <>
            <NavBar pages={pages}/>
            <div className="container">
                <div className="row mt-3 justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-lg text-bg-dark mb-5">
                            <h3 className="card-header text-center">Agregar</h3>    
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            <div className="form-floating mb-3">
                                                <input type="text" className={"form-control "+(errors.nombre?'is-invalid ':'is-valid ')+estilos.inputStyle } placeholder="First Name" {...register("nombre",{
                                                    validate: value =>value.trim() !="" || "El nombre debe contener más de 5 caracteres",
                                                    pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                                    minLength: { value: 5, message: "El nombre debe contener más de 5 caracteres" },
                                                    required: { value: true, message: "Ingrese el nombre" },
                                                    maxLength:{value:100,message:"Solo se aceptan maximo 100 caracteres "}
                                                })}  />
                                                <label htmlFor="floatingInput" className={estilos.labelStyle}>Nombre</label>
                                               
                                                <div className="invalid-feedback">
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
                                                    required: { value: true, message: "Ingrese tu email" },
                                                })}  />
                                                <label htmlFor="floatingInput" className={estilos.labelStyle}>Mail</label>
                                                <div className="invalid-feedback">
                                                    {errors.mail && errors.mail.message} {/* se renderiza solo si la variable errors.mail existe */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4">
                                            <div className="form-floating mb-3">
                                                <input type="password" className={"form-control "+(errors.pw?'is-invalid ':'is-valid ')+estilos.inputStyle}  placeholder="First Name" {...register("pw",{
                                                    maxLength:{value:12,message:"Solo se admiten maximo 12 caracteres"},
                                                    required: { value: true, message: "Ingresa un password" },
                                                })}  />
                                                <label htmlFor="floatingInput" className={estilos.labelStyle}>Password</label>
                                                <div className="invalid-feedback">
                                                    {errors.pw && errors.pw.message}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-floating mb-3">
                                                <input type="password" className={"form-control "+(errors.pww?'is-invalid ':'is-valid ')+estilos.inputStyle} placeholder="First Name" {...register("pww",{
                                                    validate: value =>value === watch('pw') || "Los password no coinciden",
                                                    maxLength:{value:12,message:"Solo se admiten maximo 12 caracteres"},
                                                    required: { value: true, message: "Repite tu password" },
                                                })}  />
                                                <label htmlFor="floatingInput" className={estilos.labelStyle}>Repetir Password</label> 
                                                <div className="invalid-feedback">
                                                    {errors.pww && errors.pww.message} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            <div className="form-floating mb-3">
                                                <input type="number" className={"form-control "+(errors.edad?'is-invalid ':'is-valid ') +estilos.inputStyle} placeholder="First Name" {...register("edad",{
                                                    valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                    required: { value: true, message: "Ingresa tu edad" },
                                                    max:{value:150,message:"Edad no válida"},
                                                    min:{value:1,message:"Edad invalida"},
                                                
                                                })}  />
                                                <label htmlFor="floatingInput" className={estilos.labelStyle}>Edad</label>
                                                <div className="invalid-feedback">
                                                    {errors.edad && errors.edad.message} 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4">
                                            <div className="form-floating mb-3">
                                                <select className={"form-select "+(errors.estado?'is-invalid ':'is-valid ')+estilos.selectStyle}  {...register("estado",{
                                                     required: 'Selecciona un estado'
                                                })} 
                                                onChange={handleChangeEstado} defaultValue="">
                                                    <option disabled value="">Elige una opción</option>
                                                    {estados&&estados.map((val)=><option value={val.id} key={val.id}>{val.label}</option>)} 
                                                </select>
                                                <label htmlFor="floatingSelect" className={estilos.labelStyle}>Estado</label>
                                                <div className="invalid-feedback">
                                                    {errors.estado && errors.estado.message} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-floating mb-3">
                                                <select className={"form-control "+(errors.estado?'is-invalid ':'is-valid ') +estilos.inputStyle} {...register("municipio",{
                                                    required:"Elige un municipio"
                                                })} defaultValue="">
                                                    <option  disabled value="">Elige una opción</option>
                                                    {municipios&&municipios.map((val)=><option value={val.id} key={val.id}>{val.nombre}</option>)} 
                                                </select>
                                                <label htmlFor="floatingSelect" className={estilos.labelStyle}>Municipio</label>
                                                <div className="invalid-feedback">
                                                    {errors.municipio && errors.municipio.message} 
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                            <div className="form-check mb-3">
                                                <input  className={"form-check-input "+(errors.terminos?'is-invalid':'')} type="checkbox" {...register("terminos",{
                                                    required:"Acepta los terminos y condiciones"
                                                })} defaultValue="" id="terminos"/>
                                                <label className="form-check-label" htmlFor="terminos">
                                                    Acepto los terminos y condiciones
                                                </label>
                                                <div className="invalid-feedback">
                                                    {errors.terminos && errors.terminos.message} 
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row justify-content-center">
                                        <div className="col-lg-8">
                                        <Controller
                                            name="country"
                                            control={control}
                                            rules={{
                                                required: "Selecciona un estado",
                                            }}
                                            render={({ field: { onChange, value },fieldState }) => (
                                                
                                                <Autocomplete
                                                    options={top100Films}
                                                    isOptionEqualToValue={(option, value) => option.id === value.id}
                                                    id="combo-box-demo"
                                                    onChange={(event, values, reason) =>{ 
                                                        onChange(values)
                                                        setEstado(values)
                                                    }}
                                                    value={estado}
                                                    renderInput={(params) => (
                                                    <CssTextField 
                                                        {...params}
                                                        label="Estado"
                                                        variant="outlined"
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                                        sx={{ borderColor:'blue' }}
                                                    
                                                    />
                                                    )}
                                                   
                                                />
                                                
                                            )}
                                            /> 
                                        </div>
                                    </div>
                                   
                                    <div className="row align-items-center justify-content-center mt-4">
                                        <div className="col-lg-6 text-center">
                                            <div className="d-grid gap-2">
                                                <button className={"btn "+ estilos.btnStyle } id="btn-edit" type="submit">Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {dirtyFields.nombre && <p>Field is dirty.</p>} */}
                                                                            
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormValidation;
