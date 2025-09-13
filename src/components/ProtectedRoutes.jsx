
import {AuthContext} from '../context/authContext';
import { useNavigate,Outlet,Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

export const ProtectedRoute = ({children }) => {
    const { isAuthenticated, loadingSession,user } = useContext(AuthContext);
   // const userRoles = user?.role_names || [];
    //const {role_names:userRoles}=user;
    const navigate = useNavigate();
    //console.log({isAuthenticated})
    //console.log({allowedRoles})


    useEffect(() => {
        if (!isAuthenticated && !loadingSession) {
            navigate('/login');
        }
    }, [isAuthenticated, loadingSession, navigate]);

    if (loadingSession) {
        return <div>Cargando sesión...</div>; // O un componente de carga más sofisticado
    }

    
    /*if (!Array.isArray(userRoles) || userRoles.length === 0) {
        console.warn("userRoles no es un array o está vacío.");
        
    }*/

    /*const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));
    if (!hasRequiredRole && isAuthenticated) {
        // Si el usuario no tiene los roles permitidos, redirigir a una página de acceso denegado
        return <Navigate to="/unauthorized" replace />;
    }*/

    return isAuthenticated ?  children: null;
};