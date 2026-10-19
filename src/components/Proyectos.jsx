import useContenido from "../hooks/useContenido.js";
import Proyecto from './Proyecto.jsx';

const Proyectos = () => {
    const {proyectos} = useContenido();

    return (
        <>
            {
                proyectos ? 
                proyectos.map((proyecto) => {
                    return <Proyecto data={proyecto} />
                })
                :
                <p>No hay proyectos.</p>
            }
        </>
    );
};

export default Proyectos;