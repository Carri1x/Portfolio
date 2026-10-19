import { Client } from '@stomp/stompjs';

const API_URL = import.meta.env.VITE_CHESS_API_URL ?? 'http://localhost:8080/chess';
const WS_URL = API_URL.replace(/\/chess\/?$/, '').replace(/^http/, 'ws') + '/ws';

export const crearClienteStomp = () => new Client({
    brokerURL: WS_URL,
    reconnectDelay: 3000,
});

export const temaJugador = (jugadorId) => `/topic/jugador/${jugadorId}/partida-iniciada`;
export const temaEstadoPartida = (partidaId) => `/topic/partida/${partidaId}/estado`;
export const temaPresenciaPartida = (partidaId) => `/topic/partida/${partidaId}/presencia`;
export const DESTINO_PRESENCIA = '/app/presencia';
