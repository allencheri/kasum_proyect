<template>
    <div class="flex items-center justify-center min-h-screen bg-[#0a1e2e]">
        <div
            class="relative max-w-md w-full bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-[0_15px_50px_rgba(10,30,46,0.3)]">
            <div class="absolute inset-0 bg-gradient-to-r from-[#fff5eb]/10 to-[#0a1e2e]/10 rounded-3xl -z-10"></div>

            <h1 class="text-4xl font-extrabold text-[#0a1e2e] text-center mb-10 animate-fade-in">
                Crea tu cuenta
            </h1>
            <div class="space-y-8">
                <div class="relative">
                    <input v-model="nombre" type="text" placeholder="Nombre"
                        class="w-full p-4 pl-12 rounded-xl border-none bg-[#fff5eb]/80 text-[#0a1e2e] placeholder-[#0a1e2e]/50 focus:ring-4 focus:ring-[#0a1e2e]/30 transition-all duration-300"
                        aria-label="Nombre" />
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0a1e2e]/50" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div class="relative">
                    <input v-model="apellido" type="text" placeholder="Apellido"
                        class="w-full p-4 pl-12 rounded-xl border-none bg-[#fff5eb]/80 text-[#0a1e2e] placeholder-[#0a1e2e]/50 focus:ring-4 focus:ring-[#0a1e2e]/30 transition-all duration-300"
                        aria-label="Apellido" />
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0a1e2e]/50" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div class="relative">
                    <input v-model="email" type="email" placeholder="Email"
                        class="w-full p-4 pl-12 rounded-xl border-none bg-[#fff5eb]/80 text-[#0a1e2e] placeholder-[#0a1e2e]/50 focus:ring-4 focus:ring-[#0a1e2e]/30 transition-all duration-300"
                        aria-label="Correo electrónico" />
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0a1e2e]/50" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l9 6 9-6m0 10V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2z" />
                    </svg>
                </div>

                <div class="relative">
                    <input v-model="password" type="password" placeholder="Contraseña"
                        class="w-full p-4 pl-12 rounded-xl border-none bg-[#fff5eb]/80 text-[#0a1e2e] placeholder-[#0a1e2e]/50 focus:ring-4 focus:ring-[#0a1e2e]/30 transition-all duration-300"
                        aria-label="Contraseña" />
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0a1e2e]/50" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2v2h4v-2zm6 5v-2a6 6 0 00-12 0v2a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2z" />
                    </svg>
                </div>

                <div class="relative">
                    <input v-model="password2" type="password" placeholder="Confirmar contraseña"
                        class="w-full p-4 pl-12 rounded-xl border-none bg-[#fff5eb]/80 text-[#0a1e2e] placeholder-[#0a1e2e]/50 focus:ring-4 focus:ring-[#0a1e2e]/30 transition-all duration-300"
                        aria-label="Confirmar contraseña" />
                    <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0a1e2e]/50" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2v2h4v-2zm6 5v-2a6 6 0 00-12 0v2a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2z" />
                    </svg>
                </div>

                <div class="relative">
                    <select v-model="rol"
                        class="w-full p-4 pl-12 rounded-xl border-none bg-[#fff5eb]/80 text-[#0a1e2e] focus:ring-4 focus:ring-[#0a1e2e]/30 transition-all duration-300"
                        aria-label="Rol del usuario">
                        <option value="userGratis">Usuario Gratis</option>
                        <option value="userEstandar">Usuario Estándar</option>
                        <option value="userPro">Usuario Pro</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <button @click="handleRegister"
                    class="w-full bg-gradient-to-r from-[#0a1e2e] to-[#1e3a5f] text-white py-4 rounded-xl font-semibold text-lg hover:bg-gradient-to-r hover:from-[#1e3a5f] hover:to-[#0a1e2e] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                    Registrarse
                </button>
                <div v-if="error" class="text-red-600 text-center mt-2">{{ error }}</div>
            </div>

            <p class="mt-8 text-center text-sm text-[#0a1e2e]/80">
                ¿Ya tienes cuenta?
                <router-link to="/login"
                    class="text-[#0a1e2e] font-semibold hover:underline hover:text-[#1e3a5f] transition-colors">Iniciar
                    Sesión</router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/store'
import { createUser } from '../app/api'

const nombre = ref('')
const apellido = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const rol = ref('userGratis')
const error = ref('')
const router = useRouter()
const userStore = useUserStore()

async function handleRegister() {
    error.value = ''
    if (!nombre.value || !apellido.value || !email.value || !password.value || !password2.value) {
        error.value = 'Completa todos los campos'
        return
    }
    if (password.value !== password2.value) {
        error.value = 'Las contraseñas no coinciden'
        return
    }
    try {
        const userData = {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            password: password.value,
            rol: rol.value
        }
        const user = await createUser(userData)
        userStore.setUser(user)
        router.push('/')
    } catch (e: any) {
        error.value = e.message || 'Error en el registro'
    }
}
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

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease-out;
}

input {
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
}

button {
    transition: all 0.3s ease;
}

body {
    background: linear-gradient(45deg, #0a1e2e, #1e3a5f, #2a5679);
    background-size: 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>