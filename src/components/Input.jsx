
import estilos from '../styles/input.module.css'
const Input = ({tipo,label,nombre,MsgError,expReg,estado,changeEstado,funcion,min,max}) => {
    const handleChange=({target:{name,value}})=>{
        changeEstado({
            ...estado, // Copy other fields
            [name]: { // but replace the name
              ...estado[name], // with the same one
              campo: value // but in campo
            }
        });
        
    }
    const validarCampo=({target})=>{
        //console.log(target.value);
       // console.log(estado[target.name]);
        /*if (target.value.trim()) {
            MsgError="Campo requeridooo";
            document.getElementById(target.name).classList.add('is-invalid');
            document.getElementById(target.name).classList.remove('is-valid');
            
        }*/
        if (tipo=='number') {
            console.log('numerooo');
            if (target.value<min || target.value>max) {
                changeEstado({
                    ...estado, // Copy other fields
                    [target.name]: { // but replace the name
                      ...estado[target.name], // with the same one
                      valido: false // but in campo
                    }
                });
            }else{
                changeEstado({
                    ...estado, // Copy other fields
                    [target.name]: { // but replace the name
                      ...estado[target.name], // with the same one
                      valido: true // but in campo
                    }
                });
            }
        }
        if (expReg) {
            if (expReg.test(target.value)) {
                console.log('input correcto');
                changeEstado({
                    ...estado, // Copy other fields
                    [target.name]: { // but replace the name
                      ...estado[target.name], // with the same one
                      valido: true // but in campo
                    }
                });
                //document.getElementById(target.name).classList.add('is-valid');
                //document.getElementById(target.name).classList.remove('is-invalid');
                
            }else{
                changeEstado({
                    ...estado, // Copy other fields
                    [target.name]: { // but replace the name
                      ...estado[target.name], // with the same one
                      valido: false // but in campo
                    }
                });
               //document.getElementById(target.name).classList.add('is-invalid');
               // document.getElementById(target.name).classList.remove('is-valid');
                //console.log(document.getElementById(target.name).validationMessage);
               
            }
        }
        if (funcion) {
            funcion()//validar el pw
        }
        
        

    }
    return (
        <div className="form-floating mb-3">
            <input type={tipo} className={"form-control "+(estado[nombre].valido?'is-valid':'')+(estado[nombre].valido==false?'is-invalid':'') } id={nombre} 
                name={nombre} placeholder="name@example.com" 
                onChange={handleChange} 
                onKeyUp={validarCampo}
                value={estado[nombre].campo}
               
            />
            <label htmlFor={nombre} className="label-style">{label}</label>
            <div className="invalid-feedback">
                {MsgError}
            </div>
        </div>
     )
}


export default Input;