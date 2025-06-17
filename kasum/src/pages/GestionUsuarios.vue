<template>
    <div class="bg-gradient text-white flex flex-col items-center pt-40 mb-20">
        <h1 class="text-5xl font-extrabold mb-2 mt-5 drop-shadow-lg tracking-tight">Gestión de Usuarios</h1>
        <p class="text-lg text-secondary mb-10">Administra los usuarios del sistema</p>

        <div class="container mx-auto p-4 mt-8 w-full max-w-5xl pb-20">
            <div class="overflow-x-auto rounded-2xl shadow-xl border border-secondary/20 bg-primary/30">
                <table class="w-full bg-transparent">
                    <thead>
                        <tr class="bg-primary text-white uppercase text-sm font-semibold">
                            <th class="py-4 px-6 text-left">ID</th>
                            <th class="py-4 px-6 text-left">Nombre</th>
                            <th class="py-4 px-6 text-left">Apellido</th>
                            <th class="py-4 px-6 text-left">Email</th>
                            <th class="py-4 px-6 text-left">Rol</th>
                            <th class="py-4 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id" 
                            class="border-b transition-colors hover:bg-primary/10 text-secondary">
                            <td class="py-4 px-6">{{ user.id }}</td>
                            <td class="py-4 px-6">{{ user.nombre }}</td>
                            <td class="py-4 px-6">{{ user.apellido }}</td>
                            <td class="py-4 px-6">{{ user.email }}</td>
                            <td class="py-4 px-6">{{ user.rol }}</td>
                            <td class="py-4 px-6 text-center">
                                <button @click="editUser(user)" 
                                    class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                                    Editar
                                </button>
                                <button @click="confirmDelete(user)" 
                                    class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal de Edición -->
        <div v-if="showEditModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div class="bg-white text-primary rounded-2xl shadow-2xl p-8 w-full max-w-md relative border-2 border-secondary animate-modal">
                <button @click="showEditModal = false" 
                    class="absolute top-3 right-3 text-primary text-3xl font-bold transition-transform hover:scale-125">&times;</button>
                <h2 class="text-2xl font-bold mb-4 text-center text-primary">Editar Usuario</h2>
                <form @submit.prevent="handleUpdate" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Nombre</label>
                        <input v-model="editingUser.nombre" type="text" 
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Apellido</label>
                        <input v-model="editingUser.apellido" type="text" 
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Email</label>
                        <input v-model="editingUser.email" type="email" 
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
                            required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Rol</label>
                        <select v-model="editingUser.rol" 
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <option value="ADMIN">Administrador</option>
                            <option value="USUARIO">Usuario</option>
                        </select>
                    </div>
                    <button type="submit" 
                        class="w-full bg-primary text-secondary rounded-lg py-2 font-semibold transition-colors shadow">
                        Guardar Cambios
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers, updateUser, deleteUser } from '../app/api'

interface User {
    id: number
    nombre: string
    apellido: string
    email: string
    rol: string
}

const users = ref<User[]>([])
const showEditModal = ref(false)
const editingUser = ref({
    id: null,
    nombre: '',
    apellido: '',
    email: '',
    rol: ''
})

async function loadUsers() {
    try {
        users.value = await getUsers()
    } catch (error) {
        console.error('Error al cargar usuarios:', error)
    }
}

function editUser(user: any) {
    editingUser.value = { ...user }
    showEditModal.value = true
}

async function handleUpdate() {
    try {
        if (editingUser.value.id) {
            await updateUser(editingUser.value.id, editingUser.value)
            await loadUsers()
            showEditModal.value = false
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error)
    }
}

async function confirmDelete(user: any) {
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.nombre}?`)) {
        try {
            await deleteUser(user.id)
            await loadUsers()
        } catch (error) {
            console.error('Error al eliminar usuario:', error)
        }
    }
}

onMounted(loadUsers)
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

.bg-gradient {
    background: linear-gradient(to bottom, var(--primary-color), #142d40);
    border-radius: 0px 0px 100px 100px;
}

:root {
    --primary-color: #0a1e2e;
    --secondary-color: #f5f3ff;
}

.bg-primary {
    background-color: var(--primary-color);
}
.text-primary {
    color: var(--primary-color);
}
.text-secondary {
    color: var(--secondary-color);
}

@keyframes modalIn {
    from { transform: translateY(40px) scale(0.97); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
}

.animate-modal {
    animation: modalIn 0.25s cubic-bezier(.4,2,.6,1) both;
}
</style>
