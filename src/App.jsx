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
function App() {

    return (
        <AuthProvaider>
            <Routes>
                <Route exact path="/"  element={<Login />} />
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

                 <Route path="*" element={<NotFoundPage/>} />
                
            </Routes>
        </AuthProvaider>
    );
}

export default App;
