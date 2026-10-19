import { post, get } from '../hooks/useApi.js';

const BASE_URL = import.meta.env.VITE_BASE_API_URL+'/contenidos';

export const obtenerTecnologias = () => get(`${BASE_URL}/tecnologias`);
export const obtenerProyectos   = () => get(`${BASE_URL}/proyectos`)