<template>
  <div class="min-h-screen bg-[#0a1e2e] px-4 sm:px-6 lg:px-8 py-24 text-[#fff5eb] flex items-center justify-center">
    <div class="max-w-6xl w-full flex flex-col lg:flex-row gap-10">

      <div class="glass-card flex-1 p-10 rounded-3xl shadow-2xl border border-[#fff5eb]/20 transition-transform duration-500">
        <h2 class="text-4xl sm:text-5xl font-extrabold">
          ¡Bienvenido, {{ userName }}!
        </h2>
        <p class="mt-4 text-xl text-[#fff5eb]/80">Este mes has ahorrado</p>
        <span class="block mt-2 font-bold text-4xl" :class="savings >= 0 ? 'text-green-400' : 'text-red-400'">
          {{ savings.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
        </span>
        <div class="mt-10">
          <router-link
            to="/transacciones"
             class="absolute mt-0 transition-colors bg-white hover:bg-blue-950 hover:text-white cursor-pointer text-[#0a1e2e] rounded-full px-6 py-2 text-xl font-bold shadow-lg tracking-wide">
            Ver Detalles
          </router-link>
        </div>
      </div>

      <div class="glass-card flex-1 p-10 rounded-3xl shadow-2xl border border-[#fff5eb]/20 transition-transform duration-500">
        <h3 class="text-3xl font-semibold">Meta Principal:</h3>
        <h3 class="text-2xl font-bold mt-2 text-[#fff5eb]">{{ goalName }}</h3>
        <router-link to="/ahorros">
        <button v-if="goalAmount < 1" @click="goalAmount = 0"  class="absolute mt-5 transition-colors bg-white hover:bg-blue-950 hover:text-white cursor-pointer text-[#0a1e2e] rounded-full px-6 py-2 text-xl font-bold shadow-lg tracking-wide">
          Añadir meta
        </button>
        </router-link>
        <p v-if="goalAmount > 0" class="mt-2 text-lg text-[#fff5eb]/80">Tu progreso hacia la meta</p>
        <div class="mt-6 w-full h-40">
          <Bar :data="chartData" :options="chartOptions" />
        </div>
        <p class="mt-4 text-base text-[#fff5eb]/80">
          {{ goalAmount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }} /
          {{ totalGoal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { useUserStore } from '../store/store'
import { getUserById } from '../app/api'

const userStore = useUserStore();
const userName = computed(() => userStore.user?.nombre || '');

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

interface Jar {
  id: string
  name: string
  saved: number
  goal: number
}

const jars = ref<Jar[]>([]);

const savings = computed(() => {
  return jars.value.reduce((total, jar) => total + jar.saved, 0);
});

const largestGoalJar = computed(() => {
  if (jars.value.length === 0) return null;
  return jars.value.reduce((max, jar) => max.goal > jar.goal ? max : jar);
});

const goalName = computed(() => largestGoalJar.value?.name || 'Aún no hay metas');
const goalAmount = computed(() => largestGoalJar.value?.saved || 0);
const totalGoal = computed(() => largestGoalJar.value?.goal || 0);

async function fetchJars() {
  const userId = userStore.user?.id;
  if (!userId) {
    jars.value = [];
    return;
  }
  try {
    const user = await getUserById(userId);
    jars.value = user.jars || [];
  } catch (e) {
    jars.value = [];
  }
}

onMounted(fetchJars);
watch(() => userStore.user?.id, fetchJars);

const chartData = computed(() => ({
  labels: ['Progreso'],
  datasets: [
    {
      label: 'Ahorro',
      backgroundColor: 'rgba(34, 197, 94, 0.7)',
      borderColor: 'rgba(34, 197, 94, 1)',
      data: [goalAmount.value],
      maxBarThickness: 50,
    },
    {
      label: 'Meta',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      data: [totalGoal.value],
      maxBarThickness: 50,
    },
  ],
}));

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
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      beginAtZero: true,
      max: totalGoal.value,
      ticks: {
        color: '#fff5eb',
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
}));
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Biryani:wght@400;600;800&display=swap');

h1, h2, h3 {
  font-family: 'Hammersmith One', sans-serif;
}

p, button, a, span {
  font-family: 'Biryani', sans-serif;
}

.drop-shadow-glow {
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(0, 234, 255, 0.3);
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px) saturate(160%);
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(9, 9, 121, 0.04) 100%);
  pointer-events: none;
  z-index: 0;
}

.animate-fade-in {
  animation: fadeIn 1.4s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 1.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
