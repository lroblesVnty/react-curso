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
                <Route exact path="/menu" element={
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
                     <Editar/>                   
                    
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
                    <Viajes/>                    
                } />
                <Route path="/obtenerBoletos" element={
                    <ObtenerBoletos/>                    
                } />
                <Route path="/venta" element={
                    <Venta/>                    
                } />
                <Route path="/venta/:id" element={
                    <DetalleVenta/>                    
                } />
                <Route path="/ventas" element={
                    <Sales/>                    
                } />
                <Route path="/equipos" element={
                    <Equipos/>                    
                } />
                <Route path="/file" element={
                    <Files/>                    
                } />
                <Route path="/miembros" element={
                    <ProtectedRoute redirectTo="/unauthorized">
                        <Miembros/>
                    </ProtectedRoute>
                    
                } />
                <Route path="/plan" element={
                    <Planes/>                    
                } />
                <Route path="/scanner" element={
                    <QrScanner/>                    
                } />
                <Route path="/home" element={
                    <Home/>                    
                } />
                <Route path="/miembro/status/:id" element={
                    <MiembroStatus/>                    
                } />
                <Route path="/visitas" element={
                    <Visitas/>                    
                } />
                <Route path="/asistencia" element={
                    <Asistencia/>                    
                } />
                <Route path="/unauthorized" element={
                    <UnauthorizedPage/>                    
                } />



                 <Route path="*" element={<NotFoundPage/>} />
                
            </Routes>
    );
}

export default App;
