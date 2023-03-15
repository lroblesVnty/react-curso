import {useState ,useEffect,useCallback} from 'react';
import {getProductos} from '../models/modelo'
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
import LinearProgress from '@mui/material/LinearProgress';


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
function Productos() {
    const [productos, setProductos] = useState({isUpload:false,data:[]})
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const cargarDatos=async ()=>{
        setLoading(true)
        const resp= await getProductos()
        console.log(resp)
        setLoading(false)
        if (resp.status==200) {
            if (resp.data) {
                setProductos({isUpload:true,data:resp.data})
            }
        }
        
        
        
      
        
    }
    const editUser = useCallback(
        (id) => () => {
            console.log({id})
            //navigate("/editar/"+id);
            window.open('#/products/edit/'+id,'_blank')
        },
        [],
    );
    useEffect(() => {
       
        cargarDatos()
       
    },[]);//arreglo vacio para que no itere varias veces
    const columns= [
        { field: 'id', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header',
        headerAlign: 'center'},
        { field: 'descripcion', headerName: 'Descripción',flex: 1,headerClassName: 'theme-header',
        headerAlign: 'center',align:'center' },
        { field: 'precio', headerName: 'Precio',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
        { field: 'stock', headerName: 'Stock',flex: 1,description:
        'The identification used by the person with access to the online service.',headerClassName: 'theme-header',
        headerAlign: 'center',align:'center'},
        {   
            maxWidth:60,
            headerClassName: 'theme-header',
            description:'Editar',
            field: 'actions',
            type: 'actions',
            align:'right',
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
                                        loading={loading}
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
                                            },
                                            '& .MuiIconButton-root':{
                                                color:'white'
                                            }
                                            /*'.MuiDataGrid-columnHeaders':{
                                                borderBottomColor:'red',
                                            
                                            '.MuiDataGrid-footerContainer':{
                                                borderTopColor:'red'
                                            }}*/
                                        
                                        }}
                                        rows={productos.data}
                                        columns={columns}
                                        pageSize={pageSize}
                                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                        rowsPerPageOptions={[5, 10, 20]}
                                        getRowId={(row) => row.id}
                                        disableColumnResize={false}
                                        disableColumnMenu
                                        /*disableColumnFilter
                                        disableColumnSelector
                                        disableDensitySelector*/
                                        disableSelectionOnClick
                                        components={{ Toolbar: GridToolbar,Pagination: CustomPagination,}}
                                        componentsProps={{
                                        toolbar: {
                                            showQuickFilter: true,
                                            quickFilterProps: { debounceMs: 500 },
                                        },
                                        }}
                                    />
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Productos