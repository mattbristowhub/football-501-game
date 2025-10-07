<template>
  <BaseCard variant="elevated">
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0">
        <div
          class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold"
        >
          {{ playerInitials }}
        </div>
      </div>
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-900">{{ player.name }}</h3>
        <p class="text-gray-600">Score: {{ player.score }}</p>
      </div>
      <div v-if="player.isActive" class="flex-shrink-0">
        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
          Your Turn
        </span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Player } from '@/types/game'
import BaseCard from '@/components/ui/BaseCard.vue'

interface Props {
  player: Player
}

const props = defineProps<Props>()

const playerInitials = computed(() => {
  const names = props.player.name.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return props.player.name.substring(0, 2).toUpperCase()
})
</script>
