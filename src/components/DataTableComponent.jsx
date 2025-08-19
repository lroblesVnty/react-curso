import {DataGrid,GridToolbar,GridActionsCellItem} from '@mui/x-data-grid';
import esESGrid from '../models/mui-Es';
import { CustomFooter } from "../components/CustomFooter";
import  { useState,useEffect,useCallback } from "react";
import CustomPagination from './CustomPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil} from '@fortawesome/free-solid-svg-icons'
import { RenderStatus } from './RenderStatus';
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';
import { splitDateTime } from '../utils/dateUtils';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Tooltip } from '@mui/material';

const DataTableComponent = ({rows,loading,rowCount,actionRow}) => {
    const [pageSize, setPageSize] = useState(5);
    //const [rowCount, setRowCount] = useState(0);
    //const updatedState = [...loading ,  loading];

   // setLoading(oldArray => [...oldArray,loading ]); 
    //*mandar el setLoading desde miembros.jsx 
    //const [loading, setLoading] = useState(false);
   // const [rows, setRows] = useState([]);

    const columns= [
        { field: 'id', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header'},
        { field: 'usuario', headerName: 'Nombre Usuario',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
        { field: 'visited_at', headerName: 'Fecha Visita',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',
        valueGetter: (params) => {
            const { date } = splitDateTime(params.row.visited_at);
            return date;
        }
        },
        {field: 'visita_hora',headerName: 'Hora Visita',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',
        valueGetter: (params) => {
            const { time } = splitDateTime(params.row.visited_at);
            return time;
        },
        },
        {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
            <Tooltip title="Cerrar Visita">
                <GridActionsCellItem
                    icon={<EventAvailableIcon sx={{ color: "#050505ff" }} />}
                    label="Cerrar"
                    onClick={() => handleFnClick(params.row)}
                
                />
            </Tooltip>,
        ],
      },
];


    const handleFnClick = useCallback((row) => {
        console.log("Row clicked:", row);
         actionRow(row);
    }, []);

    return (
        <div style={{ height: 420, width: "100%" }}>
        <DataGrid
            //autoHeight
            //localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            loading={loading}
            localeText={esESGrid}
            //*rowCount={rowCount}
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
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar, Pagination: CustomPagination, Footer: CustomFooter,}}
            componentsProps={{
                toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                    csvOptions: { disableToolbarButton: true },
                   // exportButton: false
                    printOptions: { disableToolbarButton: true },
                },
                footer: { total: rowCount }
            }}
            experimentalFeatures={{ newEditingApi: true }}
           // onRowClick={(rowData) => verDetalle(rowData.row)}
    
    
        />
    </div>
    )
}

export default DataTableComponent