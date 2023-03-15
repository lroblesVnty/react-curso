import {useState ,useEffect,useCallback} from 'react';
import {getUsers} from '../models/modelo'
import esESGrid from '../models/mui-Es'
import {DataGrid,GridToolbar, 
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    GridActionsCellItem 
} 
from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';
function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    return (
      <Pagination
        color="primary"
        count={pageCount}
        page={page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        //showFirstButton showLastButton
      />
    );
}
function Usuarios() {
    const [usuarios, setUsuarios] = useState({isUpload:false,data:[]})
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    const cargarDatos=async ()=>{
        /*fetch('http://localhost/webServices/api-crud?consultar=1')
        .then(res=>res.json())
        .then((response)=>{
            if (response.success) {
                setUsuarios({isUpload:true,data:response.data})
            }
        })
        .catch(error => {
            return error
        }) */
        const response= await getUsers()
        if (response.success) {
            setUsuarios({isUpload:true,data:response.data})
        }
        
        
      
        
    }
    const editUser = useCallback(
        (id) => () => {
            console.log({id})
            //navigate("/editar/"+id);
            window.open('#/editar/'+id,'_blank')
        },
        [],
    );
    useEffect(() => {
       
        cargarDatos()
       
    },[]);//arreglo vacio para que no itere varias veces
    const columns= [
        { field: 'idUser', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header',
        headerAlign: 'center'},
        { field: 'nombre', headerName: 'Nombre',flex: 1,headerClassName: 'theme-header',
        headerAlign: 'center' },
        { field: 'edad', headerName: 'Edad',flex: 1,headerClassName: 'theme-header',
        headerAlign: 'center' },
        { field: 'mail', headerName: 'Mail',flex: 1,description:
        'The identification used by the person with access to the online service.',headerClassName: 'theme-header',
        headerAlign: 'center', },{
            headerClassName: 'theme-header',
            description:'Editar',
            field: 'actions',
            type: 'actions',
            getActions: (params) => [
              <GridActionsCellItem
                icon={<FontAwesomeIcon icon={faPen}  />}
                label="Editar"
                onClick={editUser(params.id)}
              />,
             
            ],
          },
    ];
    const pages=['Agregar','Products']
      
    return (
        <>
            <NavBar pages={pages}/>
            <div className="container mt-4">
                <div className="row mt-3">
                    <div className="col-lg-12">
                        <div className="card shadow-lg text-bg-dark">
                            <div className="card-body">
                            
                                <div style={{ height: 420, width: '100%' }}>
                                    
                                    <DataGrid  
                                        //autoHeight
                                        //localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                        localeText={esESGrid}
                                        sx={{
                                            
                                            
                                            '& .theme-header': {
                                                //backgroundColor: 'rgb(226, 227, 229)',
                                                color:'#02b99b',
                                                
                                            },
                                            '& .MuiDataGrid-toolbarContainer': {
                                                //: '#074682',
                                                '& .MuiButton-text': {
                                                //color: 'rgb(13, 13, 14)',
                                                    color:'white'
                                                },
                                                '& .MuiBadge-badge': {
                                                    //backgroundColor: '#074682',
                                                    backgroundColor: 'white',
                                                    
                                                },
                                                /*'& .MuiInput-input':{
                                                    color:'rgb(81,81,81)'
                                                },*/
                                                '& .MuiInputBase-root':{//texto e icono
                                                    color:'rgb(210, 224, 223)'
                                                },

                                                '& .MuiSvgIcon-root':{//only icons
                                                // color:'red'
                                                }
                                            },border: 2,
                                            borderColor: '#02b99b',
                                            '& .MuiDataGrid-row:hover': {
                                                color: 'primary.main',
                                                backgroundColor:'rgba(147, 203, 248, 0.11)'
                                            },
                                            '.MuiDataGrid-columnSeparator': {
                                                //display: 'none',
                                                color:'rgb(81,81,81)'
                                            },
                                            '.MuiDataGrid-row':{
                                                color:'white',
                                                //borderColor:'black'
                                            },
                                            '.MuiDataGrid-cell':{
                                                borderBottomColor:'rgb(81,81,81)'
                                            },
                                            '& .MuiDataGrid-footerContainer':{
                                                color:'red',
                                                '& .MuiPaginationItem-text':{
                                                    color:'rgb(210, 224, 223)'
                                                }
                                            },
                                            '& .MuiDataGrid-cell--withRenderer':{
                                                color:'red',
                                                '& .MuiIconButton-root': {
                                                //color: 'rgb(13, 13, 14)',
                                                    //color:'white'
                                                    color:'#02b99b'
                                                },
                                            }
                                            /*'.MuiDataGrid-columnHeaders':{
                                                borderBottomColor:'red',
                                            
                                            '.MuiDataGrid-footerContainer':{
                                                borderTopColor:'red'
                                            }}*/
                                        
                                        }}
                                        rows={usuarios.data}
                                        columns={columns}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        getRowId={(row) => row.idUser}
                                        disableColumnResize={false}
                                        disableColumnMenu
                                        /*disableColumnFilter
                                        disableColumnSelector
                                        disableDensitySelector*/
                                        disableSelectionOnClick
                                        components={{ Toolbar: GridToolbar,Pagination: CustomPagination }}
                                        componentsProps={{
                                        toolbar: {
                                            showQuickFilter: true,
                                            quickFilterProps: { debounceMs: 500 },
                                        },
                                        }}
                                    />
                                    
                                </div>
                            {/*  <div className="table-responsive">
                                    <table className="table table-sm">
                                        <thead className="table-light">
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Edad</th>
                                                <th scope="col">Mail</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider"> */}
                                        {
                                        /*usuarios.data.map(user=>(
                                                <tr key={user.idUser}>
                                                    <td>{user.idUser}</td>
                                                    <td>{user.nombre}</td>
                                                    <td>{user.edad}</td>
                                                    <td>{user.mail}</td>
                                                </tr>
                                            ))*/
                                            
                                        }
                                    
                                    
                                    
                                    {/*   </tbody>
                                    </table>
                                </div> */}
                                    
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuarios