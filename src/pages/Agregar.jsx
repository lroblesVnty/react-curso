import {useState } from 'react';
import Input from '../components/Input'
import  '../styles/agregar.module.css'
import Swal from 'sweetalert2'
import guardar from '../models/modelo'
function Agregar() {
    const [user,setUser]=useState({
        usuario:{campo:"",valido:null},
        mail:{campo:"",valido:null},
        passw:{campo:"",valido:null},
        edad:{campo:"",valido:null},
        pw:{campo:"",valido:null}
    }); 
    const [terminos, cambiarTerminos] = useState(false);
    const [form, setForm] = useState(false);
    const expresiones={
        usuario: /^[a-zA-ZÁ-ÿ\s]{5,100}$/,//letras mayusculas y minisuclas con acentos, min 5 y maximo 100 caracteres
        password:/^.{5,15}$/, //de 5 a 15 digitos
        mail:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        edad:/^[1-9]{1,2}$/
    }
    const validarPassword=()=>{
        if (user.passw.campo.length>0) {
            if (user.passw.campo!==user.pw.campo) {
                console.log('no son iguales')
                setUser({
                    ...user, // Copy other fields
                    ['pw']: { // but replace the name
                      ...user['pw'], // with the same one
                      valido: false // but in campo
                    }
                });
                document.getElementById('pw').classList.add('is-invalid');
                document.getElementById('pw').classList.remove('is-valid');
            }else{
                console.log('igualesss')
                setUser({
                    ...user, // Copy other fields
                    ['pw']: { // but replace the name
                      ...user['pw'], // with the same one
                      valido: true // but in campo
                    }
                });
                document.getElementById('pw').classList.add('is-valid');
                document.getElementById('pw').classList.remove('is-invalid');
            }
            
        }
    }
    const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
       /*if (!e.target.checked) {
            e.target.classList.add('is-invalid');
            e.target.classList.remove('is-valid');
            console.log('no validooo');
        }else{
            e.target.classList.remove('is-invalid');
            e.target.classList.add('is-valid');
        }*/
        
	}
    const handleSubmit = async (e) => {
		e.preventDefault()
        //ax5LKMzdrW8
        var fvalid=false;
        for (const key in user) {
            if (user[key].valido) {
                fvalid=true;                
            }else{
                fvalid=false;  
                break;
            }
        }
        if (fvalid && terminos) {
            setForm(true)
            console.log('todo ok');
            const resp= await guardar(user)
            console.log(resp);
            if (resp.success) {
                setUser({
                    usuario:{campo:"",valido:null},
                    mail:{campo:"",valido:null},
                    passw:{campo:"",valido:null},
                    edad:{campo:"",valido:null},
                    pw:{campo:"",valido:null}
                });
                cambiarTerminos(null);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title:resp.msg,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
            }else{
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title:resp.errorMsg,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
            }
        }else{
            setForm(false)
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Completa el formulario',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            });
        }
	}
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <Input
                                    tipo="text"
                                    label="Nombre"
                                    nombre="usuario"
                                    MsgError="Ingrese minimo 5 caracteres"
                                    expReg={expresiones.usuario}
                                    estado={user}
                                    changeEstado={setUser}
                                    
                                />
                                <Input
                                    tipo="email"
                                    label="Email"
                                    nombre="mail"
                                    MsgError="Ingresa un correo válido"
                                    expReg={expresiones.mail}
                                    estado={user}
                                    changeEstado={setUser}
                                />
                                <div className="row">
                                    <div className="col-lg-6">
                                        <Input
                                            tipo="password"
                                            label="Password"
                                            nombre="passw"
                                            MsgError="Password inválido"
                                            expReg={expresiones.password}
                                            estado={user}
                                            changeEstado={setUser}
                                        />


                                    </div>
                                    <div className="col-lg-6">
                                        <Input
                                            tipo="password"
                                            label="Repetir Password"
                                            nombre="pw"
                                            MsgError="Los password no coinciden"
                                            estado={user}
                                            changeEstado={setUser}
                                            funcion={validarPassword}
                                        />

                                    </div>
                                </div>
                                
                                <Input
                                    tipo="number"
                                    label="Edad"
                                    nombre="edad"
                                    MsgError="Ingresa tu edad"
                                    min={1}
                                    max={120}
                                    estado={user}
                                    changeEstado={setUser}
                                />
                                <div className="form-check mb-3">
                                        <input type="checkbox" className={"form-check-input " +(terminos?'is-valid':'')+(terminos==false?'is-invalid':'')} id="terminos" name='terminos' onChange={onChangeTerminos} checked={terminos} />
                                        <label className="form-check-label" htmlFor="terminos">Terminos y condiciones</label>
                                        <div className="invalid-feedback">Acepta los terminos</div>
                                    </div>
                                <div className="row justify-content-center mt-3">
                                    <div className="col-lg-3">
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-primary" type="submit">Guardar</button>
                                        </div>
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

export default Agregar