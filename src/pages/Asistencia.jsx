import CardForm from "../components/CardForm";
import NavBar from "../components/NavBar";
import { set, useForm } from "react-hook-form";
import  { useState,useEffect,useRef,useMemo } from "react";
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
import { getAsistenciaList } from "../services/gym.service";
import DataTableComponent from "../components/DataTableComponent";
import AddVisitaForm from "../components/AddVisitaForm";
import { asistenciaColumns } from "../config/columnsConfig";
import QrScanner from "./QrScanner";

const pages=['Miembros','Visitas','Blog']
const Asistencia = () => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        (async()=>{
            getAsistencia()
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


    const handleColAction=(row)=>{
        console.log('Acción de columna realizada en la fila:', row);
    }
    const columns = useMemo(() => asistenciaColumns(handleColAction ), [handleColAction]);

     const getAsistencia=async ()=>{
                setLoading(true)
                try {
                    const resp= await getAsistenciaList()
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
                        <CardForm title="Asistencia" colSize="10">
                            <div className="row mb-3 justify-content-end">
                                <div className="col align-items-end text-end col-auto">
                            { //TODO en modal ver si se puede colocar el scaner y conese registrar la visita o simular abiri el scaner

                            }
                                    <Tooltip title="Registrar Asistencia">
                                        <IconButton aria-label="add"  onClick={handleOpenModal} color="secondary">
                                            <MoreTimeIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                    {modalOpen && (
                                        <ModalComponent 
                                            open={modalOpen}
                                            handleClose={handleCloseModal}
                                        >
                                        /*//TODO llamar a un componente en el cual se llame al scaner y despues de escanear se registre la asistencia y te muestre los datos del miembro(cuando vence su suscripcion) */
                                            <QrScanner
                                                //onScan={handleUserAddedSuccessfully}
                                               // onClose={handleCloseModal}
                                            />
                                        </ModalComponent>
                                    )}
                                </div>
                            </div>
                            <DataTableComponent rows={rows} loading={loading} rowCount={rowCount} cols={columns} />
                        </CardForm>
                        
                                            
                        

                    </div>
                </div>
            </div>
        </>
    )
}
export default Asistencia