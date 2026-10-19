import { useCallback, useEffect, useState } from "react";
import { leer, guardar } from './useLocalStorage.js';
import { obtenerUsuario } from "../services/userApi.js";

const useUserApi = () => {
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
        } catch {
            setUsuario(null);
        }
    }, []);

    useEffect(() => {
        // setState ocurre dentro del async/catch de cargarUsuario, no de forma síncrona en el efecto.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarUsuario();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return {
        // Funciones y variables a exportar
        usuario,
    };
};

export default useUserApi;