import { useCallback, useState } from "react";
import { 
    obtenerTecnologias, 
    obtenerProyectos,
} from "../services/contenidoApi.js";


const useContenido = () => {
    const [tecnologias,   setTecnologias] =   useState(null);
    const [proyectos, setProyectos]       =   useState(null);

    const cargarTecnologias = useCallback(async () => {
        try {
            const tecn = await obtenerTecnologias();
            setTecnologias(tecn);
        } catch {
            console.log("Ha habído un error intentando cargar las tecnologías.")
        }
    }, []);

    const cargarProyectos = useCallback (async () => {
        try {
            const pro = await obtenerProyectos();
            setProyectos(pro);
        } catch {
            console.log("Ha habído un error intentado cargar los proyectos.");
        }
    }, []);

    return {
        tecnologias,
        proyectos,
        cargarTecnologias,
        cargarProyectos,
        
    }
}

export default useContenido;