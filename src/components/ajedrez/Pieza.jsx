const UNICODE = {
    BLANCO: { REY: '♔', REINA: '♕', TORRE: '♖', ALFIL: '♗', CABALLO: '♘', PEON: '♙' },
    NEGRO: { REY: '♚', REINA: '♛', TORRE: '♜', ALFIL: '♝', CABALLO: '♞', PEON: '♟' },
};

const Pieza = ({ tipo, color }) => (
    <span style={{
        fontSize: 'calc(var(--casilla-tablero) * 0.55)',
        lineHeight: 1,
        userSelect: 'none',
        color: color === 'BLANCO' ? '#fff' : '#1a1a2e',
        textShadow: color === 'BLANCO'
            ? '0 0 3px #000, 0 0 4px #000'
            : '0 0 2px rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        {UNICODE[color]?.[tipo]}
    </span>
);

export default Pieza;
