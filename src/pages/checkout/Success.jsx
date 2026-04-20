// src/pages/checkout/Success.jsx
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

export default function Success() {
    const { clearCart } = useCart();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        // En cas d'èxit real, buidem el carret
        clearCart();
    }, []);

    return (
        <div className="container py-5 text-center">
            <div className="card shadow-lg border-0 rounded-4 p-5 mx-auto" style={{ maxWidth: '600px' }}>
                <div className="mb-4">
                    <span className="display-1 text-success">✅</span>
                </div>
                <h1 className="fw-bold mb-3">Pagament Realitzat amb Èxit!</h1>
                <p className="lead text-muted mb-4 text-center">
                    Gràcies per la teva compra. Hem rebut correctament el teu pagament i estem processant la teva comanda.
                </p>
                {sessionId && (
                    <div className="alert alert-light border mb-4">
                        <small className="text-muted">Referència de pagament: <code className="text-dark">{sessionId}</code></small>
                    </div>
                )}
                <div className="d-grid gap-3">
                    <Link to="/catalogo" className="btn btn-success btn-lg rounded-pill py-3">
                        Continuar Comprant
                    </Link>
                    <Link to="/" className="btn btn-outline-secondary border-0">
                        Tornar a l'Inici
                    </Link>
                </div>
            </div>
        </div>
    );
}
