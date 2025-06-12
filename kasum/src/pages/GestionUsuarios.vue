<template>
    <div class="min-h-screen  p-6 pt-40 flex flex-col items-center">
        <!-- Header Section -->
        <div class="max-w-7xl w-full mx-auto">
            <header class="flex items-center justify-between mb-12">
                <div class="flex flex-col items-start">
                    <h1 class="text-5xl font-bold text-white animate-slide-in tracking-tight">
                        <span
                            class="bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                            Gestión de Usuarios
                        </span>
                    </h1>
                    <div class="h-1 w-32 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-4"></div>
                </div>
                <button @click="openAddUserModal"
                    class="group flex items-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                    <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Usuario
                </button>
            </header>

            <div
                class="bg-gray-900/90 backdrop-blur-xl shadow-xl rounded-2xl p-6 overflow-x-auto border border-blue-500/20">
                <table class="w-full text-sm text-left text-gray-100 bg-gray-900">
                    <thead class="text-xs uppercase bg-gray-800 text-blue-200">
                        <tr>
                            <th scope="col" class="px-6 py-4 rounded-tl-2xl">Nombre</th>
                            <th scope="col" class="px-6 py-4">Apellido</th>
                            <th scope="col" class="px-6 py-4">Email</th>
                            <th scope="col" class="px-6 py-4">Rol</th>
                            <th scope="col" class="px-6 py-4 rounded-tr-2xl">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id"
                            class="border-b border-blue-500/10 hover:bg-blue-800/20 transition-all duration-200 group">
                            <td class="px-6 py-4 font-semibold flex items-center gap-3">
                                <span
                                    class="inline-block w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125"
                                    :class="{
                                        'bg-green-400': user.rol === 'admin',
                                        'bg-blue-400': user.rol === 'userPro',
                                        'bg-yellow-400': user.rol === 'userEstandar',
                                        'bg-gray-400': user.rol === 'userGratis',
                                    }"></span>
                                {{ user.nombre }}
                            </td>
                            <td class="px-6 py-4">{{ user.apellido }}</td>
                            <td class="px-6 py-4">{{ user.email }}</td>
                            <td class="px-6 py-4">
                                <span
                                    class="inline-block px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300"
                                    :class="{
                                        'bg-green-500/20 text-green-400': user.rol === 'admin',
                                        'bg-blue-500/20 text-blue-400': user.rol === 'userPro',
                                        'bg-yellow-500/20 text-yellow-400': user.rol === 'userEstandar',
                                        'bg-gray-500/20 text-gray-400': user.rol === 'userGratis',
                                    }">
                                    {{
                                        user.rol === 'admin' ? 'Administrador'
                                            : user.rol === 'userPro' ? 'Usuario Pro'
                                                : user.rol === 'userEstandar' ? 'Usuario Estándar'
                                    : 'Usuario Gratis'
                                    }}
                                </span>
                            </td>
                            <td class="px-6 py-4 flex space-x-3">
                                <button @click="openEditUserModal(user)"
                                    class="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Editar usuario">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button @click="handleDeleteUser(user.id)"
                                    class="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all duration-200 group-hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    aria-label="Eliminar usuario">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M9 7v12m6-12v12" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="users.length === 0" class="text-center text-gray-300 py-8 text-lg font-medium">
                    No hay usuarios registrados.
                </div>
            </div>

            <transition name="modal">
                <div v-if="showModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                    <div
                        class="bg-gray-900/80 backdrop-blur-2xl rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-blue-500/30">
                        <button @click="closeModal"
                            class="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-2xl font-bold transition-colors"
                            aria-label="Cerrar modal">
                            ×
                        </button>
                        <h2 class="text-2xl font-bold text-white mb-6 text-center">
                            {{ isEditing ? 'Editar Usuario' : 'Agregar Usuario' }}
                        </h2>
                        <form class="space-y-5" @submit.prevent="saveUser">
                            <div class="relative">
                                <input v-model="form.nombre" type="text" placeholder="Nombre"
                                    class="w-full p-4 pl-12 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-blue-500/30 focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                                    aria-label="Nombre" required />
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div class="relative">
                                <input v-model="form.apellido" type="text" placeholder="Apellido"
                                    class="w-full p-4 pl-12 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-blue-500/30 focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                                    aria-label="Apellido" required />
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div class="relative">
                                <input v-model="form.email" type="email" placeholder="Email"
                                    class="w-full p-4 pl-12 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-blue-500/30 focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                                    aria-label="Correo electrónico" required />
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l9 6 9-6m0 10V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2z" />
                                </svg>
                            </div>
                            <div v-if="!isEditing" class="relative">
                                <input v-model="form.password" type="password" placeholder="Contraseña"
                                    class="w-full p-4 pl-12 rounded-xl bg-gray-800/50 text-white placeholder-gray-400 border border-blue-500/30 focus:ring-4 focus:ring-blue-500/50 transition-all duration-300"
                                    aria-label="Contraseña" required />
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4-4c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m4 4c0 1.1-.9 2-2 2s-2-.9-2-2m4-8v2m-4-2v2" />
                                </svg>
                            </div>
                            <div class="relative">
                                <select v-model="form.rol"
                                    class="w-full p-4 pl-12 rounded-xl bg-gray-800/50 text-white border border-blue-500/30 focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 appearance-none"
                                    aria-label="Rol del usuario" required>
                                    <option value="userGratis">Usuario Gratis</option>
                                    <option value="userEstandar">Usuario Estándar</option>
                                    <option value="userPro">Usuario Pro</option>
                                    <option value="admin">Administrador</option>
                                </select>
                                <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div class="flex space-x-4 pt-4">
                                <button type="submit"
                                    class="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50">
                                    {{ isEditing ? 'Guardar Cambios' : 'Crear Usuario' }}
                                </button>
                                <button @click="closeModal" type="button"
                                    class="flex-1 bg-gray-700/50 text-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-500/50">
                                    Cancelar
                                </button>
                            </div>
                            <div v-if="error" class="text-red-400 text-center mt-3 font-medium">{{ error }}</div>
                        </form>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/store';
