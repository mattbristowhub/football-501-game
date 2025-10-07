<template>
  <div class="min-h-screen bg-gradient-to-br from-pitch-900 via-pitch-800 to-dartboard-black flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-pitch-pattern opacity-10" style="background-size: 50px 50px;"></div>

    <div class="max-w-2xl w-full relative z-10">
      <!-- Title with Darts Aesthetic -->
      <div class="text-center mb-8 sm:mb-10 md:mb-12">
        <div class="inline-block mb-4">
          <div class="relative">
            <h1 class="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-2 sm:mb-4 tracking-tight" style="text-shadow: 0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(22, 163, 74, 0.3);">
              FOOTBALL 501
            </h1>
            <div class="absolute -top-2 -right-2 w-8 h-8 sm:w-12 sm:h-12 bg-dartboard-red rounded-full shadow-glow-red"></div>
            <div class="absolute -bottom-2 -left-2 w-6 h-6 sm:w-10 sm:h-10 bg-pitch-500 rounded-full shadow-glow-green"></div>
          </div>
        </div>
        <p class="text-base sm:text-lg md:text-xl text-pitch-200 font-semibold uppercase tracking-wide">Where Darts Meets Football</p>
      </div>

      <!-- Main Menu Card -->
      <div class="bg-gradient-to-b from-gray-900 to-dartboard-black border-2 border-pitch-600 rounded-2xl shadow-pitch overflow-hidden mb-6">
        <div class="p-6 sm:p-8 space-y-4">
          <button
            @click="startNewGame"
            class="w-full bg-gradient-to-r from-dartboard-red to-red-600 hover:from-red-600 hover:to-dartboard-red text-white font-bold py-4 px-6 rounded-xl shadow-dartboard transition-all duration-300 transform hover:scale-105 hover:shadow-glow-red text-lg sm:text-xl"
          >
            <span class="flex items-center justify-center gap-3">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
              </svg>
              Start New Game
            </span>
          </button>

          <button
            v-if="hasSavedGame"
            @click="resumeGame"
            class="w-full bg-gradient-to-r from-pitch-600 to-pitch-700 hover:from-pitch-700 hover:to-pitch-600 text-white font-bold py-4 px-6 rounded-xl shadow-pitch transition-all duration-300 transform hover:scale-105 hover:shadow-glow-green text-lg sm:text-xl"
          >
            <span class="flex items-center justify-center gap-3">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
              Resume Game
            </span>
          </button>

          <button
            @click="showRules = true"
            class="w-full bg-gray-800 hover:bg-gray-700 text-pitch-300 font-semibold py-3 px-6 rounded-xl border-2 border-pitch-700 hover:border-pitch-500 transition-all duration-300 text-base sm:text-lg"
          >
            <span class="flex items-center justify-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              How to Play
            </span>
          </button>
        </div>
      </div>

      <!-- Quick Info -->
      <div class="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div class="bg-dartboard-black border-2 border-dartboard-red rounded-xl p-3 sm:p-5 shadow-dartboard hover:shadow-glow-red transition-all duration-300">
          <div class="text-3xl sm:text-4xl font-black text-dartboard-red">2</div>
          <div class="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wide mt-1">Players</div>
        </div>
        <div class="bg-dartboard-black border-2 border-dartboard-gold rounded-xl p-3 sm:p-5 shadow-glow-gold hover:scale-105 transition-all duration-300">
          <div class="text-3xl sm:text-4xl font-black text-dartboard-gold">501</div>
          <div class="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wide mt-1">Target</div>
        </div>
        <div class="bg-dartboard-black border-2 border-pitch-500 rounded-xl p-3 sm:p-5 shadow-pitch hover:shadow-glow-green transition-all duration-300">
          <div class="text-3xl sm:text-4xl font-black text-pitch-500">9</div>
          <div class="text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wide mt-1">Free</div>
        </div>
      </div>
    </div>

    <!-- Rules Modal -->
    <div
      v-if="showRules"
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      @click.self="showRules = false"
    >
      <div class="bg-gradient-to-b from-gray-900 to-dartboard-black border-2 border-pitch-600 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-pitch">
        <div class="sticky top-0 bg-gradient-to-r from-dartboard-red to-pitch-700 px-6 py-5 flex items-center justify-between border-b-2 border-dartboard-gold">
          <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">How to Play</h2>
          <button
            class="text-white hover:text-dartboard-gold hover:scale-110 transition-all duration-200"
            @click="showRules = false"
          >
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
        <div class="px-6 py-6 space-y-5 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div class="bg-gray-800 rounded-xl p-4 border-l-4 border-dartboard-gold">
            <h3 class="font-black text-lg mb-2 text-dartboard-gold flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              Objective
            </h3>
            <p class="text-gray-300 leading-relaxed">
              Reduce your score from 501 to exactly 0 (or below) by naming football players.
              The player's statistics are subtracted from your score.
            </p>
          </div>

          <div class="bg-gray-800 rounded-xl p-4 border-l-4 border-pitch-500">
            <h3 class="font-black text-lg mb-3 text-pitch-400 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
              </svg>
              How to Play
            </h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-300">
              <li>Choose a category (e.g., "Arsenal - Premier League Goals")</li>
              <li>Take turns naming football players that match the category</li>
              <li>The player's statistic is subtracted from your score</li>
              <li>First to reach 0 or below wins!</li>
            </ol>
          </div>

          <div class="bg-gray-800 rounded-xl p-4 border-l-4 border-dartboard-red">
            <h3 class="font-black text-lg mb-3 text-dartboard-red flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              Rules
            </h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-start gap-2">
                <span class="text-dartboard-red font-bold">•</span>
                <span><strong class="text-white">Bust:</strong> If a player's stat is over 180, your turn is forfeited (no score change)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-dartboard-red font-bold">•</span>
                <span><strong class="text-white">No Duplicates:</strong> Each player can only be named once per game</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-dartboard-red font-bold">•</span>
                <span><strong class="text-white">Valid Players:</strong> Must have played for the team/league in the category</span>
              </li>
            </ul>
          </div>

          <div class="bg-gradient-to-r from-pitch-900 to-gray-800 rounded-xl p-4 border-2 border-pitch-600">
            <h3 class="font-black text-lg mb-2 text-pitch-400 flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Strategy
            </h3>
            <p class="text-gray-300 leading-relaxed">
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
