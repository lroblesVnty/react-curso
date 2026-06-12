import axios from 'axios';
//const API_URL = import.meta.env.VITE_API_URL;

const BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tuproyecto.com/v1';

// 1. INSTANCIA PÚBLICA: Para endpoints que NO llevan token (Login, Registro, Catálogo público)
export const publicApi = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
});
// Nota: Esta instancia no lleva ningún interceptor de token.

// 2. INSTANCIA PRIVADA: Para endpoints que SÍ requieren autenticación (Carrito, Perfil, Checkout)
export const privateApi = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' },
});

// A la instancia privada sí le aplicamos el interceptor del token
privateApi.interceptors.request.use(
	(config) => {
	const token = localStorage.getItem('authToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
	},
	(error) => Promise.reject(error)
);

// También le aplicamos el interceptor de respuesta para manejar el error 401 (token expirado)
privateApi.interceptors.response.use(
	(response) => response,
	(error) => {
	if (error.response && error.response.status === 401) {
		localStorage.removeItem('authToken');
		window.location.href = '/login';
	}
	return Promise.reject(error);
	}
);
