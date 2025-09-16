import React, { useEffect, useState } from "react";
import getEdos, { getViajes} from "../models/viajesModel";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {  styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";
import 'dayjs/locale/es-mx';
import estilos from '../styles/viajes.module.css'
import Images from '../assets/imagenes'
import { useNavigate } from "react-router-dom";

var edos = [];
const CssTextField = styled(TextField)({
    
    '& .MuiInputBase-root':{
        color:'white',
        'fontSize':14,
    },
    '& .MuiButtonBase-root':{
        color:'white'
    },
    '& label': {
        color: 'rgb(2, 185, 155)',
    },
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
    '& input:invalid ': {
        borderColor:'red !important'
    },
  });

const Viajes = () => {
    const [estados, setEstados] = useState(null)
    const [destino, setDestino] = useState(null)
    const [origen, setOrigen] = useState(null)
    const [fechaIda, setFechaIda] = useState(null)
    const [viajes, setViajes] = useState(null)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors,isValid},
        watch,
        reset,
        control,
        clearErrors
    } = useForm();
      /*const { errors,isValid } = useFormState({
        control
      });*/

    
    const fillEdos=async ()=>{
        const resp= await getEdos()
        if (resp.success) {
            setEstados(resp.data);
            edos=resp.data
            
        }
        
        //const response= await getEstados()
        //console.log(response) 
    }
   
    useEffect(() => {
        
        fillEdos()
       
        
    },[]);//arreglo vacio para que no itere varias 
    const onSubmit = async (data) =>{
        data.fechaHora= dayjs(data.fechaHora).format('YYYY-MM-DD')
        console.log(data)
        const resp= await getViajes(data)
        console.log(resp);
        if (resp.success) {
            setViajes(resp.data)
        }
    }
    const handleClick=(idViaje)=>{
        //console.log(viaje);
        //return false
        navigate('/obtenerBoletos',{state:{viaje:idViaje}});
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card text-bg-dark shadow-lg rounded">
                        <div className="card-body">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h4 className="card-title text-center mb-5">Viajes</h4>
                                <div className="row ">
                                    <div className="col-lg-3 mb-3">
                                        <Controller
                                            name="salida"
                                            control={control}
                                            rules={{
                                                required: "Selecciona el lugar de salida"
                                            }}
                                            render={({ field: { onChange, value },fieldState }) => (

                                                <Autocomplete
                                                id="combo-box-origen"
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                size="small"
                                                options={edos}
                                                // sx={{ width: 300 }}
                                                value={origen}
                                                onChange={(event, newValue) => {
                                                    onChange(newValue)
                                                    setOrigen(newValue);
                                                    if(newValue  && destino && newValue.id==destino.id){
                                                        setOrigen(null);
                                                    }
                                                }}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        label="Origen"
                                                        variant="outlined"
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                        
                                                    />
                                                )}
                                                />
                                            )}
                                        /> 
                                    </div>
                                    <div className="col-lg-3 mb-3">
                                        <Controller
                                            name="llegada"
                                            control={control}
                                            rules={{
                                                required: "Selecciona el lugar de llegada"
                                            }}
                                            render={({ field: { onChange, value },fieldState }) => (
                                                <Autocomplete
                                                id="combo-box-destino"
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                options={edos}
                                                size="small"
                                                value={destino}
                                                onChange={(event, newValue) => {
                                                    onChange(newValue)
                                                    setDestino(newValue);
                                                    if(newValue  && origen &&  newValue.id==origen.id){
                                                        setDestino(null);
                                                    }
                                                    //setDestino(null)
                                        
                                                }}
                                                // sx={{ width: 300 }}
                                                renderInput={(params) => (
                                                    <CssTextField
                                                        {...params}
                                                        label="Destino"
                                                        variant="outlined"
                                                        error={!!fieldState.error}
                                                        helperText={fieldState.error?.message}
                                        
                                                    />
                                                )}
                                                />
                                            )}
                                        /> 
                                    </div>
                                    <div className="col-lg-3 mb-3">
                                        <Controller
                                            name="fechaHora"
                                            control={control}
                                            rules={{
                                                required: "Ingresa la fecha de salida",
                                               
                                            }}
                                            render={({ field: { onChange, value },fieldState }) => (
                                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'es-mx'}>
                                                    <DateTimePicker
                                                        renderInput={(props) =>
                                                            
                                                            <CssTextField {...props} size="small" 
                                                                error={!!fieldState.error}
                                                                helperText={fieldState.error?.message}  
                                                                
                                                                    
                                                            />
                                                        }
                                                        label="Hora y Fecha de Ida"
                                                        value={fechaIda}
                                                       
                                                        format={'DD-MM-YYYY'}
                                                        //formatDate={(date) => dayjs(date).format('DD-MM-YYYY')}
                                                        //value={moment('04-16-2018', 'MM-DD-YYYY')}
                                                        minDate={dayjs('2022-11-11')}
                                                        minTime={dayjs('2022-02-14T08:00')}
                                                        maxTime={dayjs('2022-02-14T23:30')}
                                                        ampm={true}
                                                        onChange={(newValue) => {
                                                            
                                                            onChange(newValue)
                                                            setFechaIda(newValue);
                                                        }}
                                                        onError={(reason,value)=>{
                                                            console.log(reason)
                                                            switch (reason) {
                                                                case "invalidDate":
                                                                    setError('fechaHora', { type: 'custom', message: 'Formato invalido' });
                                                                    break;
                                                                case "minDate":
                                                                    setError('fechaHora', { type: 'custom', message: 'La fecha debe ser mayor a 14-11-2022' });
                                                                    break;
                                                                case "minTime":
                                                                    setError('fechaHora', { type: 'custom', message: 'La hora debe ser mayor a 8:00 am' });
                                                                    break;
                                                                case "maxTime":
                                                                    setError('fechaHora', { type: 'custom', message: 'La hora debe ser menor a 11:30 pm' });
                                                                    break;
                                                                default:
                                                                    //setError('fechaHora', { type: 'custom', message: 'Fecha no válida' });
                                                                    clearErrors('fechaHora')
                                                                    console.log('no hay errores')
                                                            }
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            )}
                                        /> 
                                    </div>
                                    <div className="col-lg-3 text-center mb-5">
                                        <Button variant="contained" size="medium" type="submit" 
                                            sx={{'color':'white','borderColor':'rgb(25, 135, 84)','backgroundColor':'rgb(2, 185, 155)',
                                                ':hover': {
                                                    // bgcolor: '#09A28A', // theme.palette.primary.main
                                                    bgcolor:'rgb(1, 77, 92)',
                                                    color: 'white',
                                                    'borderColor':'rgb(25, 135, 84)'
                                                }
                                            ,}}
                                        >Buscar Viaje</Button>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    {
                                        
                                        viajes?.map((viaje, index) =>
                                            <div className="col-lg-10 mb-4" key={index}>
                                                <div className={"card  mb-3 "+estilos.cardStyle} >
                                                    <div className="card-body">
                                                        <div className="row align-items-center">
                                                            <div className="col-lg-3 ">
                                                                <img src={Images.busImg} className="img-fluid" alt="..." />
                                                            </div>
                                                            <div className="col">
                                                                
                                                                <span >{viaje.horaSalida} h </span><span className={estilos.estiloFuen}>{origen.label}</span>
                                                                <br />
                                                                <span >17:00 h </span><span className={estilos.estiloFuen}>{destino.label}</span>
                                                                
                                                            </div>
                                                            <div className="col-lg-3 text-end">
                                                                {/* <button className={"btn "+estilos.btnStyle}> <span className="fw-bold">$ 800 </span> <span className={estilos.fuenteStyle}>MXN</span></button> */}
                                                                <Button variant="outlined" 
                                                                    sx={{'color':'white','borderColor':'red',
                                                                        ':hover': {
                                                                            // bgcolor: '#09A28A', // theme.palette.primary.main
                                                                            color: 'white',
                                                                            'borderColor':'red'
                                                                        }
                                                                    ,}}
                                                                    onClick={()=>handleClick(viaje.id)}
                                                                > <span className="fw-bold">$ 800&nbsp;</span> <span className={estilos.fuenteStyle}> MXN</span>
                                                                </Button>



                                                                
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className={"col text-end "+estilos.estiloFuente}>
                                                                Quedan 20 asientos  
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                    
                                        )
                                    }                                    
                                </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Viajes
