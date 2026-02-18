// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { useNavigate, Link } from 'react-router-dom';

// Imatges per defecte (una per categoria)
import image1 from './ps5.jpg';
import image2 from './zelda.jpg';
import image3 from './goku.jpg';
import image4 from './nvidia 4080.jpg';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [cistella, setCistella] = useState(false);
  const [productesAfegits, setProductesAfegits] = useState([]);
  const [productes, setProductes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Productes de reserva (fallback) amb enllaços al catàleg
  const productesFallback = [
    { _id: 'f1', nombre: 'Videoconsolas', precio: 499.99, descripcion: 'PS5, Xbox Series X|S, Nintendo Switch y más consolas de última generación.', imagen_url: image1, catalogo_url: '/catalogo/videoconsolas' },
    { _id: 'f2', nombre: 'Videojuegos', precio: 69.99, descripcion: 'Juegos nuevos, clásicos y ediciones especiales para todas las plataformas.', imagen_url: image2, catalogo_url: '/catalogo/videojuegos' },
    { _id: 'f3', nombre: 'Figuras Coleccionables', precio: 89.99, descripcion: 'Figuras de anime, videojuegos, Marvel, Star Wars y más.', imagen_url: image3, catalogo_url: '/catalogo/figuras' },
    { _id: 'f4', nombre: 'Componentes PC', precio: 599.99, descripcion: 'Tarjetas gráficas, teclados mecánicos, monitores gaming y accesorios.', imagen_url: image4, catalogo_url: '/catalogo/componentes' },
  ];

  // Carregar productes (usem fallback per assegurar les imatges locals)
  useEffect(() => {
    // Utilitzem directament els productes de fallback per mostrar les imatges correctes
    setProductes(productesFallback);
    setLoading(false);
  }, []);

  // Afegir producte a la cistella
  const afegirACistella = (producte) => {
    const existeix = productesAfegits.find(p => p._id === producte._id);
    if (existeix) {
      setProductesAfegits(productesAfegits.map(p =>
        p._id === producte._id ? { ...p, quantitat: p.quantitat + 1 } : p
      ));
    } else {
      setProductesAfegits([...productesAfegits, { ...producte, quantitat: 1 }]);
    }
  };

  // Eliminar producte de la cistella
  const eliminarDeCistella = (id) => {
    setProductesAfegits(productesAfegits.filter(p => p._id !== id));
  };

  // Finalitzar compra - Navegar a la pàgina de Checkout
  const finalitzarCompra = () => {
    if (productesAfegits.length === 0) {
      alert("La cistella està buida");
      return;
    }
    // Tanquem la cistella i naveguem a checkout passant els productes
    setCistella(false);
    navigate('/checkout', { state: { cartItems: productesAfegits } });
  };

  // Calcular total
  const calcularTotal = () => {
    return productesAfegits.reduce((total, p) => total + (p.precio * p.quantitat), 0).toFixed(2);
  };

  // Total articles
  const totalArticles = () => {
    return productesAfegits.reduce((total, p) => total + p.quantitat, 0);
  };

  return (
    <>
      {/* Botó flotant cistella */}
      <div className="cistella-flotant" onClick={() => setCistella(!cistella)}>
        <span className="cistella-icona">🛒</span>
        {totalArticles() > 0 && (
          <span className="cistella-badge">{totalArticles()}</span>
        )}
      </div>

      {/* Panell cistella */}
      <div className={`cistella-panell ${cistella ? 'oberta' : ''}`}>
        <div className="cistella-header">
          <h4>🛒 Cistella de Compra</h4>
          <button className="cistella-tancar" onClick={() => setCistella(false)}>✕</button>
        </div>

        <div className="cistella-contingut">
          {productesAfegits.length === 0 ? (
            <p className="cistella-buida">La cistella està buida</p>
          ) : (
            <>
              {productesAfegits.map((producte) => (
                <div key={producte._id} className="cistella-item">
                  <img src={producte.imagen_url || image1} alt={producte.nombre} className="cistella-item-img" />
                  <div className="cistella-item-info">
                    <h6>{producte.nombre}</h6>
                    <p>{(producte.precio || 0).toFixed(2)}€ x {producte.quantitat}</p>
                  </div>
                  <button className="cistella-item-eliminar" onClick={() => eliminarDeCistella(producte._id)}>
                    🗑️
                  </button>
                </div>
              ))}
              <div className="cistella-total">
                <strong>Total: {calcularTotal()}€</strong>
              </div>
              <button className="btn btn-success w-100 mt-2" onClick={finalitzarCompra}>
                Finalitzar Compra
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {cistella && <div className="cistella-overlay" onClick={() => setCistella(false)}></div>}

      {/* Hero Section */}
      <section className="hero-section py-5 text-center">
        <div className="container">
          <h1 className="display-5 fw-bold">BossFightStore</h1>
          <p className="lead mb-4">
            Tu tienda especializada en videoconsolas, videojuegos, figuras coleccionables y componentes para PC.
          </p>
          <a href="#categorias" className="btn btn-success btn-lg">
            Explorar Productos
          </a>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-5" id="categorias">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Nuestras Categorías</h2>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {productes.map((producte) => (
                <div className="col" key={producte._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={producte.imagen_url || image1}
                      className="card-img-top"
                      alt={producte.nombre}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{producte.nombre}</h5>
                      <p className="card-text flex-grow-1">{producte.descripcion}</p>
                      <p className="fw-bold text-success mb-2">{(producte.precio || 0).toFixed(2)}€</p>
                      <div className="d-flex gap-2">
                        <Link to={producte.catalogo_url || '#'} className="btn btn-outline-dark flex-grow-1">Ver Catálogo</Link>
                        <button
                          className="btn btn-success"
                          onClick={() => afegirACistella(producte)}
                          title="Afegir a la cistella"
                        >
                          🛒+
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4" style={{ backgroundColor: '#111', color: '#aaa' }}>
        <div className="container text-center">
          <p className="mb-1">&copy; 2025 BossFightStore. Todos los derechos reservados.</p>
          <p className="mb-0">Frontend by Ricard Rodríguez</p>
        </div>
      </footer>

      {/* Estilos personalizados */}
      <style>
        {`
          .hero-section {
            background: linear-gradient(120deg, #0f0f0f, #222);
            color: white;
          }
          .card-img-top {
            height: 180px;
            object-fit: cover;
          }
          
          .cistella-flotant {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #28a745, #20c997);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .cistella-flotant:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6);
          }
          
          .cistella-icona {
            font-size: 28px;
          }
          
          .cistella-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #dc3545;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
          }
          
          .cistella-panell {
            position: fixed;
            top: 0;
            right: -400px;
            width: 380px;
            height: 100vh;
            background: linear-gradient(180deg, #1a1a2e, #16213e);
            z-index: 1001;
            transition: right 0.4s ease;
            display: flex;
            flex-direction: column;
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
          }
          
          .cistella-panell.oberta {
            right: 0;
          }
          
          .cistella-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: linear-gradient(135deg, #28a745, #20c997);
            color: white;
          }
          
          .cistella-header h4 {
            margin: 0;
            font-weight: bold;
          }
          
          .cistella-tancar {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            font-size: 18px;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s ease;
          }
          
          .cistella-tancar:hover {
            background: rgba(255,255,255,0.4);
          }
          
          .cistella-contingut {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            color: white;
          }
          
          .cistella-buida {
            text-align: center;
            color: #aaa;
            font-style: italic;
            margin-top: 50px;
          }
          
          .cistella-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            margin-bottom: 10px;
            transition: background 0.3s ease;
          }
          
          .cistella-item:hover {
            background: rgba(255,255,255,0.1);
          }
          
          .cistella-item-img {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
          }
          
          .cistella-item-info {
            flex: 1;
          }
          
          .cistella-item-info h6 {
            margin: 0 0 5px 0;
            font-weight: bold;
          }
          
          .cistella-item-info p {
            margin: 0;
            color: #20c997;
            font-size: 14px;
          }
          
          .cistella-item-eliminar {
            background: rgba(220, 53, 69, 0.2);
            border: none;
            font-size: 18px;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s ease;
          }
          
          .cistella-item-eliminar:hover {
            background: rgba(220, 53, 69, 0.5);
          }
          
          .cistella-total {
            text-align: right;
            padding: 15px 0;
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: 15px;
            font-size: 18px;
            color: #20c997;
          }
          
          .cistella-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
          }
        `}
      </style>
    </>
  );
}