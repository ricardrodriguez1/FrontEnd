// src/pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm p-5">
                    <h1 className="display-1 mb-4">🛒</h1>
                    <h2 className="mb-4">El teu carret està buit</h2>
                    <p className="text-muted mb-4">Sembla que encara no has afegit cap producte al teu carret.</p>
                    <Link to="/catalogo" className="btn btn-success btn-lg px-5 rounded-pill">
                        Anar al Catàleg
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-5 fw-bold border-bottom pb-3">El Teu Carret ({totalItems})</h2>

            <div className="row g-4">
                {/* Llista de productes */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="list-group list-group-flush">
                            {cart.map((item) => (
                                <div key={item._id} className="list-group-item p-4 border-bottom">
                                    <div className="row align-items-center">
                                        {/* Imatge */}
                                        <div className="col-md-2 mb-3 mb-md-0 text-center">
                                            <img
                                                src={item.imagen_url || 'https://via.placeholder.com/150'}
                                                alt={item.nombre}
                                                className="img-fluid rounded-3"
                                                style={{ maxHeight: '100px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        
                                        {/* Info */}
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <h5 className="mb-1 fw-bold">{item.nombre}</h5>
                                            <p className="text-muted small mb-0">{item.categoria}</p>
                                            <p className="text-success fw-bold mb-0">{item.precio.toFixed(2)}€</p>
                                        </div>

                                        {/* Quantitat */}
                                        <div className="col-md-3 mb-3 mb-md-0">
                                            <div className="input-group input-group-sm quantity-control" style={{ maxWidth: '120px' }}>
                                                <button 
                                                    className="btn btn-outline-secondary" 
                                                    onClick={() => updateQuantity(item._id, item.quantitat - 1)}
                                                >−</button>
                                                <span className="input-group-text bg-white px-3 fw-bold">{item.quantitat}</span>
                                                <button 
                                                    className="btn btn-outline-secondary" 
                                                    onClick={() => updateQuantity(item._id, item.quantitat + 1)}
                                                >+</button>
                                            </div>
                                        </div>

                                        {/* Subtotal i borrar */}
                                        <div className="col-md-3 text-md-end">
                                            <p className="h5 mb-2 fw-bold">{(item.precio * item.quantitat).toFixed(2)}€</p>
                                            <button 
                                                className="btn btn-sm btn-outline-danger border-0"
                                                onClick={() => removeFromCart(item._id)}
                                            >
                                                🗑 Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Resum i Checkout */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                        <h4 className="fw-bold mb-4">Resum de la Compra</h4>
                        
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Subtotal ({totalItems} articles)</span>
                            <span>{totalPrice.toFixed(2)}€</span>
                        </div>
                        <div className="d-flex justify-content-between mb-4 pb-4 border-bottom">
                            <span className="text-muted">Enviament</span>
                            <span className="text-success fw-bold">Gratuït</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <h4 className="fw-bold mb-0">Total</h4>
                            <h3 className="fw-bold text-success mb-0">{totalPrice.toFixed(2)}€</h3>
                        </div>

                        <div className="d-grid gap-3">
                            <button 
                                className="btn btn-success btn-lg fw-bold rounded-3 py-3"
                                onClick={() => navigate('/checkout')}
                            >
                                Procedir al Pagament 💳
                            </button>
                            <Link to="/catalogo" className="btn btn-outline-secondary border-0 text-center">
                                ← Continuar comprant
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .quantity-control {
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .quantity-control .btn {
                    border: none;
                    background: #f8f9fa;
                }
                .quantity-control .btn:hover {
                    background: #e9ecef;
                }
            `}</style>
        </div>
    );
}
