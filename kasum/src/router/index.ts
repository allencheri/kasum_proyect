// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Inicio from '../pages/Inicio.vue'
import Transacciones from '../pages/Transacciones.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Inicio },
  { path: '/transacciones', name: 'Transacciones', component: Transacciones },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
