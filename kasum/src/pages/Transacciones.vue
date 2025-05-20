<template>
    <div class="bg-gradient text-white flex flex-col items-center pt-10 mb-20">
        <h1 class="text-5xl font-bold mb-2 mt-5 drop-shadow-lg">Transacciones</h1>
        <p class="text-lg text-gray-300 mb-8">Gestiona tus transacciones y visualiza tus finanzas</p>

        <div class="flex flex-wrap gap-6 mb-10">
            <div
                class="bg-white/10 backdrop-blur rounded-2xl px-8 py-6 flex flex-col items-center shadow-lg min-w-[180px]">
                <span class="text-gray-300 text-sm">Saldo</span>
                <span class="text-3xl font-bold" :class="saldo >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ saldo.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                </span>
            </div>
            <div
                class="bg-white/10 backdrop-blur rounded-2xl px-8 py-6 flex flex-col items-center shadow-lg min-w-[180px]">
                <span class="text-gray-300 text-sm">Ingresos</span>
                <span class="text-2xl font-bold text-green-400">
                    {{ totalIngresos.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                </span>
            </div>
            <div
                class="bg-white/10 backdrop-blur rounded-2xl px-8 py-6 flex flex-col items-center shadow-lg min-w-[180px]">
                <span class="text-gray-300 text-sm">Gastos</span>
                <span class="text-2xl font-bold text-red-400">
                    {{ totalGastos.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                </span>
            </div>
        </div>

        <div class="flex flex-wrap gap-10 justify-center w-full mb-12">
            <div class="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-lg flex flex-col items-center">
                <BarCharts :transacciones="transacciones" />
            </div>
            <div class="bg-white/10 backdrop-blur rounded-2xl p-6 shadow-lg flex flex-col items-center">
                <PieChart :transacciones="transacciones" :categorias="categorias" />
            </div>
        </div>

        <div class="mb-8">
            <button @click="showModal = true"
                class="transition-colors bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg">
                Añadir Transacción +
            </button>
        </div>

        <transition name="fade">
        <div v-if="showModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div class="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative border-2 border-blue-200 animate-modal">
                <button @click="showModal = false"
                    class="absolute top-3 right-3 text-blue-400 hover:text-blue-700 text-3xl font-bold transition-transform hover:scale-125">&times;</button>
                <h2 class="text-2xl font-bold mb-4 text-center text-blue-700">Nueva Transacción</h2>
                <form @submit.prevent="addTransaccion" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Fecha</label>
                        <input v-model="form.fecha" type="date"
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                            required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Tipo</label>
                        <select v-model="form.tipo" class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow" required>
                            <option value="" disabled>Selecciona</option>
                            <option value="Gasto">Gasto</option>
                            <option value="Ingreso">Ingreso</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Categoría</label>
                        <div class="flex gap-2">
                            <select v-model="form.categoria" class="flex-1 rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                                required>
                                <option value="" disabled>Selecciona</option>
                                <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
                            </select>
                            <button type="button" @click="showCatModal = true"
                                class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 text-lg font-bold shadow transition-transform hover:scale-110">+</button>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Descripción</label>
                        <input v-model="form.descripcion" type="text"
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                            required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Importe (€)</label>
                        <input v-model.number="form.importe" type="number" min="0" step="0.01"
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
                            required />
                    </div>
                    <button type="submit"
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-semibold mt-2 transition-colors shadow">Añadir</button>
                </form>
            </div>
        </div>
        </transition>

        <transition name="fade">
        <div v-if="showCatModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div class="bg-white text-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-xs relative border-2 border-blue-200 animate-modal">
                <button @click="showCatModal = false"
                    class="absolute top-2 right-3 text-blue-400 hover:text-blue-700 text-3xl font-bold transition-transform hover:scale-125">&times;</button>
                <h2 class="text-xl font-bold mb-4 text-center text-blue-700">Nueva Categoría</h2>
                <form @submit.prevent="addCategoria" class="space-y-4">
                    <input v-model="nuevaCategoria" type="text" placeholder="Nombre de la categoría"
                        class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow" required />
                    <button type="submit"
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-semibold transition-colors shadow">Añadir</button>
                </form>
            </div>
        </div>
        </transition>

        <div class="container mx-auto p-4 mt-8 w-full max-w-5xl">
            <div class="overflow-x-auto">
                <table class="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr class="bg-blue text-white uppercase text-sm font-semibold">
                            <th class="py-4 px-6 text-left">Fecha</th>
                            <th class="py-4 px-6 text-left">Tipo</th>
                            <th class="py-4 px-6 text-left">Categoría</th>
                            <th class="py-4 px-6 text-left">Descripción</th>
                            <th class="py-4 px-6 text-left">Importe</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(t, idx) in transacciones" :key="idx" :class="[
                            'border-b transition-colors',
                            idx % 2 === 0 ? 'bg-gray-50 hover:bg-gray-100' : 'hover:bg-gray-50',
                            t.tipo === 'Ingreso' ? 'text-green-700' : 'text-red-700'
                        ]">
                            <td class="py-4 px-6">{{ formatFecha(t.fecha) }}</td>
                            <td class="py-4 px-6">{{ t.tipo }}</td>
                            <td class="py-4 px-6">{{ t.categoria }}</td>
                            <td class="py-4 px-6">{{ t.descripcion }}</td>
                            <td class="py-4 px-6 font-semibold">{{ t.importe.toLocaleString('es-ES', {
                                style:
                                'currency', currency: 'EUR' }) }}</td>
                        </tr>
                        <tr v-if="!transacciones.length">
                            <td colspan="5" class="text-center py-8 text-gray-400">No hay transacciones aún.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BarCharts from '../components/Grafics/BarCharts.vue'
import PieChart from '../components/Grafics/PieChart.vue'

interface Transaccion {
    fecha: string
    tipo: 'Gasto' | 'Ingreso'
    categoria: string
    descripcion: string
    importe: number
}

const categorias = ref([
    'Comida',
    'Alquiler',
    'Transporte',
    'Salud',
    'Ocio',
    'Salario',
    'Educación',
    'Otros'
])

const transacciones = ref<Transaccion[]>([
    { fecha: '2022-12-12', tipo: 'Gasto', categoria: 'Comida', descripcion: 'Froiz', importe: 1000 },
    { fecha: '2022-12-12', tipo: 'Gasto', categoria: 'Comida', descripcion: 'Alcampo', importe: 1000 },
    { fecha: '2022-12-12', tipo: 'Ingreso', categoria: 'Salario', descripcion: 'Juan Perez', importe: 1500 },
    { fecha: '2022-12-12', tipo: 'Gasto', categoria: 'Alquiler', descripcion: 'Manuel Gonzales', importe: 660 }
])

const showModal = ref(false)
const showCatModal = ref(false)
const nuevaCategoria = ref('')

const form = ref<Transaccion>({
    fecha: '',
    tipo: 'Gasto',
    categoria: '',
    descripcion: '',
    importe: 0
})

function addTransaccion() {
    transacciones.value.unshift({ ...form.value })
    showModal.value = false
    form.value = { fecha: '', tipo: 'Gasto', categoria: '', descripcion: '', importe: 0 }
}

function addCategoria() {
    const cat = nuevaCategoria.value.trim()
    if (cat && !categorias.value.includes(cat)) {
        categorias.value.push(cat)
    }
    nuevaCategoria.value = ''
    showCatModal.value = false
}

function formatFecha(fecha: string) {
    if (!fecha) return ''
    const [y, m, d] = fecha.split('-')
    return `${d}/${m}/${y}`
}

const totalIngresos = computed(() =>
    transacciones.value.filter(t => t.tipo === 'Ingreso').reduce((sum, t) => sum + t.importe, 0)
)
const totalGastos = computed(() =>
    transacciones.value.filter(t => t.tipo === 'Gasto').reduce((sum, t) => sum + t.importe, 0)
)
const saldo = computed(() => totalIngresos.value - totalGastos.value)
</script>

<style scoped>
.bg-gradient {
    background: linear-gradient(to bottom, var(--primary-color), #1b2d3f);
    border-radius: 0px 0px 100px 100px;
}
.bg-blue {
    background-color: var(--primary-color);
}

@keyframes modalIn {
    from { transform: translateY(40px) scale(0.97); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
}
.animate-modal {
    animation: modalIn 0.25s cubic-bezier(.4,2,.6,1) both;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>