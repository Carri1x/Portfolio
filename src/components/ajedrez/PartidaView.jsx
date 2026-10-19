import { useChessGame, miColor as calcularMiColor } from '../../hooks/useChessGame';
import Lobby from './Lobby';
import Tablero from './Tablero';
import PromocionModal from './PromocionModal';

const contenedorStyle = { display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'sans-serif', padding: '20px' };

const botonReset = {
    marginTop: '20px',
    padding: '10px 24px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#8b4513',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
};

const construirMensaje = (partida, color) => {
    const nombreBlancas = partida.jugadorBlancas?.nombre ?? 'Blancas';
    const nombreNegras = partida.jugadorNegras?.nombre ?? 'Negras';
    const turno = partida.turnoActual === 'BLANCO' ? nombreBlancas : nombreNegras;

    if (partida.estadoJuego === 'JAQUE_MATE') {
        const ganador = partida.turnoActual === 'BLANCO' ? nombreNegras : nombreBlancas;
        return `¡Jaque mate! Gana ${ganador}`;
    }
    if (partida.estadoJuego === 'AHOGADO') return 'Ahogado — Empate';
    if (partida.estadoJuego === 'ABANDONO') return `Victoria por abandono de ${partida.ganador?.nombre ?? '—'}`;
    if (partida.estadoJuego === 'JAQUE') return `¡Jaque! Turno de ${turno}`;
    if (!color) return `Turno de ${turno}`;
    return color === partida.turnoActual ? 'Tu turno' : `Esperando a ${turno}`;
};

const PartidaView = () => {
    const {
        jugadorId, nombre, codigoEntrada, partida, fase, error,
        promocionPendiente, movimientosLegales, piezaSeleccionada, oponenteConectado,
        crear, unirse, seleccionarPieza, mover, elegirPromocion, salir,
    } = useChessGame();

    if (fase === 'cargando') {
        return <div style={contenedorStyle}><p>Cargando…</p></div>;
    }

    if (fase === 'lobby') {
        return <Lobby nombreInicial={nombre} onCrear={crear} onUnirse={unirse} error={error} />;
    }

    if (fase === 'esperando') {
        return (
            <div style={contenedorStyle}>
                <h2 style={{ color: '#2c3e50' }}>Esperando a tu rival…</h2>
                <p>Comparte este código para que se una a la partida:</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '2px', color: '#8b4513' }}>{codigoEntrada}</p>
                {error && <p style={{ color: '#c0392b' }}>{error}</p>}
                <button style={botonReset} onClick={salir}>Cancelar</button>
            </div>
        );
    }

    if (!partida) {
        return <div style={contenedorStyle}><p>No se pudo cargar la partida.</p></div>;
    }

    const miColorReal = calcularMiColor(partida, jugadorId);
    const terminado = fase === 'terminada';
    const esMiTurno = miColorReal === partida.turnoActual;
    const disabled = terminado || !esMiTurno || promocionPendiente != null;
    const mensaje = construirMensaje(partida, miColorReal);

    return (
        <div style={contenedorStyle}>
            <h2 style={{
                marginBottom: '16px',
                color: terminado ? '#c0392b' : partida.estadoJuego === 'JAQUE' ? '#e67e22' : '#2c3e50',
                fontSize: '1.2rem',
            }}>
                {mensaje}
            </h2>

            {!oponenteConectado && !terminado && (
                <p style={{ color: '#e67e22', fontSize: '0.85rem', marginTop: '-10px', marginBottom: '12px' }}>
                    ⚠ Tu rival se ha desconectado. Si no vuelve en 2 minutos, ganarás la partida por abandono.
                </p>
            )}

            <Tablero
                casillas={partida.tablero.casillas}
                miColor={miColorReal ?? 'BLANCO'}
                piezaSeleccionada={piezaSeleccionada}
                movimientosLegales={movimientosLegales}
                disabled={disabled}
                onSeleccionarPieza={seleccionarPieza}
                onMover={mover}
            />

            {error && <p style={{ color: '#c0392b', marginTop: '12px' }}>{error}</p>}

            {terminado && (
                <button style={botonReset} onClick={salir}>Nueva partida</button>
            )}

            {promocionPendiente && (
                <PromocionModal color={promocionPendiente.color} onElegir={elegirPromocion} />
            )}
        </div>
    );
};

export default PartidaView;
