<script setup lang="ts">
import MenuItem from './MenuItem.vue';

function press() {
  console.log('ain painho')
}

</script>

<template>
  <nav class="flex flex-col">
    <MenuItem label="Home" to="/" @click="press" />
    <MenuItem label="Categories" to="/categories" @click="press" />
  </nav>
</template>