import { getUsers, createUser, updateUser, deleteUser } from '../app/api';

interface User {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    rol: string;
}

const userStore = useUserStore();
const users = ref<User[]>([]);
const showModal = ref(false);
const isEditing = ref(false);
const form = ref<User>({
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: 'userGratis',
});
const error = ref('');

async function fetchUsers() {
    try {
        const data = await getUsers();
        users.value = data;
    } catch (e: any) {
        error.value = e.message || 'Error al obtener usuarios';
    }
}

onMounted(fetchUsers);

const openAddUserModal = () => {
    form.value = { id: 0, nombre: '', apellido: '', email: '', password: '', rol: 'userGratis' };
    isEditing.value = false;
    showModal.value = true;
    error.value = '';
};

const openEditUserModal = (user: User) => {
    form.value = { ...user, password: '' };
    isEditing.value = true;
    showModal.value = true;
    error.value = '';
};

async function saveUser() {
    // Validación básica antes de enviar
    if (!form.value.nombre || !form.value.apellido || !form.value.email || (!isEditing.value && !form.value.password) || !form.value.rol) {
        error.value = 'Todos los campos son obligatorios.';
        return;
    }
    try {
        if (isEditing.value) {
            const { password, ...userData } = form.value;
            await updateUser(form.value.id, userData);
        } else {
            const { id, ...userData } = form.value;
            await createUser(userData);
        }
        showModal.value = false;
        await fetchUsers();
    } catch (e: any) {
        error.value = e.message || 'Error al guardar usuario';
    }
}

async function handleDeleteUser(id: number) {
    error.value = '';
    if (!id || isNaN(Number(id))) {
        error.value = 'ID de usuario inválido.';
        return;
    }
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
    try {
        await deleteUser(Number(id));
        await fetchUsers();

    } catch (e: any) {
        error.value = e?.message || 'Error al eliminar usuario';
    }
}

const closeModal = () => {
    showModal.value = false;
    error.value = '';
};
</script>

<style scoped>
h1,
h2,
h3 {
  font-family: "Hammersmith One", sans-serif;
  font-weight: lighter;
}

p,
button,
a,
span {
  font-family: "Biryani", sans-serif;
  font-weight: light;
}

@keyframes slide-in {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes modal-in {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.animate-slide-in {
    animation: slide-in 0.5s ease-out;
}

.modal-enter-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.modal-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

/* Table and Scrollbar Styles */
table {
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 1rem;
    overflow: hidden;
    background-color: #111827; /* gris muy oscuro */
}

thead tr th {
    font-weight: 600;
    letter-spacing: 0.05em;
    background-color: #1e293b !important; /* azul oscuro */
    color: #60a5fa !important; /* azul claro */
}

tbody tr {
    background-color: #111827;
    transition: all 0.2s ease;
}

tbody tr:hover {
    background-color: #1e293b;
}

th, td {
    color: #f3f4f6;
}

/* Scrollbar Styles */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.3);
    border-radius: 4px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
}

/* Select Dropdown Arrow */
select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
    background-position: right 1rem center;
    background-repeat: no-repeat;
    background-size: 1.5em;
}

/* Focus and Hover Enhancements */
input:focus,
select:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
}

button:focus {
    outline: none;
}

/* Responsive Adjustments */
@media (max-width: 640px) {
    .max-w-7xl {
        max-width: 100%;
    }

    table {
        font-size: 0.875rem;
    }

    th,
    td {
        padding: 0.75rem;
    }
}
</style>