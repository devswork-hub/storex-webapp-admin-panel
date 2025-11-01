<script setup lang="ts">
import Title from '@/app/shared/layouts/components/Title.vue';
import { ref } from 'vue';
import { useCounterStore } from './store';

const counterStore = useCounterStore()
const counter = ref(1000);

function increment() {
  counter.value++
}

function decrement() {
  counter.value--
}

function reset() {
  counter.value = 0
}

</script>

<template>
  <main>
    <Title text="Dashboard" sub-text="Bem vindo ao dashboard" />
    <div class="flex gap-2">
      <!-- <button class="btn btn-primary" @click="increment">+</button>
      <button class="btn btn-secondary" @click="decrement">-</button> -->
      <button class="btn btn-primary" @click="counterStore.increment">+</button>
      <button class="btn btn-secondary" @click="counterStore.decrement">-</button>
      <p>{{ counter }}</p>
      <p>Counter store: {{ counterStore.count }}</p>
    </div>
  </main>
</template>