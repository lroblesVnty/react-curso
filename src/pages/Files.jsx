import CardForm from "../components/CardForm"
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm, Controller } from "react-hook-form";
import { uploadFile } from "../services/equipos.service";
import Swal from 'sweetalert2'
import  { useState,useEffect } from "react";

const Files = () => {
    const {
        register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful},
        watch,reset,control, clearErrors,setValue
    } = useForm();
    const [loading, setLoading] = useState(false)
    const [msgError, setMsgError] = useState([])
    useEffect(() => {
        reset()
    }, [isSubmitSuccessful])
    const onSubmit = async (data) =>{
        setLoading(true)
        setMsgError([])
        const formData = new FormData();
        formData.append("file", data.file[0]);
        console.log(data)
        try {
            const resp=await uploadFile(formData);
            console.log(resp)
            if (resp.status==201) {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title:resp.data.msg,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
                reset()
            }
            
        } catch (error) {
            console.log(error)
            if (error.response.status==422) {
                error.response.data.errors.file.forEach(val =>{
                    setMsgError(oldArray => [...oldArray, val]);
                });
            }
        }
        setLoading(false)
    }
    return (
        <div className="container mt-4">
            <CardForm title="Carga de Archivos" colSize="6">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div class="mb-3">
                                
                                <input  className={"form-control "+(isSubmitted?errors.file?'is-invalid':'is-valid':'')} accept=".png,.jpg,.pdf" type="file" id="file"
                                    {...register("file",{
                                        required: { value: true, message: "Selecciona un archivo" },
                                        validate: {
                                        moreThan10MB: (files) => files[0]?.size > 10000 || "Solo se permiten 10 mb máximo",
                                        acceptedFormats: (files) =>
                                        ["image/jpeg", "image/png", "image/jpg","application/pdf"].includes(files[0]?.type) || "Solo se permiten archivos PNG, JPG y PDF"
                                        }
                                                                    
                                    })}
                                />
                                 <div class="invalid-feedback"> {errors.file && errors.file.message}</div>
                            </div>
                        </div>
                    </div>
                    {msgError &&  !!msgError.length &&
                    <div className="row">
                        <div className="col">
                          
                                <div class="alert alert-danger" role="alert">
                                    {  msgError?.map((val,key) =>   
                                        <p key={key}>{val}</p>
                                        )
                                    }
                                </div>
                            
                        </div>
                    </div>
                    }
                   
                    <div className="row justify-content-center mt-4">
                        <div className="col-lg-6">
                            <LoadingButton  variant="contained"  sx={{width:'100%'}} type="submit" loading={loading}>
                                Cargar
                            </LoadingButton>
                        </div>
                    </div>
                </form>

            </CardForm>
        </div>
    )
}
export default Files