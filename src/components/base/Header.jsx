import './Header.scss';
import { Link } from 'react-router-dom';
import MenuHamburguesa from './MenuHamburguesa.jsx';
import DesplegableUsuario from '../usuario/DesplegableUsuario.jsx';
import { useMenuHamburguesa } from '../../hooks/useMenuHamburguesa.js';

const Header = () => {
    const { menuAbierto, menuRef, botonRef, cerrarMenu, toggleMenu } = useMenuHamburguesa();

    return (
        <header>
            <MenuHamburguesa 
                menuAbierto={menuAbierto} 
                toggleMenu={toggleMenu} 
                botonRef={botonRef} 
            />

            <nav
                ref={menuRef}
                className={`nav-links ${menuAbierto ? 'abierto' : ''}`}
                onClick={(e) => {
                    if (e.target.tagName === 'A') {
                        cerrarMenu();
                    }
                }}
            >
                <Link to='/about'>Sobre mí</Link>
                <Link to='/proyectos'>Proyectos</Link>
                <Link to='/juegos'>Juegos propios</Link>
            </nav>

            <DesplegableUsuario />
        </header>
    );
};

export default Header;