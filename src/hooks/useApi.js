const BASE_URL = import.meta.env.VITE_BASE_API_URL;

async function peticion(path, options) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    console.log("Esta haciendo la peticion")
    if (!res.ok) throw new Error(`Error de red al hablar con el servidor (${res.status})`);
    const data = await res.json();
    // El backend siempre responde 200 y usa "suceso" para indicar si la operación salió bien.
    if (data?.suceso === false) throw new Error(data?.mensaje ?? 'La operación no se pudo completar');
    return data;
}

export const post = (path, body) => peticion(path, { method: 'POST', body: JSON.stringify(body) });
export const get = (path) => peticion(path, { method: 'GET' });