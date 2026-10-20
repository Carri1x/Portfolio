import { useState, useRef, useEffect } from 'react';

export const useMenuHamburguesa = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const menuRef = useRef(null);
    const botonRef = useRef(null);

    useEffect(() => {
        if (!menuAbierto) return;

        const manejarClickFuera = (e) => {
            if (
                menuRef.current && !menuRef.current.contains(e.target) &&
                botonRef.current && !botonRef.current.contains(e.target)
            ) {
                setMenuAbierto(false);
            }
        };

        document.addEventListener('mousedown', manejarClickFuera);
        return () => document.removeEventListener('mousedown', manejarClickFuera);
    }, [menuAbierto]);

    const cerrarMenu = () => setMenuAbierto(false);
    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    return {
        menuAbierto,
        menuRef,
        botonRef,
        cerrarMenu,
        toggleMenu
    };
};