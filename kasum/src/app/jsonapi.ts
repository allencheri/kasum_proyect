const API_URL = 'http://localhost:8080/kubera/movimientos';

export async function getTransacciones() {
    const res = await fetch(`${API_URL}/`, {
        method: "GET",
        credentials: "include", // ⚠️ MUY IMPORTANTE
      });
    return await res.json();
}

export async function addTransaccion(transaccion: any) {
    console.log(transaccion)
    const res = await fetch(`${API_URL}/nuevo`, {
        method: 'POST',
        credentials: "include", // ⚠️ MUY IMPORTANTE
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaccion),
    });
    return await res.json();
}

export async function updateTransaccion(id: number, transaccion: any) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        credentials: "include", // ⚠️ MUY IMPORTANTE

        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaccion),
    });
    return await res.json();
}

export async function deleteTransaccion(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        credentials: "include", // ⚠️ MUY IMPORTANTE
    });
    return await res.json();
}
