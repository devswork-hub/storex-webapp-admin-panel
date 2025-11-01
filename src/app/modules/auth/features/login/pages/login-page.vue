<script setup lang="ts">
import Loading from '@/app/shared/layouts/components/Loading.vue';
import Title from '@/app/shared/layouts/components/Title.vue';
import { useAuthStore } from '@/app/useAuthStore';
import { useRoute, useRouter } from 'vue-router';

const authStorage = useAuthStore()
const router = useRouter()
const route = useRoute()

async function login() {
  await authStorage.login(data.email, data.password)
  // router.push({ name: 'Home' })
  redirect()
}

const data = { email: "email", password: "minha senha" }

async function redirect() {
  const q = route.query.redirect as string
  console.log(q)
  const r = typeof q === "string" && q.startsWith("/") ? q : "/"
  await router.replace(r)
}

</script>

<template>
  <Loading v-if="authStorage.isLoading" />
  <div v-else>
    <Title text="Pagina de login" />
    <button @click="login">Logar</button>
  </div>
</template>

<style scoped></style>
