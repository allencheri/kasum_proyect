<template>
    <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
    transacciones: {
        fecha: string
        tipo: 'Gasto' | 'Ingreso'
        categoria: string
        descripcion: string
        importe: number
    }[]
}>()

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dec'
]

function getMonth(fecha: string) {
    if (!fecha) return 0
    const m = Number(fecha.split('-')[1])
    return isNaN(m) ? 0 : m - 1
}

const ingresosPorMes = computed(() => {
    const arr = Array(12).fill(0)
    props.transacciones.forEach(t => {
        if (t.tipo === 'Ingreso') {
            const idx = getMonth(t.fecha)
            arr[idx] += t.importe
        }
    })
    return arr
})

const gastosPorMes = computed(() => {
    const arr = Array(12).fill(0)
    props.transacciones.forEach(t => {
        if (t.tipo === 'Gasto') {
            const idx = getMonth(t.fecha)
            arr[idx] += t.importe
        }
    })
    return arr
})

const chartData = computed(() => ({
    labels: meses,
    datasets: [
        {
            label: 'INGRESOS',
            data: ingresosPorMes.value,
            backgroundColor: 'rgba(56, 189, 248, 0.7)',
            borderColor: 'rgba(56, 189, 248, 1)',
            borderWidth: 1,
        },
        {
            label: 'GASTOS',
            data: gastosPorMes.value,
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
        },
    ],
}))

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: 'INGRESOS vs GASTOS',
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
}
</script>

<style scoped>
.chart-container {
    width: 600px;
    height: 400px;
}
</style>