<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :autocomplete="autocomplete"
      :class="inputClasses"
      @input="onInput"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  modelValue: string | number
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  autocomplete?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: []
  focus: []
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = props.type === 'number' ? Number(target.value) : target.value
  emit('update:modelValue', value)
}

const inputClasses = computed(() => {
  const base = 'block w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors'
  const normal = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
  const errorClass = 'border-red-300 focus:border-red-500 focus:ring-red-500'
  const disabled = 'bg-gray-100 cursor-not-allowed'

  let classes = `${base} px-3 py-2 ${props.error ? errorClass : normal}`

  if (props.disabled) {
    classes += ` ${disabled}`
  }

  return classes
})
</script>
