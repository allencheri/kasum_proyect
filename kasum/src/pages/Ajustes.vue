<template>
  <div class="bg-personalizar text-white flex flex-col items-center pt-40 mb-20">
    <h1 class="text-5xl font-extrabold mb-2 mt-5 drop-shadow-lg tracking-tight">Ajustes</h1>
    <p class="text-lg text-blue-100 mb-10">Personaliza tu experiencia y gestiona tu cuenta</p>

    <div class="container mx-auto max-w-5xl px-4 mb-20">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="md:col-span-1">
          <div class="bg-white/10 backdrop-blur rounded-2xl px-6 py-8 shadow-xl border border-blue-400/20 sticky top-24">
            <ul class="space-y-2">
              <li v-for="(section, idx) in sections" :key="idx">
                <a @click="activeSection = section.id" 
                  class="block py-3 px-4 rounded-lg cursor-pointer transition-all duration-300"
                  :class="activeSection === section.id ? 'bg-blue-900 text-white font-semibold' : 'hover:bg-white/10'">
                  <div class="flex items-center gap-3">
                    <span class="text-xl">{{ section.icon }}</span>
                    <span>{{ section.name }}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="md:col-span-3">
          <div v-if="activeSection === 'profile'" class="bg-white/10 backdrop-blur rounded-2xl px-8 py-10 shadow-xl border border-blue-400/20">
            <h2 class="text-2xl font-bold mb-6">Tu Perfil</h2>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl font-bold">
                {{ userInitials }}
              </div>
              <div>
                <h3 class="text-xl font-semibold">{{ user.nombre }} {{ user.apellido }}</h3>
                <p class="text-blue-200">{{ user.email }}</p>
                <p class="text-sm text-blue-300 mt-2">Miembro desde {{ formatDate(user.fechaRegistro) }}</p>
              </div>
            </div>

            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label class="block text-blue-200 font-semibold mb-2">Nombre</label>
                  <input v-model="profileForm.nombre" type="text" 
                    class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"/>
                </div>
                <div>
                  <label class="block text-blue-200 font-semibold mb-2">Apellido</label>
                  <input v-model="profileForm.apellido" type="text" 
                    class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"/>
                </div>
              </div>
              <div>
                <label class="block text-blue-200 font-semibold mb-2">Email</label>
                <input v-model="profileForm.email" type="email" 
                  class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"/>
              </div>
              <button type="submit"
                class="bg-[#0a1e2e] hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Guardar Cambios
              </button>
            </form>
          </div>

          <div v-if="activeSection === 'subscription'" class="space-y-6">
            <div class="bg-white/10 backdrop-blur rounded-2xl px-8 py-10 shadow-xl border border-blue-400/20">
              <h2 class="text-2xl font-bold mb-6">Plan de Suscripción</h2>
              <div class="mb-8">
                <div class="flex items-center gap-4">
                  <div class="p-3 bg-blue-900 rounded-full">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">Plan Actual: <span class="text-blue-300">{{ user.plan || 'Gratis' }}</span></h3>
                    <p v-if="user.plan !== 'Gratis'" class="text-sm text-blue-300">
                      Próxima facturación: {{ formatDate(user.nextBillingDate || new Date()) }}
                    </p>
                  </div>
                </div>
              </div>

              <h3 class="text-xl font-semibold mb-4">Cambiar Plan</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div v-for="plan in plans" :key="plan.id" 
                  class="relative bg-white/5 rounded-2xl p-6 border"
                  :class="[
                    selectedPlan === plan.id ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 'border-blue-400/20',
                    plan.id === user.plan ? 'bg-blue-900/30' : ''
                  ]">
                  <div v-if="plan.id === user.plan" class="absolute top-3 right-3 text-blue-300 text-xs font-bold bg-blue-900/50 px-2 py-1 rounded-full">
                    Actual
                  </div>
                  <h4 class="text-xl font-bold mb-2">{{ plan.name }}</h4>
                  <p class="text-2xl font-extrabold mb-4">{{ plan.price }}<span class="text-sm font-normal text-blue-300">/mes</span></p>
                  <ul class="space-y-2 text-sm mb-6">
                    <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-start gap-2">
                      <svg class="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                  <button 
                    @click="selectPlan(plan.id)"
                    class="w-full py-2 rounded-lg font-semibold transition-colors"
                    :class="plan.id === user.plan ? 'bg-blue-800/50 text-blue-300 cursor-not-allowed' : 'bg-[#0a1e2e] hover:bg-blue-800 text-white'">
                    {{ plan.id === user.plan ? 'Plan Actual' : 'Seleccionar' }}
                  </button>
                </div>
              </div>

              <button 
                v-if="selectedPlan && selectedPlan !== user.plan"
                @click="changePlan"
                class="bg-[#0a1e2e] hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Confirmar Cambio de Plan
              </button>
            </div>

            <div class="bg-white/10 backdrop-blur rounded-2xl px-8 py-10 shadow-xl border border-blue-400/20">
              <h2 class="text-2xl font-bold mb-6">Método de Pago</h2>
              <div v-if="user.paymentMethod" class="mb-6">
                <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-blue-400/30">
                  <div class="p-2 bg-blue-900/50 rounded-lg">
                    <img :src="getCardIcon(user.paymentMethod.type)" alt="Tarjeta" class="w-8 h-8" />
                  </div>
                  <div class="flex-grow">
                    <p class="font-medium">{{ user.paymentMethod.type }} terminada en {{ user.paymentMethod.last4 }}</p>
                    <p class="text-sm text-blue-300">Expira: {{ user.paymentMethod.expMonth }}/{{ user.paymentMethod.expYear }}</p>
                  </div>
                  <button @click="showPaymentModal = true" 
                    class="text-blue-300 hover:text-white transition-colors">
                    Editar
                  </button>
                </div>
              </div>

              <button v-else @click="showPaymentModal = true"
                class="bg-[#0a1e2e] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Añadir Método de Pago
              </button>
            </div>
          </div>

          <div v-if="activeSection === 'security'" class="bg-white/10 backdrop-blur rounded-2xl px-8 py-10 shadow-xl border border-blue-400/20">
            <h2 class="text-2xl font-bold mb-6">Seguridad</h2>
            <div class="mb-10">
              <h3 class="text-xl font-semibold mb-4">Cambiar Contraseña</h3>
              <form @submit.prevent="changePassword" class="space-y-4">
                <div>
                  <label class="block text-blue-200 font-semibold mb-2">Contraseña Actual</label>
                  <input 
                    v-model="passwordForm.current" 
                    type="password" 
                    class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
                    placeholder="Introduce tu contraseña actual"
                  />
                </div>
                <div>
                  <label class="block text-blue-200 font-semibold mb-2">Nueva Contraseña</label>
                  <input 
                    v-model="passwordForm.new" 
                    type="password" 
                    class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
                    placeholder="Al menos 8 caracteres"
                  />
                </div>
                <div>
                  <label class="block text-blue-200 font-semibold mb-2">Confirmar Nueva Contraseña</label>
                  <input 
                    v-model="passwordForm.confirm" 
                    type="password" 
                    class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
                    placeholder="Repite la nueva contraseña"
                  />
                </div>
                <div v-if="passwordError" class="text-red-400 bg-red-400/20 p-3 rounded-lg">
                  {{ passwordError }}
                </div>
                <button type="submit"
                  class="bg-[#0a1e2e] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  Actualizar Contraseña
                </button>
              </form>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-4">Autenticación de Dos Factores</h3>
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-blue-400/30">
                <div>
                  <p class="font-medium">Protección de Dos Factores</p>
                  <p class="text-sm text-blue-300">Añade una capa extra de seguridad a tu cuenta</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="twoFactor" type="checkbox" class="sr-only peer" @change="toggleTwoFactor">
                  <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div v-if="activeSection === 'notifications'" class="bg-white/10 backdrop-blur rounded-2xl px-8 py-10 shadow-xl border border-blue-400/20">
            <h2 class="text-2xl font-bold mb-6">Notificaciones</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-blue-400/30">
                <div>
                  <p class="font-medium">Alertas de gastos</p>
                  <p class="text-sm text-blue-300">Recibe notificaciones cuando superes el límite de gastos</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.expenses" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-blue-400/30">
                <div>
                  <p class="font-medium">Recordatorios de metas</p>
                  <p class="text-sm text-blue-300">Recibe recordatorios sobre tus metas de ahorro</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.goals" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-blue-400/30">
                <div>
                  <p class="font-medium">Consejos financieros</p>
                  <p class="text-sm text-blue-300">Recibe tips semanales para mejorar tus finanzas</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.tips" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-blue-400/30">
                <div>
                  <p class="font-medium">Correos promocionales</p>
                  <p class="text-sm text-blue-300">Recibe ofertas y novedades sobre KASUM</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="notificationSettings.marketing" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <button @click="saveNotificationSettings"
                class="mt-6 bg-[#0a1e2e] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Guardar Preferencias
              </button>
            </div>
          </div>

          <div v-if="activeSection === 'data'" class="bg-white/10 backdrop-blur rounded-2xl px-8 py-10 shadow-xl border border-blue-400/20">
            <h2 class="text-2xl font-bold mb-6">Gestión de Datos</h2>
            <div class="space-y-8">
              <div>
                <h3 class="text-xl font-semibold mb-3">Exportar Mis Datos</h3>
                <p class="text-blue-200 mb-4">Descarga una copia de toda tu información y transacciones.</p>
                <button @click="exportUserData"
                  class="bg-[#0a1e2e] hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Exportar Datos
                </button>
              </div>

              <div>
                <h3 class="text-xl font-semibold mb-3 text-red-400">Eliminar Cuenta</h3>
                <p class="text-blue-200 mb-4">Esta acción es permanente y no se puede deshacer. Todos tus datos serán eliminados.</p>
                <button @click="showDeleteModal = true"
                  class="bg-red-800/50 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Eliminar mi cuenta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="showPaymentModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div class="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md border border-blue-400/20 animate-modal">
          <h2 class="text-2xl font-bold mb-6">Método de Pago</h2>
          <form @submit.prevent="savePaymentMethod" class="space-y-4">
            <div>
              <label class="block text-blue-200 font-semibold mb-2">Nombre del Titular</label>
              <input v-model="paymentForm.cardHolder" type="text" 
                class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
                placeholder="Nombre como aparece en la tarjeta" />
            </div>
            <div>
              <label class="block text-blue-200 font-semibold mb-2">Número de Tarjeta</label>
              <input v-model="paymentForm.cardNumber" type="text" maxlength="19"
                class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
                placeholder="XXXX XXXX XXXX XXXX" 
                @input="formatCardNumber" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-blue-200 font-semibold mb-2">Expiración</label>
                <input v-model="paymentForm.expiry" type="text" maxlength="5"
                  class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
                  placeholder="MM/YY" 
                  @input="formatExpiry" />
              </div>
              <div>
                <label class="block text-blue-200 font-semibold mb-2">CVC</label>
                <input v-model="paymentForm.cvc" type="text" maxlength="4"
                  class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
                  placeholder="CVC" />
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-6">
              <button type="button" @click="showPaymentModal = false"
                class="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold">
                Cancelar
              </button>
              <button type="submit"
                class="bg-[#0a1e2e] hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div class="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md border border-red-400/20 animate-modal">
          <h2 class="text-2xl font-bold mb-4 text-red-400">¿Estás seguro?</h2>
          <p class="mb-6 text-gray-200">Esta acción eliminará permanentemente tu cuenta y todos tus datos. No podrás recuperarlos.</p>
          <div>
            <label class="block text-blue-200 font-semibold mb-2">Para confirmar, escribe "ELIMINAR"</label>
            <input v-model="deleteConfirmation" type="text" 
              class="w-full rounded-lg px-4 py-3 bg-white/20 border border-blue-300 text-white focus:outline-none focus:ring-2 transition-shadow"
              placeholder="ELIMINAR" />
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="showDeleteModal = false"
              class="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold">
              Cancelar
            </button>
            <button @click="deleteAccount" 
              :disabled="deleteConfirmation !== 'ELIMINAR'"
              :class="deleteConfirmation === 'ELIMINAR' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-700/50 cursor-not-allowed'"
              class="text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="toast">
      <div v-if="toast.show" :class="[
        'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 font-medium',
        toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
      ]">
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/store';

