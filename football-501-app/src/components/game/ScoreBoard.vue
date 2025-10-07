<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      v-for="player in players"
      :key="player.id"
      :class="[
        'p-6 rounded-lg transition-all duration-300',
        player.isActive
          ? 'bg-blue-600 text-white shadow-xl scale-105'
          : 'bg-white text-gray-900 shadow-md',
      ]"
    >
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-lg font-bold">{{ player.name }}</h3>
        <span
          v-if="player.isActive"
          class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500"
        >
          Active
        </span>
      </div>
      <div class="text-4xl font-bold mb-1">{{ player.score }}</div>
      <div :class="player.isActive ? 'text-blue-100' : 'text-gray-500'" class="text-sm">
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
