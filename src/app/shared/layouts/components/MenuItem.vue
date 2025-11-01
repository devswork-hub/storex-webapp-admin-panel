<script setup lang="ts">
import { RouterLink } from 'vue-router';

type MenuItemProps = {
  label: string
  to: string
  onClick: CallableFunction
}
defineProps<MenuItemProps>()
</script>

<template>
  <RouterLink :to="to" @click="onClick"> {{ label }}</RouterLink>
</template>