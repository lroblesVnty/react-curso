import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
    primary: {
      main: '#f53d00', // Azul personalizado
      light: '#757ce8',
    },
    secondary: {
      main: '#ff5024', // Rojo personalizado
    },
    customColors: {
				success: "#4caf50", // Verde
				warning: "#ff9800", // Naranja
				danger: "#f44336", // Rojo intenso
			},
    },
    components: {
        MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none', // Evita que el texto se convierta en mayúsculas
                /* '&.Mui-disabled': {
                    color: 'lightgray', // Color del icono
                    bgcolor:'#ff5024',
                    cursor: 'not-allowed',
                    // Puedes usar también el color del tema
                    // color: ({ theme }) => theme.palette.disabledIcon,
                }, */
            },
        },
        defaultProps: {
            variant: 'contained',
            color: 'primary',
            bordercolor:'rgb(245, 61, 0)' ,
            ':hover': {
                bgcolor: '#ff5024',
                color: 'white',
                bordercolor: '#ff5024',
            },
        },
        },
    },
});	

export default theme;

 
