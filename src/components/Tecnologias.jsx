import Tecnologia from "./Tecnologia.jsx";
import useContenido from '../hooks/useContenido.js';

const Tecnologias = () => {
    const {tecnologias} = useContenido();

    return (
        <>  
            {
                tecnologias ?
                tecnologias.map((tecnologia) => {
                    return <Tecnologia data={tecnologia}/>
                })
                :
                <p>No hay tecnologías</p>
            }
        </>
    );
};

export default Tecnologias;