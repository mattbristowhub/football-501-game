/**
 * LocalStorage service for persisting game state
 */

import type { GameState } from '@/types/game'

const STORAGE_KEYS = {
  GAME_STATE: 'football501_game_state',
  PURCHASED_LEAGUES: 'football501_purchased_leagues',
  SETTINGS: 'football501_settings',
} as const

/**
 * Save game state to localStorage
 */
export function saveGameState(state: GameState): boolean {
  try {
    const serialized = JSON.stringify(state)
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, serialized)
    return true
  } catch (error) {
    console.error('Error saving game state to localStorage:', error)
    return false
  }
}

/**
 * Load game state from localStorage
 */
export function loadGameState(): GameState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.GAME_STATE)
    if (!serialized) return null

    const state = JSON.parse(serialized)

    // Convert date strings back to Date objects
    if (state.createdAt) state.createdAt = new Date(state.createdAt)
    if (state.lastModified) state.lastModified = new Date(state.lastModified)
    if (state.turns) {
      state.turns = state.turns.map((turn: any) => ({
        ...turn,
        timestamp: new Date(turn.timestamp),
      }))
    }

    return state
  } catch (error) {
    console.error('Error loading game state from localStorage:', error)
    return null
  }
}

/**
 * Clear game state from localStorage
 */
export function clearGameState(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE)
    return true
  } catch (error) {
    console.error('Error clearing game state from localStorage:', error)
    return false
  }
}

/**
 * Check if a saved game exists
 */
export function hasSavedGame(): boolean {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.GAME_STATE)
    return serialized !== null
  } catch (error) {
    console.error('Error checking for saved game:', error)
    return false
  }
}

/**
 * Save purchased league packs
 */
export function savePurchasedLeagues(leagueIds: string[]): boolean {
  try {
    const serialized = JSON.stringify(leagueIds)
    localStorage.setItem(STORAGE_KEYS.PURCHASED_LEAGUES, serialized)
    return true
  } catch (error) {
    console.error('Error saving purchased leagues to localStorage:', error)
    return false
  }
}

/**
 * Load purchased league packs
 */
export function loadPurchasedLeagues(): string[] {
  try {
    const serialized = localStorage.getItem(STORAGE_KEYS.PURCHASED_LEAGUES)
    if (!serialized) return []

    return JSON.parse(serialized)
  } catch (error) {
    console.error('Error loading purchased leagues from localStorage:', error)
    return []
  }
}

/**
 * Clear all localStorage data for the app
 */
export function clearAllData(): boolean {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    return true
  } catch (error) {
    console.error('Error clearing all data from localStorage:', error)
    return false
  }
}

/**
 * Get storage usage information
 */
export function getStorageInfo(): {
  isAvailable: boolean
  usedSpace?: number
  totalSpace?: number
} {
  try {
    // Check if localStorage is available
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)

    // Estimate used space (rough calculation)
    let usedSpace = 0
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key)
      if (item) {
        usedSpace += item.length * 2 // Rough estimate: 2 bytes per character
      }
    })

    return {
      isAvailable: true,
      usedSpace,
      totalSpace: 5 * 1024 * 1024, // Most browsers provide ~5MB
    }
  } catch (error) {
    console.error('Error checking storage info:', error)
    return {
      isAvailable: false,
    }
  }
}
