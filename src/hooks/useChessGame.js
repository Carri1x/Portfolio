import { useCallback, useEffect, useRef, useState } from 'react';
import * as api from '../services/chessApi';
import { crearClienteStomp, temaJugador, temaEstadoPartida, temaPresenciaPartida, DESTINO_PRESENCIA } from '../services/chessSocket';
import { leer, guardar } from './useLocalStorage.js';
const STORAGE = {
    jugadorId: 'chess:jugadorId',
    nombre: 'chess:nombre',
    codigoEntrada: 'chess:codigoEntrada',
    rol: 'chess:rol', // 'creador' | 'invitado'
};

const JUEGO_TERMINADO = new Set(['JAQUE_MATE', 'AHOGADO', 'ABANDONO']);

export function miColor(partida, jugadorId) {
    if (!partida || !jugadorId) return null;
    if (partida.jugadorBlancas?.id === jugadorId) return 'BLANCO';
    if (partida.jugadorNegras?.id === jugadorId) return 'NEGRO';
    return null;
}

export function useChessGame() {
    const [jugadorId, setJugadorId] = useState(() => leer(STORAGE.jugadorId) || null);
    const [nombre, setNombre] = useState(() => leer(STORAGE.nombre));
    const [codigoEntrada, setCodigoEntrada] = useState(() => leer(STORAGE.codigoEntrada));
    const [partida, setPartida] = useState(null);
    // cargando | lobby | esperando | jugando | terminada
    const [fase, setFase] = useState(() => (leer(STORAGE.jugadorId) ? 'cargando' : 'lobby'));
    const [error, setError] = useState(null);
    const [promocionPendiente, setPromocionPendiente] = useState(null); // { piezaId, coordenadas, color }
    const [movimientosLegales, setMovimientosLegales] = useState([]);
    const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);
    const [oponenteConectado, setOponenteConectado] = useState(true);
    const clienteRef = useRef(null);

    const persistirIdentidad = useCallback((id, nombreJugador) => {
        setJugadorId(id);
        setNombre(nombreJugador);
        guardar(STORAGE.jugadorId, id);
        guardar(STORAGE.nombre, nombreJugador);
    }, []);

    const aplicarPartida = useCallback((partidaRecibida) => {
        setPartida(partidaRecibida);
        setFase(JUEGO_TERMINADO.has(partidaRecibida.estadoJuego) ? 'terminada' : 'jugando');
    }, []);

    const cargarEstado = useCallback(async (id, { esInicial = false } = {}) => {
        try {
            const res = await api.obtenerEstado(id);
            aplicarPartida(res.partida);
            setError(null);
            return res.partida;
        } catch {
            if (esInicial) setFase(leer(STORAGE.rol) === 'creador' ? 'esperando' : 'lobby');
            return null;
        }
    }, [aplicarPartida]);

    // Al montar: si ya conocemos a este jugador (localStorage), intentamos recuperar su partida en curso vía REST.
    // A partir de ahí, las actualizaciones en vivo (rival unido, movimientos, presencia) llegan por WebSocket.
    useEffect(() => {
        if (!jugadorId) return;
        // setState ocurre dentro del async/catch de cargarEstado, no de forma síncrona en el efecto.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarEstado(jugadorId, { esInicial: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jugadorId]);

    // Una única conexión WebSocket para toda la vida del hook.
    useEffect(() => {
        const cliente = crearClienteStomp();
        clienteRef.current = cliente;
        cliente.activate();
        return () => {
            cliente.deactivate();
            clienteRef.current = null;
        };
    }, []);

    // Mientras esperamos rival: nos suscribimos a nuestro propio canal para saber en cuanto alguien se una.
    useEffect(() => {
        if (!jugadorId || fase !== 'esperando') return;
        const cliente = clienteRef.current;
        if (!cliente) return;

        let sub = null;
        const suscribir = () => {
            sub = cliente.subscribe(temaJugador(jugadorId), (mensaje) => {
                aplicarPartida(JSON.parse(mensaje.body));
            });
        };
        if (cliente.connected) suscribir();
        cliente.onConnect = suscribir;

        // Red de seguridad: el aviso por WebSocket es "fire-and-forget" (si la suscripción
        // no llegó a tiempo, ese mensaje se pierde para siempre). Repreguntamos por REST cada
        // pocos segundos para no quedarnos colgados en "esperando" si eso llega a pasar.
        const intervalo = setInterval(() => cargarEstado(jugadorId), 3000);

        return () => { sub?.unsubscribe(); clearInterval(intervalo); };
    }, [jugadorId, fase, aplicarPartida, cargarEstado]);

    // Mientras jugamos: nos suscribimos a los movimientos y a la presencia del rival, y avisamos que estamos aquí.
    useEffect(() => {
        const partidaId = partida?.id;
        if (!jugadorId || !partidaId || fase !== 'jugando') return;
        const cliente = clienteRef.current;
        if (!cliente) return;

        let subs = [];
        const suscribir = () => {
            subs = [
                cliente.subscribe(temaEstadoPartida(partidaId), (mensaje) => {
                    aplicarPartida(JSON.parse(mensaje.body));
                }),
                cliente.subscribe(temaPresenciaPartida(partidaId), (mensaje) => {
                    const evento = JSON.parse(mensaje.body);
                    if (evento.jugadorId !== jugadorId) setOponenteConectado(evento.conectado);
                }),
            ];
            cliente.publish({ destination: DESTINO_PRESENCIA, body: JSON.stringify({ jugadorId, partidaId }) });
        };
        if (cliente.connected) suscribir();
        cliente.onConnect = suscribir;

        // Misma red de seguridad que en "esperando": si se pierde el push de un movimiento
        // (reconexión, etc.) esto evita quedarnos con un tablero desactualizado indefinidamente.
        const intervalo = setInterval(() => cargarEstado(jugadorId), 5000);

        return () => { subs.forEach((s) => s.unsubscribe()); clearInterval(intervalo); };
    }, [jugadorId, partida?.id, fase, aplicarPartida, cargarEstado]);

    const crear = useCallback(async (nombreJugador, codigo) => {
        setError(null);
        try {
            const res = await api.crearPartida({ nombre: nombreJugador, codigoEntrada: codigo, cookie: jugadorId });
            persistirIdentidad(res.jugador.id, nombreJugador);
            guardar(STORAGE.codigoEntrada, codigo);
            guardar(STORAGE.rol, 'creador');
            setCodigoEntrada(codigo);
            setFase('esperando');
        } catch (err) {
            setError(err.message);
        }
    }, [jugadorId, persistirIdentidad]);

    const unirse = useCallback(async (nombreJugador, codigo) => {
        setError(null);
        try {
            const res = await api.unirsePartida({ nombre: nombreJugador, codigoEntrada: codigo, cookie: jugadorId });
            const partidaRecibida = res.partida;
            const yo = partidaRecibida.jugadorBlancas?.nombre === nombreJugador
                ? partidaRecibida.jugadorBlancas
                : partidaRecibida.jugadorNegras;
            persistirIdentidad(yo.id, nombreJugador);
            guardar(STORAGE.rol, 'invitado');
            aplicarPartida(partidaRecibida);
        } catch (err) {
            setError(err.message);
        }
    }, [jugadorId, persistirIdentidad, aplicarPartida]);

    const seleccionarPieza = useCallback(async (pieza) => {
        setPromocionPendiente(null);
        if (!pieza) { setPiezaSeleccionada(null); setMovimientosLegales([]); return; }
        setPiezaSeleccionada(pieza);
        try {
            const res = await api.obtenerMovimientosLegales(jugadorId, pieza.id);
            setMovimientosLegales(res.movimientos ?? []);
        } catch (err) {
            setMovimientosLegales([]);
            setError(err.message);
        }
    }, [jugadorId]);

    const mover = useCallback(async (coordenadas) => {
        if (!piezaSeleccionada) return;
        setError(null);
        try {
            const res = await api.moverPieza(jugadorId, { piezaId: piezaSeleccionada.id, coordenadas });
            if (res.estadoJuego == null) {
                // El peón llegó al final del tablero: hay que elegir a qué pieza se convierte.
                setPartida((prev) => ({ ...prev, tablero: res.tablero }));
                setPromocionPendiente({ piezaId: piezaSeleccionada.id, coordenadas, color: piezaSeleccionada.color });
            } else {
                setPartida((prev) => ({ ...prev, tablero: res.tablero, estadoJuego: res.estadoJuego }));
                setFase(JUEGO_TERMINADO.has(res.estadoJuego) ? 'terminada' : 'jugando');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setPiezaSeleccionada(null);
            setMovimientosLegales([]);
        }
    }, [jugadorId, piezaSeleccionada]);

    const elegirPromocion = useCallback(async (tipo) => {
        if (!promocionPendiente) return;
        setError(null);
        try {
            const res = await api.convertirPieza(jugadorId, {
                piezaElegida: { tipo, color: promocionPendiente.color },
                coordenadas: promocionPendiente.coordenadas,
            });
            setPromocionPendiente(null);
            setPartida((prev) => ({ ...prev, tablero: res.tablero, estadoJuego: res.estadoJuego }));
            setFase(JUEGO_TERMINADO.has(res.estadoJuego) ? 'terminada' : 'jugando');
        } catch (err) {
            setError(err.message);
        }
    }, [jugadorId, promocionPendiente]);

    const salir = useCallback(() => {
        guardar(STORAGE.jugadorId, null);
        guardar(STORAGE.codigoEntrada, null);
        guardar(STORAGE.rol, null);
        setJugadorId(null);
        setCodigoEntrada('');
        setPartida(null);
        setPiezaSeleccionada(null);
        setMovimientosLegales([]);
        setPromocionPendiente(null);
        setOponenteConectado(true);
        setError(null);
        setFase('lobby');
    }, []);

    return {
        jugadorId,
        nombre,
        codigoEntrada,
        partida,
        fase,
        error,
        promocionPendiente,
        movimientosLegales,
        piezaSeleccionada,
        oponenteConectado,
        crear,
        unirse,
        seleccionarPieza,
        mover,
        elegirPromocion,
        salir,
    };
}
