async function pedir(path, options) {
    const res = await fetch(`${BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!res.ok) throw new Error(`Error de red al hablar con el servidor (${res.status})`);
    const data = await res.json();
    // El backend siempre responde 200 y usa "suceso" para indicar si la operación salió bien.
    if (data?.suceso === false) throw new Error(data?.mensaje ?? 'La operación no se pudo completar');
    return data;
}

export const post = (path, body) => pedir(path, { method: 'POST', body: JSON.stringify(body) });
export const get = (path) => pedir(path, { method: 'GET' });