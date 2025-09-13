import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>403 - Acceso Denegado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/">Ir al Inicio</Link> | <Link to="/login">Iniciar Sesión</Link>
    </div>
  );
};

export default UnauthorizedPage;