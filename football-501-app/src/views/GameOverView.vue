<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
    <div class="max-w-3xl w-full">
      <!-- Winner Announcement -->
      <div class="text-center mb-6 sm:mb-8 animate-bounce-slow">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4">🏆 Game Over!</h1>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300">
          {{ gameStore.winner?.name }} Wins!
        </h2>
      </div>

      <!-- Final Scores -->
      <BaseCard variant="elevated" class="mb-4 sm:mb-6">
        <template #header>
          <h3 class="text-xl sm:text-2xl font-bold text-gray-900">Final Scores</h3>
        </template>

        <div class="space-y-3 sm:space-y-4">
          <div
            v-for="player in gameStore.players"
            :key="player.id"
            :class="[
              'p-4 sm:p-6 rounded-lg flex items-center justify-between gap-2',
              player.id === gameStore.winnerId ? 'bg-yellow-50 border-2 border-yellow-400' : 'bg-gray-50',
            ]"
          >
            <div class="flex items-center space-x-2 sm:space-x-4 min-w-0">
              <span v-if="player.id === gameStore.winnerId" class="text-2xl sm:text-4xl flex-shrink-0">👑</span>
              <div class="min-w-0">
                <div class="text-lg sm:text-xl font-bold text-gray-900 truncate">{{ player.name }}</div>
                <div class="text-xs sm:text-sm text-gray-600">
                  {{ playerStats[player.id]?.totalTurns || 0 }} turns
                </div>
              </div>
            </div>
            <div class="text-2xl sm:text-4xl font-bold flex-shrink-0" :class="player.id === gameStore.winnerId ? 'text-yellow-600' : 'text-gray-900'">
              {{ player.score }}
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Game Statistics -->
      <BaseCard variant="elevated" class="mb-4 sm:mb-6">
        <template #header>
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">Game Statistics</h3>
        </template>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div v-for="player in gameStore.players" :key="`stats-${player.id}`">
            <h4 class="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3 truncate">{{ player.name }}</h4>
            <div class="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Total Turns:</span>
                <span class="font-semibold">{{ playerStats[player.id]?.totalTurns || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Valid Turns:</span>
                <span class="font-semibold">{{ playerStats[player.id]?.validTurns || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Bust Turns:</span>
                <span class="font-semibold text-red-600">{{ playerStats[player.id]?.bustTurns || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Total Points:</span>
                <span class="font-semibold">{{ playerStats[player.id]?.totalPointsScored || 0 }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Avg per Turn:</span>
                <span class="font-semibold">{{ playerStats[player.id]?.averagePointsPerTurn || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Actions -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <BaseButton variant="primary" size="lg" full-width @click="playAgain">
          🔄 Play Again
        </BaseButton>
        <BaseButton variant="outline" size="lg" full-width @click="goHome">
          🏠 Home
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { getPlayerTurnStats } from '@/services/game/turnManager'
import { clearGameState } from '@/services/storage/localStorage'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const gameStore = useGameStore()

onMounted(() => {
  // Redirect if no game finished
  if (!gameStore.isGameFinished) {
    router.push('/')
  }
})

const playerStats = computed(() => {
  const stats: Record<string, any> = {}
  gameStore.players.forEach((player, index) => {
    stats[player.id] = getPlayerTurnStats(gameStore.turns, index)
  })
  return stats
})

function playAgain() {
  // Clear current game
  clearGameState()
  gameStore.resetGame()

  // Go to setup
  router.push('/setup')
}

function goHome() {
  // Clear current game
  clearGameState()
  gameStore.resetGame()

  // Go home
  router.push('/')
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}
</style>
