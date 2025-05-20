<template>
  <div class="flex flex-col justify-center items-center text-white px-4 min-h-[70vh]">
    <section class="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-12 py-20">

      <div class="flex-1 flex flex-col items-start lg:items-start text-left gap-8">
        <h1 class="text-5xl sm:text-6xl font-extrabold drop-shadow-lg leading-tight">
          Bienvenido a <span class="text-blue-400">Kasum</span>
        </h1>
        <p class="text-xl text-blue-100 mb-2 max-w-xl">
          Gestiona tus finanzas personales de forma <span class="font-semibold text-blue-300">sencilla</span>, <span class="font-semibold text-blue-300">visual</span> y <span class="font-semibold text-blue-300">segura</span>.<br>
          Controla tus ingresos, gastos y ahorros con gráficos claros y herramientas inteligentes.
        </p>
        <div class="flex flex-wrap gap-6 mt-2">
          <router-link to="/transacciones" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-all">
            Empezar ahora
          </router-link>
          <router-link to="/estadisticas" class="bg-white/10 hover:bg-white/20 text-blue-100 font-semibold py-3 px-8 rounded-full text-lg shadow transition-all border border-blue-300">
            Ver estadísticas
          </router-link>
        </div>
      </div>

      <div class="flex-1 flex justify-center items-center">
        <div class="relative w-[320px] h-[320px] flex items-center justify-center">
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/30 via-blue-600/20 to-blue-900/10 blur-2xl"></div>
          <svg class="w-64 h-64 z-10" viewBox="0 0 256 256" fill="none">
            <circle cx="128" cy="128" r="120" fill="#fff" fill-opacity="0.07"/>
            <rect x="60" y="100" width="136" height="56" rx="18" fill="#38bdf8" fill-opacity="0.8"/>
            <rect x="80" y="120" width="56" height="24" rx="8" fill="#fff" fill-opacity="0.9"/>
            <rect x="142" y="120" width="36" height="24" rx="8" fill="#facc15" fill-opacity="0.9"/>
            <circle cx="100" cy="110" r="8" fill="#22d3ee"/>
            <circle cx="156" cy="110" r="8" fill="#f87171"/>
            <rect x="110" y="160" width="36" height="12" rx="6" fill="#fff" fill-opacity="0.7"/>
          </svg>
        </div>
      </div>
    </section>

    <section class="w-full max-w-6xl flex flex-wrap gap-8 justify-center mt-8">
      <div class="bg-gray-600  transition rounded-2xl p-7 flex flex-col items-center w-72 shadow-xl border border-blue-400/20">
        <svg class="w-12 h-12 mb-2 text-blue-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        </svg>
        <span class="font-bold text-lg mb-1">Control total</span>
        <span class="text-blue-100 text-sm text-center">Visualiza y organiza tus movimientos fácilmente.</span>
      </div>
      <div class="bg-gray-600 transition rounded-2xl p-7 flex flex-col items-center w-72 shadow-xl border border-blue-400/20">
        <svg class="w-12 h-12 mb-2 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="font-bold text-lg mb-1">Gráficos inteligentes</span>
        <span class="text-blue-100 text-sm text-center">Analiza tus gastos e ingresos con gráficos claros.</span>
      </div>
      <div class="bg-gray-600  transition rounded-2xl p-7 flex flex-col items-center w-72 shadow-xl border border-blue-400/20">
        <svg class="w-12 h-12 mb-2 text-yellow-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z"/>
        </svg>
        <span class="font-bold text-lg mb-1">Seguro y privado</span>
        <span class="text-blue-100 text-sm text-center">Tus datos están protegidos y solo tú tienes acceso.</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
