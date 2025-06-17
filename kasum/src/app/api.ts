const BASE_URL = 'http://localhost:8080/kubera/usuarios/';
const AUTH_URL = `http://localhost:8080/kubera/auth`; 

export async function getUsers() {
    const res = await fetch( BASE_URL, {
        method: "GET",
        credentials: "include", // ⚠️ MUY IMPORTANTE
      });
    return await res.json();
}

export async function login(credentials: { email: string; password: string }) {
    const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        throw new Error('Credenciales incorrectas');
    }

    return await response.json();
}


export async function getUserById(id: string | number) {
    const res = await fetch(`${BASE_URL}${id}`);
    if (!res.ok) throw new Error('Error al obtener usuario');
    return res.json();
}
export async function registerUser(user: any) {
    const res = await fetch(`http://localhost:8080/kubera/auth/register`, {
        method: 'POST',
        credentials: 'include',
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
        credentials: 'include', 
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Error al eliminar usuario');
    return res.json();
}

export async function updatePassword(id: string | number, passwords: { currentPassword: string, newPassword: string }) {
    const res = await fetch(`${BASE_URL}${id}/password`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwords),
    });
    if (!res.ok) throw new Error('Error al actualizar la contraseña');
    return res.json();
}



