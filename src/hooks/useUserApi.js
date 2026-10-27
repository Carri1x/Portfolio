import { useCallback, useEffect, useState } from "react";
import { leer, guardar } from './useLocalStorage.js';
import { obtenerUsuario, obtenerNombrePredeterminado } from "../services/userApi.js";

const useUserApi = () => {
    const [nombreUsuarioPredeterimnado, setNombreUsuarioPredeterminado] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [cookie, setCookie] = useState(null);

    const cargarUsuario = useCallback(async () => {
        if (usuario) return;
        // Si no hay cookie guardada, no hay ningún usuario que cargar (se queda en null -> foto por defecto).
        const cookieUsuario = leer(`cookieUsuario`)
        if (!cookieUsuario) return;
        setCookie(cookieUsuario); // Guardamos el id del usuario en la cookie para facilitar luego nuevas facilidades al entrar.
        try {
            const usuarioObtenido = await obtenerUsuario(cookieUsuario);
            setUsuario(usuarioObtenido);
            guardar(usuarioObtenido.id); // Guardamos el id del usuario en el local storage.
        } catch {
            setUsuario(null);
            console.log(error);
        }
    }, []);

    const cargarNombreUsuario = useCallback(async () => {
        try {
            const nombre = await obtenerNombrePredeterminado(); 
            setNombreUsuarioPredeterminado(nombre);
        } catch (error) {
            console.log(error);
        }
    }) 

    const registrar = useCallback(async () => {

    })

    useEffect(() => {
        // setState ocurre dentro del async/catch de cargarUsuario, no de forma síncrona en el efecto.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarUsuario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!usuario?.nombre)  { // Si no existe el nombre del usuario, buscamos el nombre predeterminado que se le da en el backend.
            cargarNombreUsuario();
        }
    }, [usuario])
    
    return {
        usuario,
        nombreUsuarioPredeterimnado
    };
};

export default useUserApi;