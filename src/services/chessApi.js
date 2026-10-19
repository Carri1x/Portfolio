import {post, get} from '../hooks/useApi.js';

const BASE_URL = import.meta.env.VITE_CHESS_API_URL ?? 'http://localhost:8080/chess';

export const crearPartida = ({ nombre, codigoEntrada, cookie }) =>
    post(`${BASE_URL}/create`, { nombre, codigoEntrada, cookie: cookie ?? null });

export const unirsePartida = ({ nombre, codigoEntrada, cookie }) =>
    post(`${BASE_URL}/join`, { nombre, codigoEntrada, cookie: cookie ?? null });

export const obtenerEstado = (idJugador) => get(`${BASE_URL}/estado/${idJugador}`);

export const obtenerMovimientosLegales = (idJugador, piezaId) =>
    get(`${BASE_URL}/movimientos/${idJugador}/${piezaId}`);

export const moverPieza = (idJugador, { piezaId, coordenadas }) =>
    post(`${BASE_URL}/movimiento/${idJugador}`, { piezaId, coordenadas });

export const convertirPieza = (idJugador, { piezaElegida, coordenadas }) =>
    post(`${BASE_URL}/convertir/${idJugador}`, { piezaElegida, coordenadas });
