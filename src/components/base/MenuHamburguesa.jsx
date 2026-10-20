import './MenuHamburguesa.scss';

const MenuHamburguesa = ({ menuAbierto, toggleMenu, botonRef }) => {
    return (
        <button
            ref={botonRef}
            className={`menu-hamburguesa ${menuAbierto ? 'activo' : ''}`}
            onClick={toggleMenu}
            aria-label='Abrir menú de navegación'
        >
            <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                {/* Línea Superior */}
                <line className="linea linea-1" x1="4" y1="6" x2="20" y2="6" />
                {/* Línea Central */}
                <line className="linea linea-2" x1="4" y1="12" x2="20" y2="12" />
                {/* Línea Inferior */}
                <line className="linea linea-3" x1="4" y1="18" x2="20" y2="18" />
            </svg>
        </button>
    );
};

export default MenuHamburguesa;