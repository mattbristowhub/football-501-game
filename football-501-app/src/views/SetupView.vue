<template>
  <div class="min-h-screen bg-gradient-to-br from-pitch-900 via-pitch-800 to-dartboard-black p-4 sm:p-6 md:p-8 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-pitch-pattern opacity-10" style="background-size: 50px 50px;"></div>

    <div class="max-w-4xl mx-auto py-4 sm:py-6 md:py-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-6 sm:mb-8">
        <h1 class="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight" style="text-shadow: 0 0 30px rgba(220, 38, 38, 0.5);">GAME SETUP</h1>
        <p class="text-sm sm:text-base text-pitch-200 font-semibold uppercase tracking-wide">Configure Your Match</p>
      </div>

      <!-- Setup Form -->
      <div class="bg-gradient-to-b from-gray-900 to-dartboard-black border-2 border-pitch-600 rounded-2xl shadow-pitch overflow-hidden">
        <div class="bg-gradient-to-r from-dartboard-red to-pitch-700 px-6 py-4 border-b-2 border-dartboard-gold">
          <h2 class="text-xl sm:text-2xl font-black text-white">Player Information</h2>
        </div>

        <div class="p-6 sm:p-8 space-y-6">
          <!-- Player 1 Name -->
          <BaseInput
            id="player1"
            v-model="player1Name"
            label="Player 1 Name"
            placeholder="Enter player 1 name"
            required
            :error="player1Error"
          />

          <!-- Player 2 Name -->
          <BaseInput
            id="player2"
            v-model="player2Name"
            label="Player 2 Name"
            placeholder="Enter player 2 name"
            required
            :error="player2Error"
          />

          <!-- Category Selection -->
          <div>
            <label class="block text-sm font-bold text-pitch-400 mb-3 uppercase tracking-wide">
              Select Category <span class="text-dartboard-red">*</span>
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="category in freeCategories"
                :key="category.id"
                :class="[
                  'text-left p-4 rounded-xl border-2 transition-all touch-manipulation transform',
                  selectedCategoryId === category.id
                    ? 'border-pitch-500 bg-gradient-to-br from-pitch-900 to-pitch-800 shadow-glow-green scale-105'
                    : 'border-gray-700 bg-gray-800 hover:border-pitch-600 hover:bg-gray-750 active:scale-95',
                ]"
                @click="selectedCategoryId = category.id"
              >
                <div :class="[
                  'font-bold text-sm sm:text-base mb-1',
                  selectedCategoryId === category.id ? 'text-pitch-300' : 'text-white'
                ]">
                  {{ category.name }}
                </div>
                <div :class="[
                  'text-xs sm:text-sm',
                  selectedCategoryId === category.id ? 'text-pitch-400' : 'text-gray-400'
                ]">
                  {{ category.description }}
                </div>
              </button>
            </div>
            <p v-if="categoryError" class="mt-3 text-sm text-dartboard-red font-semibold">{{ categoryError }}</p>
          </div>
        </div>

        <div class="px-6 sm:px-8 py-6 bg-gray-900 border-t-2 border-gray-800 flex flex-col sm:flex-row justify-between gap-3">
          <button
            @click="goBack"
            class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl border-2 border-gray-700 hover:border-gray-600 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            @click="startGame"
            class="px-8 py-3 bg-gradient-to-r from-dartboard-red to-red-600 hover:from-red-600 hover:to-dartboard-red text-white font-bold rounded-xl shadow-dartboard transition-all duration-300 transform hover:scale-105 hover:shadow-glow-red text-lg"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { getFreeCategories, getCategoryById } from '@/data/categories'
import { validatePlayerName } from '@/services/game/gameRules'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const router = useRouter()
const gameStore = useGameStore()

const player1Name = ref('')
const player2Name = ref('')
const selectedCategoryId = ref<string | null>(null)

const player1Error = ref('')
const player2Error = ref('')
const categoryError = ref('')

const freeCategories = getFreeCategories()

function goBack() {
  router.push('/')
}

function validateForm(): boolean {
  let isValid = true

  // Validate player 1
  const player1Validation = validatePlayerName(player1Name.value)
  if (!player1Validation.isValid) {
    player1Error.value = player1Validation.error || ''
    isValid = false
  } else {
    player1Error.value = ''
  }

  // Validate player 2
  const player2Validation = validatePlayerName(player2Name.value)
  if (!player2Validation.isValid) {
    player2Error.value = player2Validation.error || ''
    isValid = false
  } else {
    player2Error.value = ''
  }

  // Check if players have same name
  if (player1Name.value.trim().toLowerCase() === player2Name.value.trim().toLowerCase()) {
    player2Error.value = 'Players must have different names'
    isValid = false
  }

  // Validate category selection
  if (!selectedCategoryId.value) {
    categoryError.value = 'Please select a category'
    isValid = false
  } else {
    categoryError.value = ''
  }

  return isValid
}

function startGame() {
  if (!validateForm()) {
    return
  }

  const category = getCategoryById(selectedCategoryId.value!)
  if (!category) {
    categoryError.value = 'Invalid category selected'
    return
  }

  // Initialize game
  gameStore.initializeGame(
    [player1Name.value.trim(), player2Name.value.trim()],
    category
  )

  // Navigate to game
  router.push('/game')
}
</script>
