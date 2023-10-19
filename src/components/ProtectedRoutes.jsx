import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useAuth} from '../context/authContext';

export const ProtectedRoute = ({isAllowed,children,redirectTo}) => {
    const {userActive}=useAuth()
    console.log('protected route User Active'+userActive)
    const location=useLocation()
    console.log({location});
    if (!userActive) {
       
        //return <Navigate to={redirectTo} replace state={{from:location}}/>;//replace=quitar lo que se haya escrito en la url
        return <Navigate to={redirectTo} replace />;//replace=quitar lo que se haya escrito en la url
    }
    /*if (!isAllowed) {
        console.log('no esta permitido')
        return <Navigate to={redirectTo} replace />;//replace=quitar lo que se haya escrito en la url
    }*/

    return children ;
};