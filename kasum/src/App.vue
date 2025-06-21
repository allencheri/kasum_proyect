<template>
    <div class="bg-gradient">
        <NavBar v-if="$route.path !== '/login' && $route.path !== '/registro' && $route.path !== '/'"/>
        <router-view />
    </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import { onMounted } from 'vue'
import { useUserStore } from './store/store'

const userStore = useUserStore()

onMounted(() => {
    userStore.initAuth()
})
</script>

<style scoped>
.bg-gradient {
    background: linear-gradient(to bottom, var(--primary-color), #1b2d3f);
    height: 560px;
    border-radius: 0px 0px 100px 100px;
}
</style>