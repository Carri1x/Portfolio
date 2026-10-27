import './FotoUsuario.scss';
import useUserApi from '../../hooks/useUserApi';
import IconoUsuario from '../base/IconoUsuario.jsx';

const FotoUsuario = () => {
    const { usuario } = useUserApi();

    return (
        <div className='container-foto-usuario'>
            {
                usuario?.foto ?
                    <img
                        className='foto-usuario'
                        src={usuario.foto} // Corrección de la lógica de renderizado
                        alt="Foto del usuario"
                        draggable={false}
                    /> :
                    /* El SVG heredará de forma responsiva el tamaño que le des a .container-foto-usuario en CSS */
                    <IconoUsuario /> 
            }
        </div>
    );
};

export default FotoUsuario;
