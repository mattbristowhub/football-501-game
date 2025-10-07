/**
 * Statistics service
 * Integrates player search with game logic
 */

import { searchPlayerForCategory, getStatisticForCategory, validatePlayerForCategory } from './playerSearch'
import type { Category, PlayerAnswer } from '@/types/game'
import type { ProcessedPlayerData } from '@/types/api'
import { isBust } from '../game/scoring'

/**
 * Process a player answer submission
 * This is the main entry point for validating and scoring a player's answer
 */
export async function processPlayerAnswer(
  footballPlayerName: string,
  category: Category,
  usedPlayerNames: string[]
): Promise<PlayerAnswer> {
  try {
    // Check if player has already been used
    const normalizedName = footballPlayerName.toLowerCase().trim()
    if (usedPlayerNames.includes(normalizedName)) {
      return {
        playerName: footballPlayerName,
        statistic: 0,
        isValid: false,
        isBust: false,
      }
    }

    // Search for the player in the API
    const playerData = await searchPlayerForCategory(footballPlayerName, category)

    // Validate player matches category
    const validation = validatePlayerForCategory(playerData, category)
    if (!validation.isValid) {
      return {
        playerName: footballPlayerName,
        statistic: 0,
        isValid: false,
        isBust: false,
      }
    }

    // Get the relevant statistic
    const statistic = getStatisticForCategory(playerData!, category)

    // Check if it's a bust
    const bustCheck = isBust(statistic)

    return {
      playerName: playerData!.playerName, // Use the official name from API
      statistic,
      isValid: true,
      isBust: bustCheck,
    }
  } catch (error) {
    console.error('Error processing player answer:', error)
    // Return invalid answer on error
    return {
      playerName: footballPlayerName,
      statistic: 0,
      isValid: false,
      isBust: false,
    }
  }
}

/**
 * Get player statistics for display (without submitting)
 */
export async function getPlayerStats(
  footballPlayerName: string,
  category: Category
): Promise<ProcessedPlayerData | null> {
  try {
    return await searchPlayerForCategory(footballPlayerName, category)
  } catch (error) {
    console.error('Error getting player stats:', error)
    return null
  }
}

/**
 * Suggest players for autocomplete
 * Note: This will require caching or a different approach due to API limits
 */
export async function suggestPlayers(
  partialName: string,
  category: Category,
  limit: number = 5
): Promise<ProcessedPlayerData[]> {
  // TODO: Implement this with caching
  // For now, return empty array
  // In production, this should query a cached database of players
  console.warn('suggestPlayers not fully implemented - requires caching layer')
  return []
}

/**
 * Verify category data is available
 * Check if we can make requests for this category
 */
export async function verifyCategoryAvailability(category: Category): Promise<boolean> {
  try {
    // For premium categories, check if user has purchased
    if (category.isPremium) {
      // TODO: Check purchase status from store
      return false
    }

    // For free categories, always available
    return true
  } catch (error) {
    console.error('Error verifying category:', error)
    return false
  }
}
