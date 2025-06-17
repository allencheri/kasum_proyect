// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Inicio from '../pages/Inicio.vue'
import Transacciones from '../pages/Transacciones.vue'
import Login from '../pages/Login.vue'
import InfoPage from '../pages/InfoPage.vue'
import Registro from '../pages/Registro.vue'
import GestionUsuarios from '../pages/GestionUsuarios.vue'
import Ahorros from '../pages/MisAhorros.vue'
import Ajustes from '../pages/Ajustes.vue'
import { useUserStore } from '../store/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/inicio',
    name: 'Home',
    component: Inicio,
    meta: { requiresAuth: true }
  },
  {
    path: '/transacciones',
    name: 'Transacciones',
    component: Transacciones,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'InfoPage',
    component: InfoPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    meta: { requiresAuth: false }
  },
  {
    path: '/gestus',
    name: 'GestionUsuarios',
    component: GestionUsuarios,
    meta: { requiresAuth: true }
  },
  {
    path: '/ahorros',
    name: 'Ahorros',
    component: Ahorros,
    meta: { requiresAuth: true }
  },
  {
    path: '/ajustes',
    name: 'Ajustes',
    component: Ajustes,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/registro') && userStore.isAuthenticated) {
    next('/inicio')
  } else {
    next()
  }
})

export default router