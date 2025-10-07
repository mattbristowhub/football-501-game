<template>
  <div class="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6">
    <div class="max-w-6xl mx-auto py-4 sm:py-6 md:py-8">
      <!-- Game Header -->
      <div class="mb-4 sm:mb-6">
        <div class="flex items-center justify-between gap-2 mb-4">
          <h1 class="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 line-clamp-2">{{ gameStore.selectedCategory?.name }}</h1>
          <BaseButton variant="secondary" size="sm" @click="pauseGame" class="flex-shrink-0">
            <span class="hidden sm:inline">⏸️ Pause</span>
            <span class="sm:hidden">⏸️</span>
          </BaseButton>
        </div>
      </div>

      <!-- Score Board -->
      <div class="mb-6 sm:mb-8">
        <ScoreBoard :players="gameStore.players" />
      </div>

      <!-- Main Game Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <!-- Player Input Section -->
        <div class="lg:col-span-2">
          <BaseCard variant="elevated">
            <template #header>
              <h2 class="text-lg sm:text-xl font-bold text-gray-900">
                {{ gameStore.currentPlayer?.name }}'s Turn
              </h2>
            </template>

            <div class="space-y-4">
              <!-- Input Form -->
              <form @submit.prevent="submitPlayerName">
                <BaseInput
                  id="playerName"
                  v-model="playerNameInput"
                  label="Enter Football Player Name"
                  placeholder="e.g. Thierry Henry"
                  required
                  :disabled="isSubmitting"
                  :error="inputError"
                  hint="Name a player that matches the category"
                />

                <div class="mt-4">
                  <BaseButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    full-width
                    :disabled="isSubmitting || !playerNameInput.trim()"
                  >
                    {{ isSubmitting ? 'Processing...' : 'Submit Answer' }}
                  </BaseButton>
                </div>
              </form>

              <!-- Result Display -->
              <div v-if="lastResult" class="mt-6 p-4 rounded-lg" :class="lastResult.isBust ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-bold text-lg" :class="lastResult.isBust ? 'text-red-900' : 'text-green-900'">
                      {{ lastResult.playerName }}
                    </div>
                    <div class="text-sm" :class="lastResult.isBust ? 'text-red-700' : 'text-green-700'">
                      {{ lastResult.isBust ? 'BUST! Over 180' : `${lastResult.statistic} points` }}
                    </div>
                  </div>
                  <div class="text-3xl font-bold" :class="lastResult.isBust ? 'text-red-600' : 'text-green-600'">
                    {{ lastResult.isBust ? '💥' : `-${lastResult.statistic}` }}
                  </div>
                </div>
              </div>
            </div>
          </BaseCard>
        </div>

        <!-- Turn History Sidebar -->
        <div>
          <BaseCard variant="elevated">
            <TurnDisplay
              :turns="gameStore.turns"
              :players="gameStore.players"
              :max-turns="8"
            />
          </BaseCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { processPlayerAnswer } from '@/services/api/statisticsService'
import { saveGameState, loadGameState } from '@/services/storage/localStorage'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ScoreBoard from '@/components/game/ScoreBoard.vue'
import TurnDisplay from '@/components/game/TurnDisplay.vue'
import type { PlayerAnswer } from '@/types/game'

const router = useRouter()
const gameStore = useGameStore()

const playerNameInput = ref('')
const isSubmitting = ref(false)
const inputError = ref('')
const lastResult = ref<PlayerAnswer | null>(null)

onMounted(() => {
  // If no active game, try to load saved game
  if (gameStore.gameStatus === 'setup') {
    const savedState = loadGameState()
    if (savedState) {
      gameStore.loadGameState(savedState)
    } else {
      // No game to resume, redirect to setup
      router.push('/setup')
      return
    }
  }
})

// Save game state after each turn
watch(() => gameStore.turns.length, () => {
  saveGameState(gameStore.getGameState())
})

// Watch for game over
watch(() => gameStore.isGameFinished, (isFinished) => {
  if (isFinished) {
    setTimeout(() => {
      router.push('/game-over')
    }, 2000) // Delay to show final result
  }
})

async function submitPlayerName() {
  if (!playerNameInput.value.trim()) return
  if (!gameStore.selectedCategory) return

  inputError.value = ''
  isSubmitting.value = true
  lastResult.value = null

  try {
    // Check if player already used
    if (gameStore.hasPlayerBeenUsed(playerNameInput.value)) {
      inputError.value = 'This player has already been named'
      isSubmitting.value = false
      return
    }

    // Process the answer through API
    const playerAnswer = await processPlayerAnswer(
      playerNameInput.value,
      gameStore.selectedCategory,
      gameStore.usedPlayerNames
    )

    if (!playerAnswer.isValid) {
      inputError.value = 'Player not found or does not match category'
      isSubmitting.value = false
      return
    }

    // Submit to game store
    const success = gameStore.submitAnswer(playerAnswer)

    if (success) {
      lastResult.value = playerAnswer
      playerNameInput.value = ''

      // Clear last result after 3 seconds
      setTimeout(() => {
        lastResult.value = null
      }, 3000)
    } else {
      inputError.value = 'Failed to submit answer'
    }
  } catch (error) {
    console.error('Error submitting answer:', error)
    inputError.value = 'An error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

function pauseGame() {
  gameStore.pauseGame()
  router.push('/')
}
</script>
