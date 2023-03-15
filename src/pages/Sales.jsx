import CardForm from "../components/CardForm";
import {useState,useEffect} from 'react'
import {DataGrid,GridToolbar, 
    gridPageCountSelector,gridPageSelector,
    useGridApiContext,useGridSelector,
    GridActionsCellItem 
} 
from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import esESGrid from '../models/mui-Es';
import { getSales } from "../models/modelo";
import Swal from 'sweetalert2'
import { CustomFooter } from "../components/CustomFooter";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,Label } from 'recharts'
import { getTotSales } from "../services/ventas.service";

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

const Sales = () => {
    const [pageSize, setPageSize] = useState(5);
    const [rows, setRows] = useState([]);
    const [salesTot, setSalesTot] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rowCount, setRowCount] = useState(0)

    const getVentas=async ()=>{
        setLoading(true)
        try {
            const resp= await getSales()
            console.log(resp)
            setLoading(false)
            if (resp.status==200) {
                if (resp.data) {
                    setRows(resp.data)
                    setRowCount(resp.data.length)
                }
            }
        } catch (error) {
            setLoading(false)
            Swal.fire({
                position: 'top',
                icon: 'error',
                title:error.message,
                showConfirmButton: true,
                allowOutsideClick:false,
            });
            
        }
        
        
    }
    const getTotVentas=async ()=>{
        try {
            const resp= await getTotSales()
            console.log(resp)
            setLoading(false)
            if (resp.status==200) {
                if (resp.data) {
                    setSalesTot(resp.data)
                }
            }
        } catch (error) {
            setLoading(false)
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
       
        getVentas()
        getTotVentas()
       
    },[]);//arreglo vacio para que no itere varias veces
    const verDetalle=(row)=>{
        console.log(row.id)
        window.open('#/venta/'+row.id,'_blank')
    }
    const currencyFormatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    });
    function getName(params) {
        return `${params.row.user.name}`;
    }
    const DataFormater = (number) => {

        return currencyFormatter.format(Number(number))
    }
    
    const columns= [
        { field: 'id', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header',
        headerAlign: 'center'},
        { field: 'total', headerName: 'Total',flex: 1,headerClassName: 'theme-header',
        headerAlign: 'center',align:'center',type:'number', valueFormatter: ({ value }) => currencyFormatter.format(Number(value)), },
        { field: 'user', headerName: 'Cajero',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',  valueGetter: getName},
        { field: 'fecha_venta', headerName: 'Fecha y Hora',flex: 1,description:
        'The identification used by the person with access to the online service.',headerClassName: 'theme-header',
        headerAlign: 'center',align:'center'},
    ];
    return (
    <div className="container-fluid mt-4">
        <CardForm title="Ventas Registradas" colSize="12">
            <div className="row">
                <div className="col">
                    <div style={{ height: 420, width: "100%" }}>
                        <DataGrid
                            //autoHeight
                            //localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            loading={loading}
                            localeText={esESGrid}
                            rowCount={rowCount}
                            sx={{
                            "& .theme-header": {
                                //backgroundColor: 'rgb(226, 227, 229)',
                                color: "#02b99b",
                            },
                            "& .MuiDataGrid-toolbarContainer": {
                                //: '#074682',
                                "& .MuiButton-text": {
                                //color: 'rgb(13, 13, 14)',
                                color: "black",
                                },
                                "& .MuiBadge-badge": {
                                //backgroundColor: '#074682',
                                backgroundColor: "white",
                                },
                                /*'& .MuiInput-input':{
                                                        color:'rgb(81,81,81)'
                                                    },*/
                                "& .MuiInputBase-root": {
                                //texto e icono
                                    //color: "rgb(210, 224, 223)",
                                    color:"black"
                                },
                                "& .MuiSvgIcon-root": {
                                //only icons
                                // color:'red'
                                },
                            },
                            border: 2,
                            borderColor: "#02b99b",
                            "& .MuiDataGrid-row:hover": {
                                color: "primary.main",
                                backgroundColor: "rgba(147, 203, 248, 0.11)",
                                cursor:'pointer'
                            },
                            ".MuiDataGrid-columnSeparator": {
                                //display: 'none',
                                color: "rgb(81,81,81)",
                            },
                            ".MuiDataGrid-row": {
                                color: "black",
                                //borderColor:'black'
                            },
                            ".MuiDataGrid-cell": {
                                borderBottomColor: "rgb(81,81,81)",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                color: "black",
                                "& .MuiPaginationItem-text": {
                                    //color: "rgb(210, 224, 223)",
                                    color:'black'
                                },
                            },
                            "& .MuiDataGrid-cell--withRenderer": {
                                color: "red",
                                "& .MuiIconButton-root": {
                                //color: 'rgb(13, 13, 14)',
                                //color:'red'
                                color: "#02b99b",
                                },
                            },
                            "& .MuiIconButton-root": {
                                color: "black",
                            },
                            /*'.MuiDataGrid-columnHeaders':{
                                                    borderBottomColor:'red',
                    
                                                '.MuiDataGrid-footerContainer':{
                                                    borderTopColor:'red'
                                                }}*/
                            }}
                            rows={rows}
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
                            components={{ Toolbar: GridToolbar, Pagination: CustomPagination, Footer: CustomFooter,}}
                            componentsProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                                footer: { total: rowCount }
                            }}
                            experimentalFeatures={{ newEditingApi: true }}
                            onRowClick={(rowData) => verDetalle(rowData.row)}
                    
                    
                        />
                    </div>
                </div>
                <div className="col-lg-5 align-self-center">
                    <ResponsiveContainer width="100%" aspect={2}>
                        <BarChart 
                            data={salesTot}
                            width={500}
                            height={500}
                            margin={{
                                top:5,
                                right:30,
                                left:30,
                                bottom:5
                            }}
                           
                        >
                        
                        
                        <CartesianGrid strokeDasharray="4 1 2" />    
                        <XAxis dataKey="fechaVenta"/>
                        
                        <YAxis tickFormatter={DataFormater} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#6b48ff"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </CardForm>
    </div>
  );
};
export default Sales;
