/**
 * Game rules and validation logic for Football 501
 */

import { isBust } from './scoring'

/**
 * Validate player name input
 */
export function validatePlayerName(name: string): {
  isValid: boolean
  error?: string
} {
  const trimmedName = name.trim()

  if (!trimmedName) {
    return { isValid: false, error: 'Player name cannot be empty' }
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Player name must be at least 2 characters' }
  }

  if (trimmedName.length > 50) {
    return { isValid: false, error: 'Player name cannot exceed 50 characters' }
  }

  return { isValid: true }
}

/**
 * Validate football player name input
 */
export function validateFootballPlayerName(name: string): {
  isValid: boolean
  error?: string
} {
  const trimmedName = name.trim()

  if (!trimmedName) {
    return { isValid: false, error: 'Please enter a player name' }
  }

  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Player name must be at least 2 characters' }
  }

  // Basic check for reasonable player name (letters, spaces, hyphens, apostrophes)
  const namePattern = /^[a-zA-Z\s\-'\.]+$/
  if (!namePattern.test(trimmedName)) {
    return { isValid: false, error: 'Invalid player name format' }
  }

  return { isValid: true }
}

/**
 * Check if a player has already been named in the game
 */
export function isPlayerAlreadyUsed(
  playerName: string,
  usedPlayerNames: string[]
): boolean {
  return usedPlayerNames.includes(playerName.toLowerCase().trim())
}

/**
 * Validate if a statistic value is valid
 */
export function validateStatistic(statistic: number): {
  isValid: boolean
  isBust: boolean
  error?: string
} {
  // Check if it's a valid number
  if (isNaN(statistic) || !isFinite(statistic)) {
    return { isValid: false, isBust: false, error: 'Invalid statistic value' }
  }

  // Check if negative
  if (statistic < 0) {
    return { isValid: false, isBust: false, error: 'Statistic cannot be negative' }
  }

  // Check if it's a bust (over 180)
  const bustCheck = isBust(statistic)
  if (bustCheck) {
    return { isValid: true, isBust: true, error: 'Bust! Score over 180' }
  }

  // Check if statistic is 0
  if (statistic === 0) {
    return { isValid: false, isBust: false, error: 'Player has 0 in this statistic' }
  }

  return { isValid: true, isBust: false }
}

/**
 * Check if game can continue (has at least one active player)
 */
export function canContinuePlaying(
  players: Array<{ score: number }>
): boolean {
  // Game continues until someone reaches 0 or below
  return players.every(player => player.score > 0)
}

/**
 * Determine if it's a valid turn
 */
export interface TurnValidation {
  isValid: boolean
  error?: string
  warnings?: string[]
}

export function validateTurn(
  footballPlayerName: string,
  statistic: number,
  usedPlayerNames: string[]
): TurnValidation {
  const warnings: string[] = []

  // Validate player name
  const nameValidation = validateFootballPlayerName(footballPlayerName)
  if (!nameValidation.isValid) {
    return { isValid: false, error: nameValidation.error }
  }

  // Check if player already used
  if (isPlayerAlreadyUsed(footballPlayerName, usedPlayerNames)) {
    return { isValid: false, error: 'This player has already been named' }
  }

  // Validate statistic
  const statValidation = validateStatistic(statistic)
  if (!statValidation.isValid && !statValidation.isBust) {
    return { isValid: false, error: statValidation.error }
  }

  // If it's a bust, it's still a valid turn, but with warning
  if (statValidation.isBust) {
    warnings.push('Bust! Score over 180 - no points deducted')
  }

  return { isValid: true, warnings: warnings.length > 0 ? warnings : undefined }
}