const router = useRouter();
const userStore = useUserStore();

const user = ref({
  id: '1',
  nombre: 'Usuario',
  apellido: 'Demo',
  email: 'usuario@demo.com',
  fechaRegistro: new Date('2023-01-15'),
  plan: 'Gratis',
  nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  paymentMethod: null
});

const sections = [
  { id: 'profile', name: 'Perfil', icon: '👤' },
  { id: 'subscription', name: 'Suscripción', icon: '💎' },
  { id: 'security', name: 'Seguridad', icon: '🔒' },
  { id: 'notifications', name: 'Notificaciones', icon: '🔔' },
  { id: 'data', name: 'Datos', icon: '📊' }
];

const plans = [
  { 
    id: 'Gratis', 
    name: 'Gratis', 
    price: '0€',
    features: [
      'Registro manual de transacciones',
      'Gráficos básicos',
      'Soporte por correo'
    ]
  },
  { 
    id: 'Estándar', 
    name: 'Estándar', 
    price: '7€',
    features: [
      'Sincronización bancaria',
      'Categorías automáticas',
      'Recordatorios personalizados',
      'Soporte prioritario'
    ]
  },
  { 
    id: 'Pro', 
    name: 'Pro', 
    price: '10€',
    features: [
      'Gestión en equipo',
      'Análisis predictivo',
      'Exportación de datos',
      'Soporte 24/7'
    ]
  }
];

