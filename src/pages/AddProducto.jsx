import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useForm, Controller } from "react-hook-form";
import {addProduct} from '../models/modelo'
import LoadingButton from '@mui/lab/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'


const AddProducto = () => {
    const {
        register,
        handleSubmit,
        formState: { errors},
        watch,
        reset,
        control
    } = useForm();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) =>{
        setLoading(true);
        console.log(data);
        const resp= await addProduct(data)
        if (resp.status==201) {
            Swal.fire({
                position: 'top',
                icon: 'success',
                title:'Añadido exitosamente',
                showConfirmButton: true,
                allowOutsideClick:false,
            });
            reset();
        }else if (resp.response) {
            const codeError=resp.response.data.message.errorInfo[1]
            console.log(codeError)
            if (codeError==1062) {
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title:'El producto ya existe',
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
            }
        }
        
        console.log(resp)
        setLoading(false);

    }
    const handleChange=(e)=>{
        console.log(e.target.name)
        const inputName=e.target.name
        //e.classList.("my-class");
        if (errors[inputName]) {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        }else{
            e.target.classList.add("is-valid");
            e.target.classList.remove("is-invalid");
        }

    }
   console.log(errors)
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header fs-4 text-center">
                            Productos
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(errors.descripcion?'is-invalid ':'')} id="desc" placeholder="name@example.com" {...register("descripcion",{
                                                    validate: value =>value.trim() !="" || "El nombre debe contener más de 5 caracteres",
                                                    pattern:{value: /^[a-zA-ZÁ-ÿ\s]+$/,message:"Solo se apcetan letras"},
                                                    required: { value: true, message: "Ingresa la descripción" },
                                                    maxLength:{value:100,message:"Solo se aceptan maximo 100 caracteres "},
                                                    onChange: (e) => handleChange(e)
                                                })}
                                            />
                                            <label htmlFor="desc">Descripción</label>
                                            <div className="invalid-feedback">
                                                {errors.descripcion && errors.descripcion.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="number" step="0.01"  className={"form-control "+(errors.precio?'is-invalid ':'')} id="floatingInput" placeholder="name@example.com"
                                                {...register("precio",{
                                                    valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                    required: { value: true, message: "Ingresa el precio" },
                                                    min:{value:1,message:"Precio invalido"},
                                                    onBlur: (e) => handleChange(e)
                                                })}
                                            />
                                            <label htmlFor="floatingInput">Precio</label>
                                            <div className="invalid-feedback">
                                                {errors.precio && errors.precio.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="number" className={"form-control "+(errors.stock?'is-invalid ':'')} id="floatingInput" placeholder="name@example.com"
                                                {...register("stock",{
                                                valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                required: { value: true, message: "Ingresa el stock" },
                                                min:{value:1,message:"Stock invalido"},
                                                onBlur: (e) => handleChange(e)
                                            })}
                                            />
                                            <label htmlFor="floatingInput">Stock</label>
                                            <div className="invalid-feedback">
                                                {errors.stock && errors.stock.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                       {/*  <Button variant="contained"  type="submit"
                                                sx={{'color':'white','backgroundColor':'rgb(2, 185, 155)',
                                                    ':hover': {
                                                        // bgcolor: '#09A28A', // theme.palette.primary.main
                                                        bgcolor:'rgb(4, 138, 115)',
                                                        color: 'white',
                                                    }
                                                ,}}
                                        >Agregar</Button> */}
                                        <LoadingButton
                                        sx={{'color':'white','backgroundColor':'rgb(2, 185, 155)',
                                            ':hover': {
                                                // bgcolor: '#09A28A', // theme.palette.primary.main
                                                bgcolor:'rgb(4, 138, 115)',
                                                color: 'white',
                                            }
                                        ,}}
                                        type="submit"
                                        loading={loading}
                                        loadingPosition="center"
                                        endIcon={<FontAwesomeIcon icon={faFloppyDisk}  />}
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

export default AddProducto