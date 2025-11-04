<script setup>
import { ref } from 'vue'
import CategoryForm from '../components/CategoryForm.vue';
import DynamicForm from '../components/dynamic-form.vue';
const count = ref(0)
</script>

<template>
  <main class="flex flex-1 bg-amber-300 h-fit min-h-screen w-full">
    <div>Pagina de criacao de categoria</div>
    <button @click="count++">Count is: {{ count }}</button>
    <!-- <CategoryForm /> -->
    <DynamicForm />
  </main>
</template>