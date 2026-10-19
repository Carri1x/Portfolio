import { useState } from 'react';

const generarCodigo = () => Math.random().toString(36).slice(2, 8).toUpperCase();

const inputStyle = {
    padding: '10px 12px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
};

const botonStyle = (activo) => ({
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: activo ? '#8b4513' : '#e5ddd2',
    color: activo ? 'white' : '#5c4a3a',
});

const Lobby = ({ nombreInicial, onCrear, onUnirse, error }) => {
    const [modo, setModo] = useState('crear'); // 'crear' | 'unirse'
    const [nombre, setNombre] = useState(nombreInicial ?? '');
    const [codigo, setCodigo] = useState(() => generarCodigo());
    const [enviando, setEnviando] = useState(false);

    const enviar = async (e) => {
        e.preventDefault();
        if (!nombre.trim() || !codigo.trim()) return;
        setEnviando(true);
        try {
            if (modo === 'crear') await onCrear(nombre.trim(), codigo.trim());
            else await onUnirse(nombre.trim(), codigo.trim());
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div style={{ maxWidth: '380px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '20px' }}>Ajedrez online</h2>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button type="button" style={botonStyle(modo === 'crear')} onClick={() => setModo('crear')}>Crear partida</button>
                <button type="button" style={botonStyle(modo === 'unirse')} onClick={() => setModo('unirse')}>Unirse</button>
            </div>

            <form onSubmit={enviar} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: '#555' }}>
                    Tu nombre
                    <input style={inputStyle} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Álvaro" required />
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: '#555' }}>
                    {modo === 'crear' ? 'Código de la partida (compártelo con tu rival)' : 'Código de la partida a la que te unes'}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input style={inputStyle} value={codigo} onChange={(e) => setCodigo(e.target.value)} placeholder="ABC123" required />
                        {modo === 'crear' && (
                            <button type="button" onClick={() => setCodigo(generarCodigo())} style={{ ...botonStyle(false), padding: '10px 14px' }}>
                                🎲
                            </button>
                        )}
                    </div>
                </label>

                {error && <div style={{ color: '#c0392b', fontSize: '0.9rem' }}>{error}</div>}

                <button type="submit" disabled={enviando} style={{ ...botonStyle(true), marginTop: '8px', opacity: enviando ? 0.6 : 1 }}>
                    {enviando ? 'Un momento…' : modo === 'crear' ? 'Crear partida' : 'Unirse a la partida'}
                </button>
            </form>
        </div>
    );
};

export default Lobby;
