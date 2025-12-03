// src/App.jsx
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <>
      {/* Navbar fijo en la parte superior */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Logo / Título */}
          <Link to="/" className="navbar-brand fw-bold">
            BossFightStore
          </Link>

          {/* Botones de Login y Register a la derecha */}
          <div className="d-flex gap-2">
            <Link to="/login" className="btn btn-outline-light btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-success btn-sm">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Aquí se renderiza Home, Login o Register */}
      <Outlet />

      {/* Bootstrap JS (opcional, para dropdowns, modales, etc.) */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        defer
      ></script>
    </>
  );
}