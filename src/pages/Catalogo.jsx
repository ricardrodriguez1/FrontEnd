// src/pages/Catalogo.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Importem imatges existents com a fallback
import ps2Img from './ps2.jpg';
import re4Img from './re4.jpg';
import gogetaImg from './gogeta.jpg';
import rtx4070Img from './4070.jpg';

// Catàleg de productes per categoria
const catalogoData = {
    videoconsolas: {
        titulo: 'Videoconsolas',
        descripcion: 'Les millors consoles de videojocs del mercat',
        color: '#2196F3',
        productos: [
            { _id: 'vc1', nombre: 'PlayStation 5', precio: 549.99, descripcion: 'La consola next-gen de Sony amb SSD ultrarrápida i DualSense.', imagen_url: ps2Img },
            { _id: 'vc2', nombre: 'PlayStation 5 Digital', precio: 449.99, descripcion: 'Versió digital sense lector de discs.', imagen_url: ps2Img },
            { _id: 'vc3', nombre: 'Xbox Series X', precio: 499.99, descripcion: 'La consola més potent de Microsoft amb 12 teraflops.', imagen_url: ps2Img },
            { _id: 'vc4', nombre: 'Xbox Series S', precio: 299.99, descripcion: 'Consola compacta i assequible de nova generació.', imagen_url: ps2Img },
            { _id: 'vc5', nombre: 'Nintendo Switch OLED', precio: 349.99, descripcion: 'Versió millorada amb pantalla OLED de 7 polzades.', imagen_url: ps2Img },
            { _id: 'vc6', nombre: 'Nintendo Switch Lite', precio: 199.99, descripcion: 'Versió portàtil exclusiva, lleugera i compacta.', imagen_url: ps2Img },
            { _id: 'vc7', nombre: 'Steam Deck 512GB', precio: 679.99, descripcion: 'El PC gaming portàtil de Valve amb SteamOS.', imagen_url: ps2Img },
            { _id: 'vc8', nombre: 'PlayStation 2 (Retro)', precio: 89.99, descripcion: 'La llegendària PS2 restaurada. Perfecta per col·leccionistes.', imagen_url: ps2Img },
        ]
    },
    videojuegos: {
        titulo: 'Videojuegos',
        descripcion: 'Els millors jocs per a totes les plataformes',
        color: '#4CAF50',
        productos: [
            { _id: 'vj1', nombre: 'Resident Evil 4 Remake', precio: 69.99, descripcion: 'El clàssic de terror reimaginat per a la nova generació.', imagen_url: re4Img },
            { _id: 'vj2', nombre: 'The Legend of Zelda: TOTK', precio: 69.99, descripcion: 'Explora Hyrule en aquesta èpica aventura de Nintendo.', imagen_url: re4Img },
            { _id: 'vj3', nombre: 'God of War Ragnarök', precio: 59.99, descripcion: 'Continua l\'aventura de Kratos i Atreus.', imagen_url: re4Img },
            { _id: 'vj4', nombre: 'Elden Ring', precio: 54.99, descripcion: 'El món obert de FromSoftware i George R.R. Martin.', imagen_url: re4Img },
            { _id: 'vj5', nombre: 'Hogwarts Legacy', precio: 64.99, descripcion: 'Viu la teva pròpia aventura a l\'univers de Harry Potter.', imagen_url: re4Img },
            { _id: 'vj6', nombre: 'Spider-Man 2', precio: 69.99, descripcion: 'Peter i Miles junts en la millor aventura de Spider-Man.', imagen_url: re4Img },
            { _id: 'vj7', nombre: 'Final Fantasy XVI', precio: 69.99, descripcion: 'L\'última entrega de la saga RPG més icònica.', imagen_url: re4Img },
            { _id: 'vj8', nombre: 'Baldur\'s Gate 3', precio: 59.99, descripcion: 'El millor RPG de l\'any amb 100+ hores de contingut.', imagen_url: re4Img },
        ]
    },
    figuras: {
        titulo: 'Figuras Coleccionables',
        descripcion: 'Figures d\'alta qualitat per a col·leccionistes',
        color: '#FF9800',
        productos: [
            { _id: 'fg1', nombre: 'Gogeta SSJ Blue (Banpresto)', precio: 89.99, descripcion: 'Figura de 25cm de Gogeta en estat SSJ Blue.', imagen_url: gogetaImg },
            { _id: 'fg2', nombre: 'Goku Ultra Instinct', precio: 79.99, descripcion: 'Figura premium de Goku en Migatte no Gokui.', imagen_url: gogetaImg },
            { _id: 'fg3', nombre: 'Vegeta SSBE', precio: 74.99, descripcion: 'Vegeta en Super Saiyan Blue Evolved.', imagen_url: gogetaImg },
            { _id: 'fg4', nombre: 'Naruto Sage Mode', precio: 69.99, descripcion: 'Naruto en mode Sennin amb efectes de chakra.', imagen_url: gogetaImg },
            { _id: 'fg5', nombre: 'Luffy Gear 5', precio: 99.99, descripcion: 'Figura exclusiva de Luffy Nika amb efectes especials.', imagen_url: gogetaImg },
            { _id: 'fg6', nombre: 'Tanjiro Kamado', precio: 59.99, descripcion: 'Figura de Demon Slayer amb espasa nichirin.', imagen_url: gogetaImg },
            { _id: 'fg7', nombre: 'Eren Jaeger (Titan)', precio: 129.99, descripcion: 'Figura grande del Titan d\'Atac de 40cm.', imagen_url: gogetaImg },
            { _id: 'fg8', nombre: 'Saitama (One Punch Man)', precio: 54.99, descripcion: 'El heroi més fort amb pose còmica.', imagen_url: gogetaImg },
        ]
    },
    componentes: {
        titulo: 'Componentes PC',
        descripcion: 'Hardware gaming d\'alt rendiment',
        color: '#9C27B0',
        productos: [
            { _id: 'pc1', nombre: 'NVIDIA RTX 4070 Super', precio: 649.99, descripcion: 'Targeta gràfica d\'última generació amb DLSS 3.', imagen_url: rtx4070Img },
            { _id: 'pc2', nombre: 'NVIDIA RTX 4080 Super', precio: 999.99, descripcion: 'Potència extrema per a 4K gaming.', imagen_url: rtx4070Img },
            { _id: 'pc3', nombre: 'AMD RX 7800 XT', precio: 549.99, descripcion: 'Excel·lent rendiment-preu per a 1440p.', imagen_url: rtx4070Img },
            { _id: 'pc4', nombre: 'Intel Core i7-14700K', precio: 449.99, descripcion: 'Processador de 20 nuclis per a gaming i creació.', imagen_url: rtx4070Img },
            { _id: 'pc5', nombre: 'AMD Ryzen 7 7800X3D', precio: 399.99, descripcion: 'El millor processador per a gaming amb 3D V-Cache.', imagen_url: rtx4070Img },
            { _id: 'pc6', nombre: 'Corsair Vengeance 32GB DDR5', precio: 159.99, descripcion: 'Memòria RAM DDR5-6000 amb RGB.', imagen_url: rtx4070Img },
            { _id: 'pc7', nombre: 'Samsung 990 Pro 2TB', precio: 189.99, descripcion: 'SSD NVMe Gen4 amb 7450MB/s de lectura.', imagen_url: rtx4070Img },
            { _id: 'pc8', nombre: 'Logitech G Pro X Superlight', precio: 149.99, descripcion: 'Ratolí wireless per a esports de 63g.', imagen_url: rtx4070Img },
        ]
    }
};

