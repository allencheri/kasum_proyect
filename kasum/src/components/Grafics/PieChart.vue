<script lang="ts">
import { defineComponent } from 'vue'
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
    setup() {
        const chartData = {
            labels: ['Categoría 1', 'Categoría 2', 'Categoría 3', 'Categoría 4', 'Categoría 5'],
            datasets: [
                {
                    data: [39, 22, 17, 13, 9], // Porcentajes de la imagen
                    backgroundColor: [
                        'rgba(255, 182, 193, 0.8)', // Rosa claro (39%)
                        'rgba(255, 215, 0, 0.8)',   // Amarillo (22%)
                        'rgba(147, 112, 219, 0.8)', // Púrpura (17%)
                        'rgba(144, 238, 144, 0.8)', // Verde claro (13%)
                        'rgba(211, 211, 211, 0.8)', // Gris claro (9%)
                    ],
                    borderColor: [
                        'rgba(255, 182, 193, 1)',
                        'rgba(255, 215, 0, 1)',
                        'rgba(147, 112, 219, 1)',
                        'rgba(144, 238, 144, 1)',
                        'rgba(211, 211, 211, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }

        const chartOptions = {
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