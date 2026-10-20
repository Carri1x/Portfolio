import './FotoUsuario.scss';
import useUserApi from '../../hooks/useUserApi';
import iconoUsuario from '/iconoUsuario.png';

const FotoUsuario = () => {
    const {
        usuario
    } = useUserApi();

    return (
        <>
            <div className='container-foto-usuario'>
                <img 
                className='foto-usuario'
                src={ usuario ? usuario.foto : iconoUsuario }
                alt={usuario ? "Icono del usuario" : "Icono predeterminado de usuario."} 
                draggable={false}
                />
            </div>
            
        </>
    );
};

export default FotoUsuario;