import './PerfilUsuario.scss';

import FotoUsuario from './FotoUsuario.jsx';
import Logros from './Logros.jsx';
import Layout from '../base/Layout.jsx';

import useUserApi from '../../hooks/useUserApi.js';

import { useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
    const navegar = useNavigate();

    const {
        usuario,
        nombreUsuarioPredeterminado,
    } = useUserApi();

    return (
        <div className="perfil-container">
            <Layout>
                <main className="main-perfil-usuario">

                    <FotoUsuario />

                    <span className="nombre-usuario">
                        {usuario?.nombre
                            ? usuario.nombre
                            : (nombreUsuarioPredeterminado ? nombreUsuarioPredeterminado : 'Nombre de usuario')}
                    </span>
                    
                    <div className="usuario-info">
                        <span className="email-texto">{usuario?.email ? usuario.email : `email@usuario.com`}</span>
                        <small className="btn-registro" onClick={() => { navegar('/registrar') }}>Registrarme</small>
                    </div>
                </main>

                <Logros />
            </Layout>
        </div>
    );
}

export default PerfilUsuario;