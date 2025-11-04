<script setup lang="ts">
import { reactive, ref } from 'vue'
import CategoryFormFields from './CategoryFormFields.vue'
import Loading from '@/app/shared/layouts/components/Loading.vue'
import type { CategoryUIModel } from '../category-ui.model'

const loading = ref(false)

const data = reactive<Partial<CategoryUIModel>>({
  name: '',
  description: '',
  isActive: false,
})

const handleChange = (key: keyof CategoryUIModel, value: any) => {
  data[key] = value
}

const submitForm = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('✅ Dados enviados:', data)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="mx-auto max-w-3xl bg-white shadow-xl rounded-xl p-8 space-y-8">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Detalhes da Categoria 📝</h2>
      <p class="mt-1 text-sm text-gray-500">
        Preencha as informações para criar ou editar sua categoria.
      </p>
    </div>

    <CategoryFormFields :data="data" :disabled="loading" :onChange="handleChange" />

    <div class="pt-6 border-t border-gray-200 flex justify-end gap-3">
      <button type="button"
        class="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Cancelar
      </button>
      <button type="submit" :disabled="loading"
        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none disabled:opacity-60">
        <template v-if="loading">
          <Loading size="sm" text="Salvando..." />
        </template>
        <template v-else>Salvar informações</template>
      </button>
    </div>
  </form>
</template>
