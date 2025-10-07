<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
    <div class="max-w-4xl mx-auto py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-white mb-2">Game Setup</h1>
        <p class="text-blue-100">Configure your game settings</p>
      </div>

      <!-- Setup Form -->
      <BaseCard variant="elevated">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-900">Player Information</h2>
        </template>

        <div class="space-y-6">
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
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Select Category <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                v-for="category in freeCategories"
                :key="category.id"
                :class="[
                  'text-left p-4 rounded-lg border-2 transition-all',
                  selectedCategoryId === category.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 bg-white',
                ]"
                @click="selectedCategoryId = category.id"
              >
                <div class="font-semibold text-gray-900">{{ category.name }}</div>
                <div class="text-sm text-gray-600 mt-1">{{ category.description }}</div>
              </button>
            </div>
            <p v-if="categoryError" class="mt-2 text-sm text-red-600">{{ categoryError }}</p>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-between">
            <BaseButton variant="outline" @click="goBack">
              Cancel
            </BaseButton>
            <BaseButton variant="primary" size="lg" @click="startGame">
              Start Game
            </BaseButton>
          </div>
        </template>
      </BaseCard>
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
