<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
} from 'chart.js'

// Registrar los componentes de Chart.js que se usarán
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
    name: 'PieChart',
    components: {
        Pie,
    },
    props: {
        transacciones: {
            type: Array,
            required: true,
        },
        categorias: {
            type: Array,
            required: true,
        }
    },
    setup(props) {
        // Colores para las categorías
        const colores = [
            'rgba(255, 182, 193, 0.8)', // Rosa claro
            'rgba(255, 215, 0, 0.8)',   // Amarillo
            'rgba(147, 112, 219, 0.8)', // Púrpura
            'rgba(144, 238, 144, 0.8)', // Verde claro
            'rgba(211, 211, 211, 0.8)', // Gris claro
            'rgba(135, 206, 235, 0.8)', // Azul claro
            'rgba(255, 160, 122, 0.8)', // Salmón
            'rgba(255, 99, 132, 0.8)',  // Rojo
            'rgba(54, 162, 235, 0.8)',  // Azul
            'rgba(255, 206, 86, 0.8)',  // Amarillo claro
        ]
        const coloresBorde = colores.map(c => c.replace('0.8', '1'))

        // Agrupa gastos por categoría
        const gastosPorCategoria = computed(() => {
            const map: Record<string, number> = {}
            props.categorias.forEach(cat => map[cat] = 0)
            props.transacciones.forEach((t: any) => {
                if (t.tipo === 'Gasto' && map.hasOwnProperty(t.categoria)) {
                    map[t.categoria] += t.importe
                }
            })
            // Solo categorías con gasto > 0
            return Object.entries(map).filter(([_, v]) => v > 0)
        })

        const chartData = computed(() => ({
            labels: gastosPorCategoria.value.map(([cat]) => cat),
            datasets: [
                {
                    data: gastosPorCategoria.value.map(([_, val]) => val),
                    backgroundColor: gastosPorCategoria.value.map((_, i) => colores[i % colores.length]),
                    borderColor: gastosPorCategoria.value.map((_, i) => coloresBorde[i % coloresBorde.length]),
                    borderWidth: 1,
                },
            ],
        }))

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'Gastos por Categoría',
                },
            },
        }

        return { chartData, chartOptions }
    },
})
</script>

<template>
    <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.chart-container {
    width: 400px; /* Ajusta según necesites */
    height: 400px; /* Ajusta según necesites */
}
</style>