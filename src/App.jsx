import Login from "./Login";
import NotFoundPage from './pages/NotFoundPage'
import Menu from './pages/Menu'
import Usuarios from './pages/Usuarios'
import Agregar from './pages/Agregar'
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { Routes, Route} from "react-router-dom";
import { AuthProvaider } from "./context/authContext";
import Editar from "./pages/Editar";
import FormValidation from "./pages/FormValidation";
import Viajes from "./pages/Viajes";
import ObtenerBoletos from "./pages/ObtenerBoletos"; 
import AddProducto from "./pages/AddProducto";
import Productos from "./pages/Productos";
import Sales from "./pages/Sales";
import EditProducto from "./pages/EditProducto";
import Loading from "./components/Loading";
import Venta from "./pages/Venta";
import DetalleVenta from "./pages/DetalleVenta";
import Equipos from "./pages/Equipos";
import Register from "./pages/Register";
import Files from "./pages/Files";
import Miembros from "./pages/Miembros";
import Planes from "./pages/Planes";
import QrScanner from './pages/QrScanner'
import Home from "./pages/Home";
import MiembroStatus from "./pages/MiembroStatus";
import Visitas from "./pages/Visitas";
import Asistencia from "./pages/Asistencia"
import UnauthorizedPage from "./pages/UnauthorizedPage";
function App() {

    return (
        
            <Routes>
                 <Route exact path="/login"  element={<Login />} />
                <Route exact path="/" element={
                    <ProtectedRoute redirectTo="/">
                        <Menu />
                    </ProtectedRoute>
                    
                } />
                <Route path="/add" element={
                    <ProtectedRoute redirectTo="/">
                        <Agregar/>
                    </ProtectedRoute>
                    
                } />
                <Route path="/consultar" element={
                    <ProtectedRoute redirectTo="/">
                        <Usuarios/>
                    </ProtectedRoute>
                    
                } />
                 {/* <ProtectedRoute redirectTo="/">
                        <Editar/>
                    </ProtectedRoute> */}
                <Route path="/editar/:userId" element={
                    <ProtectedRoute redirectTo="/">
                        <Editar/>
                    </ProtectedRoute>
                } />
                <Route path="/agregar" element={
                    <ProtectedRoute redirectTo="/">
                        <FormValidation/>
                    </ProtectedRoute>
                    
                } />
                <Route path="/products" element={
                    <ProtectedRoute redirectTo="/">
                        <Productos/>
                    </ProtectedRoute>
                    
                } />
                <Route path="/products/add" element={
                    <ProtectedRoute redirectTo="/">
                        <AddProducto/>
                    </ProtectedRoute>
                    
                } />
                <Route path="/products/edit/:productId" element={
                    <ProtectedRoute redirectTo="/">
                        <EditProducto/>
                    </ProtectedRoute>
                    
                } />
                <Route path="/register" element={
                    <ProtectedRoute redirectTo="/">
                        <Register 
                             
                        />
                    </ProtectedRoute>
                    
                } />
                
                <Route path="/viajes" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Miembros/>
                    </ProtectedRoute>
                } />
                <Route path="/obtenerBoletos" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <ObtenerBoletos/>
                    </ProtectedRoute>
                } />
                <Route path="/venta" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Venta/>
                    </ProtectedRoute>
                } />
                <Route path="/venta/:id" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <DetalleVenta/>
                    </ProtectedRoute>
                } />
                <Route path="/ventas" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Sales/>
                    </ProtectedRoute>
                } />
                <Route path="/equipos" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Equipos/>
                    </ProtectedRoute>
                } />
                <Route path="/file" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Files/>
                    </ProtectedRoute>
                } />
                <Route path="/miembros" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Miembros/>
                    </ProtectedRoute>
                    
                } />
                <Route path="/plan" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Planes/>
                    </ProtectedRoute>
                } />
                <Route path="/scanner" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <QrScanner/>
                    </ProtectedRoute>
                } />
                <Route path="/home" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Home/>
                    </ProtectedRoute>
                } />
                <Route path="/miembro/status/:id" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <MiembroStatus/>
                    </ProtectedRoute>
                } />
                <Route path="/visitas" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Visitas/>
                    </ProtectedRoute>
                } />
                <Route path="/asistencia" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Asistencia/>
                    </ProtectedRoute>
                } />
                <Route path="/unauthorized" element={
                    <UnauthorizedPage/>                    
                } />




                 <Route path="*" element={<NotFoundPage/>} />
                
            </Routes>
    );
}

export default App;
