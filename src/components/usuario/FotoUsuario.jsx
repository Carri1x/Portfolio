import './FotoUsuario.css';
import useUserApi from '../../hooks/useUserApi';
import iconoUsuario from '/iconoUsuario.png';

const FotoUsuario = () => {
    const {
        usuario
    } = useUserApi();

    return (
        <>
            <img 
                className='foto-usuario'
                src={ usuario ? usuario.foto : iconoUsuario }
                alt={usuario ? "Icono del usuario" : "Icono predeterminado de usuario."} 
                draggable={false}
            />
        </>
    );
};

export default FotoUsuario;