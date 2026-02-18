// src/pages/Catalogo.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';

// Importem totes les imatges locals
import ps2Img from './ps2.jpg';
import ps5Img from './ps5.jpg';
import ps5DigitalImg from './ps5 digital.jpg';
import seriesXImg from './series x.jpg';
import seriesSImg from './series s.jpg';
import nintendoLiteImg from './nintendolite.jpg';
import nintendoOledImg from './nintendooled.jpg';
import steamdeckImg from './steamdeck.jpg';

import re4Img from './re4.jpg';
import baldursImg from './baldurs.jpg';
import eldenImg from './elden.jpg';
import finalfantasyImg from './finalfantasy.jpg';
import godofwarImg from './godofwar.jpg';
import hogwartsImg from './hogwarts.jpg';
import spidermanImg from './spiderman.jpg';
import zeldaImg from './zelda.jpg';

import gogetaImg from './gogeta.jpg';
import gokuImg from './goku.jpg';
import vegetaImg from './vegeta.jpg';
import luffyImg from './luffy.jpg';
import narutoImg from './naruto.jpg';
import erenImg from './eren.jpg';
import saitamaImg from './saitama.jpg';
import tanjiroImg from './tanjiro.jpg';

import rtx4070Img from './4070.jpg';
import rtx4080Img from './nvidia 4080.jpg';
import amdRxImg from './amd rx.jpg';
import corsairImg from './corsair.jpg';
import intelImg from './intel.jpg';
import logitechImg from './logitech.jpg';
import ryzenImg from './ryzen.jpg';
import samsungImg from './samsung.jpg';

// Mapa d'imatges per nom de producte (cerca parcial, case-insensitive)
const productImageMap = {
  'ps2': ps2Img,
  'ps5 digital': ps5DigitalImg,
  'ps5': ps5Img,
  'playstation 5 digital': ps5DigitalImg,
  'playstation 5': ps5Img,
  'playstation 2': ps2Img,
  'series x': seriesXImg,
  'xbox series x': seriesXImg,
  'series s': seriesSImg,
  'xbox series s': seriesSImg,
  'nintendo switch lite': nintendoLiteImg,
  'switch lite': nintendoLiteImg,
  'nintendo switch oled': nintendoOledImg,
  'switch oled': nintendoOledImg,
  'steam deck': steamdeckImg,
  'steamdeck': steamdeckImg,
  'resident evil': re4Img,
  're4': re4Img,
  'baldur': baldursImg,
  'elden ring': eldenImg,
  'final fantasy': finalfantasyImg,
  'god of war': godofwarImg,
  'hogwarts': hogwartsImg,
  'spider': spidermanImg,
  'spiderman': spidermanImg,
  'zelda': zeldaImg,
  'gogeta': gogetaImg,
  'goku': gokuImg,
  'vegeta': vegetaImg,
  'luffy': luffyImg,
  'naruto': narutoImg,
  'eren': erenImg,
  'saitama': saitamaImg,
  'tanjiro': tanjiroImg,
  '4070': rtx4070Img,
  'rtx 4070': rtx4070Img,
  '4080': rtx4080Img,
  'rtx 4080': rtx4080Img,
  'nvidia 4080': rtx4080Img,
  'nvidia': rtx4080Img,
  'corsair': corsairImg,
  'intel': intelImg,
  'logitech': logitechImg,
  'ryzen': ryzenImg,
  'samsung': samsungImg,
  'rx 7800': amdRxImg,
  'radeon': amdRxImg,
  'amd rx': amdRxImg,
};

// Imatge fallback per categoria
const fallbackImages = {
  videoconsolas: ps5Img,
  videojuegos: zeldaImg,
  figuras: gokuImg,
  componentes: rtx4080Img,
};

// Configuració de categories
const categoriaConfig = {
  videoconsolas: { titulo: 'Videoconsoles', descripcion: 'Les millors consoles de videojocs del mercat', color: '#2196F3' },
  videojuegos: { titulo: 'Videojocs', descripcion: 'Els millors jocs per a totes les plataformes', color: '#4CAF50' },
  figuras: { titulo: 'Figures Col·leccionables', descripcion: "Figures d'alta qualitat per a col·leccionistes", color: '#FF9800' },
  componentes: { titulo: 'Components PC', descripcion: "Hardware gaming d'alt rendiment", color: '#9C27B0' },
};

