import {DataGrid,GridToolbar,GridActionsCellItem} from '@mui/x-data-grid';
import esESGrid from '../models/mui-Es';
import { CustomFooter } from "../components/CustomFooter";
import  { useState,useEffect } from "react";
import CustomPagination from './CustomPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil} from '@fortawesome/free-solid-svg-icons'
import {useCallback} from 'react';
import { RenderStatus } from './RenderStatus';
import AddCardIcon from '@mui/icons-material/AddCard';
import EditIcon from '@mui/icons-material/Edit';

const DataTableMiem = ({rows,loading,rowCount,setEditValues,setIsEdit,action,actionAdd}) => {
    const [pageSize, setPageSize] = useState(5);
    //const [rowCount, setRowCount] = useState(0);
    //const updatedState = [...loading ,  loading];

   // setLoading(oldArray => [...oldArray,loading ]); 
    //*mandar el setLoading desde miembros.jsx 
    //const [loading, setLoading] = useState(false);
   // const [rows, setRows] = useState([]);

    const columns= [
        { field: 'id', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header'},
        { field: 'nombre', headerName: 'Nombre Miembro',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
        { field: 'apellido', headerName: 'Apellido Miembro',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
        { field: 'edad', headerName: 'Edad',flex: 1,maxWidth:80,headerClassName: 'theme-header',headerAlign: 'center',align:'center'},
        { field: 'tel', headerName: 'Teléfono',flex: 1,maxWidth:100,description:'Teléfono del miembro.',headerClassName: 'theme-header',headerAlign: 'center',align:'center'},
        { field: 'plan', headerName: 'Plan',flex: 1,description:'Plan del miembro.',headerClassName: 'theme-header',headerAlign: 'center',align:'center',valueGetter: (params) => params.row.plan.nombre_plan,},
        { field: 'expirationDate', headerName: 'Fecha de Expiración',flex: 1,description:'Fecha de expiración del plan.',headerClassName: 'theme-header',headerAlign: 'center',align:'center',type: 'date', resizable: true},
        { field: 'activo', headerName: 'Estatus',flex: 1,description:'Estatus del plan ',headerClassName: 'theme-header',
        headerAlign: 'center',align:'center',renderCell: RenderStatus},
       
        {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<AddCardIcon />}
            label="Registrar Pago"
            //onClick={toggleAdmin(params.id)}
            onClick={() => addPago(params.row)}
            disabled={params.row.activo}
            showInMenu
          />,
          <GridActionsCellItem
            //icon={<FontAwesomeIcon icon={faPencil} size="xs" style={{color: "#ff6600",}} />}
            icon={<EditIcon />}
            label="Editar Miembro"
            //onClick={duplicateUser(params.id)}
            onClick={() => edit(params.row)}
            showInMenu
          />,
        ],
      },
    ];

   const edit = useCallback((row) => {
        console.log(row);
        setEditValues({ ...row });
        setIsEdit(true);
        action(row);
    }, []);

   const addPago = useCallback((row) => {
        console.log(row);
        actionAdd(row);
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

export default DataTableMiem