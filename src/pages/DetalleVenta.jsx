import {useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import CardForm from '../components/CardForm'
import { SaleDetail,showCargando } from '../models/modelo'
import Swal from 'sweetalert2'
const DetalleVenta = () => {
    const {id: saleId}=useParams()
    const [data, setData] = useState([])
    const [productos, setProductos] = useState([])

    const getSaleDetail=async ()=>{
        try {
            showCargando()
            const resp= await SaleDetail(saleId)
            Swal.close()
            console.log(resp)
            //setLoading(false)
            if (resp.status==200) {
                if (resp.data) {
                    setData(resp.data)
                    setProductos(resp.data.productos)
                  
                }
            }else if (resp.status==204) {
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title:'La venta no existe',
                    showConfirmButton: true,
                    allowOutsideClick:false,
                });
                
            }
        } catch (error) {
            Swal.close()
            //setLoading(false)
            Swal.fire({
                position: 'top',
                icon: 'error',
                title:error.message,
                showConfirmButton: true,
                allowOutsideClick:false,
            });
            
        }
        
        
    }
    useEffect(() => {
       getSaleDetail();       
    },[]);//arreglo vacio para que no itere varias veces
    const currencyFormatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });
   
    return (
        <div className="container mt-4">
            <CardForm title="Detalle de Venta" colSize="10">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center fs-5"><span className='fw-light'>Fecha Venta: </span><span className='fw-semibold'>{data.fecha_venta}</span></div>
                    <div className="col-lg-4 text-center fs-5"><span className='fw-light'>Total:</span> <span className='fw-semibold'>{currencyFormatter.format(Number(data.total))}</span></div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center fs-5">
                        <span className='fw-light'>Cajero: </span><span className='fw-semibold'>{data.user.name}</span>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col text-center fs-5 fw-light bg-primary text-white">Productos</div>
                </div>
                <div className="row mt-4 justify-content-center">
                    <div className="col-lg-10">
                        <table class="table table-bordered border-info">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {productos.map(({id,descripcion,precio,detalle:{producto_cantidad}},index) => (
                                    <tr key={index}>
                                        <th scope="row">{id}</th>
                                        <td scope="row">{descripcion}</td>
                                        <td scope="row">{currencyFormatter.format(Number(precio))}</td>
                                        <td scope="row">{producto_cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        
                        </table>
                    </div>
                </div>

            </CardForm>
        </div>
    )
}
export default DetalleVenta