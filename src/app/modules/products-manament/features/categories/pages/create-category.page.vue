<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <main class="flex flex-1 bg-amber-300 h-fit min-h-screen">
    <div>Pagina de criacao de categoria</div>
    <button @click="count++">Count is: {{ count }}</button>
  </main>
</template>