import { createContext, useState, useEffect,useCallback } from 'react';
import {getUserProfile, iniciarSesion,setLogout} from '../models/modelo'
import { isTokenExpired } from '../utils/tokenUtils';

export const AuthContext = createContext(null);

export function AuthProvaider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken')); // Cargar token inicial
    const [loadingSession, setLoadingSession] = useState(true);
    const [expiresAt, setExpiresAt] = useState(null);
    const storedUser = JSON.parse(sessionStorage.getItem("user"));//checar esto porque guardar ddatos de user puede ser inseguro

    
    const checkSession = useCallback(() => {
        setLoadingSession(true); // Iniciar estado de carga

        const storedToken = localStorage.getItem('authToken');
        const storedExpiresAt = localStorage.getItem('token_expires_at');

        if (storedToken && storedExpiresAt) {
            if (isTokenExpired(storedExpiresAt)) {
                console.log("Token expirado al iniciar la aplicación. Cerrando sesión.");
                setToken(null);
                localStorage.removeItem('authToken');
                sessionStorage.removeItem('user');
                console.log('se borro 10');
                setIsAuthenticated(false);
                setUser(null);
                setLoadingSession(false);
                return { isAuthenticated: false, user: null, token: null };
            }else{
                setIsAuthenticated(true);
                setUser(storedUser);
            } 
            console.log('checkSession')
        } else {
            // No hay token almacenado, asegurar que no esté autenticado
            setIsAuthenticated(false);
            setToken(null);
            console.log('entraaaa')
            setExpiresAt(null);
            sessionStorage.removeItem('user');
        }
        setLoadingSession(false); // La sesión ha terminado de cargar
    }, []); // Dependencia en 'logout' para asegurar que siempre use la función más reciente

    useEffect(() => {
        checkSession();
    }, [checkSession]);
   
    const login = useCallback(async (credentials) => {
        try {
            const response = await iniciarSesion(credentials);
        
            if (response.status === 200 && response?.data) {
                setToken(response.data.access_token);
                localStorage.setItem('authToken', response.data.access_token);
                localStorage.setItem('token_expires_at', response.data.expires_at);
                sessionStorage.setItem('user', JSON.stringify(response.data.data));
                setIsAuthenticated(true);
                setExpiresAt(response.data.expires_at);
                setUser(response.data.data || null); // Asume que la API puede devolver info del usuario
                console.log(response.data)
                return { success: true }; // Indica que el inicio de sesión fue exitoso
            } else {
                return { success: false, error: response.data?.message || 'Credenciales inválidas' };
            }
        } catch (error) {
            if (error.status==400 || error.status==401) {
                return { success: false, error: error.response.data?.message || 'Credenciales inválidas' };
            }
            //return { success: false, error: error.response?.data || 'Error de conexión' };
            return { success: false, error: 'Error de conexión' };
        }
    }, []); // useCallback para memoizar la función


    const logout = useCallback(async() => {
        try {
            const storedToken = localStorage.getItem('authToken');
            const response = await setLogout(storedToken);
        
            if (response.status === 200 && response?.data) {
                setToken(null);
                localStorage.removeItem('authToken');
                localStorage.removeItem('token_expires_at');
                sessionStorage.removeItem('user');
                console.log('se borro logout');
                setIsAuthenticated(false);
                setUser(null);
                setExpiresAt(null); 
            } else {
                return { success: false, error: response.data?.message || 'Credenciales inválidas' };
            }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || 'Error de conexión' };
        }
       
    }, []);
        //console.log(userName+" "+pass)
    const value = {
        isAuthenticated,
        user,
        loadingSession,
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loadingSession ? children : <div>Cargando...</div>} {/* Mostrar un indicador de carga */}
        </AuthContext.Provider>
    );
       
 
}
