<template>
    <div class="min-h-screen flex flex-col  sm:p-6 md:p-8">
        <header class="mb-10 text-center mt-40">
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
                💰 Mis Ahorros
            </h1>
            <p class="text-lg sm:text-xl text-gray-200 mt-2">¡Organiza tus metas financieras con estilo!</p>
        </header>
        <div class="flex justify-center">
            <button @click="showModal = true"
                class="bg-blue-900/80 hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                aria-label="Añadir nueva meta de ahorro">
                Añadir Nueva Meta
            </button>
        </div>

        <div class="flex justify-center w-full">
            <div class="grid grid-cols-1 mt-60 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
                <div v-for="jar in jars" :key="jar.id"
                    class="relative neomorfismo backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div class="w-[150px] sm:w-[200px] h-[300px] sm:h-[350px] mx-auto relative"
                        :id="'jar-container-' + jar.id">
                        <img :src="getJarImage(jar)" alt="Jarra de ahorros"
                            class="w-full h-full object-contain transition-opacity duration-500" />
                        <div class="absolute inset-0 flex items-end"
                            :style="{ height: `${jar.fillHeight}px`, transition: 'height 0.5s ease-in-out' }">
                            <div class="w-full bg-gradient-to-t from-blue-400 to-blue-200 opacity-70"></div>
                        </div>
                        <div
                            class="absolute left-[-40px] sm:left-[-50px] top-0 h-full flex flex-col justify-between text-blue-900 text-xs sm:text-sm font-semibold">
                            <div>{{ jar.goal.toLocaleString() }}€</div>
                            <div>{{ Math.floor(jar.goal / 2).toLocaleString() }}€</div>
                            <div>0€</div>
                        </div>
                    </div>

                    <div class="text-center mt-4">
                        <h3 class="text-xl sm:text-2xl font-bold text-blue-900">{{ jar.name }}</h3>
                        <p class="text-base sm:text-lg text-blue-900">
                            Ahorrado:
                            <span class="font-bold text-amber-600">{{ jar.saved.toLocaleString() }}€</span>
                            / {{ jar.goal.toLocaleString() }}€
                        </p>
                        <div class="mt-2 text-sm text-blue-900">
                            {{ Math.round((jar.saved / jar.goal) * 100) || 0 }}% completado
                        </div>
                    </div>

                    <form @submit.prevent="addSavings(jar.id)" class="flex justify-center space-x-3 mt-4">
                        <input v-model.number="jar.amountToAdd" type="number" placeholder="Añadir €"
                            class="px-4 py-2 border bg-white/20 text-blue-900 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-32 transition-all duration-300"
                            min="0" aria-label="Cantidad a añadir en euros" />
                        <button type="submit"
                            class="bg-blue-900 hover:bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                            aria-label="Añadir ahorros">
                            Añadir
                        </button>
                    </form>
                </div>
            </div>
        </div>



        <transition name="modal">
            <div v-if="showModal" class="fixed inset-0 bg-black/90 bg-opacity-60 flex items-center justify-center z-50">
                <div class="bg-white/10 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md shadow-2xl animate-slideUp">
                    <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">Nueva Meta de Ahorro</h2>
                    <form @submit.prevent="addNewGoal">
                        <div class="mb-5">
                            <label class="block text-gray-200 mb-2" for="goal-name">Nombre de la Meta</label>
                            <input v-model="newGoal.name" id="goal-name" type="text" required
                                class="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                                placeholder="Ej. Viaje a Japón" aria-describedby="goal-name-error" />
                            <p v-if="newGoalError.name" id="goal-name-error" class="text-red-400 text-sm mt-2">
                                {{ newGoalError.name }}
                            </p>
                        </div>
                        <div class="mb-5">
                            <label class="block text-gray-200 mb-2" for="goal-amount">Cantidad Objetivo (€)</label>
                            <input v-model.number="newGoal.amount" id="goal-amount" type="number" required min="1"
                                class="w-full px-4 py-2 bg-white/20 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                                placeholder="Ej. 5000" aria-describedby="goal-amount-error" />
                            <p v-if="newGoalError.amount" id="goal-amount-error" class="text-red-400 text-sm mt-2">
                                {{ newGoalError.amount }}
                            </p>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button type="button" @click="showModal = false"
                                class="bg-gray-600 hover:bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                                aria-label="Cancelar creación de meta">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="bg-blue-900 hover:bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                                aria-label="Crear nueva meta">
                                Crear Meta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>

        <transition name="toast">
            <div v-if="toastMessage"
                class="fixed bottom-4 right-4 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-lg">
                {{ toastMessage }}
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getUserById, updateUser } from '../app/api'
import { useUserStore } from '../store/store'

