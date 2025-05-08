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
.bg-gradient-to-b {
    height: 75vh;
    border-radius: 0px 0px 8em 8em;

}
</style>
