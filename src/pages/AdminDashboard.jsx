import React, { useEffect, useState } from 'react';
import { api } from '../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // El backend retorna { status: 'success', data: [...] } per a users i products
                // Però per a pedidos (creat per mi) retorna directament l'array [...]
                const usersResponse = await api.get('/users');
                const productsResponse = await api.get('/products');
                const ordersResponse = await api.get('/pedidos');
                
                const usersList = usersResponse.data || [];
                const productsList = productsResponse.data || [];
                const ordersList = Array.isArray(ordersResponse) ? ordersResponse : (ordersResponse.data || []);
                
                const totalRevenue = ordersList.reduce((acc, curr) => acc + (curr.total || 0), 0);
                
                setStats({
                    users: usersList.length,
                    products: productsList.length,
                    orders: ordersList.length,
                    revenue: totalRevenue
                });
                setUsuarios(usersList);
            } catch (error) {
                console.error("Error al carregar dades:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    return (
        <div className="container py-5">
            <h1 className="mb-4">Panel de Administración</h1>
            
            {/* Targetes de resum */}
            <div className="row mb-5">
                <div className="col-md-3">
                    <div className="card bg-primary text-white shadow-sm mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Usuarios</h5>
                            <h2 className="mb-0">{stats.users}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-success text-white shadow-sm mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Productos</h5>
                            <h2 className="mb-0">{stats.products}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-warning text-dark shadow-sm mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Pedidos</h5>
                            <h2 className="mb-0">{stats.orders}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-info text-white shadow-sm mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Ingresos Totales</h5>
                            <h2 className="mb-0">{stats.revenue.toFixed(2)}€</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Gestión de Usuarios */}
                <div className="col-md-12 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Gestión de Usuarios</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Rol</th>
                                            <th>Fecha Registro</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map(u => (
                                            <tr key={u._id}>
                                                <td>{u.nombre} {u.apellidos}</td>
                                                <td>{u.email}</td>
                                                <td>
                                                    <span className={`badge bg-${u.rol === 'administrador' ? 'danger' : 'secondary'}`}>
                                                        {u.rol}
                                                    </span>
                                                </td>
                                                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary me-1">Editar</button>
                                                    <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