const activeSection = ref('profile');
const selectedPlan = ref('');
const profileForm = ref({
  nombre: '',
  apellido: '',
  email: ''
});
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
});
const paymentForm = ref({
  cardHolder: '',
  cardNumber: '',
  expiry: '',
  cvc: ''
});
const notificationSettings = ref({
  expenses: true,
  goals: true,
  tips: false,
  marketing: false
});
const twoFactor = ref(false);
const showPaymentModal = ref(false);
const showDeleteModal = ref(false);
const deleteConfirmation = ref('');
const passwordError = ref('');

const toast = ref({
  show: false,
  message: '',
  type: 'success'
});

const userInitials = computed(() => {
  return user.value.nombre.charAt(0) + user.value.apellido.charAt(0);
});

onMounted(() => {
  loadUserData();
});

function loadUserData() {
  try {
    if (userStore.user) {
      user.value = {
        ...user.value,
        nombre: userStore.user.nombre || user.value.nombre,
        apellido: userStore.user.apellido || user.value.apellido,
        email: userStore.user.email || user.value.email,
        id: userStore.user.id || user.value.id
      };
    }
    
    profileForm.value = {
      nombre: user.value.nombre,
      apellido: user.value.apellido,
      email: user.value.email
    };
    
    if (!user.value.paymentMethod && user.value.plan !== 'Gratis') {
      user.value.paymentMethod = {
        type: 'Visa',
        last4: '4242',
        expMonth: '12',
        expYear: '25'
      };
    }
  } catch (error) {
    showToast('Error al cargar datos del usuario', 'error');
  }
}

