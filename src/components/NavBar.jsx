import React, { useContext } from 'react'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faHouse,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom';

import { Tooltip } from '@mui/material';
import {AuthContext} from '../context/authContext';
//const pages = ['Products', 'Pricing', 'Blog'];

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#02b99b',
            light: '#0066ff',
        }, 
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        },
    },
});
const NavBar = ({pages}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
      console.log('clic')
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const {logout,user} = useContext(AuthContext);

    const handleLogout = async () => {
     
      const result = await logout();
      //console.log({result})
      if (result?.success === false) {
        console.error('Error al cerrar sesión:', result?.error);
        // Aquí podrías mostrar un mensaje de error al usuario
      } else {
        // Redirigir al usuario a la página de inicio de sesión o a donde sea necesario
        navigate('/login');
      }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                       
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link} to={"/"}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                ':hover':{
                                    color:'white'
                                }
                            }}
                        >
                         <FontAwesomeIcon icon={faHouse} /> 
                         &nbsp;LOGO
                        </Typography>
            
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                            <FontAwesomeIcon icon={faBars} /> 
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}  component={Link} to={"/"+page.toLowerCase()}> 
                                {/* menuItem when screen resize */}
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <FontAwesomeIcon icon={faHouse} />  */}
                        <Typography
                        variant="h5"
                        noWrap
                        component={Link} to={"/menu"}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        >
                        LOGO{/* LOGO when page resize */}
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                variant="text"
                                key={page}
                                onClick={handleCloseNavMenu}
                                component={Link} to={"/"+page.toLowerCase()}
                                sx={{ my: 2, color: 'white', display: 'block' ,
                                    ':hover': {
                                    // bgcolor: '#09A28A', // theme.palette.primary.main
                                        bgcolor:'#0c8875',
                                        color: 'white',
                                    },
                                }}
                            >
                            {page}
                            </Button>
                        ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            {/* <Button color="inherit" variant="text"><FontAwesomeIcon icon={faRightFromBracket} /></Button> */}  
                            <Tooltip title="Salir">
                                <IconButton
                                    size="smal"
                                    aria-label="logout"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleLogout}
                                    //color="scondary.main"
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} /> 
                                </IconButton>
                            </Tooltip>
                        </Box>
            
                    
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
}

export default NavBar