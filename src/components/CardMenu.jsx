import React from 'react'

import  '../styles/card.css'
import { useNavigate } from "react-router-dom";

const CardMenu = ({icono,titulo,to}) => {
    const navigate = useNavigate();
    const handleClick = e =>{
        e.preventDefault()
        navigate('/'+to)
    }
    return (
        <div className="card text-center text-bg-dark card-menu" onClick={handleClick}>
            <div className="card-body">
                {icono}
        </div>
        <div className="card-footer  fw-bold fs-2">
            {titulo}
        </div>
    </div>
    )
}

export default CardMenu