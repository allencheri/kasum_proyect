<template>
    <div class=" text-white min-h-screen flex flex-col">
        <div class="hero-section mt-30 text-center py-16 relative overflow-hidden">
            
            <div class="relative z-10 max-w-5xl mx-auto px-4">
                <h1 class="text-5xl font-extrabold mb-4 text-white drop-shadow-lg animate-fadeIn tracking-tight">
                    💰 Mis Ahorros
                </h1>
                <p class="text-xl text-secondary max-w-2xl mx-auto">
                    Organiza tus metas financieras y visualiza tu progreso para alcanzar tus sueños.
                </p>
                <div class="mt-10">
                    <button @click="showModal = true"
                        class="bg-primary hover:bg-primary/80 text-secondary px-8 py-3  rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center mx-auto gap-2"
                        aria-label="Añadir nueva meta de ahorro">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        Crear Nueva Meta
                    </button>
                </div>
            </div>
        </div>
       

        <div v-if="jars.length > 0" class="container mx-auto px-4 py-5 relative">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div class="bg-primary backdrop-blur-sm p-6 rounded-2xl border border-secondary/20 shadow-xl">
                    <h3 class="text-lg text-secondary mb-2">Total Ahorrado</h3>
                    <p class="text-3xl font-bold">{{ totalSaved.toLocaleString() }}€</p>
                </div>
                <div class="bg-primary backdrop-blur-sm p-6 rounded-2xl border border-secondary/20 shadow-xl">
                    <h3 class="text-lg text-secondary mb-2">Meta Total</h3>
                    <p class="text-3xl font-bold">{{ totalGoal.toLocaleString() }}€</p>
                </div>
                <div class="bg-primary backdrop-blur-sm p-6 rounded-2xl border border-secondary/20 shadow-xl">
                    <h3 class="text-lg text-secondary mb-2">Progreso General</h3>
                    <div class="flex items-center gap-3">
                        <div class="text-3xl font-bold">{{ overallProgress }}%</div>
                        <div class="flex-grow h-3 bg-white/20 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-amber-500 to-amber-300" :style="`width: ${overallProgress}%`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="jars.length === 0" class="container mx-auto px-4 py-12 mt-35 text-center">
            <div class="max-w-lg mx-auto bg-primary backdrop-blur-sm p-10 rounded-2xl border border-secondary/20 shadow-xl">
                <svg class="mx-auto h-24 w-24 text-secondary/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 8a2.99 2.99 0 0 1-2.599-1C8.882 6.4 9.4 6 10 6h4c.6 0 1.118.4.599 1A2.99 2.99 0 0 1 12 8Z" />
                </svg>
                <h2 class="text-3xl font-bold mt-6 mb-3">¡Empieza a ahorrar!</h2>
                <p class="text-secondary mb-8">Aún no tienes metas de ahorro. Crea tu primera meta para comenzar tu viaje hacia la libertad financiera.</p>
                <button @click="showModal = true"
                    class="bg-primary hover:bg-primary/80 text-secondary px-8 py-3  rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    Crear Mi Primera Meta
                </button>
            </div>
        </div>
        
        <div v-if="jars.length > 0" class="container mx-auto px-4 py-10 mb-12">
            <h2 class="text-3xl font-bold mb-8 text-center">Mis Metas de Ahorro</h2>
            <div class="grid grid-cols-4 gap-8 ">
                <div v-for="jar in jars" :key="jar.id"
                    class="relative bg-primary backdrop-blur-sm rounded-2xl border border-secondary/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col w-full">
                    <div class="bg-gradient-to-r from-primary to-primary/70 py-3 px-4 flex items-center justify-between">
                        <h3 class="font-bold text-lg text-secondary">{{ jar.name }}</h3>
                        <button @click="confirmDeleteJar(jar)" 
                            class="text-secondary/70 hover:text-red-500 cursor-pointer transition-colors duration-300 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    <div class="p-5 flex flex-col items-center flex-grow">
                        <div class="relative w-[120px] h-[180px] mb-6">
                            <img :src="getJarImage(jar)" alt="Jarra de ahorros" class="w-full h-full object-contain" />
                           
                        </div>
                        
                        <div class="w-full">
                            <div class="mb-4">
                                <div class="flex justify-between items-center mb-1">
                                    <span class="text-sm text-secondary">Progreso</span>
                                    <span class="text-sm font-medium text-amber-400">{{ Math.round((jar.saved / jar.goal) * 100) || 0 }}%</span>
                                </div>
                                <div class="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                                    <div :class="`h-full rounded-full ${getProgressColorClass(jar)}`" 
                                        :style="`width: ${Math.round((jar.saved / jar.goal) * 100) || 0}%; transition: width 1s ease-in-out;`"></div>
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 gap-2 mb-4">
                                <div class="bg-primary/30 rounded-lg p-2 text-center">
                                    <div class="text-xs text-secondary mb-1">Ahorrado</div>
                                    <div class="text-lg font-bold text-amber-400">{{ jar.saved.toLocaleString() }}€</div>
                                </div>
                                <div class="bg-primary/30 rounded-lg p-2 text-center">
                                    <div class="text-xs text-secondary mb-1">Meta</div>
                                    <div class="text-lg font-bold text-white">{{ jar.goal.toLocaleString() }}€</div>
                                </div>
                            </div>
                            
                            <div class="flex justify-between text-sm mb-4">
                                <div class="text-secondary">
                                    <span class="text-white font-medium">{{ (jar.goal - jar.saved).toLocaleString() }}€</span> restantes
                                </div>
                                <div v-if="jar.saved > 0" class="text-secondary">
                                    <span class="text-white font-medium">{{ getEstimatedCompletion(jar) }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-primary/30 p-4 border-t border-secondary/10">
                        <form @submit.prevent="addSavings(jar.id)" class="flex justify-center space-x-2">
                            <div class="relative flex-1">
                                <input v-model.number="jar.amountToAdd" type="number" placeholder="0"
                                    class="pl-7 pr-2 py-2 border bg-primary/20 text-white placeholder-secondary/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 w-full transition-all duration-300"
                                    min="0" aria-label="Cantidad a añadir en euros" />
                                <span class="absolute left-2 top-1/2 transform -translate-y-1/2 text-secondary/70">€</span>
                            </div>
                            <button type="submit"
                                class="bg-primary hover:bg-primary/80 cursor-pointer text-secondary px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-1"
                                :disabled="!jar.amountToAdd || jar.amountToAdd <= 0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                </svg>
                                Añadir
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

         <div class="container mx-auto px-4 py-10 rounded-3xl mt-0 mb-16 max-w-5xl">
            <h2 class="text-3xl font-bold mb-8 text-center text-primary">Consejos para Ahorrar</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-primary backdrop-blur-sm p-6 rounded-2xl border border-secondary/20 shadow-xl">
                    <div class="text-amber-500 text-4xl mb-4">🎯</div>
                    <h3 class="text-xl font-semibold mb-2">Define metas claras</h3>
                    <p class="text-secondary">Establece objetivos específicos y medibles para mantener tu motivación.</p>
                </div>
                <div class="bg-primary backdrop-blur-sm p-6 rounded-2xl border border-secondary/20 shadow-xl">
                    <div class="text-amber-500 text-4xl mb-4">📅</div>
                    <h3 class="text-xl font-semibold mb-2">Ahorra regularmente</h3>
                    <p class="text-secondary">Crea un hábito de ahorro constante, aunque sean pequeñas cantidades.</p>
                </div>
                <div class="bg-primary backdrop-blur-sm p-6 rounded-2xl border border-secondary/20 shadow-xl">
                    <div class="text-amber-500 text-4xl mb-4">📊</div>
                    <h3 class="text-xl font-semibold mb-2">Visualiza tu progreso</h3>
                    <p class="text-secondary">Celebra tus logros y mantén visible tu avance hacia tus metas.</p>
                </div>
            </div>
        </div>
        
        <transition name="modal">
            <div v-if="showModal" class="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50">
                <div class="bg-primary/40 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-2xl animate-slideUp border border-secondary/20">
                    <h2 class="text-3xl font-bold text-white mb-6">Nueva Meta de Ahorro</h2>
                    <form @submit.prevent="addNewGoal">
                        <div class="mb-5">
                            <label class="block text-secondary mb-2" for="goal-name">Nombre de la Meta</label>
                            <input v-model="newGoal.name" id="goal-name" type="text" required
                                class="w-full px-4 py-3 bg-primary/20 text-white placeholder-secondary/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all duration-300"
                                placeholder="Ej. Viaje a Japón" aria-describedby="goal-name-error" />
                            <p v-if="newGoalError.name" id="goal-name-error" class="text-red-400 text-sm mt-2">
                                {{ newGoalError.name }}
                            </p>
                        </div>
                        <div class="mb-5">
                            <label class="block text-secondary mb-2" for="goal-amount">Cantidad Objetivo (€)</label>
                            <input v-model.number="newGoal.amount" id="goal-amount" type="number" required min="1"
                                class="w-full px-4 py-3 bg-primary/20 text-white placeholder-secondary/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all duration-300"
                                placeholder="Ej. 5000" aria-describedby="goal-amount-error" />
                            <p v-if="newGoalError.amount" id="goal-amount-error" class="text-red-400 text-sm mt-2">
                                {{ newGoalError.amount }}
                            </p>
                        </div>
                        <div class="flex justify-end space-x-3 mt-8">
                            <button type="button" @click="showModal = false"
                                class="bg-gray-600 hover:bg-gray-500 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                                aria-label="Cancelar creación de meta">
                                Cancelar
                            </button>
                            <button type="submit"
                                class="bg-primary hover:bg-primary/80 cursor-pointer text-secondary px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                                aria-label="Crear nueva meta">
                                Crear Meta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>

        <transition name="modal">
            <div v-if="showDeleteModal" class="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center z-50">
                <div class="bg-primary/40 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md shadow-2xl animate-slideUp border border-secondary/20">
                    <h2 class="text-2xl font-bold text-white mb-3">Eliminar Meta</h2>
                    <p class="text-secondary mb-6">
                        ¿Estás seguro de que quieres eliminar la meta "{{ jarToDelete?.name }}"? Esta acción no se puede deshacer.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="showDeleteModal = false"
                            class="bg-gray-600 hover:bg-gray-500 cursor-pointer text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300">
                            Cancelar
                        </button>
                        <button @click="deleteJar"
                            class="bg-red-700 hover:bg-red-600 cursor-pointer text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </transition>

        <transition name="toast">
            <div v-if="toastMessage"
                class="fixed bottom-6 right-6 px-6 py-3 rounded-lg text-white font-medium shadow-lg z-50"
                :class="{'bg-primary': toastType === 'success', 'bg-red-700': toastType === 'error', 'bg-amber-500': toastType === 'warning'}">
                <div class="flex items-center gap-2">
                    <svg v-if="toastType === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <svg v-if="toastType === 'error'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    <svg v-if="toastType === 'warning'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    {{ toastMessage }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
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
const showDeleteModal = ref(false)
const jarToDelete = ref<Jar | null>(null)
const newGoal = ref<NewGoal>({ name: '', amount: 0 })
const newGoalError = ref<NewGoalError>({ name: '', amount: '' })
const toastMessage = ref<string>('')
const toastType = ref<'success' | 'error' | 'warning'>('success')
const svgHeight = 250 

const totalSaved = computed(() => {
    return jars.value.reduce((total, jar) => total + jar.saved, 0)
})

const totalGoal = computed(() => {
    return jars.value.reduce((total, jar) => total + jar.goal, 0)
})

const overallProgress = computed(() => {
    if (totalGoal.value === 0) return 0
    return Math.round((totalSaved.value / totalGoal.value) * 100)
})

async function fetchJars() {
    if (userStore.user?.jars) {
        jars.value = userStore.user.jars.map(jar => ({
            ...jar,
            amountToAdd: 0,
            fillHeight: calculateFillHeight(jar.saved, jar.goal)
        }));
    }
}

async function saveJarsToApi() {
    const userId = userStore.user?.id
    if (!userId) return
    try {
        const user = await getUserById(userId)
        await updateUser(userId, {
            ...user,
            jars: jars.value.map(({ fillHeight, amountToAdd, ...rest }) => rest)
        })
    } catch (e) {
        showToast('Error al guardar los cambios', 'error')
    }
}

onMounted(fetchJars)

watch(() => userStore.user?.jars, fetchJars, { deep: true });

watch(jars, saveJarsToApi, { deep: true })

function getJarImage(jar: Jar): string {
    if (jar.goal === 0) return '/jar.svg'
    const percent = (jar.saved / jar.goal) * 100
    if (percent >= 81) return '/jar100.svg'
    if (percent >= 61) return '/jar60.svg'
    if (percent >= 41) return '/jar30.svg'
    if (percent >= 21) return '/jar10.svg'
    if (percent >= 5) return '/jar5.svg'
    return '/jar.svg'
}

function getProgressColorClass(jar: Jar): string {
    const percent = (jar.saved / jar.goal) * 100
    if (percent >= 80) return 'bg-gradient-to-r from-green-400 to-green-300'
    if (percent >= 50) return 'bg-gradient-to-r from-amber-500 to-amber-300'
    if (percent >= 25) return 'bg-gradient-to-r from-amber-400 to-amber-300'
    return 'bg-gradient-to-r from-amber-600 to-amber-400'
}

const calculateFillHeight = (saved: number, goal: number): number => {
    if (goal === 0) return 0
    const percentage = Math.min(saved / goal, 1)
    return percentage * svgHeight
}

async function addSavings(jarId: string) {
    const jar = jars.value.find(j => j.id === jarId);
    if (jar) {
        jar.saved += jar.amountToAdd || 0;
        jar.amountToAdd = 0;
        jar.fillHeight = calculateFillHeight(jar.saved, jar.goal);
        userStore.updateJar(jar);
        showToast('Ahorro actualizado exitosamente', 'success');
    }
}

async function addNewGoal() {
    if (!newGoal.value.name || !newGoal.value.amount) {
        newGoalError.value = {
            name: !newGoal.value.name ? 'El nombre es requerido' : '',
            amount: !newGoal.value.amount ? 'El monto es requerido' : ''
        };
        return;
    }

    const jar: Jar = {
        id: uuidv4(),
        name: newGoal.value.name,
        saved: 0,
        goal: newGoal.value.amount,
        amountToAdd: 0,
        fillHeight: calculateFillHeight(0, newGoal.value.amount)
    };

    userStore.addJar(jar);
    jars.value.push(jar); 
    showModal.value = false;
    newGoal.value = { name: '', amount: 0 };
    showToast('Meta creada exitosamente', 'success');
}



function confirmDeleteJar(jar: Jar) {
    jarToDelete.value = jar
    showDeleteModal.value = true
}

async function deleteJar() {
    if (jarToDelete.value) {
        userStore.deleteJar(jarToDelete.value.id);
        jars.value = jars.value.filter(j => j.id !== jarToDelete.value?.id);
        showDeleteModal.value = false;
        jarToDelete.value = null;
        showToast('Meta eliminada exitosamente', 'success');
    }
}

function showToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    toastMessage.value = message
    toastType.value = type
    setTimeout(() => {
        toastMessage.value = ''
    }, 3000)
}

