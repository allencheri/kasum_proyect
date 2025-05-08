<template>
    <div class="min-h-screen  text-white flex flex-col items-center justify-center p-6">
        <div class="flex flex-col items-center justify-center flex-grow w-full max-w-6xl">
            <h1 class="text-5xl font-bold mb-4 mt-5 ">Resumen Financiero</h1>
            <p class="text-lg text-gray-400 mb-8 ">Mantén tus finanzas bajo control con Kasum</p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                <div class="card backdrop-blur-md bg-opacity-20 bg-gray-800 border border-gray-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                    <h2 class="text-xl font-semibold text-green-400">Ingresos</h2>
                    <p class="text-3xl font-bold mt-2">{{ totalIngresos }} €</p>
                    <p class="text-sm text-gray-400 mt-1">+15% este mes</p>
                </div>
                <div class="card backdrop-blur-md bg-opacity-20 bg-gray-800 border border-gray-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                    <h2 class="text-xl font-semibold text-red-400">Gastos</h2>
                    <p class="text-3xl font-bold mt-2">{{ totalGastos }} €</p>
                    <p class="text-sm text-gray-400 mt-1">-5% este mes</p>
                </div>
                <div class="card backdrop-blur-md bg-opacity-20 bg-gray-800 border border-gray-500/30 rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                    <h2 class="text-xl font-semibold text-yellow-400">Ahorros</h2>
                    <p class="text-3xl font-bold mt-2">{{ totalAhorros }} €</p>
                    <p class="text-sm text-gray-400 mt-1">+10% este mes</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div class="card backdrop-blur-md bg-opacity-20 bg-gray-800 border border-gray-500/30 rounded-xl p-6">
                    <h2 class="text-xl font-semibold text-white mb-4">Ingresos vs Gastos</h2>
                    <div class="chart-container">
                        <BarChart :total-ingresos="ingresos" :total-gastos="gastos" />
                    </div>
                </div>
                <div class="card backdrop-blur-md bg-opacity-20 bg-gray-800 border border-gray-500/30 rounded-xl p-6">
                    <h2 class="text-xl font-semibold text-white mb-4">Distribución de Gastos</h2>
                    <div class="chart-container">
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BarChart from '../components/Grafics/BarCharts.vue'
import PieChart from '../components/Grafics/PieChart.vue' 

const ingresos = ref(0);
const gastos = ref(0);
const ahorros = ref(0);
const totalIngresos = ref(0);
const totalGastos = ref(0);
const totalAhorros = ref(0);
</script>

<style scoped>
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-container {
    width: 100%;
    height: 300px;
}
</style>