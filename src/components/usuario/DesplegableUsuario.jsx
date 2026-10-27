import { useEffect, useRef, useState } from 'react';
import useUserApi from '../../hooks/useUserApi.js';
import FotoUsuario from './FotoUsuario.jsx';
import './DesplegableUsuario.scss'; // Asegúrate de importar sus estilos

const Usuario = () => {
    const { usuario } = useUserApi();
    const [abierto, setAbierto] = useState(false);
    const contenedorRef = useRef(null);
    
    useEffect(() => {
        if (!abierto) return;

        const manejarClickFuera = (e) => {
            if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
                setAbierto(false);
            }
        };

        document.addEventListener('mousedown', manejarClickFuera);
        return () => document.removeEventListener('mousedown', manejarClickFuera);
    }, [abierto]);

    return (
        <div ref={contenedorRef} className="usuario-menu-container">
            {/* El botón contenedor siempre renderiza la foto y maneja el click */}
            <button
                className="usuario-boton-trigger"
                onClick={() => setAbierto(valor => !valor)}
                aria-expanded={abierto}
            >
                <FotoUsuario />
            </button>

            {/* El desplegable se renderiza de forma condicional sin hacer desaparecer el botón */}
            {abierto && (
                <div className="usuario-desplegable">
                    <div className="usuario-info-cabecera">
                        <span className="usuario-nombre">
                            {usuario?.nombre || 'Nombre de Usuario'}
                        </span>
                        <span className="usuario-email">{usuario?.email || 'usuario@correo.com'}</span>
                    </div>

                    <hr className="usuario-divisor" />

                    <ul className="usuario-opciones-lista">
                        <li><a href="/perfil">Mi Perfil</a></li>
                        <li><a href="#ajustes">Ajustes</a></li>
                        {usuario ?? (
                            < li className="opcion-logout">
                                <button onClick={() => console.log("Cerrar sesión")}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )
            }
        </div >
    );
};

export default Usuario;
