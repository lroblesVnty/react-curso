import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import { selectBoletos } from '../models/ViajesModel';
import Images from '../assets/imagenes'
import estilos from '../styles/obtenerBoletos.module.css'
import Button from '@mui/material/Button';
import Lista from "../components/Lista";

function ObtenerBoletos() {
    const location = useLocation();
    const [datos, setDatos] = useState(null)
    const idViaje=location.state.viaje;
    const [seats, setSeats] = useState(null)
    const [asientos, setAsientos] = useState([])
    const [seatImg, setSeatImg] = useState(Images.disponible)
    const renderSeats= (ini,fin)=>{
        const items = []
        for (let i = ini; i <fin; i+=4) {
            //const lista=`<li className="p-2 ${estilos.seat}"><div role="checkbox" aria-checked="true"><span><img src="${Images.disponible}" alt="Disponible" /></span><label className=${estilos.seatNum}>${i}</label></div></li>`;
            items.push(i)
            setAsientos([...asientos,i])

        }
        setSeats(items)
    }


    const getDataViaje=async ()=>{
        const resp= await selectBoletos(idViaje)
        if (resp.status==200) {
            if (resp.data.success) {
                console.log(resp.data.data)
                setDatos(resp.data.data)
            }
        }
        
    }
    const handleSeatClick = (e) => {
        console.log(e);
        const checked=e.target.getAttribute("aria-checked")
        if (checked==="true") {
            e.target.setAttribute("aria-checked", "false");
            setSeatImg(Images.seleccion)
            e.target.classList.add(estilos.selected);
        } else {
            e.target.setAttribute("aria-checked", "true");
            setSeatImg(Images.disponible)
           
        }
        console.log(checked)
    }
    useEffect(() => {
        
        getDataViaje()
        renderSeats(4,49)
       
        
    },[]);//arreglo vacio para que no itere varias
   
  return (
    <div className="container mt-4 shadow-lg border bg-white rounded">
        <div className="row mt-3 mb-3">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <p class="fs-3">Asientos de ida</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <div className="row align-items-center">
                                    <div className="col-2">
                                    <img src={Images.seatImg} className="img-fluid " alt="..." />
                                    </div>
                                    <div className="col ">
                                        <div className="row">
                                            <div className="col fw-semibold fs-5 ">Pasajero 01- Adulto</div>
                                            <div className="col text-end pe-3">Precio <strong>$774</strong> <small>MXN</small></div>
                                        </div>
                                        <div className="row">
                                            <div className="col pe-3 text-end">Quedan 45 asientos</div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ol className={estilos.seatRows}>

                            <li >
                                <ol className={"d-flex aling-items-center "+estilos.seatRows}>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                  
                                    {
                                       
                                        seats?.map((lista, index) =>
                                            <li className={"p-2 "+estilos.seat} key={index}>
                                                <div role="checkbox" aria-checked="true">
                                                    <span>
                                                        <img src={Images.disponible} alt="Disponible" />
                                                    </span>
                                                    <label className={estilos.seatNum}>{lista}</label>
                                                </div>
                                            </li>
                                        )
                                    }
                                  
                                   
                                </ol>
                            </li>
                            <li>
                                <ol className={"d-flex "+estilos.seatRows}>  
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <Lista
                                        start={3}
                                        end={48}
                                    />
                                </ol>
                            </li>
                            <li>
                                <ol className={"d-flex "+estilos.seatRows}>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <li className={"p-2 "+estilos.seat}>
                                        <div role="checkbox" aria-checked="false" name="seat49" id="seat49" onClick={handleSeatClick}>
                                            <span>
                                                <img src={seatImg} alt="Disponible" />
                                            </span>
                                            <label className={estilos.seatNum}>49</label>
                                        </div>
                                    </li>
                                </ol>
                            </li>
                            
                            <li>
                                <ol className={"d-flex "+estilos.seatRows}>
                                    <li className={"p-2 "+estilos.seat}><span></span></li>
                                    <Lista
                                        start={2}
                                        end={47}
                                    />
                                    
                                </ol>
                            </li>
                            <li>
                                <ol className={"d-flex "+estilos.seatRows}>
                                    <li className={estilos.volante}>
                                        <span><img src={Images.volante} alt="Disponible" /></span>
                                    </li>
                                    <Lista
                                        start={1}
                                        end={47}
                                    />
                                </ol>
                            </li>
                        </ol>

                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div class="card shadow">
                    <div class={"card-body rounded "+estilos.cardStyle}>
                        <h5 class="card-title">Viaje de ida</h5>
                        <div className="row">
                            <div className="col-4 align-self-center">
                                <img src={Images.busImg} className="img-fluid" alt="..." />
                            </div>
                            <div className="col">
                                {datos?.fechaSalida+' '+datos?.horaSalida+' '}h <br/>
                                Origen: {datos?.salida} <br/>
                                Destino: {datos?.llegada}    
                            </div>
                        </div>  
                    </div>
                    <div className="card-body border-top">
                        <div className="row p-2">
                            <div className="col">Viaje de ida</div>
                            <div className="col text-end fw-semibold">$667.24</div>
                        </div>
                        <div className="row p-2">
                            <div className="col">Subtotal</div>
                            <div className="col text-end fw-semibold">$667.24</div>
                        </div>
                        <div className="row p-2">
                            <div className="col">IVA</div>
                            <div className="col text-end fw-semibold">$106.76</div>
                        </div>
                    </div>
                    <div className="card-body border-top">
                        <div className="row pe-2 ps-2">
                            <div className="col fs-5">Total</div>
                            <div className="col text-end fw-semibold">$774 <span style={{fontSize:'12px'}}>MXN</span></div>
                        </div>
                        <div className="row pe-2 ps-2">
                            <div className="col">
                                <small class="text-muted">Precios incluyen IVA</small>
                            </div>
                        </div>
                        <div className="row p-2 mt-3">
                            <div className="col">
                                <Button variant="contained" color="error" sx={{ width: '100%' }}> 
                                    Continuar
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ObtenerBoletos