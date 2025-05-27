const BASE_URL = 'http://localhost:8080/kubera/usuarios/';

export async function getUsers() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error('Error al obtener usuarios');
    return res.json();
}

export async function getUserById(id: string | number) {
    const res = await fetch(`${BASE_URL}${id}`);
    if (!res.ok) throw new Error('Error al obtener usuario');
    return res.json();
}

export async function createUser(user: any) {
    const res = await fetch(`${BASE_URL}nuevo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Error al crear usuario');
    return res.json();
}

export async function updateUser(id: string | number, user: any) {
    const res = await fetch(`${BASE_URL}${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error('Error al actualizar usuario');
    return res.json();
}

export async function deleteUser(id: string | number) {
    const res = await fetch(`${BASE_URL}${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar usuario');
    return res.json();
}
