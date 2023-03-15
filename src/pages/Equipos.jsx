import CardForm from "../components/CardForm"
import { useForm, Controller } from "react-hook-form";
import  { useState,useEffect } from "react";
import { getProviders, getUsers, saveEquipo } from "../services/equipos.service";
import Swal from 'sweetalert2'

const Equipos = () => {
    const {
        register,handleSubmit,formState: { errors,isSubmitted,isSubmitSuccessful},
        watch,reset,control, clearErrors,setValue
    } = useForm();
    const [users, setUsers] = useState([])
    const [providers, setProviders] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const loadUsers=async ()=>{
        try {
            const resp= await getUsers()
            if (resp.status==200 && resp.data) {
                setUsers(resp.data)
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
    }
    const loadProviders=async ()=>{
        try {
            const resp= await getProviders()
            if (resp.status==200 && resp.data) {
                setProviders(resp.data)
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
    }
    const onChangeRadio=(e)=>{
        if (e.target.value=='CEL') {
            setIsDisabled(true)//if is false, set true,else, if is true set false  
            clearErrors(["ram", "hdd"]) 
            setValue('ram', ''); 
            setValue('hdd', ''); 
        }else{
            setIsDisabled(false)
        }        
    }

    useEffect(() => {
       loadUsers()       
       loadProviders()
    },[]);//arreglo vacio para que no itere varias veces
    useEffect(() => {
        reset()
    }, [isSubmitSuccessful])

    const onSubmit = async (data) =>{
        setIsLoading(true)
        data['user_id'] = data['usuario'];
        delete data['usuario'];
        data['proveedor_id'] = data['proveedor'];
        delete data['proveedor'];
        console.log(data)
        try {
            const resp= await saveEquipo(data)
            console.log(resp)
            if (resp.status==201) {
                
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title:'Registro exitoso',
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
                
                
            }
            setIsLoading(false)
        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title:error.message,
                showConfirmButton: true,
                allowOutsideClick:false,
            });
            console.log(error)
            setIsLoading(false)
        }
    }
    console.log(errors)
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-3 mb-2">
                    <div className="col-lg-4">
                        <CardForm title="Venta" colSize="12">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-check form-check-inline mb-2">
                                            <input className={"form-check-input "+(isSubmitted?errors.tipo?'is-invalid':'is-valid':'')} type="radio" id="pc" value="PC"  
                                                {...register("tipo",{
                                                    required: { value: true, message: "Selecciona el tipo de equipo" },
                                                    onChange: (e) => onChangeRadio(e)
                                                    })
                                                }
                                               
                                            />
                                            <label className="form-check-label" htmlFor="pc">PC</label>
                                        </div>
                                        <div className="form-check form-check-inline mb-2">
                                            <input className={"form-check-input "+(isSubmitted?errors.tipo?'is-invalid':'is-valid':'')} type="radio" value="CEL" id="cel" 
                                                {...register("tipo",{
                                                    required: { value: true, message: "Selecciona el tipo de equipo" },
                                                    onChange: (e) => onChangeRadio(e)
                                                    })
                                                }
                                               
                                            />
                                            <label className="form-check-label" htmlFor="cel">Celular</label>
                                        </div>
                                        <div className={isSubmitted?errors.tipo?'text-danger':'':''} >
                                            {errors.tipo && errors.tipo.message}
                                        </div>
                                    </div>
                                    <div className="col-lg-2 text-end">
                                        <button type="reset" className="btn btn-sm" title="reset">
                                            <span className="material-symbols-outlined md-20">
                                                mop
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <span>{isSubmitted?'verdadero':'falso'}</span>
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(isSubmitted?errors.nserie?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("nserie",{
                                                    validate: value =>value.trim() !="" || "El número de serie no puede estar vacio",
                                                    required: { value: true, message: "Ingresa el numero de serie" },
                                                    minLength: { value: 3, message: "El número de serie debe contener más de 3 caracteres" },
                                                })}
                                                
                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">N°.Serie</label>
                                            <div className="invalid-feedback">
                                                {errors.nserie && errors.nserie.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(isSubmitted?errors.marca?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("marca",{
                                                    validate: value =>value.trim() !="" || "La marca no puede estar vacia",
                                                    required: { value: true, message: "Ingresa la marca" },
                                                    minLength: { value: 2, message: "La marca contener más de 3 caracteres" },
                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Marca</label>
                                            <div className="invalid-feedback">
                                                {errors.marca && errors.marca.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(isSubmitted?errors.modelo?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("modelo",{
                                                    validate: value =>value.trim() !="" || "El modelo no puede estar vacia",
                                                    required: { value: true, message: "Ingresa el modelo" },
                                                    minLength: { value: 3, message: "El modelo debe contener más de 3 caracteres" },
                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">modelo</label>
                                            <div className="invalid-feedback">
                                                {errors.modelo && errors.modelo.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="date" className={"form-control "+(isSubmitted?errors.fechaCompra?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("fechaCompra",{
                                                    required:'Selecciona la fecha de compra'
                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Fecha de Compra</label>
                                            <div className="invalid-feedback">
                                                {errors.fechaCompra && errors.fechaCompra.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select className={"form-select "+(isSubmitted?errors.proveedor?'is-invalid':'is-valid':'')} aria-label="Floating label select example"
                                            {...register("proveedor",{
                                                    required:"Selecciona un proveedor"
                                                })} defaultValue=""
                                            >
                                                <option value="" disabled>Elige un proveedor</option>
                                                {providers&&providers.map((val)=><option value={val.id} key={val.id}>{val.nombre}</option>)}
                                            
                                            </select>
                                            <label htmlFor="floatingSelect">Proveedor</label>
                                            <div className="invalid-feedback">
                                                {errors.proveedor && errors.proveedor.message} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="number" className={"form-control "+(isSubmitted?errors.costo?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("costo",{
                                                    required: { value: true, message: "Ingresa el costo" },
                                                    valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                    min:{value:1,message:"Costo invalido"},
                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Costo</label>
                                            <div className="invalid-feedback">
                                                {errors.costo && errors.costo.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(isSubmitted?errors.procesador?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("procesador",{
                                                    validate: value =>value.trim() !="" || "El procesador no puede estar vacio",
                                                    required: { value: true, message: "Ingresa el procesador" },
                                                    minLength: { value: 3, message: "El procesador debe contener más de 3 caracteres" },
                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">procesador</label>
                                            <div className="invalid-feedback">
                                                {errors.procesador && errors.procesador.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="number" className={"form-control "+(isSubmitted?errors.ram?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("ram",{
                                                    required: { value: true, message: "Ingresa la ram" },
                                                    valueAsNumber: {value:true,message:"Solo se permiten números"},
                                                    min:{value:1,message:"ram invalida"},
                                                    validate:{
                                                        validateNumber: v => Number.isInteger(v) ==true || 'La ram debe ser un número entero'
                                                    },
                                                    disabled: isDisabled
                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">RAM</label>
                                            <div className="invalid-feedback">
                                                {errors.ram && errors.ram.message}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(isSubmitted?errors.hdd?'is-invalid':'is-valid':'')} placeholder="name@example.com" 
                                                {...register("hdd",{
                                                    required: { value: isDisabled, message: "Ingresa el disco duro" },
                                                    validate: value =>value.trim() !="" || "El disco duro no puede estar vacio",
                                                    minLength: { value: 3, message: "El hdd debe contener más de 3 caracteres" },
                                                    disabled:isDisabled
                                                   

                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Disco Duro</label>
                                            <div className="invalid-feedback">
                                                {errors.hdd && errors.hdd.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={"form-control "+(isSubmitted?errors.software?'is-invalid':'is-valid':'')}  placeholder="name@example.com" 
                                                {...register("software",{
                                                    validate: value =>value.trim() !="" || "El software no puede estar vacio",
                                                    required: { value: true, message: "Ingresa el software" },
                                                    minLength: { value: 3, message: "El software debe contener más de 3 caracteres" },
                                                })}

                                            />
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Software instalado</label>
                                            <div className="invalid-feedback">
                                                {errors.software && errors.software.message}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="form-floating mb-3">
                                            <select className={"form-select "+(isSubmitted?errors.usuario?'is-invalid':'is-valid':'')} id="floatingSelect" aria-label="Floating label select example"
                                            {...register("usuario",{
                                                    required:"Selecciona un usuario"
                                                })}
                                                defaultValue=""
                                            >
                                                <option value="" disabled >Elige un usuario</option>
                                                {users&&users.map((val)=><option value={val.id} key={val.id}>{val.name}</option>)}
                                            
                                            </select>
                                            <label htmlFor="floatingSelect">Usuario</label>
                                            <div className="invalid-feedback">
                                                {errors.usuario && errors.usuario.message} 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-primary" type="submit"  disabled={isLoading}>
                                                <span className={"spinner-border spinner-border-sm "+(isLoading?'':'visually-hidden')} role="status" aria-hidden="true"></span>
                                                Registrar
                                            </button>
                                        </div>
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
export default Equipos