export default function Catalogo() {
  const { categoria } = useParams();
  const navigate = useNavigate();

  // Estat de productes i filtres
  const [productes, setProductes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carret, setCarret] = useState([]);

  // Filtres
  const [search, setSearch] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [sort, setSort] = useState('');

  // Obtenir config de la categoria actual
  const config = categoria ? categoriaConfig[categoria] : { titulo: 'Tots els Productes', descripcion: 'Explora tot el nostre catàleg', color: '#1a1a2e' };

  // Carregar productes del backend
  useEffect(() => {
    const fetchProductes = async () => {
      setLoading(true);
      setError(null);
      try {
        let queryParams = '?limit=50';
        if (categoria) queryParams += `&categoria=${categoria}`;
        if (search) queryParams += `&search=${encodeURIComponent(search)}`;
        if (precioMin) queryParams += `&precioMin=${precioMin}`;
        if (precioMax) queryParams += `&precioMax=${precioMax}`;
        if (sort) queryParams += `&sort=${sort}`;

        const response = await api.get(`/products${queryParams}`);
        setProductes(response.data || []);
      } catch (err) {
        console.error('Error carregant productes:', err);
        setError('No s\'han pogut carregar els productes. Assegura\'t que el backend està en marxa.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductes();
  }, [categoria, sort]); // Recargar al cambiar categoría u ordenación

  // Buscar amb debounce manual
  const handleSearch = () => {
    const fetchFiltered = async () => {
      setLoading(true);
      try {
        let queryParams = '?limit=50';
        if (categoria) queryParams += `&categoria=${categoria}`;
        if (search) queryParams += `&search=${encodeURIComponent(search)}`;
        if (precioMin) queryParams += `&precioMin=${precioMin}`;
        if (precioMax) queryParams += `&precioMax=${precioMax}`;
        if (sort) queryParams += `&sort=${sort}`;

        const response = await api.get(`/products${queryParams}`);
        setProductes(response.data || []);
      } catch (err) {
        console.error('Error filtrant productes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiltered();
  };

  // Netejar filtres
  const clearFilters = () => {
    setSearch('');
    setPrecioMin('');
    setPrecioMax('');
    setSort('');
  };

  // Carret functions
  const afegirAlCarret = (producte) => {
    const existent = carret.find(p => p._id === producte._id);
    if (existent) {
      setCarret(carret.map(p =>
        p._id === producte._id ? { ...p, quantitat: p.quantitat + 1 } : p
      ));
    } else {
      setCarret([...carret, { ...producte, quantitat: 1 }]);
    }
    // Mini feedback visual
    const btn = document.getElementById(`btn-${producte._id}`);
    if (btn) {
      btn.textContent = '✓ Afegit!';
      btn.style.backgroundColor = '#28a745';
      setTimeout(() => {
        btn.textContent = '🛒 Afegir al carret';
        btn.style.backgroundColor = config.color || '#1a1a2e';
      }, 1000);
    }
  };

  const anarACheckout = () => {
    if (carret.length === 0) {
      alert("El carret està buit");
      return;
    }
    navigate('/checkout', { state: { cartItems: carret } });
  };

  const totalCarret = carret.reduce((sum, p) => sum + (p.precio * p.quantitat), 0);
  const totalItems = carret.reduce((sum, p) => sum + p.quantitat, 0);

  // Imatge local per nom del producte (prioritat sobre URLs HTTP)
  const getImgSrc = (producte) => {
    // Primer: cercar imatge local pel nom del producte
    const nom = (producte.nombre || '').toLowerCase();
    for (const [key, img] of Object.entries(productImageMap)) {
      if (nom.includes(key)) {
        return img;
      }
    }
    // Segon: si no hi ha match local, intentar URL HTTP
    if (producte.imagen_url && producte.imagen_url.startsWith('http')) {
      return producte.imagen_url;
    }
    // Tercer: fallback per categoria
    return fallbackImages[producte.categoria] || re4Img;
  };

  if (!config) {
    return (
      <div className="container py-5 text-center">
        <h2>Categoria no trobada</h2>
        <p className="text-muted">La categoria "{categoria}" no existeix.</p>
        <Link to="/" className="btn btn-success">Tornar a la botiga</Link>
      </div>
    );
  }

  return (
    <>
      {/* Header de la categoria */}
      <section className="catalogo-header" style={{ background: `linear-gradient(135deg, ${config.color}, #1a1a2e)` }}>
        <div className="container">
          <nav aria-label="breadcrumb" className="mb-2">
            <ol className="breadcrumb" style={{ background: 'transparent', marginBottom: 0 }}>
              <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Inici</Link></li>
              {categoria ? (
                <li className="breadcrumb-item active text-white">{config.titulo}</li>
              ) : (
                <li className="breadcrumb-item active text-white">Catàleg</li>
              )}
            </ol>
          </nav>
          <h1 className="display-5 fw-bold text-white mb-1">{config.titulo}</h1>
          <p className="lead text-white mb-2" style={{ opacity: 0.85 }}>{config.descripcion}</p>
          {!loading && <span className="badge bg-light text-dark">{productes.length} productes</span>}
        </div>
      </section>

      {/* Barra de filtres */}
      <section className="filtres-section">
        <div className="container">
          <div className="filtres-bar">
            {/* Cerca */}
            <div className="filtre-group filtre-search">
              <label>🔍 Cercar</label>
              <input
                type="text"
                placeholder="Nom del producte..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Preu mínim */}
            <div className="filtre-group">
              <label>💰 Preu mínim</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={precioMin}
                onChange={(e) => setPrecioMin(e.target.value)}
              />
            </div>

            {/* Preu màxim */}
            <div className="filtre-group">
              <label>💰 Preu màxim</label>
              <input
                type="number"
                placeholder="1000"
                min="0"
                value={precioMax}
                onChange={(e) => setPrecioMax(e.target.value)}
              />
            </div>

            {/* Ordenar */}
            <div className="filtre-group">
              <label>📊 Ordenar</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Més recents</option>
                <option value="precio_asc">Preu ↑ (baix a alt)</option>
                <option value="precio_desc">Preu ↓ (alt a baix)</option>
                <option value="nombre_asc">Nom A → Z</option>
                <option value="nombre_desc">Nom Z → A</option>
              </select>
            </div>

            {/* Botons */}
            <div className="filtre-group filtre-buttons">
              <button className="btn-filtrar" onClick={handleSearch}>Filtrar</button>
              <button className="btn-netejar" onClick={clearFilters}>✕ Netejar</button>
            </div>
          </div>

          {/* Botons de categories */}
          {!categoria && (
            <div className="categories-nav">
              {Object.entries(categoriaConfig).map(([key, cat]) => (
                <Link key={key} to={`/catalogo/${key}`} className="cat-pill" style={{ backgroundColor: cat.color }}>
                  {cat.titulo}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Carret flotant */}
      {carret.length > 0 && (
        <div className="carret-flotant">
          <div className="d-flex align-items-center gap-3">
            <span>🛒 {totalItems} articles</span>
            <span className="fw-bold" style={{ color: '#20c997' }}>{totalCarret.toFixed(2)}€</span>
            <button className="btn btn-success btn-sm" onClick={anarACheckout}>
              Comprar
            </button>
          </div>
        </div>
      )}

      {/* Grid de productes */}
      <section className="productes-grid-section">
        <div className="container">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Carregant...</span>
              </div>
              <p className="mt-3 text-muted">Carregant productes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <p className="text-danger">{error}</p>
              <button className="btn btn-outline-success mt-2" onClick={() => window.location.reload()}>Reintentar</button>
            </div>
          ) : productes.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No s'han trobat productes</h4>
              <p className="text-muted">Prova amb uns altres filtres o <button className="btn btn-link p-0" onClick={clearFilters}>neteja els filtres</button>.</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {productes.map((producte) => (
                <div className="col" key={producte._id}>
                  <div className="producte-card">
                    <div className="producte-card-img-wrapper">
                      <img
                        src={getImgSrc(producte)}
                        alt={producte.nombre}
                        onError={(e) => { e.target.src = fallbackImages[producte.categoria] || re4Img; }}
                      />
                      <span className="producte-card-price" style={{ backgroundColor: config.color || '#1a1a2e' }}>
                        {producte.precio.toFixed(2)}€
                      </span>
                      {producte.stock <= 5 && producte.stock > 0 && (
                        <span className="producte-card-stock-low">Últimes {producte.stock} unitats!</span>
                      )}
                      {producte.stock === 0 && (
                        <span className="producte-card-stock-out">Esgotat</span>
                      )}
                    </div>
                    <div className="producte-card-body">
                      <h5 className="producte-card-title">{producte.nombre}</h5>
                      <p className="producte-card-desc">{producte.descripcion}</p>
                      <div className="producte-card-actions">
                        <Link to={`/producte/${producte._id}`} className="btn-detall">
                          👁 Detall
                        </Link>
                        <button
                          id={`btn-${producte._id}`}
                          className="btn-afegir"
                          style={{ backgroundColor: config.color || '#1a1a2e' }}
                          onClick={() => afegirAlCarret(producte)}
                          disabled={producte.stock === 0}
                        >
                          🛒 Afegir al carret
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

      {/* Botó tornar */}
      <section className="py-4 bg-white">
        <div className="container text-center">
          {categoria ? (
            <div className="d-flex justify-content-center gap-3">
              <Link to="/catalogo" className="btn btn-outline-success btn-lg">📦 Tot el catàleg</Link>
              <Link to="/" className="btn btn-outline-dark btn-lg">← Tornar a l'inici</Link>
            </div>
          ) : (
            <Link to="/" className="btn btn-outline-dark btn-lg">← Tornar a l'inici</Link>
          )}
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .catalogo-header {
          padding: 2.5rem 0 2rem;
          color: white;
        }
        .filtres-section {
          background: #1a1a2e;
          padding: 1.2rem 0;
          border-bottom: 2px solid rgba(32, 201, 151, 0.3);
        }
        .filtres-bar {
          display: flex;
          gap: 1rem;
          align-items: flex-end;
          flex-wrap: wrap;
        }
        .filtre-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .filtre-group label {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .filtre-search {
          flex: 1;
          min-width: 200px;
        }
        .filtre-group input,
        .filtre-group select {
          padding: 0.5rem 0.75rem;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px;
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 0.9rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .filtre-group input:focus,
        .filtre-group select:focus {
          outline: none;
          border-color: #20c997;
          background: rgba(255,255,255,0.12);
        }
        .filtre-group input::placeholder {
          color: rgba(255,255,255,0.4);
        }
        .filtre-group select option {
          background: #1a1a2e;
          color: white;
        }
        .filtre-group input[type="number"] {
          width: 100px;
        }
        .filtre-buttons {
          flex-direction: row;
          gap: 0.5rem;
          align-self: flex-end;
        }
        .btn-filtrar {
          padding: 0.5rem 1.2rem;
          border: none;
          border-radius: 8px;
          background: #20c997;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-filtrar:hover {
          background: #17a589;
          transform: translateY(-1px);
        }
        .btn-netejar {
          padding: 0.5rem 1rem;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 8px;
          background: transparent;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-netejar:hover {
          border-color: #dc3545;
          color: #dc3545;
        }
        .categories-nav {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        .cat-pill {
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          color: white;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: transform 0.2s, opacity 0.2s;
        }
        .cat-pill:hover {
          transform: translateY(-2px);
          opacity: 0.9;
          color: white;
        }
        .carret-flotant {
          position: fixed;
          bottom: 0;
          right: 0;
          margin: 1.5rem;
          padding: 1rem 1.5rem;
          background: rgba(26, 26, 46, 0.95);
          color: white;
          border-radius: 16px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.4);
          z-index: 1000;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(32, 201, 151, 0.3);
        }
        .productes-grid-section {
          padding: 2.5rem 0;
          background: #f8f9fa;
          min-height: 400px;
        }
        .producte-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .producte-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
        .producte-card-img-wrapper {
          position: relative;
          overflow: hidden;
        }
        .producte-card-img-wrapper img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .producte-card:hover .producte-card-img-wrapper img {
          transform: scale(1.05);
        }
        .producte-card-price {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 0.3rem 0.75rem;
          border-radius: 8px;
          color: white;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .producte-card-stock-low {
          position: absolute;
          bottom: 8px;
          left: 8px;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          background: #ffc107;
          color: #333;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .producte-card-stock-out {
          position: absolute;
          bottom: 8px;
          left: 8px;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          background: #dc3545;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
        }
        .producte-card-body {
          padding: 1.2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .producte-card-title {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.5rem;
          color: #1a1a2e;
        }
        .producte-card-desc {
          color: #666;
          font-size: 0.85rem;
          flex: 1;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .producte-card-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-detall {
          padding: 0.5rem 0.8rem;
          border: 2px solid #1a1a2e;
          border-radius: 10px;
          color: #1a1a2e;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.2s;
          text-align: center;
        }
        .btn-detall:hover {
          background: #1a1a2e;
          color: white;
        }
        .btn-afegir {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-afegir:hover {
          opacity: 0.85;
          transform: translateY(-1px);
        }
        .btn-afegir:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        @media (max-width: 768px) {
          .filtres-bar {
            flex-direction: column;
          }
          .filtre-group input[type="number"] {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
