import CardForm from "../components/CardForm";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import  { useState,useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { addMember, getMembers, updateMember } from "../services/miembors.service";
import Swal from 'sweetalert2'
import { getResponseError } from "../models/errorUtils";
import FieldError from "../components/FieldError";
import DataTableMiem from "../components/DataTableMiem";


const pages=['Consultar','Products','Blog']


const Miembros = () => {
    const {
        register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful,isDirty},reset, clearErrors,setValue
    } = useForm();
    const [isLoading, setIsLoading] = useState(false)
    //const [msgError, setMsgError] = useState({data:[{nombre:"dsada"},{"nombre":"dsarwe"}]})
    //*const [msgError, setMsgError] = useState({data:[{nombre:['dsa','fds']}]})
    const [msgError, setMsgError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [defValues, setDefValues] = useState({nombre:'',edad:'',tel:''});
    const [isEdit, setIsEdit] = useState(false);
    const [isSucces, setIsSucces] = useState(false);
    //TODO condicionar el metodo onsubmit para mandar a guardar si isediting es falso

    useEffect(() => {
        //reset({...defValues});
        reset(defValues);
        //console.log('cambio form')

    },[defValues]);//arreglo vacio para que no itere varias veces
    
    useEffect(() => {
        (async()=>{
            getMiembros()
        })();
       
    },[]);//arreglo vacio para que no itere varias veces
    useEffect(() => {
        reset({nombre:'',edad:'',tel:''})
        //console.log('cambio  success')
        getMiembros()
    }, [isSubmitSuccessful])

    const getMiembros=async ()=>{
        setLoading(true)
        try {
            const resp= await getMembers()
            console.log(resp)
            setLoading(false)
            if (resp.status==200) {
                if (resp.data) {
                    setRows(resp.data)
                    setRowCount(resp.data.length)
                    //console.log(resp.data.length)
                }
            }
        } catch (error) {
            
            Swal.fire({
                position: 'top',
                icon: 'error',
                title:error.message,
                showConfirmButton: true,
                allowOutsideClick:false,
            });
            
        }finally{
            setLoading(false)
        }
        
        
    }

    const onSubmit = async (data) =>{
        console.log({isDirty})
        setIsLoading(true)
        console.log(data)
        if (isEdit) {
            if (isDirty) {
                console.log('editando')
                try {
                    const resp=await updateMember(data)
                    console.log(resp)
                    if (resp.status==200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title:'Actualizado Correctamente',
                            showConfirmButton: true,
                            allowOutsideClick:false,
                        });
                        setMsgError(null)
                        //setIsSucces(true)
                        setDefValues({nombre:'',edad:'',tel:''})
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
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title:'Registro exitoso',
                        showConfirmButton: true,
                        allowOutsideClick:false,
                    });
                    setMsgError(null)
                    //setIsSucces(true)
                    setDefValues({nombre:'',edad:'',tel:''})
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
    <>
       <NavBar pages={pages}/>
       <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
            <div className="col-lg-4 mb-3">
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
            </div>
            <div className="col-lg-8">
                <CardForm title="Miembros" colSize="12">
                    <DataTableMiem rows={rows} loading={loading} rowCount={rowCount} setEditValues={setDefValues} setIsEdit={setIsEdit}/>
                </CardForm>
            </div>
        </div>
       </div>
    </>
  )
}

export default Miembros