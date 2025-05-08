// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Inicio from '../pages/Inicio.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Inicio }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
