export const leer = (key) => localStorage.getItem(key) ?? '';
export const guardar = (key, valor) => {
    if (valor === null || valor === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, valor);
};