interface Jar {
    id: string
    name: string
    saved: number
    goal: number
    amountToAdd: number
    fillHeight: number
}

interface NewGoal {
    name: string
    amount: number
}

interface NewGoalError {
    name: string
    amount: string
}

const userStore = useUserStore()
const jars = ref<Jar[]>([])
const showModal = ref(false)
const newGoal = ref<NewGoal>({ name: '', amount: 0 })
const newGoalError = ref<NewGoalError>({ name: '', amount: '' })
const toastMessage = ref<string>('')
const svgHeight = 350

async function fetchJars() {
    const userId = userStore.user?.id
    if (!userId) {
        jars.value = []
        return
    }
    try {
        const user = await getUserById(userId)
        jars.value = (user.jars || []).map((jar: any) => ({
            ...jar,
            amountToAdd: 0,
            fillHeight: calculateFillHeight(jar.saved, jar.goal)
        }))
    } catch (e) {
        jars.value = []
    }
}

async function saveJarsToApi() {
    const userId = userStore.user?.id
    if (!userId) return
    const user = await getUserById(userId)
    await updateUser(userId, {
        ...user,
        jars: jars.value.map(({ fillHeight, amountToAdd, ...rest }) => rest)
    })
}

onMounted(fetchJars)

watch(() => userStore.user?.id, fetchJars)

watch(jars, saveJarsToApi, { deep: true })

function getJarImage(jar: Jar): string {
    if (jar.goal === 0) return '/jar.svg'
    const percent = (jar.saved / jar.goal) * 100
    if (percent >= 81) return '/jar100%.svg'
    if (percent >= 61) return '/jar60%.svg'
    if (percent >= 41) return '/jar30%.svg'
    if (percent >= 21) return '/jar10%.svg'
    if (percent >= 5) return '/jar5%.svg'
    return '/jar.svg'
}

const calculateFillHeight = (saved: number, goal: number): number => {
    const percentage = Math.min(saved / goal, 1)
    return percentage * svgHeight
}

function addSavings(jarId: string) {
    const jar = jars.value.find((j) => j.id === jarId)
    if (!jar || jar.amountToAdd <= 0) {
        toastMessage.value = 'Por favor, introduce una cantidad válida'
        setTimeout(() => (toastMessage.value = ''), 3000)
        return
    }

    const maxAddable = jar.goal - jar.saved
    if (jar.amountToAdd > maxAddable) {
        jar.amountToAdd = maxAddable
        toastMessage.value = `No puedes añadir más de ${maxAddable}€`
        setTimeout(() => (toastMessage.value = ''), 3000)
    }

    jar.saved += jar.amountToAdd
    jar.fillHeight = calculateFillHeight(jar.saved, jar.goal)
    toastMessage.value = `¡${jar.amountToAdd}€ añadidos a ${jar.name}!`
    jar.amountToAdd = 0
    setTimeout(() => (toastMessage.value = ''), 3000)
    saveJarsToApi()
}

function addNewGoal() {
    newGoalError.value = { name: '', amount: '' }

    if (!newGoal.value.name.trim()) {
        newGoalError.value.name = 'El nombre de la meta es obligatorio'
        return
    }
    if (newGoal.value.amount <= 0) {
        newGoalError.value.amount = 'La cantidad debe ser mayor a 0'
        return
    }

    jars.value.push({
        id: uuidv4(),
        name: newGoal.value.name.trim(),
        saved: 0,
        goal: newGoal.value.amount,
        amountToAdd: 0,
        fillHeight: calculateFillHeight(0, newGoal.value.amount),
    })
    toastMessage.value = `Meta "${newGoal.value.name}" creada con éxito`
    newGoal.value = { name: '', amount: 0 }
    showModal.value = false
    setTimeout(() => (toastMessage.value = ''), 3000)
    saveJarsToApi()
}
</script>

<style scoped>
.neomorfismo {
    width: 350px;
    height: 580px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #f2f2f3;
    border-radius: 12px;
    box-shadow: inset 5px 5px 10px #a9a9aa77,
        inset -5px -5px 10px #ffffff7e;
}

.animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
}

.animate-slideUp {
    animation: slideUp 0.5s ease-out;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .bg-white\/10,
.modal-leave-active .bg-white\/10 {
    transition: transform 0.3s ease;
}

.modal-enter-from .bg-white\/10,
.modal-leave-to .bg-white\/10 {
    transform: translateY(20px);
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
    transform: translateX(100%);
    opacity: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>