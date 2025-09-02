import {useParams} from 'react-router-dom'
import { miembroStatus } from '../services/miembors.service'
import { useEffect, useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { set } from 'react-hook-form';
import { isThreeDaysBefore } from '../utils/dateUtils';

const MiembroStatus = ({miembroId,nombre,isRegisterError}) => {
   // const {id: miembroId}=useParams()
    const [isActive, setIsActive] = useState(false)
    const [expirationDate, setExpirationDate] = useState(null)
    const [isExpired, setIsExpired] = useState(false)
    //TODO VERIFICAR QUE LA FUNCION isThreeDaysBefore FUNCIONE CORRECTAMENTE y que sea igual o menor que 3 dias

    useEffect(() => {
        loadStatus(); // Llamamos a nuestra función
    }, []); // El array vacío asegura que se ejecute solo al inicio

    useEffect(() => {
        console.log('first render or expirationDate changed:', expirationDate);
        if (isThreeDaysBefore(expirationDate)) {
           setIsExpired(true);
        }
    }, [expirationDate]);


    const loadStatus=async ()=>{
        try {
            const resp= await miembroStatus(miembroId)
            console.log(resp.data)
            console.log(resp.data.isActive)
            console.log(resp.data.expirationDate)
            setIsActive(resp.data.isActive)
            if (resp.data.expirationDate) {
                setExpirationDate(resp.data.expirationDate.split(" ")[0])
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <div className="row mb-4">
                {/* <div className="col fs-2 text-center text-success">Asistencia Registrada!</div> */}
                {!isActive && isRegisterError?
                        <Alert severity="error"  sx={{justifyContent: 'center',textAlign: 'center',alignItems: 'center',}}>
                            El plan del miembro ha vencido. No se puede registrar asistencia.
                        </Alert>
                    :
                    <Alert severity="success"  sx={{justifyContent: 'center',textAlign: 'center',alignItems: 'center',}}>
                        Asistencia Registrada!
                    </Alert>
                }
                
            </div>
            <div className="row mb-4">
                <div className="col">
                    <Typography  component="span" >Usuario: </Typography>
                    <Typography  component="span" sx={{ color: 'primary.main' }}>{nombre}</Typography>
                </div>
                <div className="col">
                    <Typography  component="span" >Fecha Expiracion: </Typography>
                    <Typography  component="span" sx={{ color: 'primary.main' }}>{expirationDate}</Typography>
                </div>
            </div>
            {expirationDate && isExpired && (
                <div>
                    <Alert severity="info"  sx={{justifyContent: 'center',textAlign: 'center',alignItems: 'center',}}>
                        El plan del miembro está a punto de vencer
                    </Alert>
                </div>
            )}
             
            {expirationDate && !isActive && (
                <div>
                    <Alert severity="warning"  sx={{justifyContent: 'center',textAlign: 'center',alignItems: 'center',}}>
                        El plan del miembro ha vencido
                    </Alert>
                </div>
            )}

        </div>
    
    )
}

export default MiembroStatus