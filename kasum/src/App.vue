<template>
    <div class="bg-gradient-to-b from-gray-900 to-gray-800">
        <NavBar/>
       <router-view />
    </div>
</template>
<script setup lang="ts">
    import NavBar from './components/NavBar.vue'
</script>

<style scoped>

</style>
