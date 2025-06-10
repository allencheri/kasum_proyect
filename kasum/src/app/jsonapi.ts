const API_URL = 'http://localhost:3000/transacciones';

export async function getTransacciones() {
    const res = await fetch(API_URL);
    return await res.json();
}

export async function addTransaccion(transaccion: any) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaccion),
    });
    return await res.json();
}

export async function updateTransaccion(id: number, transaccion: any) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaccion),
    });
    return await res.json();
}

export async function deleteTransaccion(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return await res.json();
}
