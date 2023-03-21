import { useState } from 'react'
import { useForm, Controller } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { setRegister } from '../models/modelo';


const Register = () => {
    const {register, handleSubmit,formState: { errors},watch,reset,control} = useForm();
    const [loading, setLoading] = useState(false);
    const [respErrors, setRespErrors] = useState({});
    const onSubmit = async (data) =>{
        setLoading(!loading)
        console.log(data)
        try {
            const resp= await setRegister(data)
            if (resp.status==201) {
               
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title:resp.msg,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
                reset();
            }
            
        } catch (error) {
            console.log(error)
            if (error.response.status==422) {
                console.log(error.response.data)
            }
        }
        setLoading(!loading)

    }

  return (
    <div className="container mt-4">
        <div className="row justify-content-center">
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-header fs-3 text-center">
                        Registrar
                    </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col mb-3">
                                    <Controller
                                        defaultValue=""
                                        name={"name"}
                                        control={control}
                                        rules={{
                                            validate: value =>value.trim() !="" || "El nombre es requerido",
                                            pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                            required:{value:true,message:'Ingresa el nombre'},
                                            maxLength:{value:120,message:'Solo se permiten 120 caracteres'},
                                        }}
                                        render={({ field: { onChange, value },fieldState }) => (
                                        <TextField id="name" label="Nombre" variant="outlined"  onChange={onChange} value={value}  type="text"
                                            error={!!fieldState.error}
                                            helperText={fieldState.error?.message}
                                            sx={{width:'100%'}} />
                                        )}
                                    />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <Controller
                                            defaultValue=""
                                            name={"email"}
                                            control={control}
                                            rules={{
                                                pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: "El mail no tiene el formato correcto" },
                                                required: { value: true, message: "Ingrese el email" },
                                            }}
                                            render={({ field: { onChange, value },fieldState }) => (
                                            <TextField id="email" label="Email" variant="outlined"  onChange={onChange} value={value}  type="email"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                sx={{width:'100%'}} />
                                            )}
                                        />   
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <Controller
                                            defaultValue=""
                                            name={"password"}
                                            control={control}
                                            rules={{
                                                required:{value:true,message:'Ingresa el nombre'},
                                                maxLength:{value:20,message:'Solo se permiten 20 caracteres'},
                                            }}
                                            render={({ field: { onChange, value },fieldState }) => (
                                            <TextField id="password" label="Password" variant="outlined"  onChange={onChange} value={value}  type="password"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                sx={{width:'100%'}} />
                                            )}
                                        />   
                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <Controller
                                            defaultValue=""
                                            name={"password_confirmation"}
                                            control={control}
                                            rules={{
                                                required:{value:true,message:'Ingresa el nombre'},
                                                maxLength:{value:20,message:'Solo se permiten 20 caracteres'},
                                                validate: value =>value === watch('password') || "Los password no coinciden",
                                            }}
                                            render={({ field: { onChange, value },fieldState }) => (
                                            <TextField id="pwc" label="Confirmar Password" variant="outlined"  onChange={onChange} value={value}  type="password"
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                                sx={{width:'100%'}} />
                                            )}
                                        />   
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                   
                                        <LoadingButton
                                        sx={{'color':'white','backgroundColor':'rgb(2, 185, 155)',
                                            ':hover': {
                                                // bgcolor: '#09A28A', // theme.palette.primary.main
                                                bgcolor:'rgb(4, 138, 115)',
                                                color: 'white',
                                            },width:'100%'
                                            
                                        ,}}
                                        type="submit"
                                        loading={loading}
                                        loadingPosition="center"
                                        endIcon={<FontAwesomeIcon icon={faUserPlus}  />}
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
export default Register