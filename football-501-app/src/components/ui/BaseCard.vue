<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="px-6 py-4 border-b border-gray-200">
      <slot name="header" />
    </div>
    <div class="px-6 py-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'elevated' | 'outlined'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'elevated',
  padding: 'md',
})

const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg overflow-hidden'

  const variants = {
    default: '',
    elevated: 'shadow-lg',
    outlined: 'border-2 border-gray-200',
  }

  return `${base} ${variants[props.variant]}`
})
</script>
