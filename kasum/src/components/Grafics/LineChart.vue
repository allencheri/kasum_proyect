<script lang="ts">
import { defineComponent } from 'vue'
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

export default defineComponent({
    name: 'BarChart',
    components: {
        Bar,
    },
    setup() {
        const chartData = {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'INGRESOS',
                    data: [5, 10, 15, 40, 50, 10, 30, 30, 20, 20, 20, 20],
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'GASTOS',
                    data: [5, 15, 20, 50, 60, 20, 30, 50, 30, 50, 20, 20],
                    backgroundColor: 'rgba(135, 206, 235, 0.8)',
                    borderColor: 'rgba(135, 206, 235, 1)',
                    borderWidth: 1,
                },
            ],
        }

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false, // Allows custom height
            plugins: {
                legend: {
                    position: 'top' as const,
                },
                title: {
                    display: true,
                    text: 'INGRESOS vs GASTOS',
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 70,
                },
            },
        }

        return { chartData, chartOptions }
    },
})
</script>

<template>
    <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<style scoped>
.chart-container {
    width: 600px; 
    height: 300px; 
}
</style>