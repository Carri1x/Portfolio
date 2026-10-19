import Pieza from './Pieza';

const OPCIONES = ['REINA', 'TORRE', 'ALFIL', 'CABALLO'];

const PromocionModal = ({ color, onElegir }) => (
    <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    }}>
        <div style={{ background: 'white', borderRadius: '10px', padding: '24px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#2c3e50' }}>¿A qué pieza asciende el peón?</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
                {OPCIONES.map((tipo) => (
                    <button
                        key={tipo}
                        onClick={() => onElegir(tipo)}
                        style={{
                            width: '64px',
                            height: '64px',
                            border: '2px solid #8b4513',
                            borderRadius: '8px',
                            background: '#f0d9b5',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Pieza tipo={tipo} color={color} />
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default PromocionModal;
