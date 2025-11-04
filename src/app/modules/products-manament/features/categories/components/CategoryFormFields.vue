<script setup lang="ts">
import type { CategoryUIModel } from '../category-ui.model'

defineProps<{
  data: Partial<CategoryUIModel>
  disabled?: boolean
  onChange: (key: keyof CategoryUIModel, value: any) => void
}>()

// labels e tipos (poderiam vir de fora também)
const fieldTypeMap: Record<string, { label: string; type: string; component: 'input' | 'textarea' | 'checkbox' }> = {
  name: { label: 'Nome', type: 'text', component: 'input' },
  description: { label: 'Descrição', type: 'text', component: 'textarea' },
  isActive: { label: 'Ativo?', type: 'checkbox', component: 'checkbox' },
}

function getInputEventValue(e: Event) {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement

  if (target.type === 'checkbox' && target instanceof HTMLInputElement) {
    return target.checked
  }
  return target.value
}

</script>

<template>
  <div class="space-y-6">
    <div v-for="(config, key) in fieldTypeMap" :key="key" class="flex flex-col">
      <!-- Checkbox -->
      <div v-if="config.component === 'checkbox'" class="flex items-center space-x-2">
        <input type="checkbox" :id="key" :disabled="disabled"
          @change="onChange(key as keyof CategoryUIModel, getInputEventValue($event))"
          class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-60" />
        <label :for="key" class="text-sm font-medium text-gray-900">{{ config.label }}</label>
      </div>

      <!-- Input -->
      <div v-else-if="config.component === 'input'">
        <label :for="key" class="text-sm font-medium text-gray-700 mb-1">{{ config.label }}</label>
        <input :id="key" :type="config.type" :disabled="disabled" :value="data[key as keyof CategoryUIModel]"
          @input="onChange(key as keyof CategoryUIModel, getInputEventValue($event))"
          class="block w-full rounded-lg border py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm" />
      </div>

      <!-- Textarea -->
      <div v-else-if="config.component === 'textarea'">
        <label :for="key" class="text-sm font-medium text-gray-700 mb-1">{{ config.label }}</label>
        <textarea :id="key" rows="4" :disabled="disabled" :value="(data[key as keyof CategoryUIModel] ?? '') as string"
          @input="onChange(key as keyof CategoryUIModel, getInputEventValue($event))"
          class="block w-full rounded-lg border py-2.5 px-3.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm" />
      </div>
    </div>
  </div>
</template>
