// src/pages/Home.jsx
import image1 from './ps2.jpg';   // 👈 . = misma carpeta
import image2 from './re4.jpg';
import image3 from './gogeta.jpg';
import image4 from './4070.jpg';
export default function Home() {
  return (
    <>
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
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            <div className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={image1}
                  className="card-img-top"
                  alt="Consolas"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Videoconsolas</h5>
                  <p className="card-text flex-grow-1">
                    PS5, Xbox Series X|S, Nintendo Switch y más consolas de última generación.
                  </p>
                  <a href="#" className="btn btn-outline-dark mt-auto">
                    Ver Catálogo
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={image2}
                  className="card-img-top"
                  alt="Videojuegos"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Videojuegos</h5>
                  <p className="card-text flex-grow-1">
                    Juegos nuevos, clásicos y ediciones especiales para todas las plataformas.
                  </p>
                  <a href="#" className="btn btn-outline-dark mt-auto">
                    Ver Catálogo
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={image3}
                  className="card-img-top"
                  alt="Figuras"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Figuras Coleccionables</h5>
                  <p className="card-text flex-grow-1">
                    Figuras de anime, videojuegos, Marvel, Star Wars y más.
                  </p>
                  <a href="#" className="btn btn-outline-dark mt-auto">
                    Ver Catálogo
                  </a>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-100 shadow-sm">
                <img
                  src={image4}
                  className="card-img-top"
                  alt="Componentes PC"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Componentes PC</h5>
                  <p className="card-text flex-grow-1">
                    Tarjetas gráficas, teclados mecánicos, monitores gaming y accesorios.
                  </p>
                  <a href="#" className="btn btn-outline-dark mt-auto">
                    Ver Catálogo
                  </a>
                </div>
              </div>
            </div>
          </div>
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
        `}
      </style>
    </>
  );
}