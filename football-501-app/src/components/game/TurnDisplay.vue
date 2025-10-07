<template>
  <div class="space-y-3">
    <h3 class="text-lg font-semibold text-gray-900">Recent Turns</h3>
    <div v-if="recentTurns.length === 0" class="text-gray-500 text-center py-8">
      No turns yet. Start playing!
    </div>
    <div v-else class="space-y-2">
      <div
        v-for="(turn, index) in recentTurns"
        :key="index"
        class="bg-gray-50 rounded-lg p-4 border border-gray-200"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-gray-900">
            {{ getPlayerName(turn.playerIndex) }}
          </span>
          <span class="text-sm text-gray-500">
            {{ formatTime(turn.timestamp) }}
          </span>
        </div>
        <div v-if="turn.playerAnswer" class="space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">{{ turn.playerAnswer.playerName }}</span>
            <span
              :class="[
                'font-bold text-lg',
                turn.playerAnswer.isBust ? 'text-red-600' : 'text-green-600',
              ]"
            >
              {{ turn.playerAnswer.isBust ? 'BUST!' : `-${turn.playerAnswer.statistic}` }}
            </span>
          </div>
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-500">Score:</span>
            <span class="text-gray-700">
              {{ turn.scoreBeforeTurn }} → {{ turn.scoreAfterTurn }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Turn, Player } from '@/types/game'

interface Props {
  turns: Turn[]
  players: Player[]
  maxTurns?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxTurns: 5,
})

const recentTurns = computed(() => {
  return props.turns.slice(-props.maxTurns).reverse()
})

function getPlayerName(playerIndex: number): string {
  return props.players[playerIndex]?.name || `Player ${playerIndex + 1}`
}

function formatTime(timestamp: Date): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}
</script>
