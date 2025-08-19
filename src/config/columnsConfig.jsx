import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Tooltip } from '@mui/material';
import { splitDateTime } from '../utils/dateUtils';
import {GridActionsCellItem} from '@mui/x-data-grid';

export const visitasColumns = (handleAction ) => [

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
                    onClick={() => handleAction(params.row)}
                />
            </Tooltip>,
        ],
      },

]

export const asistenciaColumns = (handleAction ) => [

    { field: 'id', headerName: 'Id', flex: 1,maxWidth:50,headerClassName: 'theme-header'},
    { field: 'usuario', headerName: 'Nombre Usuario',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
    { field: 'visited_at', headerName: 'Fecha',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',
    valueGetter: (params) => {
        const { date } = splitDateTime(params.row.visited_at);
        return date;
    }
    },
    {field: 'visita_hora',headerName: 'Hora Entrada',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center',
        valueGetter: (params) => {
            const { time } = splitDateTime(params.row.visited_at);
            return time;
        },
    },
    { field: 'hora_salida', headerName: 'Hora Salida',flex: 1,headerClassName: 'theme-header',headerAlign: 'center',align:'center' },
    {
    field: 'actions',
    type: 'actions',
    width: 80,
    getActions: (params) => [
        <Tooltip title="Cerrar asistencia">
            <GridActionsCellItem
                icon={<EventAvailableIcon sx={{ color: "#949393ff" }} />}
                label="Cerrar"
                onClick={() => handleAction(params.row)}
            />
        </Tooltip>,
    ],
    },

]