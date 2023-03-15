import { Link } from 'react-router-dom';
import {useAuth} from '../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faClipboardList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import CardMenu from '../components/CardMenu';


const iconAdd=<FontAwesomeIcon icon={faPlus} size="5x" className='prueba' />
const iconCons=<FontAwesomeIcon icon={faClipboardList} size="5x" className='prueba' />

const cards=[
    {
        id:1,
        titulo:'Agregar',
        icono:iconAdd,
        to:'agregar'
    },
    {
        id:2,
        titulo:'Consultar',
        icono:iconCons,
        to:'consultar'    }
]
function Menu() {
    const {userActive,logout}=useAuth()
    console.log({userActive})
   
    return (
        
        <div className="container mt-4  align-items-center  justify-content-center">
            <div className="row">
            {cards.map(({ titulo, icono, to, id }) => (
                
                <div className="col-lg-4" key={id}>
                   {/*  <Link to="/agregar">
                        <div className="card text-center" >
                            <div className="card-body">
                                <i className="fa-solid fa-plus fa-5x"></i>
                            </div>
                            <div className="card-footer  fw-bold">
                                Agregar
                            </div>
                        </div>
                    </Link> */}
                    <CardMenu icono={icono} titulo={titulo} to={to} />
                    
                    
                </div>
                ))}
                
                <div className="col-lg-4">
                    <div className="card text-center text-bg-dark card-menu" onClick={logout}>
                        <div className="card-body">
                            
                            <FontAwesomeIcon icon={faRightFromBracket} size="5x" className='prueba' />
                        </div>
                        <div className="card-footer fw-bold fs-2">
                            Logout
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Menu