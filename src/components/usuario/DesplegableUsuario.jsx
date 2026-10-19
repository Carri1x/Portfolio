import { useEffect, useRef, useState } from 'react';
import useUserApi from '../../hooks/useUserApi.js';
import FotoUsuario from './FotoUsuario.jsx';

const Usuario = () => {
    const {
        usuario,
    } = useUserApi();
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
        <div ref={contenedorRef}  onClick={() => {setAbierto(valor => !valor)}}>
            {!abierto ? // Si no está abierto dejamos solo la foto, en cambio, mostramos las opciones de usuario. 
                <FotoUsuario />
            :
                <>
                    <div>
                        <div>{/*usuario.nombre*/} Aquí irá el nombre del usuario</div>
                        <FotoUsuario />
                    </div>
                    <div>Cerrar Sesión</div>
                </>
            }
        </div>
    );
};

export default Usuario;