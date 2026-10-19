import Pieza from './Pieza';

const Casilla = ({ pieza, esClara, seleccionada, esMovimientoValido, onClick }) => {
    let backgroundColor;
    if (seleccionada) {
        backgroundColor = '#f6f669';
    } else if (esMovimientoValido) {
        backgroundColor = esClara ? '#cdd16a' : '#aaa23a';
    } else {
        backgroundColor = esClara ? '#f0d9b5' : '#b58863';
    }

    return (
        <div
            onClick={onClick}
            style={{
                width: 'var(--casilla-tablero)',
                height: 'var(--casilla-tablero)',
                backgroundColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                boxSizing: 'border-box',
                transition: 'background-color 0.1s',
            }}
        >
            {esMovimientoValido && !pieza && (
                <div style={{
                    width: '30%',
                    height: '30%',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.18)',
                    position: 'absolute',
                }} />
            )}
            {esMovimientoValido && pieza && (
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    boxShadow: 'inset 0 0 0 4px rgba(200,0,0,0.45)',
                }} />
            )}
            {pieza && <Pieza tipo={pieza.tipo} color={pieza.color} />}
        </div>
    );
};

export default Casilla;