function getEstimatedCompletion(jar: Jar): string {
    if (jar.saved >= jar.goal) return "¡Completado!"
    
    if (jar.saved <= 0) return "Sin estimar"
    
    const monthlySavingRate = jar.saved * 0.1
    
    const remainingAmount = jar.goal - jar.saved
    const remainingMonths = Math.ceil(remainingAmount / monthlySavingRate)
    
    if (remainingMonths < 1) return "Menos de 1 mes"
    if (remainingMonths === 1) return "1 mes aprox."
    if (remainingMonths < 12) return `${remainingMonths} meses aprox.`
    
    const years = Math.floor(remainingMonths / 12)
    const months = remainingMonths % 12
    
    if (months === 0) return `${years} ${years === 1 ? 'año' : 'años'} aprox.`
    return `${years} ${years === 1 ? 'año' : 'años'} y ${months} ${months === 1 ? 'mes' : 'meses'} aprox.`
}
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

.neomorfismo {
    background: rgba(10, 30, 46, 0.3);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    border: 1px solid rgba(245, 243, 255, 0.2);
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

@keyframes float {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

@keyframes float-slow {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

@keyframes pulse-slow {
    0%, 100% {
        opacity: 0.7;
    }
    50% {
        opacity: 0.9;
    }
}

.animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
}

.animate-slideUp {
    animation: slideUp 0.5s ease-out;
}

.animate-float {
    animation: float 4s ease-in-out infinite;
}

.animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
}

.animate-pulse-slow {
    animation: pulse-slow 3s infinite;
}

.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
    transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

@media (max-width: 640px) {
    .hero-section {
        padding-top: 3rem;
        padding-bottom: 3rem;
    }
}
</style>