export default function Catalogo() {
    const { categoria } = useParams();
    const navigate = useNavigate();
    const [carret, setCarret] = useState([]);

    const catalogo = catalogoData[categoria];

    if (!catalogo) {
        return (
            <div className="container py-5 text-center">
                <h2>Categoria no trobada</h2>
                <p className="text-muted">La categoria "{categoria}" no existeix.</p>
                <Link to="/" className="btn btn-success">Tornar a la botiga</Link>
            </div>
        );
    }

    const afegirAlCarret = (producte) => {
        const existent = carret.find(p => p._id === producte._id);
        if (existent) {
            setCarret(carret.map(p =>
                p._id === producte._id ? { ...p, quantitat: p.quantitat + 1 } : p
            ));
        } else {
            setCarret([...carret, { ...producte, quantitat: 1 }]);
        }
        alert(`✅ ${producte.nombre} afegit al carret!`);
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

    return (
        <>
            {/* Header de la categoria */}
            <section className="py-5 text-white" style={{ background: `linear-gradient(135deg, ${catalogo.color}, #1a1a2e)` }}>
                <div className="container">
                    <nav aria-label="breadcrumb" className="mb-3">
                        <ol className="breadcrumb" style={{ background: 'transparent' }}>
                            <li className="breadcrumb-item"><Link to="/" className="text-white-50">Inici</Link></li>
                            <li className="breadcrumb-item active text-white">{catalogo.titulo}</li>
                        </ol>
                    </nav>
                    <h1 className="display-5 fw-bold">{catalogo.titulo}</h1>
                    <p className="lead">{catalogo.descripcion}</p>
                    <span className="badge bg-light text-dark">{catalogo.productos.length} productes</span>
                </div>
            </section>

            {/* Carret flotant */}
            {carret.length > 0 && (
                <div className="position-fixed bottom-0 end-0 m-4 p-3 bg-dark text-white rounded-3 shadow-lg" style={{ zIndex: 1000 }}>
                    <div className="d-flex align-items-center gap-3">
                        <span>🛒 {totalItems} articles</span>
                        <span className="fw-bold text-success">{totalCarret.toFixed(2)}€</span>
                        <button className="btn btn-success btn-sm" onClick={anarACheckout}>
                            Comprar
                        </button>
                    </div>
                </div>
            )}

            {/* Grid de productes */}
            <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {catalogo.productos.map((producte) => (
                            <div className="col" key={producte._id}>
                                <div className="card h-100 shadow-sm border-0" style={{ transition: 'transform 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                    <div className="position-relative">
                                        <img
                                            src={producte.imagen_url}
                                            className="card-img-top"
                                            alt={producte.nombre}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                        <span className="position-absolute top-0 end-0 m-2 badge"
                                            style={{ backgroundColor: catalogo.color }}>
                                            {producte.precio.toFixed(2)}€
                                        </span>
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{producte.nombre}</h5>
                                        <p className="card-text text-muted small flex-grow-1">{producte.descripcion}</p>
                                        <button
                                            className="btn w-100 text-white"
                                            style={{ backgroundColor: catalogo.color }}
                                            onClick={() => afegirAlCarret(producte)}
                                        >
                                            🛒 Afegir al carret
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Botó tornar */}
            <section className="py-4 bg-white">
                <div className="container text-center">
                    <Link to="/" className="btn btn-outline-dark btn-lg">
                        ← Tornar a categories
                    </Link>
                </div>
            </section>
        </>
    );
}
