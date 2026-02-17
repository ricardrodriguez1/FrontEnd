// src/App.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">BossFightStore</Link>
          <div className="d-flex gap-2 align-items-center">
            <Link to="/catalogo" className="btn btn-outline-success btn-sm">📦 Catàleg</Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
                <Link to="/register" className="btn btn-success btn-sm">Register</Link>
              </>
            ) : (
              <>
                <span className="text-white small me-2">Hola, {user?.nombre || user?.email}</span>
                <button onClick={logout} className="btn btn-outline-danger btn-sm">Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}