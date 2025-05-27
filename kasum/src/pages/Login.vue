<template>
    <div class="flex align-middle justify-center items-center min-h-screen">
        <div
            class="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 transform transition-all duration-500 hover:scale-105">
            <h1 class="text-3xl font-bold text-[#0a1e2e] text-center mb-8">Iniciar Sesión</h1>
            <div class="space-y-6">
                <div>
                    <input type="text" placeholder="Email"
                        class="w-full p-3 rounded-lg border border-[#0a1e2e]/20 focus:border-[#0a1e2e] focus:ring-2 focus:ring-[#0a1e2e]/50 transition-colors bg-[#fff5eb] text-[#0a1e2e] placeholder-[#0a1e2e]/50" />
                </div>
                <div>
                    <input type="password" placeholder="Contraseña"
                        class="w-full p-3 rounded-lg border border-[#0a1e2e]/20 focus:border-[#0a1e2e] focus:ring-2 focus:ring-[#0a1e2e]/50 transition-colors bg-[#fff5eb] text-[#0a1e2e] placeholder-[#0a1e2e]/50" />
                </div>
                <button
                    class="w-full bg-[#0a1e2e] text-[#fff5eb] py-3 rounded-lg font-semibold hover:bg-[#0a1e2e]/90 transition-colors duration-300">
                    Iniciar Sesión
                </button>
            </div>
            <p class="mt-6 text-center text-sm text-[#0a1e2e]">
                ¿No tienes cuenta?
                <a href="#" class="text-[#0a1e2e] font-semibold hover:underline">Regístrate</a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
input {
    transition: all 0.3s ease;
}

input:focus {
    outline: none;
}

button {
    transition: all 0.3s ease;
}
</style>