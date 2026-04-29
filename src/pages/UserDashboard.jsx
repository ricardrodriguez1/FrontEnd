import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api';

const UserDashboard = () => {
    const { user } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await api.get('/pedidos/mis-pedidos');
                setPedidos(response);
            } catch (error) {
                console.error("Error al carregar els pedidos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    const handleVerDetalle = (pedido) => {
        setSelectedPedido(pedido);
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4">Mi Dashboard</h1>
            
            <div className="row">
                {/* Perfil d'usuari */}
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm border-0 bg-light">
                        <div className="card-header bg-primary text-white border-0">
                            <h5 className="mb-0">Mi Perfil</h5>
                        </div>
                        <div className="card-body">
                            <p className="mb-1 text-muted small">Nombre completo</p>
                            <p className="fw-bold">{user.nombre} {user.apellidos}</p>
                            
                            <p className="mb-1 text-muted small">Email</p>
                            <p className="fw-bold">{user.email}</p>
                            
                            <p className="mb-1 text-muted small">Teléfono</p>
                            <p className="fw-bold">{user.teléfono || 'No informado'}</p>
                            
                            <p className="mb-1 text-muted small">Dirección</p>
                            <p className="fw-bold">{user.dirección || 'No informada'}</p>
                            
                            <button className="btn btn-primary w-100 mt-3">Editar Datos</button>
                        </div>
                    </div>
                </div>

                {/* Historial de compres */}
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-dark text-white border-0">
                            <h5 className="mb-0">Mis Compras</h5>
                        </div>
                        <div className="card-body p-0">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                    <p className="mt-2">Cargando tus pedidos...</p>
                                </div>
                            ) : pedidos.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0 align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">Pedido</th>
                                                <th>Fecha</th>
                                                <th>Total</th>
                                                <th>Estado</th>
                                                <th className="text-end pe-4">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pedidos.map(p => (
                                                <tr key={p._id}>
                                                    <td className="ps-4">
                                                        <span className="fw-bold text-primary">#{p._id.substring(p._id.length - 6).toUpperCase()}</span>
                                                    </td>
                                                    <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                                                    <td className="fw-bold">{p.total.toFixed(2)}€</td>
                                                    <td>
                                                        <span className={`badge rounded-pill bg-${p.estado === 'entregado' ? 'success' : 'warning'} text-white`}>
                                                            {p.estado}
                                                        </span>
                                                    </td>
                                                    <td className="text-end pe-4">
                                                        <button 
                                                            onClick={() => handleVerDetalle(p)}
                                                            className="btn btn-outline-info btn-sm rounded-pill px-3"
                                                        >
                                                            Ver Detalle
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <h3 className="text-muted">Empty!</h3>
                                    <p className="text-muted">Aún no has realizado ninguna compra.</p>
                                    <a href="/catalogo" className="btn btn-success rounded-pill px-4">Ir a la tienda</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* "Modal" de Detalle de Pedido */}
            {selectedPedido && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content border-0 shadow-lg">
                            <div className="modal-header bg-info text-white border-0">
                                <h5 className="modal-title">Detalle del Pedido #{selectedPedido._id.substring(selectedPedido._id.length - 6).toUpperCase()}</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedPedido(null)}></button>
                            </div>
                            <div className="modal-body p-4">
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <h6>Información de Envío</h6>
                                        <p className="small mb-1"><strong>Dirección:</strong> {selectedPedido.direccion}</p>
                                        <p className="small mb-1"><strong>Ciudad:</strong> {selectedPedido.ciudad}</p>
                                        <p className="small mb-1"><strong>CP:</strong> {selectedPedido.codigo_postal}</p>
                                        <p className="small mb-1"><strong>Teléfono:</strong> {selectedPedido.telefono}</p>
                                    </div>
                                    <div className="col-md-6 text-md-end">
                                        <h6>Resumen de Pago</h6>
                                        <p className="small mb-1"><strong>Método:</strong> {selectedPedido.metodo_pago}</p>
                                        <p className="small mb-1"><strong>Estado:</strong> <span className="badge bg-secondary">{selectedPedido.estado}</span></p>
                                    </div>
                                </div>
                                
                                <h6>Productos</h6>
                                <div className="table-responsive">
                                    <table className="table table-sm table-bordered">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Producto</th>
                                                <th className="text-center">Cant.</th>
                                                <th className="text-end">Precio</th>
                                                <th className="text-end">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedPedido.productos.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td>{item.nombre_producto}</td>
                                                    <td className="text-center">{item.cantidad}</td>
                                                    <td className="text-end">{item.precio_unitario.toFixed(2)}€</td>
                                                    <td className="text-end">{(item.cantidad * item.precio_unitario).toFixed(2)}€</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="3" className="text-end">Total</th>
                                                <th className="text-end text-primary h5">{selectedPedido.total.toFixed(2)}€</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                {selectedPedido.notas && (
                                    <div className="mt-3">
                                        <h6>Notas:</h6>
                                        <p className="small text-muted">{selectedPedido.notas}</p>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer border-0">
                                <button type="button" className="btn btn-secondary rounded-pill" onClick={() => setSelectedPedido(null)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
