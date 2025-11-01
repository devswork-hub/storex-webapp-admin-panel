<script setup lang="ts">

interface TitleProps {
  text: string
  subText?: string
}

defineProps<TitleProps>()
</script>

<template>
  <div class="text-lg font-black">{{ text }}</div>
  <h2 v-if="subText" class="text-zinc-500">{{ subText }}</h2>
  <h2 v-else>Outro</h2>
</template>