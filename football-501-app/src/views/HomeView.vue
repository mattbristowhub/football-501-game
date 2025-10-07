<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <!-- Title -->
      <div class="text-center mb-12">
        <h1 class="text-6xl font-bold text-white mb-4">Football 501</h1>
        <p class="text-xl text-blue-100">Darts-inspired football trivia game</p>
      </div>

      <!-- Main Menu Card -->
      <BaseCard variant="elevated" class="mb-6">
        <div class="space-y-4">
          <BaseButton
            variant="primary"
            size="lg"
            full-width
            @click="startNewGame"
          >
            <span class="text-xl">🎮 Start New Game</span>
          </BaseButton>

          <BaseButton
            v-if="hasSavedGame"
            variant="secondary"
            size="lg"
            full-width
            @click="resumeGame"
          >
            <span class="text-xl">▶️ Resume Game</span>
          </BaseButton>

          <BaseButton
            variant="outline"
            size="md"
            full-width
            @click="showRules = true"
          >
            📖 How to Play
          </BaseButton>
        </div>
      </BaseCard>

      <!-- Quick Info -->
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
          <div class="text-3xl font-bold text-white">2</div>
          <div class="text-sm text-blue-100">Players</div>
        </div>
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
          <div class="text-3xl font-bold text-white">501</div>
          <div class="text-sm text-blue-100">Starting Score</div>
        </div>
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
          <div class="text-3xl font-bold text-white">9</div>
          <div class="text-sm text-blue-100">Free Categories</div>
        </div>
      </div>
    </div>

    <!-- Rules Modal -->
    <div
      v-if="showRules"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showRules = false"
    >
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-900">How to Play</h2>
          <button
            class="text-gray-400 hover:text-gray-600"
            @click="showRules = false"
          >
            <span class="text-2xl">×</span>
          </button>
        </div>
        <div class="px-6 py-6 space-y-4">
          <div>
            <h3 class="font-bold text-lg mb-2">🎯 Objective</h3>
            <p class="text-gray-700">
              Reduce your score from 501 to exactly 0 (or below) by naming football players.
              The player's statistics are subtracted from your score.
            </p>
          </div>

          <div>
            <h3 class="font-bold text-lg mb-2">⚽ How to Play</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-700">
              <li>Choose a category (e.g., "Arsenal - Premier League Goals")</li>
              <li>Take turns naming football players that match the category</li>
              <li>The player's statistic is subtracted from your score</li>
              <li>First to reach 0 or below wins!</li>
            </ol>
          </div>

          <div>
            <h3 class="font-bold text-lg mb-2">⚠️ Rules</h3>
            <ul class="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Bust:</strong> If a player's stat is over 180, your turn is forfeited (no score change)</li>
              <li><strong>No Duplicates:</strong> Each player can only be named once per game</li>
              <li><strong>Valid Players:</strong> Must have played for the team/league in the category</li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-lg mb-2">💡 Strategy</h3>
            <p class="text-gray-700">
              Use high-scoring players (100-180) early game, then switch to lower scorers
              to reach exactly 0. Avoid legends who might bust you!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { hasSavedGame as checkSavedGame } from '@/services/storage/localStorage'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const hasSavedGame = ref(false)
const showRules = ref(false)

onMounted(() => {
  hasSavedGame.value = checkSavedGame()
})

function startNewGame() {
  router.push('/setup')
}

function resumeGame() {
  router.push('/game')
}
</script>
