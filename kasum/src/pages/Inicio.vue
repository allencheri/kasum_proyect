<template>
  <div class="bg-personalizar text-white min-h-screen flex flex-col">
    <Navbar />

    <div class="container mx-auto px-4 sm:px-6 py-16 mt-30 flex-grow">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-3 text-white drop-shadow-lg animate-fadeIn tracking-tight">
          ¡Bienvenido, {{ userName }}!
        </h1>
        <p class="text-xl text-secondary max-w-2xl mx-auto opacity-80">
          Gestiona tus finanzas y alcanza tus metas con facilidad
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div class="bg-primary/30 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20 shadow-xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center border border-secondary/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8a2.99 2.99 0 0 1-2.599-1C8.882 6.4 9.4 6 10 6h4c.6 0 1.118.4.599 1A2.99 2.99 0 0 1 12 8Z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white">Resumen Financiero</h2>
          </div>

          <div class="mb-6">
            <p class="text-secondary text-sm mb-1">Este mes has ahorrado</p>
            <div class="flex items-center">
              <span class="text-3xl font-bold mr-2"
                :class="totalMonthlySavings >= 0 ? 'text-green-400' : 'text-red-400'">
                {{ totalMonthlySavings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
              </span>
              <span class="text-xs px-2 py-0.5 rounded"
                :class="savingsChange >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'">
                {{ savingsChange >= 0 ? '+' : '' }}{{ savingsChange }}%
              </span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3 mb-6">
            <div class="bg-primary/40 p-3 rounded-lg">
              <p class="text-xs text-secondary mb-1">Ingresos</p>
              <p class="text-xl font-semibold text-green-400">+{{ monthlyIncome.toLocaleString('es-ES', {
                style:
                  'currency', currency: 'EUR'
              }) }}</p>
            </div>
            <div class="bg-primary/40 p-3 rounded-lg">
              <p class="text-xs text-secondary mb-1">Gastos</p>
              <p class="text-xl font-semibold text-red-400">-{{ monthlyExpenses.toLocaleString('es-ES', {
                style:
                  'currency', currency: 'EUR'
              }) }}</p>
            </div>
            <div class="bg-primary/40 p-3 rounded-lg">
              <p class="text-xs text-secondary mb-1">Balance</p>
              <p class="text-xl font-semibold">{{ monthlyBalance.toLocaleString('es-ES', {
                style: 'currency', currency:
                  'EUR'
              }) }}</p>
            </div>
          </div>

          <div class="flex justify-end">
            <router-link to="/transacciones"
              class="inline-flex items-center bg-primary hover:bg-primary/80 text-secondary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md">
              Ver Transacciones
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>

        <div class="bg-primary/30 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20 shadow-xl">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center border border-secondary/30">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-white">Meta Principal</h2>
          </div>

          <div v-if="totalGoal > 0" class="mb-6">
            <div class="flex justify-between mb-2">
              <h3 class="text-xl font-semibold text-secondary">{{ goalName }}</h3>
              <span class="text-sm font-medium px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                {{ getGoalPercentage() }}%
              </span>
            </div>

            <div class="mb-2 h-2 bg-white/10 rounded-full">
              <div class="h-full rounded-full bg-amber-500" :style="`width: ${getGoalPercentage()}%`"></div>
            </div>

            <div class="flex justify-between text-sm text-secondary">
              <span>{{ goalAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}</span>
              <span>{{ totalGoal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}</span>
            </div>
          </div>

          <div v-if="totalGoal > 0" class="w-full h-36 mb-6">
            <Bar :data="chartData" :options="chartOptions" />
          </div>

          <div v-if="totalGoal <= 0" class="flex flex-col items-center justify-center py-10">
            <svg class="w-16 h-16 text-secondary/70 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8a2.99 2.99 0 0 1-2.599-1C8.882 6.4 9.4 6 10 6h4c.6 0 1.118.4.599 1A2.99 2.99 0 0 1 12 8Z" />
            </svg>
            <p class="text-secondary mb-4">Aún no has definido metas de ahorro</p>
          </div>

          <div class="flex justify-center">
            <router-link to="/ahorros"
              class="inline-flex items-center bg-primary hover:bg-primary/80 text-secondary px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md">
              {{ totalGoal <= 0 ? 'Crear Meta' : 'Ver Todas las Metas' }} <svg xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
                </svg>
            </router-link>
          </div>
        </div>
      </div>


      <div class="bg-primary/30 backdrop-blur-sm p-5 rounded-2xl border border-secondary/20 shadow-xl">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center border border-secondary/30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-secondary" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-white">Consejo Financiero</h2>
        </div>
        <p class="text-secondary">{{ getDailyTip() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { useUserStore } from '../store/store';
import { getTransacciones } from '../app/jsonapi';
import Navbar from '../components/NavBar.vue';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const userStore = useUserStore();
const userName = computed(() => userStore.user?.nombre || '');

interface Transaccion {
  fecha: string
  tipo: string
  categoria: string
  descripcion: string
  monto: number
  id?: number
}

interface Jar {
    id: string
    name: string
    saved: number
    goal: number
}



const transactions = ref<Transaccion[]>([]);
const monthlyIncome = computed(() => {
  return transactions.value
    .filter(t => t.tipo?.toLowerCase() === 'ingreso')
    .reduce((sum, t) => sum + (t.monto || 0), 0);
});

const monthlyExpenses = computed(() => {
  return transactions.value
    .filter(t => t.tipo?.toLowerCase() === 'gasto')
    .reduce((sum, t) => sum + (t.monto || 0), 0);
});

const monthlyBalance = computed(() => {
  return monthlyIncome.value - monthlyExpenses.value;
});

const totalMonthlySavings = computed(() => monthlyBalance.value);

async function fetchTransactions() {
  try {
    const result = await getTransacciones();
    transactions.value = result || [];

    const now = new Date();
    transactions.value = transactions.value.filter(t => {
      const transDate = new Date(t.fecha);
      return transDate.getMonth() === now.getMonth() &&
        transDate.getFullYear() === now.getFullYear();
    });
  } catch (e) {
    console.error('Error fetching transactions:', e);
    transactions.value = [];
  }
}

const goalName = computed(() => {
    if (!userStore.user?.jars || userStore.user.jars.length === 0) return '';
    const biggestGoal = userStore.user.jars.reduce((max, current) => 
        current.goal > (max?.goal || 0) ? current : max
    , userStore.user.jars[0]);
    return biggestGoal.name;
});

const goalAmount = computed(() => {
    if (!userStore.user?.jars || userStore.user.jars.length === 0) return 0;
    const biggestGoal = userStore.user.jars.reduce((max, current) => 
        current.goal > (max?.goal || 0) ? current : max
    , userStore.user.jars[0]);
    return biggestGoal.saved || 0;
});

const totalGoal = computed(() => {
    if (!userStore.user?.jars || userStore.user.jars.length === 0) return 0;
    const biggestGoal = userStore.user.jars.reduce((max, current) => 
        current.goal > (max?.goal || 0) ? current : max
    , userStore.user.jars[0]);
    return biggestGoal.goal || 0;
});

function getGoalPercentage() {
    if (!totalGoal.value) return 0;
    return Math.min(100, Math.round((goalAmount.value / totalGoal.value) * 100));
}

function getDailyTip() {
  const tips = [
    "Reserva entre el 20-30% de tus ingresos para ahorros e inversiones.",
    "Sigue la regla 50/30/20: 50% necesidades, 30% deseos y 20% ahorro.",
    "Establece un presupuesto mensual para tener control de tus finanzas.",
    "Automatizar tus ahorros es una forma efectiva de asegurar que ahorras regularmente.",
    "Establece un fondo de emergencia que cubra entre 3-6 meses de gastos.",
    "Revisa tus suscripciones regularmente y elimina las que no uses.",
    "Considera la regla de 24 horas antes de hacer compras importantes."
  ];
  return tips[new Date().getDate() % tips.length];
}

onMounted(() => {
  fetchTransactions();
});

watch(() => userStore.user?.id, () => {
  fetchTransactions();
});

const savingsChange = computed(() => {
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // Filter transactions for previous month
  const prevMonthTransactions = transactions.value.filter(t => {
    const transDate = new Date(t.fecha);
    return transDate.getMonth() === prevMonth.getMonth() &&
      transDate.getFullYear() === prevMonth.getFullYear();
  });

  const prevIncome = prevMonthTransactions
    .filter(t => t.tipo?.toLowerCase() === 'ingreso')
    .reduce((sum, t) => sum + (t.monto || 0), 0);

  const prevExpenses = prevMonthTransactions
    .filter(t => t.tipo?.toLowerCase() === 'gasto')
    .reduce((sum, t) => sum + (t.monto || 0), 0);

  const prevBalance = prevIncome - prevExpenses;
  if (prevBalance === 0) return 0;
  return Math.round(((monthlyBalance.value - prevBalance) / Math.abs(prevBalance)) * 100);
});

const chartData = computed(() => ({
    labels: ['Progreso'],
    datasets: [
        {
            label: 'Ahorro',
            backgroundColor: 'rgba(245, 158, 11, 0.7)',
            borderColor: 'rgba(245, 158, 11, 1)',
            data: [goalAmount.value],
            maxBarThickness: 40,
            borderRadius: 4,
        },
        {
            label: 'Meta',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            data: [totalGoal.value],
            maxBarThickness: 40,
            borderRadius: 4,
        },
    ],
}));

watch(() => userStore.user?.jars, () => {
}, { deep: true });

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(10, 30, 46, 0.8)',
      titleColor: '#fff',
      bodyColor: '#f5f3ff',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
    }
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      beginAtZero: true,
      max: totalGoal.value > 0 ? totalGoal.value : 100,
      ticks: {
        color: 'rgba(245, 243, 255, 0.7)',
        font: {
          size: 10,
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
        drawBorder: false,
      },
    },
  },
}));
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

.bg-personalizar {
  background: linear-gradient(to bottom, var(--primary-color), #142d40);
  min-height: 100vh;
}

:root {
  --primary-color: #0a1e2e;
  --secondary-color: #f5f3ff;
}

.bg-primary {
  background-color: var(--primary-color);
}

.bg-secondary {
  background-color: var(--secondary-color);
}

.text-primary {
  color: var(--primary-color);
}

.text-secondary {
  color: var(--secondary-color);
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
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

.bg-personalizar {
  background: linear-gradient(to bottom, var(--primary-color), #142d40);
  min-height: 100vh;
}

:root {
  --primary-color: #0a1e2e;
  --secondary-color: #f5f3ff;
}

.bg-primary {
  background-color: var(--primary-color);
}

.bg-secondary {
  background-color: var(--secondary-color);
}

.text-primary {
  color: var(--primary-color);
}

.text-secondary {
  color: var(--secondary-color);
}

.animate-fadeIn {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
