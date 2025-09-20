import CardForm from "../components/CardForm";
import NavBar from "../components/NavBar";
import { get, set, useForm } from "react-hook-form";
import  { useState,useEffect,useRef,useMemo } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import ModalComponent from "../components/Modal";
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { getAsistenciaByMiembro, getAsistenciaList, registerAsistencia,closeAsistencia } from "../services/gym.service";
import DataTableComponent from "../components/DataTableComponent";
import { asistenciaColumns } from "../config/columnsConfig";
import ScannerComponent from "../components/ScannerComponent";
import MiembroStatus from "./MiembroStatus";
import { getCurrentDateTime } from "../utils/dateUtils";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const pages=['Miembros','Visitas','Blog']
const Asistencia = () => {
    const [loading, setLoading] = useState(false);
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [rows, setRows] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [scannerActive, setScannerActive] = useState(false);
    const [showNextComponent, setShowNextComponent] = useState(false);
    const [scannedData, setScannedData] = useState(null); // Estado para almacenar los datos escaneados
    const [isRegisterError, setIsRegisterError] = useState(false);
    const [userExists, setUserExists] = useState(true);



    useEffect(() => {
        (async()=>{
            getAsistencia()
        })();
       
    },[]);//arreglo vacio para que no itere varias veces

    const handleOpenModal = () => {
        setShowNextComponent(false);
        setIsEdit(false);
        setModalOpen(true);
        setScannerActive(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setScannerActive(false);
    };

    const handleScannSuccessfully =async (data) => {
        setScannerActive(false); 
        console.log('Datos del miembro escaneado:', data);
        setScannedData(data); // Guarda los datos escaneados en el estado
        const visita= await checkAsistenciaExistsForToday(data.id)
        console.log({visita})
        if (visita) {
            setModalOpen(false);
            cerrarAsistencia(visita)
            //TODO SOLO MOSTRAR EL ALERT CON EL MENSAJE DE ASISTENCIA CERRADA Y EL MIEMBRO y no mostrar el modal
        }else{
            setShowNextComponent(true);
            registrarAsistencia(data);
            
        }
        
        //handleCloseModal(); // Cierra el modal
        // Opcional: Si quieres recargar la lista de miembros después de agregar uno
        //getVisitas(); // Llama a tu función para obtener los miembros actualizados
    };

    const checkAsistenciaExistsForToday = async (miembroId) => {
        console.log({miembroId})
        try {
            const response = await getAsistenciaByMiembro(miembroId);
            console.log({response})
            if (response.status === 200) {
                return response.data.id; // La asistencia ya está registrada para hoy
            }
        } catch (error) {
            console.error('Error checking asistencia:', error);
            if (error.response.status==404 ) {
                 return false;
            } 
        }
    };

    const registrarAsistencia = async (data) => {
        //setLoading(true)
        setIsLoadingAdd(true)
        const { fecha, hora } = getCurrentDateTime();
        const payload = {
            fecha,
            hora_entrada: hora,
            miembro_id: data.id,
            notas: null
        }
        console.log(payload)
        try {
            const response = await registerAsistencia(payload);
            if (response.status === 201) {
                console.log('asistencia registrada con exito')
                getAsistencia();
                //setModalOpen(true);
                /*const result = await Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Asistencia registrada con éxito',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
                if (result.isConfirmed) {
                    getAsistencia();
                }*/

            }
        } catch (error) {
            console.log(error)
            console.log(error.response.status)
            if (error.response.status==409 && error.response.data.error) {
                setIsRegisterError(true);
            }else if (error.response.status==422) {
                console.log('error 422')
                setUserExists(false);
                //console.log(error.response.data.errors.miembro_id)
               /*  handleCloseModal();
                if (error.response.data.errors.miembro_id){
                    Swal.fire({
                        position: 'top',
                        icon: 'warning',
                        title: 'El miembro no está registrado o no existe',
                        showConfirmButton: true,
                        allowOutsideClick: false,
                    });
                } */
                
            }
            else{

                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: error.message,
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            }
        }
        finally{
            setIsLoadingAdd(false)
           
            
        }    
    }

     const cerrarAsistencia = async (idVisita) => {
        setLoading(true)
        try {
            const response = await closeAsistencia(idVisita);
            if (response.status === 200) {
                //setModalOpen(true);
                const result = await Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Asistencia cerrada',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
                if (result.isConfirmed) {
                    getAsistencia();
                }
            }
        } catch (error) {
            console.log(error)
            if (error.response.status==409 ) {
                setScannedData(null); 
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'La asistencia ya fue cerrada previamente',
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            }else{
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: error.message,
                    showConfirmButton: true,
                    allowOutsideClick: false,
                });
            }
        
           
        }
        finally{
            setLoading(false)
            setShowNextComponent(false);
        }    
    }

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
                                        <IconButton aria-label="add"  onClick={handleOpenModal} color="secondary" size="large">
                                            <QrCodeScannerIcon fontSize="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                    {modalOpen && (
                                        <ModalComponent 
                                            open={modalOpen}
                                            handleClose={handleCloseModal}
                                            width={600}
                                        >
                                        {//TODO llamar a un componente en el cual se llame al scaner y despues de escanear se registre la asistencia y te muestre los datos del miembro(cuando vence su suscripcion) */
                                        }
                                            {scannerActive && (
                                                <ScannerComponent
                                                onScann={handleScannSuccessfully}
                                                />
                                            )}
                                            {showNextComponent && (
                                                <MiembroStatus miembroId={scannedData.id} nombre={scannedData.nombre} isRegisterError={isRegisterError} userExists={userExists} isLoading={isLoadingAdd} />
                                            )}
                                            <div className="row mt-4">
                                                <div className="col d-flex justify-content-end align-items-end">
                                                    <Button variant="contained" sx={{ bgcolor:'primary.light' }} onClick={handleCloseModal}>{scannerActive ? 'Cancelar' : 'Cerrar'}</Button>
                                                </div>
                                            </div>
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