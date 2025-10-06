import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameState, Player, Category, Turn, PlayerAnswer } from '@/types/game'

export const useGameStore = defineStore('game', () => {
  // State
  const gameId = ref<string>('')
  const players = ref<Player[]>([])
  const currentPlayerIndex = ref<number>(0)
  const turns = ref<Turn[]>([])
  const gameStatus = ref<GameState['gameStatus']>('setup')
  const startingScore = ref<number>(501)
  const selectedCategory = ref<Category | null>(null)
  const usedPlayerNames = ref<string[]>([])
  const winnerId = ref<string | null>(null)
  const createdAt = ref<Date>(new Date())
  const lastModified = ref<Date>(new Date())

  // Getters
  const currentPlayer = computed(() => {
    return players.value[currentPlayerIndex.value] || null
  })

  const isGameActive = computed(() => {
    return gameStatus.value === 'playing'
  })

  const isGameFinished = computed(() => {
    return gameStatus.value === 'finished'
  })

  const winner = computed(() => {
    if (!winnerId.value) return null
    return players.value.find(p => p.id === winnerId.value) || null
  })

  const gameProgress = computed(() => {
    return {
      totalTurns: turns.value.length,
      player1Turns: turns.value.filter(t => t.playerIndex === 0).length,
      player2Turns: turns.value.filter(t => t.playerIndex === 1).length,
    }
  })

  // Actions
  function initializeGame(playerNames: string[], category: Category) {
    gameId.value = `game-${Date.now()}`
    createdAt.value = new Date()
    lastModified.value = new Date()

    players.value = playerNames.map((name, index) => ({
      id: `player-${index}`,
      name,
      score: startingScore.value,
      isActive: index === 0,
    }))

    selectedCategory.value = category
    currentPlayerIndex.value = 0
    turns.value = []
    usedPlayerNames.value = []
    winnerId.value = null
    gameStatus.value = 'playing'
  }

  function submitAnswer(playerAnswer: PlayerAnswer): boolean {
    if (gameStatus.value !== 'playing') return false
    if (!currentPlayer.value) return false

    const player = currentPlayer.value
    const scoreBeforeTurn = player.score

    // Create turn record
    const turn: Turn = {
      playerIndex: currentPlayerIndex.value,
      playerAnswer,
      scoreBeforeTurn,
      scoreAfterTurn: scoreBeforeTurn, // Will be updated below
      timestamp: new Date(),
    }

    // Check if it's a bust (over 180)
    if (playerAnswer.isBust) {
      // No score change, turn forfeited
      turn.scoreAfterTurn = scoreBeforeTurn
      turns.value.push(turn)
      usedPlayerNames.value.push(playerAnswer.playerName.toLowerCase())
      lastModified.value = new Date()
      switchTurn()
      return true
    }

    // Valid answer - subtract statistic from score
    if (playerAnswer.isValid) {
      const newScore = scoreBeforeTurn - playerAnswer.statistic
      player.score = newScore
      turn.scoreAfterTurn = newScore

      usedPlayerNames.value.push(playerAnswer.playerName.toLowerCase())
      turns.value.push(turn)
      lastModified.value = new Date()

      // Check for win condition
      if (newScore <= 0) {
        endGame(player.id)
        return true
      }

      switchTurn()
      return true
    }

    return false
  }

  function switchTurn() {
    // Set current player as inactive
    if (currentPlayer.value) {
      currentPlayer.value.isActive = false
    }

    // Switch to next player
    currentPlayerIndex.value = (currentPlayerIndex.value + 1) % players.value.length

    // Set new player as active
    if (currentPlayer.value) {
      currentPlayer.value.isActive = true
    }
  }

  function endGame(winnerPlayerId: string) {
    winnerId.value = winnerPlayerId
    gameStatus.value = 'finished'
    lastModified.value = new Date()
  }

  function pauseGame() {
    if (gameStatus.value === 'playing') {
      gameStatus.value = 'paused'
      lastModified.value = new Date()
    }
  }

  function resumeGame() {
    if (gameStatus.value === 'paused') {
      gameStatus.value = 'playing'
      lastModified.value = new Date()
    }
  }

  function resetGame() {
    gameId.value = ''
    players.value = []
    currentPlayerIndex.value = 0
    turns.value = []
    gameStatus.value = 'setup'
    selectedCategory.value = null
    usedPlayerNames.value = []
    winnerId.value = null
    createdAt.value = new Date()
    lastModified.value = new Date()
  }

  function hasPlayerBeenUsed(playerName: string): boolean {
    return usedPlayerNames.value.includes(playerName.toLowerCase())
  }

  function getGameState(): GameState {
    return {
      gameId: gameId.value,
      players: players.value,
      currentPlayerIndex: currentPlayerIndex.value,
      turns: turns.value,
      gameStatus: gameStatus.value,
      startingScore: startingScore.value,
      selectedCategory: selectedCategory.value,
      usedPlayerNames: usedPlayerNames.value,
      winnerId: winnerId.value,
      createdAt: createdAt.value,
      lastModified: lastModified.value,
    }
  }

  function loadGameState(state: GameState) {
    gameId.value = state.gameId
    players.value = state.players
    currentPlayerIndex.value = state.currentPlayerIndex
    turns.value = state.turns
    gameStatus.value = state.gameStatus
    startingScore.value = state.startingScore
    selectedCategory.value = state.selectedCategory
    usedPlayerNames.value = state.usedPlayerNames
    winnerId.value = state.winnerId
    createdAt.value = state.createdAt
    lastModified.value = state.lastModified
  }

  return {
    // State
    gameId,
    players,
    currentPlayerIndex,
    turns,
    gameStatus,
    startingScore,
    selectedCategory,
    usedPlayerNames,
    winnerId,
    createdAt,
    lastModified,

    // Getters
    currentPlayer,
    isGameActive,
    isGameFinished,
    winner,
    gameProgress,

    // Actions
    initializeGame,
    submitAnswer,
    switchTurn,
    endGame,
    pauseGame,
    resumeGame,
    resetGame,
    hasPlayerBeenUsed,
    getGameState,
    loadGameState,
  }
})
