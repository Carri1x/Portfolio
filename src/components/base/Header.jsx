import './Header.css';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import DesplegableUsuario from '../usuario/DesplegableUsuario.jsx';

const Header = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Creamos dos referencias independientes
    const menuRef = useRef(null);
    const botonRef = useRef(null);

    useEffect(() => {
        if (!menuAbierto) return;

        const manejarClickFuera = (e) => {
            // COMPROBACIÓN DOBLE: 
            // Si el clic es fuera del menú Y ADEMÁS es fuera del botón de hamburguesa...
            if (
                menuRef.current && !menuRef.current.contains(e.target) &&
                botonRef.current && !botonRef.current.contains(e.target)
            ) {
                setMenuAbierto(false); // ...entonces cerramos de forma segura.
            }
        };

        document.addEventListener('mousedown', manejarClickFuera);
        return () => document.removeEventListener('mousedown', manejarClickFuera);
    }, [menuAbierto]);

    return (
        <>
            <header>
                {/* Asignamos botonRef al botón hamburguesa */}
                <button
                    ref={botonRef}
                    className={`menu-hamburguesa ${menuAbierto ? 'activo' : ''}`}
                    onClick={() => setMenuAbierto(!menuAbierto)}
                    aria-label='Abrir menú de navegación'
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Asignamos menuRef a la navegación */}
                <nav
                    ref={menuRef}
                    className={`nav-links ${menuAbierto ? 'abierto' : ''}`}
                    onClick={(e) => {
                        const nameElement = e.target.tagName;
                        if (nameElement === 'A') {
                            setMenuAbierto(false);
                        }
                    }}
                >
                    <Link to='/about'>Sobre mí</Link>
                    <Link to='/proyectos'>Proyectos</Link>
                    <Link to='/juegos'>Juegos propios</Link>
                </nav>

                <DesplegableUsuario />
            </header>
        </>
    );
};

export default Header;
