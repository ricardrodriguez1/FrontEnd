// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';
import { useNavigate, Link } from 'react-router-dom';

// Imatges per categoria
import image1 from './ps5.jpg';
import image2 from './zelda.jpg';
import image3 from './goku.jpg';
import image4 from './nvidia 4080.jpg';

// Imatges per productes destacats
import eldenImg from './elden.jpg';
import spidermanImg from './spiderman.jpg';
import narutoImg from './naruto.jpg';
import luffyImg from './luffy.jpg';
import steamdeckImg from './steamdeck.jpg';
import seriesXImg from './series x.jpg';
import corsairImg from './corsair.jpg';
import ryzenImg from './ryzen.jpg';

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [cistella, setCistella] = useState(false);
  const [productesAfegits, setProductesAfegits] = useState([]);
  const [productes, setProductes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  // Productes de reserva (fallback) amb enllaços al catàleg
  const productesFallback = [
    { _id: 'f1', nombre: 'Videoconsolas', precio: 499.99, descripcion: 'PS5, Xbox Series X|S, Nintendo Switch y más consolas de última generación.', imagen_url: image1, catalogo_url: '/catalogo/videoconsolas' },
    { _id: 'f2', nombre: 'Videojuegos', precio: 69.99, descripcion: 'Juegos nuevos, clásicos y ediciones especiales para todas las plataformas.', imagen_url: image2, catalogo_url: '/catalogo/videojuegos' },
    { _id: 'f3', nombre: 'Figuras Coleccionables', precio: 89.99, descripcion: 'Figuras de anime, videojuegos, Marvel, Star Wars y más.', imagen_url: image3, catalogo_url: '/catalogo/figuras' },
    { _id: 'f4', nombre: 'Componentes PC', precio: 599.99, descripcion: 'Tarjetas gráficas, teclados mecánicos, monitores gaming y accesorios.', imagen_url: image4, catalogo_url: '/catalogo/componentes' },
  ];

  // Productes destacats
  const productesDestacats = [
    { id: 1, nom: 'Elden Ring', preu: '59.99€', img: eldenImg, cat: '/catalogo/videojuegos' },
    { id: 2, nom: 'Spider-Man 2', preu: '69.99€', img: spidermanImg, cat: '/catalogo/videojuegos' },
    { id: 3, nom: 'Naruto Uzumaki', preu: '79.99€', img: narutoImg, cat: '/catalogo/figuras' },
    { id: 4, nom: 'Luffy Gear 5', preu: '89.99€', img: luffyImg, cat: '/catalogo/figuras' },
    { id: 5, nom: 'Steam Deck OLED', preu: '549.99€', img: steamdeckImg, cat: '/catalogo/videoconsolas' },
    { id: 6, nom: 'Xbox Series X', preu: '499.99€', img: seriesXImg, cat: '/catalogo/videoconsolas' },
    { id: 7, nom: 'Corsair Vengeance', preu: '159.99€', img: corsairImg, cat: '/catalogo/componentes' },
    { id: 8, nom: 'AMD Ryzen 7', preu: '399.99€', img: ryzenImg, cat: '/catalogo/componentes' },
  ];

  // Testimonials
  const testimonials = [
    { id: 1, nom: 'Marc González', text: 'Increíble experiencia de compra. Mi PS5 llegó en perfecto estado y con envío súper rápido. ¡100% recomendado!', rating: 5, inicials: 'MG' },
    { id: 2, nom: 'Laura Fernández', text: 'La mejor tienda de figuras coleccionables. Precios competitivos y la calidad de los productos es excepcional.', rating: 5, inicials: 'LF' },
    { id: 3, nom: 'Álex Rodríguez', text: 'Monté mi PC gaming con componentes de BossFightStore. El soporte técnico me ayudó a elegir las piezas perfectas.', rating: 4, inicials: 'AR' },
  ];

  useEffect(() => {
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

  // Finalitzar compra
  const finalitzarCompra = () => {
    if (productesAfegits.length === 0) {
      alert("La cistella està buida");
      return;
    }
    setCistella(false);
    navigate('/checkout', { state: { cartItems: productesAfegits } });
  };

  const calcularTotal = () => {
    return productesAfegits.reduce((total, p) => total + (p.precio * p.quantitat), 0).toFixed(2);
  };

  const totalArticles = () => {
    return productesAfegits.reduce((total, p) => total + p.quantitat, 0);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSent(false), 4000);
    }
  };

  // Category icons + colors
  const catIcons = ['🎮', '🕹️', '🗿', '🖥️'];
  const catColors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0'];

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

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-hero">
        <div className="bfs-hero-particles">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="bfs-particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}></span>
          ))}
        </div>
        <div className="bfs-hero-content">
          <span className="bfs-hero-badge">🎮 La tienda gaming #1 en España</span>
          <h1 className="bfs-hero-title">
            Boss<span className="bfs-glow">Fight</span>Store
          </h1>
          <p className="bfs-hero-sub">
            Tu destino definitivo para videoconsolas, videojuegos, figuras coleccionables y hardware gaming.
            Más de <strong>2.000 productos</strong> con envío rápido y garantía total.
          </p>
          <div className="bfs-hero-ctas">
            <Link to="/catalogo" className="bfs-btn-primary">
              Explorar Catálogo <span>→</span>
            </Link>
            <a href="#historia" className="bfs-btn-ghost">
              Nuestra Historia
            </a>
          </div>
          <div className="bfs-hero-stats">
            <div className="bfs-stat">
              <span className="bfs-stat-num">2K+</span>
              <span className="bfs-stat-label">Productos</span>
            </div>
            <div className="bfs-stat-divider"></div>
            <div className="bfs-stat">
              <span className="bfs-stat-num">15K+</span>
              <span className="bfs-stat-label">Clientes</span>
            </div>
            <div className="bfs-stat-divider"></div>
            <div className="bfs-stat">
              <span className="bfs-stat-num">4.9★</span>
              <span className="bfs-stat-label">Valoración</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TRUST BAR */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-trust">
        <div className="bfs-trust-inner">
          <div className="bfs-trust-item">
            <span className="bfs-trust-icon">🚚</span>
            <div>
              <strong>Envío Gratis</strong>
              <span>En pedidos +50€</span>
            </div>
          </div>
          <div className="bfs-trust-item">
            <span className="bfs-trust-icon">🛡️</span>
            <div>
              <strong>Garantía 2 Años</strong>
              <span>En todos los productos</span>
            </div>
          </div>
          <div className="bfs-trust-item">
            <span className="bfs-trust-icon">💬</span>
            <div>
              <strong>Soporte 24/7</strong>
              <span>Siempre disponibles</span>
            </div>
          </div>
          <div className="bfs-trust-item">
            <span className="bfs-trust-icon">↩️</span>
            <div>
              <strong>Devolución Fácil</strong>
              <span>30 días sin preguntas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CATEGORÍAS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-section bfs-categories" id="categorias">
        <div className="bfs-container">
          <div className="bfs-section-header">
            <span className="bfs-section-tag">CATEGORÍAS</span>
            <h2 className="bfs-section-title">Explora Nuestro Universo</h2>
            <p className="bfs-section-desc">Cuatro mundos, una sola tienda. Encuentra todo lo que necesitas para tu pasión gaming.</p>
          </div>
          <div className="bfs-cat-grid">
            {productes.map((p, i) => (
              <Link to={p.catalogo_url || '/catalogo'} key={p._id} className="bfs-cat-card" style={{ '--cat-color': catColors[i] }}>
                <div className="bfs-cat-img-wrap">
                  <img src={p.imagen_url || image1} alt={p.nombre} />
                  <div className="bfs-cat-overlay"></div>
                </div>
                <div className="bfs-cat-info">
                  <span className="bfs-cat-icon">{catIcons[i]}</span>
                  <h3>{p.nombre}</h3>
                  <p>{p.descripcion}</p>
                  <span className="bfs-cat-link">Ver Catálogo →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* PRODUCTOS DESTACADOS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-section bfs-featured">
        <div className="bfs-container">
          <div className="bfs-section-header">
            <span className="bfs-section-tag">DESTACADOS</span>
            <h2 className="bfs-section-title">Productos Más Populares</h2>
            <p className="bfs-section-desc">Lo más vendido y mejor valorado por nuestra comunidad de gamers.</p>
          </div>
          <div className="bfs-featured-grid">
            {productesDestacats.map((p) => (
              <Link to={p.cat} key={p.id} className="bfs-prod-card">
                <div className="bfs-prod-img-wrap">
                  <img src={p.img} alt={p.nom} />
                  <span className="bfs-prod-price">{p.preu}</span>
                </div>
                <div className="bfs-prod-info">
                  <h4>{p.nom}</h4>
                  <span className="bfs-prod-link">Ver en catálogo →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* NUESTRA HISTORIA */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-section bfs-story" id="historia">
        <div className="bfs-container">
          <div className="bfs-story-grid">
            <div className="bfs-story-text">
              <span className="bfs-section-tag">NUESTRA HISTORIA</span>
              <h2 className="bfs-section-title" style={{ textAlign: 'left' }}>De Gamers,<br />Para Gamers</h2>
              <p>
                BossFightStore nació en 2020 de la pasión de un grupo de amigos por los videojuegos y la cultura gaming.
                Lo que empezó como un pequeño proyecto en un garaje se ha convertido en una de las tiendas online
                de referencia en España.
              </p>
              <p>
                Nuestro nombre lo dice todo: cada compra es como derrotar a un boss final. Seleccionamos
                cuidadosamente cada producto, desde las últimas consolas hasta las figuras coleccionables
                más exclusivas, para ofrecerte solo lo mejor.
              </p>
              <p>
                Hoy somos una comunidad de más de 15.000 gamers que comparten la misma pasión.
                Cada pedido que preparamos lleva un trozo de nuestra historia, y un compromiso:
                que tu experiencia sea <strong>legendary</strong>. 🏆
              </p>
              <div className="bfs-story-badges">
                <div className="bfs-story-badge">
                  <span>🎯</span>
                  <div><strong>Fundado en 2020</strong><br /><small>Barcelona, España</small></div>
                </div>
                <div className="bfs-story-badge">
                  <span>🌍</span>
                  <div><strong>Envíos a toda Europa</strong><br /><small>España, Francia, Italia, Alemania</small></div>
                </div>
              </div>
            </div>
            <div className="bfs-story-images">
              <div className="bfs-story-img bfs-story-img-1">
                <img src={image1} alt="Consolas" />
              </div>
              <div className="bfs-story-img bfs-story-img-2">
                <img src={image3} alt="Figuras" />
              </div>
              <div className="bfs-story-img bfs-story-img-3">
                <img src={image2} alt="Videojuegos" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ¿POR QUÉ ELEGIRNOS? */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-section bfs-why">
        <div className="bfs-container">
          <div className="bfs-section-header">
            <span className="bfs-section-tag">VENTAJAS</span>
            <h2 className="bfs-section-title">¿Por Qué Elegirnos?</h2>
            <p className="bfs-section-desc">No somos solo una tienda. Somos tu aliado en cada partida.</p>
          </div>
          <div className="bfs-why-grid">
            {[
              { icon: '✅', title: 'Productos Originales', desc: 'Todos nuestros productos son 100% originales con certificado de autenticidad.' },
              { icon: '💰', title: 'Precios Competitivos', desc: 'Comparamos precios constantemente para ofrecerte la mejor relación calidad-precio.' },
              { icon: '⚡', title: 'Envío Rápido', desc: 'Envío en 24-48h a toda la Península. Express disponible para entregas urgentes.' },
              { icon: '🎧', title: 'Soporte Experto', desc: 'Nuestro equipo de gamers te asesora para que elijas el producto perfecto.' },
              { icon: '👥', title: 'Comunidad Gamer', desc: 'Únete a más de 15.000 gamers. Ofertas exclusivas, sorteos y eventos.' },
              { icon: '🔒', title: 'Compra Segura', desc: 'Pago 100% seguro con cifrado SSL. Garantía de devolución de 30 días.' },
            ].map((item, i) => (
              <div className="bfs-why-card" key={i}>
                <span className="bfs-why-icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-section bfs-reviews">
        <div className="bfs-container">
          <div className="bfs-section-header">
            <span className="bfs-section-tag">OPINIONES</span>
            <h2 className="bfs-section-title">Lo Que Dicen Nuestros Clientes</h2>
            <p className="bfs-section-desc">Miles de gamers ya confían en nosotros. Lee sus experiencias.</p>
          </div>
          <div className="bfs-reviews-grid">
            {testimonials.map((t) => (
              <div className="bfs-review-card" key={t.id}>
                <div className="bfs-review-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                <p className="bfs-review-text">"{t.text}"</p>
                <div className="bfs-review-author">
                  <div className="bfs-review-avatar">{t.inicials}</div>
                  <span className="bfs-review-name">{t.nom}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* NEWSLETTER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section className="bfs-newsletter">
        <div className="bfs-container">
          <div className="bfs-newsletter-content">
            <h2>🔔 No Te Pierdas Nada</h2>
            <p>Suscríbete y recibe ofertas exclusivas, novedades y acceso anticipado a lanzamientos.</p>
            <form className="bfs-newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                placeholder="tu@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit">
                {newsletterSent ? '✓ ¡Suscrito!' : 'Suscribirme'}
              </button>
            </form>
            {newsletterSent && <p className="bfs-newsletter-ok">🎉 ¡Gracias! Te mantendremos informado.</p>}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FOOTER */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <footer className="bfs-footer">
        <div className="bfs-container">
          <div className="bfs-footer-grid">
            <div className="bfs-footer-col bfs-footer-brand">
              <h3>Boss<span>Fight</span>Store</h3>
              <p>Tu tienda gaming de confianza desde 2020. Videoconsolas, videojuegos, figuras y componentes PC al mejor precio.</p>
              <div className="bfs-footer-social">
                <a href="#" title="Twitter">𝕏</a>
                <a href="#" title="Instagram">📷</a>
                <a href="#" title="Discord">🎧</a>
                <a href="#" title="YouTube">▶️</a>
              </div>
            </div>
            <div className="bfs-footer-col">
              <h4>Categorías</h4>
              <Link to="/catalogo/videoconsolas">Videoconsolas</Link>
              <Link to="/catalogo/videojuegos">Videojuegos</Link>
              <Link to="/catalogo/figuras">Figuras Coleccionables</Link>
              <Link to="/catalogo/componentes">Componentes PC</Link>
            </div>
            <div className="bfs-footer-col">
              <h4>Atención al Cliente</h4>
              <a href="#">Centro de Ayuda</a>
              <a href="#">Política de Envíos</a>
              <a href="#">Devoluciones</a>
              <a href="#">Métodos de Pago</a>
            </div>
            <div className="bfs-footer-col">
              <h4>Contacto</h4>
              <a href="#">📧 info@bossfightstore.com</a>
              <a href="#">📞 +34 93 123 45 67</a>
              <a href="#">📍 Barcelona, España</a>
              <a href="#">🕐 L-V 9:00 — 20:00</a>
            </div>
          </div>
          <div className="bfs-footer-bottom">
            <p>&copy; 2025 BossFightStore. Todos los derechos reservados.</p>
            <p>Frontend by Ricard Rodríguez</p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* STYLES */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        /* ── BASE ────────────────────────────────── */
        .bfs-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .bfs-section { padding: 80px 0; }

        .bfs-section-header { text-align: center; margin-bottom: 48px; }
        .bfs-section-tag {
          display: inline-block; padding: 6px 16px; border-radius: 20px;
          background: rgba(0,255,136,0.1); color: #00ff88; font-size: 0.75rem;
          font-weight: 700; letter-spacing: 2px; margin-bottom: 12px;
        }
        .bfs-section-title {
          font-family: 'Inter', sans-serif; font-size: 2.5rem; font-weight: 800;
          color: #fff; margin: 8px 0 12px; line-height: 1.15;
        }
        .bfs-section-desc { color: #8892a4; font-size: 1.05rem; max-width: 550px; margin: 0 auto; line-height: 1.6; }

        /* ── HERO ────────────────────────────────── */
        .bfs-hero {
          position: relative; min-height: 92vh; display: flex; align-items: center;
          justify-content: center; text-align: center; overflow: hidden;
          background: radial-gradient(ellipse at 30% 50%, #1a0a2e 0%, #0a0a0f 50%, #0a0f0a 100%);
        }
        .bfs-hero-particles { position: absolute; inset: 0; pointer-events: none; }
        .bfs-particle {
          position: absolute; bottom: -10px; background: #00ff88; border-radius: 50%;
          opacity: 0; animation: particleUp linear infinite;
        }
        @keyframes particleUp {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          10% { opacity: 0.6; }
          90% { opacity: 0.2; }
          100% { opacity: 0; transform: translateY(-92vh) scale(1); }
        }
        .bfs-hero-content { position: relative; z-index: 2; padding: 0 24px; max-width: 800px; }
        .bfs-hero-badge {
          display: inline-block; padding: 8px 20px; border-radius: 24px;
          background: rgba(0,255,136,0.08); border: 1px solid rgba(0,255,136,0.2);
          color: #00ff88; font-size: 0.85rem; font-weight: 600; margin-bottom: 24px;
        }
        .bfs-hero-title {
          font-family: 'Inter', sans-serif; font-size: clamp(3rem, 8vw, 5.5rem);
          font-weight: 900; color: #fff; margin: 0 0 20px; letter-spacing: -2px; line-height: 1;
        }
        .bfs-glow {
          color: #00ff88;
          text-shadow: 0 0 20px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15);
        }
        .bfs-hero-sub {
          font-size: 1.15rem; color: #a0aec0; line-height: 1.7; margin-bottom: 32px;
          max-width: 600px; margin-left: auto; margin-right: auto;
        }
        .bfs-hero-ctas { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
        .bfs-btn-primary {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
          background: linear-gradient(135deg, #00ff88, #00cc6a); color: #0a0a0f;
          border-radius: 12px; font-weight: 700; font-size: 1rem; text-decoration: none;
          transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(0,255,136,0.3);
        }
        .bfs-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(0,255,136,0.45); color: #0a0a0f; }
        .bfs-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px; padding: 14px 32px;
          background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.2);
          border-radius: 12px; font-weight: 600; font-size: 1rem; text-decoration: none;
          transition: all 0.3s ease;
        }
        .bfs-btn-ghost:hover { border-color: #00ff88; color: #00ff88; }
        .bfs-hero-stats {
          display: flex; align-items: center; justify-content: center; gap: 32px;
          padding: 20px 0;
        }
        .bfs-stat { text-align: center; }
        .bfs-stat-num { display: block; font-size: 1.6rem; font-weight: 800; color: #fff; }
        .bfs-stat-label { font-size: 0.8rem; color: #8892a4; letter-spacing: 1px; text-transform: uppercase; }
        .bfs-stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.12); }

        /* ── TRUST BAR ───────────────────────────── */
        .bfs-trust { background: #101018; border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .bfs-trust-inner {
          max-width: 1200px; margin: 0 auto; padding: 24px;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
        }
        .bfs-trust-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px; border-radius: 12px; background: rgba(255,255,255,0.03);
        }
        .bfs-trust-icon { font-size: 1.8rem; }
        .bfs-trust-item strong { display: block; color: #fff; font-size: 0.9rem; }
        .bfs-trust-item span { color: #8892a4; font-size: 0.8rem; }

        /* ── CATEGORIES ──────────────────────────── */
        .bfs-categories { background: #0a0a0f; }
        .bfs-cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .bfs-cat-card {
          position: relative; border-radius: 20px; overflow: hidden; text-decoration: none;
          background: #12121a; transition: transform 0.4s ease, box-shadow 0.4s ease;
          display: flex; flex-direction: column;
        }
        .bfs-cat-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .bfs-cat-img-wrap { position: relative; overflow: hidden; height: 220px; }
        .bfs-cat-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .bfs-cat-card:hover .bfs-cat-img-wrap img { transform: scale(1.1); }
        .bfs-cat-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10,10,15,0.85) 100%);
        }
        .bfs-cat-info { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .bfs-cat-icon { font-size: 2rem; margin-bottom: 8px; }
        .bfs-cat-info h3 { color: #fff; font-size: 1.2rem; font-weight: 700; margin: 0 0 6px; }
        .bfs-cat-info p { color: #8892a4; font-size: 0.85rem; line-height: 1.5; flex: 1; margin: 0 0 12px; }
        .bfs-cat-link {
          color: var(--cat-color, #00ff88); font-weight: 600; font-size: 0.9rem;
          transition: letter-spacing 0.3s ease;
        }
        .bfs-cat-card:hover .bfs-cat-link { letter-spacing: 1px; }

        /* ── FEATURED PRODUCTS ───────────────────── */
        .bfs-featured { background: #0d0d14; }
        .bfs-featured-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .bfs-prod-card {
          background: #12121a; border-radius: 16px; overflow: hidden;
          text-decoration: none; transition: transform 0.35s ease, box-shadow 0.35s ease;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .bfs-prod-card:hover { transform: translateY(-6px); box-shadow: 0 12px 35px rgba(0,0,0,0.4); }
        .bfs-prod-img-wrap { position: relative; overflow: hidden; height: 180px; }
        .bfs-prod-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .bfs-prod-card:hover .bfs-prod-img-wrap img { transform: scale(1.08); }
        .bfs-prod-price {
          position: absolute; top: 10px; right: 10px; padding: 5px 12px;
          border-radius: 8px; background: rgba(0,255,136,0.9); color: #0a0a0f;
          font-weight: 700; font-size: 0.85rem;
        }
        .bfs-prod-info { padding: 16px; }
        .bfs-prod-info h4 { color: #fff; font-size: 0.95rem; font-weight: 600; margin: 0 0 6px; }
        .bfs-prod-link { color: #00ff88; font-size: 0.8rem; font-weight: 600; }

        /* ── STORY ───────────────────────────────── */
        .bfs-story { background: #0a0a0f; }
        .bfs-story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .bfs-story-text p { color: #a0aec0; font-size: 1rem; line-height: 1.8; margin: 0 0 16px; }
        .bfs-story-badges { display: flex; gap: 20px; margin-top: 24px; flex-wrap: wrap; }
        .bfs-story-badge {
          display: flex; align-items: center; gap: 12px; padding: 14px 18px;
          background: #12121a; border-radius: 14px; border: 1px solid rgba(255,255,255,0.06);
        }
        .bfs-story-badge span:first-child { font-size: 1.8rem; }
        .bfs-story-badge strong { color: #fff; font-size: 0.9rem; }
        .bfs-story-badge small { color: #8892a4; font-size: 0.8rem; }
        .bfs-story-images { position: relative; height: 450px; }
        .bfs-story-img {
          position: absolute; border-radius: 16px; overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: transform 0.4s ease;
        }
        .bfs-story-img:hover { transform: scale(1.05) rotate(0deg) !important; z-index: 3; }
        .bfs-story-img img { width: 100%; height: 100%; object-fit: cover; }
        .bfs-story-img-1 { width: 240px; height: 280px; top: 0; left: 10%; transform: rotate(-4deg); z-index: 1; }
        .bfs-story-img-2 { width: 200px; height: 240px; top: 30px; right: 10%; transform: rotate(5deg); z-index: 2; }
        .bfs-story-img-3 { width: 220px; height: 200px; bottom: 20px; left: 25%; transform: rotate(-2deg); z-index: 1; }

        /* ── WHY CHOOSE US ───────────────────────── */
        .bfs-why { background: #0d0d14; }
        .bfs-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .bfs-why-card {
          background: #12121a; border-radius: 16px; padding: 28px 24px;
          border: 1px solid rgba(255,255,255,0.05); transition: all 0.35s ease;
          text-align: center;
        }
        .bfs-why-card:hover { border-color: rgba(0,255,136,0.2); transform: translateY(-4px); }
        .bfs-why-icon { font-size: 2.2rem; display: block; margin-bottom: 14px; }
        .bfs-why-card h4 { color: #fff; font-size: 1.05rem; font-weight: 700; margin: 0 0 8px; }
        .bfs-why-card p { color: #8892a4; font-size: 0.88rem; line-height: 1.6; margin: 0; }

        /* ── REVIEWS ─────────────────────────────── */
        .bfs-reviews { background: #0a0a0f; }
        .bfs-reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .bfs-review-card {
          background: #12121a; border-radius: 16px; padding: 28px 24px;
          border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s ease;
        }
        .bfs-review-card:hover { transform: translateY(-4px); }
        .bfs-review-stars { color: #ffc107; font-size: 1.1rem; margin-bottom: 14px; letter-spacing: 2px; }
        .bfs-review-text { color: #c0c8d8; font-size: 0.95rem; line-height: 1.7; margin: 0 0 18px; font-style: italic; }
        .bfs-review-author { display: flex; align-items: center; gap: 12px; }
        .bfs-review-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: linear-gradient(135deg, #00ff88, #7c3aed);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 0.85rem;
        }
        .bfs-review-name { color: #fff; font-weight: 600; font-size: 0.9rem; }

        /* ── NEWSLETTER ──────────────────────────── */
        .bfs-newsletter {
          background: linear-gradient(135deg, #1a0a2e, #0a1a0f);
          padding: 64px 0; border-top: 1px solid rgba(0,255,136,0.1);
        }
        .bfs-newsletter-content { text-align: center; max-width: 540px; margin: 0 auto; }
        .bfs-newsletter-content h2 { color: #fff; font-size: 1.8rem; font-weight: 800; margin: 0 0 10px; }
        .bfs-newsletter-content > p { color: #a0aec0; font-size: 0.95rem; margin: 0 0 24px; }
        .bfs-newsletter-form {
          display: flex; gap: 10px; max-width: 440px; margin: 0 auto;
        }
        .bfs-newsletter-form input {
          flex: 1; padding: 14px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06); color: #fff; font-size: 0.95rem;
          outline: none; transition: border-color 0.3s;
        }
        .bfs-newsletter-form input:focus { border-color: #00ff88; }
        .bfs-newsletter-form input::placeholder { color: rgba(255,255,255,0.35); }
        .bfs-newsletter-form button {
          padding: 14px 24px; border-radius: 12px; border: none;
          background: linear-gradient(135deg, #00ff88, #00cc6a); color: #0a0a0f;
          font-weight: 700; cursor: pointer; transition: all 0.3s;
          white-space: nowrap;
        }
        .bfs-newsletter-form button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,255,136,0.35); }
        .bfs-newsletter-ok { color: #00ff88; margin-top: 12px; font-size: 0.9rem; }

        /* ── FOOTER ──────────────────────────────── */
        .bfs-footer { background: #080810; padding: 60px 0 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .bfs-footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
        .bfs-footer-brand h3 { color: #fff; font-size: 1.5rem; font-weight: 800; margin: 0 0 12px; }
        .bfs-footer-brand h3 span { color: #00ff88; }
        .bfs-footer-brand p { color: #8892a4; font-size: 0.88rem; line-height: 1.6; margin: 0 0 16px; }
        .bfs-footer-social { display: flex; gap: 10px; }
        .bfs-footer-social a {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(255,255,255,0.06); display: flex; align-items: center;
          justify-content: center; text-decoration: none; font-size: 1rem;
          transition: all 0.3s;
        }
        .bfs-footer-social a:hover { background: rgba(0,255,136,0.15); transform: translateY(-2px); }
        .bfs-footer-col h4 { color: #fff; font-size: 0.95rem; font-weight: 700; margin: 0 0 16px; }
        .bfs-footer-col a {
          display: block; color: #8892a4; text-decoration: none; font-size: 0.88rem;
          padding: 4px 0; transition: color 0.2s;
        }
        .bfs-footer-col a:hover { color: #00ff88; }
        .bfs-footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 0;
          display: flex; justify-content: space-between; align-items: center;
        }
        .bfs-footer-bottom p { color: #555; font-size: 0.82rem; margin: 0; }

        /* ── CISTELLA (UNTOUCHED) ────────────────── */
        .cistella-flotant {
          position: fixed; top: 20px; right: 20px; width: 60px; height: 60px;
          background: linear-gradient(135deg, #28a745, #20c997); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 1000;
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .cistella-flotant:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(40, 167, 69, 0.6); }
        .cistella-icona { font-size: 28px; }
        .cistella-badge {
          position: absolute; top: -5px; right: -5px; background: #dc3545;
          color: white; border-radius: 50%; width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: bold;
        }
        .cistella-panell {
          position: fixed; top: 0; right: -400px; width: 380px; height: 100vh;
          background: linear-gradient(180deg, #1a1a2e, #16213e); z-index: 1001;
          transition: right 0.4s ease; display: flex; flex-direction: column;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
        }
        .cistella-panell.oberta { right: 0; }
        .cistella-header {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px; background: linear-gradient(135deg, #28a745, #20c997); color: white;
        }
        .cistella-header h4 { margin: 0; font-weight: bold; }
        .cistella-tancar {
          background: rgba(255,255,255,0.2); border: none; color: white;
          font-size: 18px; width: 35px; height: 35px; border-radius: 50%;
          cursor: pointer; transition: background 0.3s ease;
        }
        .cistella-tancar:hover { background: rgba(255,255,255,0.4); }
        .cistella-contingut { flex: 1; padding: 20px; overflow-y: auto; color: white; }
        .cistella-buida { text-align: center; color: #aaa; font-style: italic; margin-top: 50px; }
        .cistella-item {
          display: flex; align-items: center; gap: 15px; padding: 15px;
          background: rgba(255,255,255,0.05); border-radius: 12px;
          margin-bottom: 10px; transition: background 0.3s ease;
        }
        .cistella-item:hover { background: rgba(255,255,255,0.1); }
        .cistella-item-img { width: 60px; height: 60px; object-fit: cover; border-radius: 8px; }
        .cistella-item-info { flex: 1; }
        .cistella-item-info h6 { margin: 0 0 5px 0; font-weight: bold; }
        .cistella-item-info p { margin: 0; color: #20c997; font-size: 14px; }
        .cistella-item-eliminar {
          background: rgba(220, 53, 69, 0.2); border: none; font-size: 18px;
          padding: 8px 12px; border-radius: 8px; cursor: pointer;
          transition: background 0.3s ease;
        }
        .cistella-item-eliminar:hover { background: rgba(220, 53, 69, 0.5); }
        .cistella-total {
          text-align: right; padding: 15px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: 15px; font-size: 18px; color: #20c997;
        }
        .cistella-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.5); z-index: 999;
        }

        /* ── RESPONSIVE ──────────────────────────── */
        @media (max-width: 992px) {
          .bfs-cat-grid { grid-template-columns: repeat(2, 1fr); }
          .bfs-featured-grid { grid-template-columns: repeat(2, 1fr); }
          .bfs-trust-inner { grid-template-columns: repeat(2, 1fr); }
          .bfs-story-grid { grid-template-columns: 1fr; }
          .bfs-story-images { height: 300px; }
          .bfs-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .bfs-section { padding: 50px 0; }
          .bfs-section-title { font-size: 1.8rem; }
          .bfs-cat-grid { grid-template-columns: 1fr; }
          .bfs-featured-grid { grid-template-columns: 1fr 1fr; }
          .bfs-trust-inner { grid-template-columns: 1fr; }
          .bfs-why-grid { grid-template-columns: 1fr; }
          .bfs-reviews-grid { grid-template-columns: 1fr; }
          .bfs-footer-grid { grid-template-columns: 1fr; }
          .bfs-newsletter-form { flex-direction: column; }
          .bfs-hero-stats { flex-direction: column; gap: 16px; }
          .bfs-stat-divider { width: 40px; height: 1px; }
          .bfs-footer-bottom { flex-direction: column; gap: 4px; text-align: center; }
        }
      `}</style>
    </>
  );
}