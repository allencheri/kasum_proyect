<template>
    <div class="bg-gradient">
        <NavBar/>
       <router-view />
    </div>
</template>
<script setup lang="ts">
    import NavBar from './components/NavBar.vue'
</script>

<style scoped>
.bg-gradient {
    background: linear-gradient(to bottom, var(--primary-color), #1b2d3f);
    height: 60vh;
    border-radius: 0px 0px 100px 100px;
}
</style>