function formatDate(date: Date | string) {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
}

function updateProfile() {
  try {
    user.value = {
      ...user.value,
      nombre: profileForm.value.nombre,
      apellido: profileForm.value.apellido,
      email: profileForm.value.email
    };
    
    if (userStore.user) {
      userStore.updateUser({
        ...userStore.user,
        nombre: profileForm.value.nombre,
        apellido: profileForm.value.apellido,
        email: profileForm.value.email
      });
    }
    
    showToast('Perfil actualizado correctamente', 'success');
  } catch (error) {
    showToast('Error al actualizar el perfil', 'error');
  }
}

function selectPlan(planId: string) {
  if (planId === user.value.plan) return;
  selectedPlan.value = planId;
}

function changePlan() {
  if (!selectedPlan.value || selectedPlan.value === user.value.plan) return;
  
  if (selectedPlan.value !== 'Gratis' && !user.value.paymentMethod) {
    showPaymentModal.value = true;
    return;
  }
  
  try {
    user.value.plan = selectedPlan.value;
    showToast(`Plan cambiado a ${selectedPlan.value}`, 'success');
    selectedPlan.value = '';
  } catch (error) {
    showToast('Error al cambiar el plan', 'error');
  }
}

function formatCardNumber(e: Event) {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  
  if (value.length > 0) {
    value = value.match(new RegExp('.{1,4}', 'g'))!.join(' ');
  }
  
  paymentForm.value.cardNumber = value;
}

