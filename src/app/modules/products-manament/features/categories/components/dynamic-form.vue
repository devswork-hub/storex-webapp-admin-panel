<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import type { CategoryUIModel } from '../category-ui.model';
import Loading from '@/app/shared/layouts/components/Loading.vue';

// Definindo os tipos (mantidos como no original)
type InputComponentType = 'input' | 'textarea' | 'checkbox'

type FieldConfig = {
  key: keyof CategoryUIModel;
  label: string;
  inputType: string;
  component: InputComponentType;
};

// Mapeamento dos tipos de campo
const fieldTypeMap: Record<string, Partial<FieldConfig>> = {
  name: { component: 'input', inputType: 'text' },
  description: { component: 'textarea', inputType: 'text' },
  isActive: { component: 'checkbox', inputType: 'checkbox' },
  createdAt: { component: 'input', inputType: 'date' },
  updatedAt: { component: 'input', inputType: 'date' },
}

// Dados reativos do formulário
const fields = reactive<Partial<CategoryUIModel>>({
  name: 'Minha Categoria',
  description: 'Uma descrição detalhada para a categoria.',
  isActive: true,
  createdAt: new Date().toISOString().split('T')[0],
  updatedAt: new Date().toISOString().split('T')[0],
});

// Função para obter o label
const getLabel = (key: string): string => {
  const labels: Record<string, string> = {
    name: 'Nome',
    description: 'Descrição',
    isActive: 'Ativo',
    createdAt: 'Data de Criação',
    updatedAt: 'Data de Atualização',
  };
  return labels[key] || key;
};

// Configurações dos campos calculadas
const fieldConfigs = computed<FieldConfig[]>(() => {
  return Object.entries(fields)
    .filter(([key]) => key !== 'deletedAt' && key !== 'id')
    .map(([key, value]) => {
      const fieldKey = key as keyof CategoryUIModel
      const mapped = fieldTypeMap[key] ?? {}

      return {
        key: fieldKey,
        label: getLabel(key),
        inputType: mapped.inputType ?? (typeof value === 'boolean' ? 'checkbox' : 'text'),
        component: mapped.component ?? (typeof value === 'boolean' ? 'checkbox' : 'input'),
      }
    })
})

const loading = ref(false)

const submitFormManual = async (e: Event) => {
  e.preventDefault();
  loading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Categoria salva com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao salvar a categoria:', error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="submitFormManual" class="mx-auto max-w-3xl bg-white shadow-xl rounded-xl p-8 space-y-8">
    <div>
      <h2 class="text-2xl font-semibold text-gray-900">Detalhes da Categoria 📝</h2>
      <p class="mt-1 text-sm text-gray-500">
        Preencha as informações para criar ou editar sua categoria.
      </p>
    </div>

    <div class="space-y-6">
      <template v-if="loading">
        <!-- Skeleton loader -->
        <div v-for="n in 4" :key="n" class="space-y-2 animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
          <div class="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </template>

      <template v-else>
        <div v-for="config in fieldConfigs" :key="config.key">
          <div v-if="config.component === 'checkbox'" class="flex items-center">
            <input :disabled="loading" :id="config.key" type="checkbox" v-model="fields[config.key]"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed" />
            <label :for="config.key" class="ml-2 block text-sm font-medium text-gray-900">
              {{ config.label }}
            </label>
            <p class="ml-4 text-sm text-gray-500 italic"> - Indica se a categoria está visível.</p>
          </div>

          <template v-else>
            <label :for="config.key" class="block text-sm font-medium text-gray-700 mb-1" :aria-disabled="loading">
              {{ config.label }}
            </label>

            <input :disabled="loading" v-if="config.component === 'input'" :id="config.key" :type="config.inputType"
              v-model="fields[config.key]" :placeholder="`Digite ${config.label.toLowerCase()}`"
              class="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed" />

            <textarea :disabled="loading" v-else-if="config.component === 'textarea'" :id="config.key"
              v-model="fields[config.key] as unknown as string" rows="4"
              :placeholder="`Digite ${config.label.toLowerCase()}`"
              class="block w-full rounded-lg border-0 py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed" />
          </template>
        </div>
      </template>
    </div>
    <div class="pt-6 border-t border-gray-200 flex justify-end gap-3">
      <button type="button"
        class="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition duration-150 ease-in-out">
        Cancelar
      </button>
      <button type="submit" :disabled="loading"
        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed">
        <template v-if="loading">
          <Loading v-if="loading" size="sm" text="Salvando..." />
        </template>
        <template v-else>Salvar informações</template>
      </button>
    </div>
  </form>
</template>