import './Header.css';
import { Link } from 'react-router-dom';
import DesplegableUsuario from '../usuario/DesplegableUsuario.jsx';

const Header = () => {

    return (
        <>
            <div className='container-header'>
                <Link to='/about'>Sobre mí</Link>
                <Link to='/proyectos'>Proyectos</Link>
                <Link to='/juegos'>Juegos propios</Link>

                <DesplegableUsuario />
            </div>
            
        </>
    );
};

export default Header;