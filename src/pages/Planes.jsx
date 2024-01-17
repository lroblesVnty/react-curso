import CardForm from "../components/CardForm"
import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState,useEffect } from "react";
import { addPlan, getMembers, getPlans } from "../services/miembors.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

const Planes = () => {
    const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();
    const [miembros, setMiembros] = useState(null)
    const [miembro, setMiembro] = useState(null)
    const [plans, setPlans] = useState([])
    const [plan, setPlan] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const loadMembers=async ()=>{
        try {
            const resp= await getMembers()
            if (resp.status==200 && resp.data) {
                setMiembros(resp.data)  
            }
        } catch (error) {
            console.log(error)
        }
    }
    const loadplans=async ()=>{
        try {
            const resp= await getPlans()
            if (resp.status==200 && resp.data) {
                setPlans(resp.data)  
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = async (data) =>{
        setIsLoading(true)
        console.log(data)
        const datos={}
        datos.miembro_id=data.miembros.id
        datos.membresia_id=data.membresia.id
        datos.status='activo'
        console.log(datos)
        try {
            const resp= await addPlan(datos)
            if (resp.status==201) {
                    
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title:'Registro exitoso',
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
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
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadMembers() 
        loadplans() 
    },[]);//arreglo vacio para que no itere varias 

    return (
        <>
            <div className="container mt-4">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-8 mb-3">
                        <CardForm title="Suscripciones" colSize="12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <Controller
                                        name="miembros"
                                        control={control}
                                        rules={{
                                            required: "Selecciona el miembro"
                                        }}
                                        render={({ field: { onChange, value },fieldState }) => (

                                            <Autocomplete
                                            id="combo-box-miembro"
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            size="small"
                                            options={miembros}
                                            getOptionLabel={(option) => option.nombre}
                                            // sx={{ width: 300 }}
                                            value={miembro}
                                            onChange={(event, newValue) => {
                                                onChange(newValue)
                                                setMiembro(newValue);
                                                /*if(newValue  && destino && newValue.id==destino.id){
                                                    setMiembros(null);
                                                }*/
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Miembro"
                                                    variant="outlined"
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    type="text"
                                                    sx={{width:'100%'}}
                                    
                                                />
                                                
                                            )}
                                            />
                                        )}
                                    /> 
                                    
                                </div>
                                <div className="col-lg-6">
                                    <Controller
                                        name="membresia"
                                        control={control}
                                        rules={{
                                            required: "Selecciona el tipo de membresia"
                                        }}
                                        render={({ field: { onChange, value },fieldState }) => (

                                            <Autocomplete
                                            id="combo-box-membresia"
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            size="small"
                                            options={plans}
                                            getOptionLabel={(option) => option.nombre}
                                            // sx={{ width: 300 }}
                                            value={plan}
                                            onChange={(event, newValue) => {
                                                onChange(newValue)
                                                setPlan(newValue);
                                                /*if(newValue  && destino && newValue.id==destino.id){
                                                    setMiembros(null);
                                                }*/
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Membresia"
                                                    variant="outlined"
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    type="text"
                                                    sx={{width:'100%'}}
                                    
                                                />
                                                
                                            )}
                                            />
                                        )}
                                    /> 
                                    
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
                                    loadingPosition="center"
                                    endIcon={<FontAwesomeIcon icon={faFloppyDisk} size="2xs"  />}
                                    variant="outlined"
                                    >Guardar</LoadingButton>
                                </div>
                             </div>
                        </form>

                        </CardForm>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Planes