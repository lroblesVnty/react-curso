import {useParams} from 'react-router-dom'
import { miembroStatus } from '../services/miembors.service'
import { useEffect, useState } from 'react';

const MiembroStatus = () => {
    const {id: miembroId}=useParams()
    const [status, setStatus] = useState('')

    useEffect(() => {
        loadStatus(); // Llamamos a nuestra función
    }, []); // El array vacío asegura que se ejecute solo al inicio

    const loadStatus=async ()=>{
        try {
            const resp= await miembroStatus(miembroId)
            console.log(resp.data)
            console.log(resp.data.status)
            setStatus(resp.data.status)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <div>MiembroStatus {miembroId} status {status}</div>
            <div>
                {status=='plan activo' ? <h1>Estás conectado</h1> : <h1>Renueva tu plan</h1>}
            </div>

        </div>
    
    
    )
}

export default MiembroStatus