function formatExpiry(e: Event) {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, '');
  
  if (value.length > 2) {
    value = value.slice(0, 2) + '/' + value.slice(2, 4);
  }
  
  paymentForm.value.expiry = value;
}

function savePaymentMethod() {
  try {
    const [expMonth, expYear] = paymentForm.value.expiry.split('/');
    const last4 = paymentForm.value.cardNumber.slice(-4);
    
    let cardType;
    const firstDigit = paymentForm.value.cardNumber.charAt(0);
    if (firstDigit === '4') cardType = 'Visa';
    else if (firstDigit === '5') cardType = 'MasterCard';
    else cardType = 'Tarjeta';
    
    user.value.paymentMethod = {
      type: cardType,
      last4,
      expMonth,
      expYear
    };
    
    showPaymentModal.value = false;
    showToast('Método de pago guardado correctamente', 'success');
    
    if (selectedPlan.value) {
      user.value.plan = selectedPlan.value;
      showToast(`Plan cambiado a ${selectedPlan.value}`, 'success');
      selectedPlan.value = '';
    }
  } catch (error) {
    showToast('Error al guardar método de pago', 'error');
  }
}

function changePassword() {
  passwordError.value = '';
  
  if (!passwordForm.value.current) {
    passwordError.value = 'La contraseña actual es necesaria';
    return;
  }
  
  if (passwordForm.value.new.length < 8) {
    passwordError.value = 'La nueva contraseña debe tener al menos 8 caracteres';
    return;
  }
  
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    passwordError.value = 'Las contraseñas no coinciden';
    return;
  }
  
  try {
    showToast('Contraseña actualizada correctamente', 'success');
    passwordForm.value = { current: '', new: '', confirm: '' };
  } catch (error) {
    passwordError.value = 'Error al cambiar la contraseña';
  }
}

function toggleTwoFactor() {
  try {
    showToast(
      twoFactor.value 
        ? 'Autenticación de dos factores activada' 
        : 'Autenticación de dos factores desactivada',
      'success'
    );
  } catch (error) {
    showToast('Error al cambiar la configuración', 'error');
    twoFactor.value = !twoFactor.value;
  }
}

function saveNotificationSettings() {
  try {
    showToast('Preferencias de notificaciones guardadas', 'success');
  } catch (error) {
    showToast('Error al guardar las preferencias', 'error');
  }
}

function exportUserData() {
  try {
    const data = {
      perfil: {
        nombre: user.value.nombre,
        apellido: user.value.apellido,
        email: user.value.email,
        fechaRegistro: user.value.fechaRegistro
      },
      plan: user.value.plan,
    };
    
    const jsonData = JSON.stringify(data, null, 2);
    
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `kasum-datos-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    showToast('Datos exportados correctamente', 'success');
  } catch (error) {
    showToast('Error al exportar los datos', 'error');
  }
}

function deleteAccount() {
  if (deleteConfirmation.value !== 'ELIMINAR') return;
  
  try {
    showToast('Cuenta eliminada correctamente', 'success');
    
    setTimeout(() => {
      userStore.logout();
      router.push('/');
    }, 1500);
  } catch (error) {
    showToast('Error al eliminar la cuenta', 'error');
  }
}

function getCardIcon(type: string) {
  return '/card.svg';
}

function showToast(message: string, type: 'success' | 'error') {
  toast.value = { show: true, message, type };
  setTimeout(() => {
    toast.value.show = false;
  }, 3000);
}
</script>

<style scoped>
.bg-personalizar {
    background: linear-gradient(to bottom, var(--primary-color), #1b2d3f);
    min-height: 100vh;
}

@keyframes modalIn {
  from { transform: translateY(40px) scale(0.97); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.animate-modal {
  animation: modalIn 0.25s cubic-bezier(.4,2,.6,1) both;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from, .toast-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
