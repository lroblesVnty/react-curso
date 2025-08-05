import CardForm from "../components/CardForm";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import  { useState,useEffect,useRef } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { addMember, getMembers, updateMember } from "../services/miembors.service";
import Swal from 'sweetalert2'
import { getResponseError } from "../models/errorUtils";
import FieldError from "../components/FieldError";
import DataTableMiem from "../components/DataTableMiem";
import Button from '@mui/material/Button';
import ModalComponent from "../components/Modal";
import AddMiembroForm from "../components/AddMiembroForm";
import AddPagoForm from "../components/AddPagoForm";



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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalPagoOpen, setModalPagoOpen] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [defValues, setDefValues] = useState({nombre:'',edad:'',tel:''});
    const [isEdit, setIsEdit] = useState(false);
    const [isSucces, setIsSucces] = useState(false);
    const [editingMiembro, setEditingMiembro] = useState(null);
    //TODO condicionar el metodo onsubmit para mandar a guardar si isediting es falso
      const openModalButtonRef = useRef(null);

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

    const handleOpenModal = () => {
        setIsEdit(false);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleEditMiembro = (miembroOrg) => {
        const miembro = { ...miembroOrg };
        var plan=miembro.plan ? miembro.plan.id : null; // Aseguramos que plan sea un ID válido
        delete miembro.plan; // Eliminamos la propiedad plan del objeto miembro
        miembro.plan = plan; // Asignamos el ID del plan al objeto miembro
        setIsEdit(true); // Indicamos que estamos en modo edición
        setEditingMiembro(miembro); // Pasamos el miembro a editar
        setModalOpen(true);
        console.log(miembro)
    };

    const handleUserAddedSuccessfully = () => {
        console.log('Usuario agregado exitosamente, cerrando modal...');
        handleCloseModal(); // Cierra el modal
        // Opcional: Si quieres recargar la lista de miembros después de agregar uno
        getMiembros(); // Llama a tu función para obtener los miembros actualizados
    };

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

   
    return (
    <>
       <NavBar pages={pages}/>
       <div className="container mt-4">
        <div className="row justify-content-center align-items-center">
            <div className="col">
                <CardForm title="Miembros" colSize="10">
                    <div className="row mb-3">
                        <div className="col align-items-end text-end">
                            <Button  variant="contained" onClick={handleOpenModal} ref={openModalButtonRef}>Agregar Miembro</Button>
                            {modalOpen && (
                                 <ModalComponent 
                                    open={modalOpen}
                                    handleClose={handleCloseModal}
                                >
                                    <AddMiembroForm onUserAdded={handleUserAddedSuccessfully} userData={editingMiembro} isEditing={isEdit}/>
                                        <button onClick={handleCloseModal}>Cancelar</button>
                                    
                                </ModalComponent>
                            )}
                             <ModalComponent 
                                    open={modalPagoOpen}
                                    handleClose={handleCloseModal}
                                >
                                    <AddPagoForm />
                                    
                                        <Button variant="outlined" onClick={handleCloseModal}>
                                            Cerrar
                                        </Button>
                                </ModalComponent>
                        </div>
                    </div>
                    <DataTableMiem rows={rows} loading={loading} rowCount={rowCount} setEditValues={setDefValues} setIsEdit={setIsEdit} action={handleEditMiembro}/>
                </CardForm>
                
                                    
                

            </div>
        </div>
       </div>
    </>
  )
}

export default Miembros