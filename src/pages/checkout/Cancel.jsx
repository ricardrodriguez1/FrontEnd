// src/pages/checkout/Cancel.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
    return (
        <div className="container py-5 text-center">
            <div className="card shadow-lg border-0 rounded-4 p-5 mx-auto" style={{ maxWidth: '600px' }}>
                <div className="mb-4">
                    <span className="display-1 text-danger">❌</span>
                </div>
                <h1 className="fw-bold mb-3">Pagament Cancel·lat</h1>
                <p className="lead text-muted mb-4 text-center">
                    Sembla que el procés de pagament s'ha cancel·lat. No s'ha realitzat cap càrrec a la teva targeta.
                </p>
                <div className="alert alert-warning border text-start">
                    <h6 className="fw-bold">Tens algun problema?</h6>
                    <p className="small mb-0 text-muted">
                        Si has tingut algun error amb la teva targeta, pots reintentar el pagament o provar amb un altre mètode.
                    </p>
                </div>
                <div className="d-grid gap-3">
                    <Link to="/cart" className="btn btn-warning btn-lg rounded-pill py-3">
                        Tornar al Carret
                    </Link>
                    <Link to="/catalogo" className="btn btn-outline-secondary border-0">
                        Veure altres productes
                    </Link>
                </div>
            </div>
        </div>
    );
}
