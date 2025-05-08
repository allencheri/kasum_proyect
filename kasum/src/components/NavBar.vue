<template>
    <div class="navbar flex items-center justify-between w-full h-20 absolute">
        <div class="flex items-center space-x-4 pl-6">
            <img src="../assets/logo.svg" alt="logo" class="w-16 h-16 transition-transform hover:scale-110 hover:rotate-12 duration-500" />
            <h1 class="font-bold text-3xl text-white">Kasum</h1>
        </div>
        <div class="flex items-center space-x-6 pr-6">
            <router-link to="/" class="relative text-lg px-5 py-2 text-white rounded-full hover:text-blue-300 transition-all duration-300 cursor-pointer group">
                Inicio
                <span class="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </router-link>
            <router-link to="/ingresos" class="relative text-lg px-5 py-2 text-white rounded-full hover:text-blue-300 transition-all duration-300 cursor-pointer group">
                Ingresos
                <span class="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </router-link>
            <button class="relative text-lg px-5 py-2 text-white rounded-full hover:text-blue-300 transition-all duration-300 cursor-pointer group">
                Gastos
                <span class="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button class="relative text-lg px-5 py-2 text-white rounded-full hover:text-blue-300 transition-all duration-300 cursor-pointer group">
                Ahorros
                <span class="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button class="relative text-lg px-5 py-2 text-white rounded-full hover:text-blue-300 transition-all duration-300 cursor-pointer group">
                Recordatorios
                <span class="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button class="relative text-lg px-5 py-2 text-white rounded-full hover:text-blue-300 transition-all duration-300 cursor-pointer group">
                Ajustes
                <span class="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.navbar {
    font-family: 'Hammersmith One', sans-serif;
}

</style>