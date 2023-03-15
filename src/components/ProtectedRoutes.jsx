import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useAuth} from '../context/authContext';

export const ProtectedRoute = ({isAllowed,children,redirectTo}) => {
    const {userActive}=useAuth()
    if (!userActive) {
        const location=useLocation()
        console.log({location});
        return <Navigate to={redirectTo} replace state={{from:location}}/>;//replace=quitar lo que se haya escrito en la url
    }

    return children ;
};