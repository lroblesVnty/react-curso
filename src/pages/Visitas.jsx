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
import { getVisitasList } from "../services/gym.service";
import DataTableComponent from "../components/DataTableComponent";
import AddVisitaForm from "../components/AddVisitaForm";

const pages=['Miembros','Products','Blog']

const Visitas = () => {
    //TODO agregar una columna al final con un boton para cerrar la visita
    //TODO listar solo las visitas del dia actual y añadir otro boton para mostrar el historial de las visitas
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
    const [dataPago, setDataPago] = useState(null);
    const openModalButtonRef = useRef(null);



    useEffect(() => {
        (async()=>{
            getVisitas()
        })();
       
    },[]);//arreglo vacio para que no itere varias veces

    const handleOpenModal = () => {
        setIsEdit(false);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleUserAddedSuccessfully = () => {
        console.log('visita agregada exitosamente, cerrando modal...');
        handleCloseModal(); // Cierra el modal
        // Opcional: Si quieres recargar la lista de miembros después de agregar uno
        getVisitas(); // Llama a tu función para obtener los miembros actualizados
    };


    const getVisitas=async ()=>{
            setLoading(true)
            try {
                const resp= await getVisitasList()
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
                        <CardForm title="Visitas" colSize="10">
                            <div className="row mb-3 justify-content-end">
                                <div className="col align-items-end text-end col-auto">
                            { //TODO crear formulario para registrar una visita y listar las vistas

                            }
                                    <Tooltip title="Registrar Visita">
                                        <IconButton aria-label="add"  onClick={handleOpenModal} color="secondary">
                                            <MoreTimeIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                    {modalOpen && (
                                        <ModalComponent 
                                            open={modalOpen}
                                            handleClose={handleCloseModal}
                                        >
                                            <AddVisitaForm onUserAdded={handleUserAddedSuccessfully} openModal={setModalOpen} />
                                                <button onClick={handleCloseModal}>Cancelar</button>
                                            
                                        </ModalComponent>
                                    )}
                                </div>
                            </div>
                            <DataTableComponent rows={rows} loading={loading} rowCount={rowCount}  />
                        </CardForm>
                        
                                            
                        

                    </div>
                </div>
            </div>
        </>

    )
}
export default Visitas