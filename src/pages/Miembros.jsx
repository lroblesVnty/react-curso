import CardForm from "../components/CardForm";
import NavBar from "../components/NavBar";
import { set, useForm } from "react-hook-form";
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import MoreTimeIcon from '@mui/icons-material/MoreTime';



const pages=['Asistencia','Visitas','Blog']


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
    const [dataPago, setDataPago] = useState(null);
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

    const handleCloseModalPago = () => {
        setModalPagoOpen(false);
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

    const handleAddPago = (miembroOrg) => {
        const miembro = { ...miembroOrg };
        setDataPago(miembro);
        setModalPagoOpen(true);

    };

    const handleUserAddedSuccessfully = () => {
        console.log('Usuario agregado exitosamente, cerrando modal...');
        handleCloseModal(); // Cierra el modal
        // Opcional: Si quieres recargar la lista de miembros después de agregar uno
        getMiembros(); // Llama a tu función para obtener los miembros actualizados
    };

    const handlePagoAddedSuccessfully = () => {
        console.log('Pago agregado exitosamente, cerrando modal...');
       // handleCloseModalPago(); // Cierra el modal
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
                <CardForm title="Miembros" colSize="11">
                    <div className="row mb-3 justify-content-end">
                        <div className="col align-items-end text-end col-auto">
                            <Tooltip title="Registrar Visita">
                                <IconButton aria-label="delete"  onClick={handleOpenModal} color="secondary">
                                    <MoreTimeIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>

                        </div>
                        <div className="col align-items-end text-end col-auto">
                            {/* <Button  variant="contained" onClick={handleOpenModal} ref={openModalButtonRef}>Agregar Miembro</Button> */}
                            <Tooltip title="Agregar Miembro">
                                <IconButton aria-label="delete"  onClick={handleOpenModal} color="secondary">
                                    <PersonAddIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                                
                            {modalOpen && (
                                 <ModalComponent 
                                    open={modalOpen}
                                    handleClose={handleCloseModal}
                                >
                                    <AddMiembroForm onUserAdded={handleUserAddedSuccessfully} userData={editingMiembro} isEditing={isEdit}/>
                                        <button onClick={handleCloseModal}>Cancelar</button>
                                    
                                </ModalComponent>
                            )}
                            {modalPagoOpen && (
                                <ModalComponent
                                    open={modalPagoOpen}
                                    handleClose={handleCloseModalPago}
                                >
                                    <AddPagoForm miembroData={dataPago} openModal={setModalPagoOpen} onPagoAdd={handlePagoAddedSuccessfully} />
                                        <Button variant="outlined" onClick={handleCloseModalPago}>
                                            Cerrar
                                        </Button>
                                </ModalComponent>
                            )}
                        </div>
                    </div>
                    <DataTableMiem rows={rows} loading={loading} rowCount={rowCount} setEditValues={setDefValues} setIsEdit={setIsEdit} action={handleEditMiembro} actionAdd={handleAddPago}/>
                </CardForm>
                
                                    
                

            </div>
        </div>
       </div>
    </>
  )
}

export default Miembros