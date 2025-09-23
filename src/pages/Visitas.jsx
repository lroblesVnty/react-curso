import CardForm from "../components/CardForm";
import NavBar from "../components/NavBar";
import {  useForm } from "react-hook-form";
import  { useState,useEffect,useRef,useMemo } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import { getResponseError } from "../models/errorUtils";
import FieldError from "../components/FieldError";
import Button from '@mui/material/Button';
import ModalComponent from "../components/Modal";
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { closeVisita, getVisitasByDate,getVisitasList } from "../services/gym.service";
import DataTableComponent from "../components/DataTableComponent";
import AddVisitaForm from "../components/AddVisitaForm";
import {visitasColumns} from "../config/columnsConfig";
import { formatDateLocal } from '../utils/formateDateLocal';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const pages=['Miembros','Asistencia','Blog']

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
     const [checked, setChecked] = useState(true);



    useEffect(() => {
        (async()=>{
            //getHistorialVisitas()
            getVisitasActual()
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
        if(checked){
            getVisitasActual();
        }else{
            getHistorialVisitas(); // Llama a tu función para obtener los miembros actualizados

        }
    };


    const handleColAction=async (row)=>{
        console.log('Acción de columna realizada en la fila:', row);
        Swal.fire({
        title: "Deseas cerrar la visita?",
       // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
        }).then((result) => {
        if (result.isConfirmed) {
            handleCloseVisita(row.id)
        }
        });
       
    }

    const handleCloseVisita = async (row) => {
        setLoading(true);
        try {
            const resp = await closeVisita(row);
            console.log(resp);
            setLoading(false);
            if (resp.status == 200) {
                if (resp.data) {
                    Swal.fire({
                        title: "Cerrada!",
                        text: "La visita ha sido cerrada.",
                        icon: "success"
                    });
                    if (checked) {
                        getVisitasActual();
                    } else {
                        getHistorialVisitas(); // Llama a tu función para obtener los miembros actualizados
                    }
                }
            }


        } catch (error) {
            console.log(error);
            if (error.response && error.response.status == 409) {
                Swal.fire({
                    title: "Error",
                    text: "La visita ya ha sido cerrada anteriormente.",
                    icon: "error"
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
        } finally {
            setLoading(false);
        }
    };

    const columns = useMemo(() => visitasColumns(handleColAction), [handleColAction]);



    const getHistorialVisitas=async ()=>{
        setLoading(true)
        try {
            //const currentDate= formatDateLocal(new Date())
            //const resp= await getVisitasByDate(currentDate)
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
    
    const getVisitasActual=async ()=>{
        setLoading(true)
        try {
            //const currentDate= formatDateLocal(new Date())
            //const resp= await getVisitasByDate(currentDate)
            const resp= await getVisitasByDate()
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
            //console.log(error)
            if (error.response && error.response.status != 404) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title:error.message,
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
            }
            if (error.response && error.response.status == 404) {
                setRows([])
                setRowCount(0)
            }
            
           
            
        }finally{
            setLoading(false)
        }  
    }

    const handleChange = (event) => {
        const nuevoEstado = event.target.checked;
        setChecked(nuevoEstado);

        if (nuevoEstado) {
            getVisitasActual();
        } else {
            getHistorialVisitas();
        }

    };
   
    return (
        <>
            <NavBar pages={pages}/>
            <div className="container mt-4">
                <div className="row justify-content-center align-items-center">
                    <div className="col">
                        <CardForm title="Visitas" colSize="10">
                            <div className="row mb-3 justify-content-end">
                                <div className="col">
                                     <Stack direction="row" spacing={1} alignItems="center">
                                        <Typography>Historial</Typography>
                                        <Switch inputProps={{ 'aria-label': 'ant design' }}  checked={checked}
                                        onChange={handleChange} sx={{
                                            '& .MuiSwitch-thumb': {
                                            backgroundColor: checked ?  '#f44336':'#02b99b' , // azul activo, rojo inactivo
                                            },
                                            '& .MuiSwitch-track': {
                                            backgroundColor: checked ? '#ffcdd2' : '#0ff69eff', // track azul claro o rosa claro
                                            },
                                        }}
                                        />
                                        <Typography>Fecha Actual</Typography>
                                    </Stack>
                                </div>
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
                            <DataTableComponent rows={rows} loading={loading} rowCount={rowCount} cols={columns}  />
                        </CardForm>
                        
                                            
                        

                    </div>
                </div>
            </div>
        </>

    )
}
export default Visitas