import Tecnologias from './Tecnologias.jsx';
import Proyectos from './Proyectos.jsx';
import { leer } from '../hooks/useLocalStorage.js';
const Contenido = () => {

    console.log(leer('cookieUsuario'));

    return (
        <>
            <Tecnologias />
            <Proyectos />
        </>
    )
}

export default Contenido;