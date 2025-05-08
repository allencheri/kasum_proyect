<script lang="ts" setup>
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

interface ChartData {
    labels: string[]
    datasets: Array<{
        data: number[]
        backgroundColor: string[]
        borderColor: string[]
        borderWidth: number
    }>
}

interface ChartOptions {
    responsive: boolean
    maintainAspectRatio: boolean
    plugins: {
        legend: {
            position: 'top'
        }
        title: {
            display: boolean
            text: string
        }
    }
}

const chartData: ChartData = {
    labels: ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4', 'Categoría 5'],
    datasets: [
        {
            data: [39, 22, 17, 13, 9], // Porcentajes de cada categoría
            backgroundColor: [
                'rgba(255, 182, 193, 0.8)', // Rosa claro (39%)
                'rgba(255, 215, 0, 0.8)',   // Amarillo (22%)
                'rgba(147, 112, 219, 0.8)', // Púrpura (17%)
                'rgba(144, 238, 144, 0.8)', // Verde claro (13%)
                'rgba(211, 211, 211, 0.8)', // Gris claro (9%)
            ],
            borderColor: [
                'rgba(255, 182, 193, 1)', // Rosa claro
                'rgba(255, 215, 0, 1)',   // Amarillo
                'rgba(147, 112, 219, 1)', // Púrpura
                'rgba(144, 238, 144, 1)', // Verde claro
                'rgba(211, 211, 211, 1)', // Gris claro
            ],
            borderWidth: 1,
        },
    ],
}

const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Distribución por Categorías', 
        },
    },
}
</script>

<template>
    <div>
        <Pie :data="chartData" :options="chartOptions" />
    </div>
</template>
