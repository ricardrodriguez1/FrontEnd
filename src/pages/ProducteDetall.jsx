// src/pages/ProducteDetall.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useCart } from '../context/CartContext.jsx';

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

// Mapa d'imatges per nom de producte
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

const fallbackImages = {
  videoconsolas: ps5Img,
  videojuegos: zeldaImg,
  figuras: gokuImg,
  componentes: rtx4080Img,
};

export default function ProducteDetall() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [producte, setProducte] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantitat, setQuantitat] = useState(1);
  const [afegit, setAfegit] = useState(false);

  useEffect(() => {
    const fetchProducte = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        setProducte(response.data);
      } catch (err) {
        console.error('Error carregant producte:', err);
        setError('No s\'ha pogut carregar el producte.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducte();
  }, [id]);

  const getImgSrc = () => {
    // Primer: cercar imatge local pel nom del producte
    const nom = (producte?.nombre || '').toLowerCase();
    for (const [key, img] of Object.entries(productImageMap)) {
      if (nom.includes(key)) {
        return img;
      }
    }
    // Segon: si no hi ha match local, intentar URL HTTP
    if (producte?.imagen_url && producte.imagen_url.startsWith('http')) {
      return producte.imagen_url;
    }
    // Tercer: fallback per categoria
    return fallbackImages[producte?.categoria] || re4Img;
  };

  const afegirAlCarret = () => {
    addToCart(producte, quantitat);
    setAfegit(true);
    setTimeout(() => {
      navigate('/cart');
    }, 800);
  };

  // Color per categoria
  const categoriaColors = {
    videoconsolas: '#2196F3',
    videojuegos: '#4CAF50',
    figuras: '#FF9800',
    componentes: '#9C27B0',
  };

  const categoriaNames = {
    videoconsolas: 'Videoconsoles',
    videojuegos: 'Videojocs',
    figuras: 'Figures',
    componentes: 'Components PC',
  };

  if (loading) {
    return (
      <div className="text-center py-5" style={{ background: '#f8f9fa', minHeight: '80vh' }}>
        <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Carregant...</span>
        </div>
        <p className="mt-3 text-muted">Carregant producte...</p>
      </div>
    );
  }

  if (error || !producte) {
    return (
      <div className="text-center py-5" style={{ background: '#f8f9fa', minHeight: '80vh' }}>
        <h3 className="text-danger">❌ {error || 'Producte no trobat'}</h3>
        <Link to="/catalogo" className="btn btn-outline-success mt-3">← Tornar al catàleg</Link>
      </div>
    );
  }

  const color = categoriaColors[producte.categoria] || '#1a1a2e';

  return (
    <>
      {/* Breadcrumb header */}
      <section style={{ background: `linear-gradient(135deg, ${color}, #1a1a2e)`, padding: '1.5rem 0' }}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0" style={{ background: 'transparent' }}>
              <li className="breadcrumb-item"><Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Inici</Link></li>
              <li className="breadcrumb-item">
                <Link to={`/catalogo/${producte.categoria}`} style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {categoriaNames[producte.categoria] || producte.categoria}
                </Link>
              </li>
              <li className="breadcrumb-item active text-white">{producte.nombre}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Detall del producte */}
      <section className="detall-section">
        <div className="container">
          <div className="detall-grid">
            {/* Imatge */}
            <div className="detall-img-wrapper">
              <img
                src={getImgSrc()}
                alt={producte.nombre}
                onError={(e) => { e.target.src = fallbackImages[producte?.categoria] || re4Img; }}
              />
              <span className="detall-categoria-badge" style={{ backgroundColor: color }}>
                {categoriaNames[producte.categoria] || producte.categoria}
              </span>
            </div>

            {/* Info */}
            <div className="detall-info">
              <h1 className="detall-title">{producte.nombre}</h1>

              <div className="detall-price-row">
                <span className="detall-price">{producte.precio.toFixed(2)}€</span>
                {producte.stock > 0 ? (
                  <span className="detall-stock-ok">✓ En stock ({producte.stock} unitats)</span>
                ) : (
                  <span className="detall-stock-out">✕ Esgotat</span>
                )}
              </div>

              <p className="detall-desc">{producte.descripcion}</p>

              <div className="detall-specs">
                <div className="spec-item">
                  <span className="spec-label">Categoria</span>
                  <span className="spec-value">{categoriaNames[producte.categoria] || producte.categoria}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Referència</span>
                  <span className="spec-value" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{producte._id}</span>
                </div>
              </div>

              {/* Quantitat + Botó */}
              {producte.stock > 0 && (
                <div className="detall-actions">
                  <div className="quantitat-selector">
                    <button onClick={() => setQuantitat(Math.max(1, quantitat - 1))}>−</button>
                    <span>{quantitat}</span>
                    <button onClick={() => setQuantitat(Math.min(producte.stock, quantitat + 1))}>+</button>
                  </div>
                  <button
                    className="btn-comprar"
                    style={{ backgroundColor: color }}
                    onClick={afegirAlCarret}
                    disabled={afegit}
                  >
                    {afegit ? '✓ Afegit! Redirigint...' : `🛒 Comprar (${(producte.precio * quantitat).toFixed(2)}€)`}
                  </button>
                </div>
              )}

              {/* Tornar */}
              <div className="detall-back">
                <Link to={`/catalogo/${producte.categoria}`} className="btn btn-outline-dark">
                  ← Tornar a {categoriaNames[producte.categoria] || 'catàleg'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .detall-section {
          background: #f8f9fa;
          padding: 3rem 0;
          min-height: 70vh;
        }
        .detall-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .detall-img-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        }
        .detall-img-wrapper img {
          width: 100%;
          height: 450px;
          object-fit: cover;
          display: block;
        }
        .detall-categoria-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 0.4rem 1rem;
          border-radius: 10px;
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .detall-info {
          padding: 1rem 0;
        }
        .detall-title {
          font-size: 2rem;
          font-weight: 800;
          color: #1a1a2e;
          margin-bottom: 1rem;
        }
        .detall-price-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .detall-price {
          font-size: 2.2rem;
          font-weight: 800;
          color: #20c997;
        }
        .detall-stock-ok {
          background: #d4edda;
          color: #155724;
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .detall-stock-out {
          background: #f8d7da;
          color: #721c24;
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .detall-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #555;
          margin-bottom: 2rem;
        }
        .detall-specs {
          background: white;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 5px rgba(0,0,0,0.05);
        }
        .spec-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f0f0f0;
        }
        .spec-item:last-child {
          border-bottom: none;
        }
        .spec-label {
          font-weight: 600;
          color: #888;
          font-size: 0.9rem;
        }
        .spec-value {
          font-weight: 600;
          color: #333;
        }
        .detall-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .quantitat-selector {
          display: flex;
          align-items: center;
          border: 2px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
        }
        .quantitat-selector button {
          width: 44px;
          height: 44px;
          border: none;
          background: #f5f5f5;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        .quantitat-selector button:hover {
          background: #e0e0e0;
        }
        .quantitat-selector span {
          width: 50px;
          text-align: center;
          font-size: 1.1rem;
          font-weight: 700;
        }
        .btn-comprar {
          flex: 1;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        .btn-comprar:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        .btn-comprar:disabled {
          opacity: 0.7;
          transform: none;
        }
        .detall-back {
          margin-top: 1rem;
        }
        @media (max-width: 768px) {
          .detall-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .detall-img-wrapper img {
            height: 300px;
          }
          .detall-title {
            font-size: 1.5rem;
          }
          .detall-price {
            font-size: 1.8rem;
          }
          .detall-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
