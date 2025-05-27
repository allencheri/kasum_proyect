// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Inicio from '../pages/Inicio.vue'
import Transacciones from '../pages/Transacciones.vue'
import Login from '../pages/Login.vue'
import InfoPage from '../pages/InfoPage.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Inicio },
  { path: '/transacciones', name: 'Transacciones', component: Transacciones },
  { path: '/login', name: 'Login', component: Login },
  { path: '/info', name: 'InfoPage', component: InfoPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
