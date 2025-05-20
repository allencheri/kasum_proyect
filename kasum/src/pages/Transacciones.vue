<template>
    <div class="bg-gradient text-white flex flex-col items-center pt-30 mb-20">
        <h1 class="text-5xl font-extrabold mb-2 mt-5 drop-shadow-lg tracking-tight">Transacciones</h1>
        <p class="text-lg text-blue-100 mb-10">Gestiona tus transacciones y visualiza tus finanzas de forma profesional</p>

        <div class="mb-10 w-full max-w-3xl flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div class="flex items-center gap-3">
                <label class="text-blue-200 font-semibold text-lg">Filtrar por mes:</label>
                <select v-model="mesSeleccionado" class="rounded-lg px-3 py-2 border border-blue-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow">
                    <option value="" class="bg-gray-800">Todos</option>
                    <option v-for="(mes, idx) in meses" :key="mes" :value="idx" class="bg-gray-800">{{ mes }}</option>
                </select>
            </div>
            <form @submit.prevent="saveLimite" class="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-xl shadow border border-blue-300">
                <label class="text-blue-200 font-semibold text-base">Límite mensual:</label>
                <input
                    v-model.number="limiteGastoInput"
                    type="number"
                    min="0"
                    class="rounded-lg px-3 py-1 border border-blue-300 text- focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow w-28"
                    placeholder="Ej: 1000"
                    required
                />
                <span class="text-blue-200 font-semibold">€</span>
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow transition cursor-pointer">
                    {{ limiteGasto > 0 ? 'Editar' : 'Añadir' }}
                </button>
            </form>
        </div>

        <div class="flex flex-wrap gap-8 mb-12 w-full max-w-5xl justify-center">
            <div class="bg-white/10 backdrop-blur rounded-2xl px-10 py-8 flex flex-col items-center shadow-xl min-w-[200px] border border-blue-400/20">
                <span class="text-gray-300 text-base mb-1">Saldo</span>
                <span class="text-4xl font-extrabold" :class="saldoFiltrado >= 0 ? 'text-green-400' : 'text-red-400'">
                    {{ saldoFiltrado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                </span>
            </div>
            <div class="bg-white/10 backdrop-blur rounded-2xl px-10 py-8 flex flex-col items-center shadow-xl min-w-[200px] border border-blue-400/20">
                <span class="text-gray-300 text-base mb-1">Ingresos</span>
                <span class="text-3xl font-bold text-green-400">
                    {{ totalIngresosFiltrado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                </span>
            </div>
            <div class="bg-white/10 backdrop-blur rounded-2xl px-10 py-8 flex flex-col items-center shadow-xl min-w-[200px] border border-blue-400/20 relative">
                <span class="text-gray-300 text-base mb-1">Gastos</span>
                <span class="text-3xl font-bold text-red-400">
                    {{ totalGastosFiltrado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}
                </span>
                <div v-if="limiteGasto > 0" class="flex items-center mt-2">
                    <span class="text-blue-200 text-xs font-semibold mr-2">Límite: {{ limiteGasto.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}</span>
                    <span v-if="totalGastosFiltrado > limiteGasto" class="flex items-center ml-2">
                        <svg class="w-5 h-5 text-red-500 animate-pulse" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9zm-9 4h.01"></path>
                        </svg>
                        <span class="text-red-400 font-semibold ml-1 text-xs">¡Superado!</span>
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-10 justify-center w-full mb-14">
            <div class="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-xl flex flex-col items-center border border-blue-400/20">
                <BarCharts :transacciones="transaccionesFiltradas" />
            </div>
            <div class="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-xl flex flex-col items-center border border-blue-400/20">
                <PieChart :transacciones="transaccionesFiltradas" :categorias="categorias" />
            </div>
        </div>

        <div class="mb-10">
            <button @click="showModal = true"
                class="transition-colors bg-blue-500 hover:bg-blue-600 text-white rounded-full px-10 py-3 text-xl font-bold shadow-lg tracking-wide">
                Añadir Transacción +
            </button>
        </div>

        <transition name="fade">
        <div v-if="showLimiteModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div class="bg-white text-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-xs relative border-2 border-blue-200 animate-modal">
                <button @click="showLimiteModal = false"
                    class="absolute top-2 right-3 text-blue-400 hover:text-blue-700 text-3xl font-bold transition-transform hover:scale-125">&times;</button>
                <h2 class="text-xl font-bold mb-4 text-center text-blue-700">Límite de gasto mensual</h2>
                <form @submit.prevent="saveLimite" class="space-y-4">
                    <input v-model.number="limiteGastoInput" type="number" min="0" placeholder="Ej: 1000"
                        class="w-full rounded-lg px-3 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow" required />
                    <button type="submit"
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 font-semibold transition-colors shadow">
                        Guardar
                    </button>
                </form>
            </div>
        </div>
        </transition>

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
                            class="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow" />
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

        <div class="container mx-auto p-4 mt-8 w-full max-w-5xl pb-20">
            <div class="overflow-x-auto rounded-2xl shadow-xl border border-blue-400/20 bg-white/10">
                <table class="w-full bg-transparent">
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
                        <tr v-for="(t, idx) in transaccionesFiltradas" :key="idx" :class=" [
                            'border-b transition-colors',
                            idx % 2 === 0 ? 'bg-white/20 hover:bg-blue-100/20' : 'hover:bg-white/10',
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
                        <tr v-if="!transaccionesFiltradas.length">
                            <td colspan="5" class="text-center py-8 text-gray-400">No hay transacciones en este mes.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
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
const showLimiteModal = ref(false)
const nuevaCategoria = ref('')
const limiteGasto = ref<number>(0)
const limiteGastoInput = ref<number>(0)

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

function saveLimite() {
    limiteGasto.value = limiteGastoInput.value
    showLimiteModal.value = false
}

watch(showLimiteModal, (val) => {
    if (val) limiteGastoInput.value = limiteGasto.value
})

function formatFecha(fecha: string) {
    if (!fecha) return ''
    const [y, m, d] = fecha.split('-')
    return `${d}/${m}/${y}`
}

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]
const mesSeleccionado = ref<string | number>('')

const transaccionesFiltradas = computed(() => {
    if (mesSeleccionado.value === '' || mesSeleccionado.value === null) return transacciones.value
    return transacciones.value.filter(t => {
        const m = Number(t.fecha.split('-')[1]) - 1
        return m === Number(mesSeleccionado.value)
    })
})

const totalIngresosFiltrado = computed(() =>
    transaccionesFiltradas.value.filter(t => t.tipo === 'Ingreso').reduce((sum, t) => sum + t.importe, 0)
)
const totalGastosFiltrado = computed(() =>
    transaccionesFiltradas.value.filter(t => t.tipo === 'Gasto').reduce((sum, t) => sum + t.importe, 0)
)
const saldoFiltrado = computed(() => totalIngresosFiltrado.value - totalGastosFiltrado.value)
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