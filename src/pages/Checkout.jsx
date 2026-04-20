// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../api.js';

// Inicialitzem Stripe amb la clau pública (4.4)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_vostra_clau_publica_aqui');

export default function Checkout() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const { cart, totalPrice, totalItems } = useCart();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        telefono: '',
        metodoPago: 'tarjeta'
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert("Has d'iniciar sessió per completar la compra");
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            alert("El carret està buit");
            navigate('/catalogo');
            return;
        }

        setLoading(true);

        try {
            // 1. Crear la comanda al backend (4.2)
            const orderData = {
                usuario: user._id || user.id,
                direccion: formData.direccion,
                ciudad: formData.ciudad,
                codigo_postal: formData.codigoPostal,
                telefono: formData.telefono,
                metodo_pago: formData.metodoPago,
                total: totalPrice,
                productos: cart.map(item => ({
                    producto: item._id,
                    nombre_producto: item.nombre,
                    cantidad: item.quantitat,
                    precio_unitario: item.precio,
                    subtotal: item.precio * item.quantitat
                }))
            };

            const orderResponse = await api.post('/orders', orderData);
            const orderId = orderResponse.data._id;

            // 2. Si el mètode de pagament és tarjeta, procedir amb Stripe (4.3 i 4.4)
            if (formData.metodoPago === 'tarjeta') {
                const stripeResponse = await api.post('/checkout/create-session', {
                    orderId: orderId, // Enviem l'ID per al Webhook
                    products: cart.map(item => ({
                        id: item._id,
                        nombre: item.nombre,
                        quantitat: item.quantitat
                    }))
                });

                if (stripeResponse.id) {
                    const stripe = await stripePromise;
                    
                    // Redirigir oficial de Stripe (4.4)
                    const { error } = await stripe.redirectToCheckout({
                        sessionId: stripeResponse.id
                    });

                    if (error) {
                        throw new Error(error.message);
                    }
                } else {
                    throw new Error("No s'ha pogut obtenir la sessió de pagament");
                }
            } else {
                // Per altres mètodes (contrareemborsament), anar directament a success
                navigate('/checkout/success');
            }

        } catch (error) {
            console.error("Error en el procés de compra:", error);
            alert(`Error: ${error.message || 'S\'ha produït un error inesperat'}`);
        } finally {
            setLoading(false);
        }
    };

    // ... (la resta del render es manté igual que en la versió anterior)

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
                <div className="card shadow-sm p-5 border-0 rounded-4">
                    <h2>El carret està buit</h2>
                    <p className="text-muted">Afegeix productes abans de fer la compra.</p>
                    <button className="btn btn-success rounded-pill px-4" onClick={() => navigate('/catalogo')}>
                        Anar a la botiga
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); navigate('/cart'); }}>Carret</a></li>
                    <li className="breadcrumb-item active">Checkout</li>
                </ol>
            </nav>

            <h2 className="mb-4 fw-bold">🛒 Finalitzar Compra</h2>

            <div className="row g-4">
                <div className="col-lg-5 order-lg-2">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-dark text-white p-3">
                            <h5 className="mb-0 fw-bold">Resum de la Comanda</h5>
                        </div>
                        <div className="card-body p-4">
                            {cart.map((item, index) => (
                                <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <div className="position-relative me-3">
                                            <img
                                                src={item.imagen_url}
                                                alt={item.nombre}
                                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '12px' }}
                                            />
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary shadow-sm">
                                                {item.quantitat}
                                            </span>
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">{item.nombre}</h6>
                                            <small className="text-muted">{item.precio.toFixed(2)}€ / unitat</small>
                                        </div>
                                    </div>
                                    <span className="fw-bold text-dark">{(item.precio * item.quantitat).toFixed(2)}€</span>
                                </div>
                            ))}
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal</span>
                                <span className="fw-bold">{totalPrice.toFixed(2)}€</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Enviament</span>
                                <span className="text-success fw-bold">Gratuït</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mt-4">
                                <h5 className="mb-0 fw-bold">Total</h5>
                                <h4 className="mb-0 fw-bold text-success">{totalPrice.toFixed(2)}€</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-7 order-lg-1">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-success text-white p-3">
                            <h5 className="mb-0 fw-bold text-center">Dades d'Enviament</h5>
                        </div>
                        <div className="card-body p-4">
                            {!isAuthenticated ? (
                                <div className="text-center py-4">
                                    <p className="lead mb-4">Has d'iniciar sessió per completar la compra</p>
                                    <button className="btn btn-primary me-2 px-4 rounded-pill" onClick={() => navigate('/login')}>
                                        Iniciar Sessió
                                    </button>
                                    <button className="btn btn-outline-success px-4 rounded-pill" onClick={() => navigate('/register')}>
                                        Registrar-se
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Direcció d'entrega</label>
                                            <input
                                                type="text"
                                                name="direccion"
                                                className="form-control form-control-lg rounded-3 bg-light border-0"
                                                placeholder="Carrer, número, pis..."
                                                value={formData.direccion}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Ciutat</label>
                                            <input
                                                type="text"
                                                name="ciudad"
                                                className="form-control form-control-lg rounded-3 bg-light border-0"
                                                placeholder="Barcelona"
                                                value={formData.ciudad}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Codi Postal</label>
                                            <input
                                                type="text"
                                                name="codigoPostal"
                                                className="form-control form-control-lg rounded-3 bg-light border-0"
                                                placeholder="08001"
                                                value={formData.codigoPostal}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Telèfon de contacte</label>
                                            <input
                                                type="tel"
                                                name="telefono"
                                                className="form-control form-control-lg rounded-3 bg-light border-0"
                                                placeholder="612 345 678"
                                                value={formData.telefono}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12 mt-4">
                                            <label className="form-label fw-bold small text-muted text-uppercase">Mètode de Pagament</label>
                                            <div className="d-grid gap-2">
                                                <div className={`p-3 border rounded-3 d-flex align-items-center mb-2 ${formData.metodoPago === 'tarjeta' ? 'border-success bg-light' : ''}`} 
                                                     onClick={() => setFormData({...formData, metodoPago: 'tarjeta'})}
                                                     style={{ cursor: 'pointer' }}>
                                                    <input type="radio" value="tarjeta" name="metodoPago" checked={formData.metodoPago === 'tarjeta'} onChange={handleInputChange} className="me-3" />
                                                    <div>
                                                        <div className="fw-bold">💳 Targeta de Crèdit/Dèbit</div>
                                                        <small className="text-muted">Pagament segur via Stripe</small>
                                                    </div>
                                                </div>
                                                <div className={`p-3 border rounded-3 d-flex align-items-center ${formData.metodoPago === 'contrareembolso' ? 'border-success bg-light' : ''}`}
                                                     onClick={() => setFormData({...formData, metodoPago: 'contrareembolso'})}
                                                     style={{ cursor: 'pointer' }}>
                                                    <input type="radio" value="contrareembolso" name="metodoPago" checked={formData.metodoPago === 'contrareembolso'} onChange={handleInputChange} className="me-3" />
                                                    <div>
                                                        <div className="fw-bold">📦 Contrareemborsament</div>
                                                        <small className="text-muted">Paga en rebre la comanda</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-grid gap-3 mt-5">
                                        <button type="submit" className="btn btn-success btn-lg py-3 fw-bold rounded-3 shadow-sm" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Processant...
                                                </>
                                            ) : (
                                                <>Confirmar i Pagar {totalPrice.toFixed(2)}€</>
                                            )}
                                        </button>
                                        <button type="button" className="btn btn-link text-muted text-decoration-none" onClick={() => navigate('/cart')}>
                                            ← Tornar al carret
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
