import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Tooltip } from '@mui/material';
import { splitDateTime } from '../utils/dateUtils';
import {GridActionsCellItem} from '@mui/x-data-grid';

export const visitasColumns = (handleAction ) => [
    //TODO se podría deshabilitar accion si la fecha actual es diferente a la fecha de la visita

     { field: 'id', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header'},
        { field: 'usuario', headerName: 'Nombre Usuario',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
        { field: 'fecha_visita', headerName: 'Fecha Visita',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',type: 'date',
       /*  valueGetter: (params) => {
            const { date } = splitDateTime(params.row.fecha_visita);
            return date;
        } */
        },
        {field: 'hora_entrada',headerName: 'Hora Entrada',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',
        /*valueGetter: (params) => {
            const { time } = splitDateTime(params.row.visited_at);
            return time;
        },*/
        },{field: 'hora_salida',headerName: 'Hora Salida',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' 
        },
        {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params) => [
            <Tooltip title="Cerrar Visita">
            <span>
                <GridActionsCellItem
                    icon={<EventAvailableIcon sx={{ color: "#050505ff" }} />}
                    label="Cerrar"
                    onClick={() => handleAction(params.row)}
                    disabled={params.row.hora_salida?true:false}
                    sx={{
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        pointerEvents: 'none', // Para que el cursor no sea de click
                    },
                    }}
                />
            </span>
            </Tooltip>,
        ],
      },

]

export const asistenciaColumns = (handleAction ) => [

    { field: 'id', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header'},
    { field: 'usuario', headerName: 'Nombre Usuario',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',valueGetter: (params) => `${params.row.miembro.nombre} ${params.row.miembro.apellido}`,},
    { field: 'fecha', headerName: 'Fecha',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',type: 'date',
    /* valueGetter: (params) => {
        const { date } = splitDateTime(params.row.visited_at);
        return date;
    } */
    },
    {field: 'hora_entrada',headerName: 'Hora Entrada',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',
       /* valueGetter: (params) => {
            const { time } = splitDateTime(params.row.hora_entrada);
            return time;
        },*/
    },
    { field: 'hora_salida', headerName: 'Hora Salida',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
    {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: (params) => [
        <Tooltip title="Cerrar asistencia">
            <GridActionsCellItem
                icon={<EventAvailableIcon sx={{ color: "#090909ff" }} />}
                label="Cerrar"
                disabled={params.row.hora_salida?true:false}
                onClick={() => handleAction(params.row)}
                sx={{
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        pointerEvents: 'none', // Para que el cursor no sea de click
                },
                }}
                
            />
        </Tooltip>,
    ],
    },

]