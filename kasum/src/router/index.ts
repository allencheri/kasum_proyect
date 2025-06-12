// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Inicio from '../pages/Inicio.vue'
import Transacciones from '../pages/Transacciones.vue'
import Login from '../pages/Login.vue'
import InfoPage from '../pages/InfoPage.vue'
import Registro from '../pages/Registro.vue'
import GestionUsuarios from '../pages/GestionUsuarios.vue'
import Ahorros from '../pages/MisAhorros.vue'


const routes: Array<RouteRecordRaw> = [
  { path: '/inicio', name: 'Home', component: Inicio },
  { path: '/transacciones', name: 'Transacciones', component: Transacciones },
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'InfoPage', component: InfoPage },
  { path: '/registro', name: 'Registro', component: Registro },
  { path: '/gestus', name: 'GestionUsuarios', component: GestionUsuarios },
  { path: '/ahorros', name: 'Ahorros', component: Ahorros },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
