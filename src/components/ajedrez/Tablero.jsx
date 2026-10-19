import Casilla from './Casilla';

const LETRAS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const esMismaCoordenada = (a, b) => a.fila === b.fila && a.columna === b.columna;

const Tablero = ({ casillas, miColor, piezaSeleccionada, movimientosLegales, disabled, onSeleccionarPieza, onMover }) => {
    const filaEsOscura = miColor === 'NEGRO';
    const filas = filaEsOscura ? [0, 1, 2, 3, 4, 5, 6, 7] : [7, 6, 5, 4, 3, 2, 1, 0];
    const columnas = filaEsOscura ? [7, 6, 5, 4, 3, 2, 1, 0] : [0, 1, 2, 3, 4, 5, 6, 7];

    const esMovimientoValido = (fila, columna) =>
        movimientosLegales.some((c) => c.fila === fila && c.columna === columna);

    const manejarClick = (fila, columna) => {
        if (disabled) return;
        const pieza = casillas[fila][columna];
        const coordenadas = { fila, columna };

        if (piezaSeleccionada) {
            if (esMovimientoValido(fila, columna)) {
                onMover(coordenadas);
                return;
            }
            if (esMismaCoordenada(piezaSeleccionada.posicion, coordenadas)) {
                onSeleccionarPieza(null);
                return;
            }
        }

        if (pieza && pieza.color === miColor) {
            onSeleccionarPieza(pieza);
        } else if (piezaSeleccionada) {
            onSeleccionarPieza(null);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingRight: '6px' }}>
                {filas.map((fila) => (
                    <div key={fila} style={{ height: 'var(--casilla-tablero)', display: 'flex', alignItems: 'center', fontSize: 'var(--fs-sm)', color: '#666', fontWeight: 'bold' }}>
                        {fila + 1}
                    </div>
                ))}
            </div>

            <div>
                <div style={{ border: '3px solid #8b4513', display: 'inline-block' }}>
                    {filas.map((fila) => (
                        <div key={fila} style={{ display: 'flex' }}>
                            {columnas.map((columna) => {
                                const pieza = casillas[fila][columna];
                                return (
                                    <Casilla
                                        key={columna}
                                        pieza={pieza}
                                        esClara={(fila + columna) % 2 === 1}
                                        seleccionada={piezaSeleccionada != null && pieza != null && piezaSeleccionada.id === pieza.id}
                                        esMovimientoValido={esMovimientoValido(fila, columna)}
                                        onClick={() => manejarClick(fila, columna)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex' }}>
                    {columnas.map((columna) => (
                        <div key={columna} style={{ width: 'var(--casilla-tablero)', textAlign: 'center', fontSize: 'var(--fs-sm)', color: '#666', fontWeight: 'bold', paddingTop: '5px' }}>
                            {LETRAS[columna]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tablero;
