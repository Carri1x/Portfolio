import { post, get } from '../hooks/useApi.js';

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

export const obtenerUsuario = (idUsuario) => get(`${BASE_URL}/${idUsuario}`);
export const obtenerUsuarioByCookie = () => {
    const cookie = leer('cookieUsuario');
    if(!cookie) return;
    try {
        return obtenerUsuario(cookie);
    } catch {
        return;
    }
}