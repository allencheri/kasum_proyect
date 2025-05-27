<template>
  <div class="flex flex-col justify-center items-center text-white px-4 min-h-[70vh]">
    <section class="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
      <div>
        <h1>
          Bienvenido {{ user }}
        </h1>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const user = ref('Alina')
</script>

<style scoped></style>
