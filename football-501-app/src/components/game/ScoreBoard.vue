<template>
  <div class="grid grid-cols-2 gap-2 sm:gap-4">
    <div
      v-for="player in players"
      :key="player.id"
      :class="[
        'p-4 sm:p-6 rounded-lg transition-all duration-300',
        player.isActive
          ? 'bg-blue-600 text-white shadow-xl sm:scale-105'
          : 'bg-white text-gray-900 shadow-md',
      ]"
    >
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-base sm:text-lg font-bold truncate">{{ player.name }}</h3>
        <span
          v-if="player.isActive"
          class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500 flex-shrink-0 ml-2"
        >
          Active
        </span>
      </div>
      <div class="text-3xl sm:text-4xl font-bold mb-1">{{ player.score }}</div>
      <div :class="player.isActive ? 'text-blue-100' : 'text-gray-500'" class="text-xs sm:text-sm">
        {{ getScoreStatus(player.score) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Player } from '@/types/game'
import { getScoreStatus } from '@/services/game/scoring'

interface Props {
  players: Player[]
}

defineProps<Props>()
</script>
