import React, {  useState } from "react";
import Images from '../assets/imagenes'
import estilos from '../styles/obtenerBoletos.module.css'
const Lista = ({start,end}) => {
    const items = []
    const [seatImg, setSeatImg] = useState(Images.disponible)
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
    for (let i = start; i < end; i+=4) {
        items.push(<li className={"p-2 "+estilos.seat} key={i}>
            <div role="checkbox" aria-checked="false" onClick={handleSeatClick}>
                <span>
                    <img src={seatImg} alt="Disponible" />
                </span>
                <label className={estilos.seatNum}>{i}</label>
            </div>
            </li>
        )
        
    }
  return (
    <>
        {items}
    </>

    
  )
}

export default Lista