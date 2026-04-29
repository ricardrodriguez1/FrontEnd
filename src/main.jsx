// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Checkout from './pages/Checkout.jsx';
import Cart from './pages/Cart.jsx';
import Success from './pages/checkout/Success.jsx';
import Cancel from './pages/checkout/Cancel.jsx';
import Catalogo from './pages/Catalogo.jsx';
import ProducteDetall from './pages/ProducteDetall.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/success" element={<Success />} />
              <Route path="checkout/cancel" element={<Cancel />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="catalogo/:categoria" element={<Catalogo />} />
              <Route path="producte/:id" element={<ProducteDetall />} />
              
              {/* Rutas Protegidas */}
              <Route 
                path="dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['cliente', 'administrador']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="admin" 
                element={
                  <ProtectedRoute allowedRoles={['administrador']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
