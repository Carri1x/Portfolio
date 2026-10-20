import { useState } from "react";
import './Proyecto.scss';

const Proyecto = (props) => {
    const { nombre, imagen, descripcion, tecnologias, } = props.data;
    const [ seleccionado, setSeleccionado ] = useState(false);

    return (
        <>
            <div 
                onClick={setSeleccionado(valor => !valor)}
                style={`background-image: url(${imagen})`}
            >
                {nombre}

                {
                    seleccionado && // Si se selecciona el proyecto saldrá este div.
                    <div>
                        <p>{descripcion}</p>
                        {tecnologias.map((tecnologia) => {
                                return <Tecnologia data={tecnologia} />
                            })
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default Proyecto;