/**
 * Turn management logic for Football 501
 */

import type { Turn, PlayerAnswer } from '@/types/game'
import { calculateNewScore, isWinningScore } from './scoring'
import { validateTurn } from './gameRules'

export interface TurnResult {
  success: boolean
  newScore: number
  isWinner: boolean
  isBust: boolean
  error?: string
  warnings?: string[]
}

/**
 * Process a player's turn
 */
export function processTurn(
  currentScore: number,
  footballPlayerName: string,
  statistic: number,
  usedPlayerNames: string[]
): TurnResult {
  // Validate the turn
  const validation = validateTurn(footballPlayerName, statistic, usedPlayerNames)

  if (!validation.isValid) {
    return {
      success: false,
      newScore: currentScore,
      isWinner: false,
      isBust: false,
      error: validation.error,
    }
  }

  // Calculate new score
  const newScore = calculateNewScore(currentScore, statistic)
  const isBustTurn = newScore === currentScore && statistic > 180

  // Check if player won
  const isWinner = isWinningScore(newScore)

  return {
    success: true,
    newScore,
    isWinner,
    isBust: isBustTurn,
    warnings: validation.warnings,
  }
}

/**
 * Create a turn record
 */
export function createTurnRecord(
  playerIndex: number,
  playerAnswer: PlayerAnswer,
  scoreBeforeTurn: number,
  scoreAfterTurn: number
): Turn {
  return {
    playerIndex,
    playerAnswer,
    scoreBeforeTurn,
    scoreAfterTurn,
    timestamp: new Date(),
  }
}

/**
 * Get turn statistics for a player
 */
export function getPlayerTurnStats(turns: Turn[], playerIndex: number) {
  const playerTurns = turns.filter(t => t.playerIndex === playerIndex)

  const totalTurns = playerTurns.length
  const validTurns = playerTurns.filter(t => t.playerAnswer?.isValid).length
  const bustTurns = playerTurns.filter(t => t.playerAnswer?.isBust).length
  const totalPointsScored = playerTurns.reduce((sum, turn) => {
    return sum + (turn.scoreBeforeTurn - turn.scoreAfterTurn)
  }, 0)

  const averagePointsPerTurn = totalTurns > 0 ? totalPointsScored / totalTurns : 0

  return {
    totalTurns,
    validTurns,
    bustTurns,
    totalPointsScored,
    averagePointsPerTurn: Math.round(averagePointsPerTurn * 10) / 10,
  }
}

/**
 * Get game statistics
 */
export function getGameStats(turns: Turn[], playerCount: number = 2) {
  const playerStats = Array.from({ length: playerCount }, (_, index) =>
    getPlayerTurnStats(turns, index)
  )

  return {
    totalTurns: turns.length,
    playerStats,
  }
}

/**
 * Get the last N turns
 */
export function getRecentTurns(turns: Turn[], count: number = 5): Turn[] {
  return turns.slice(-count)
}

/**
 * Check if it's a close game (score difference < 50 points)
 */
export function isCloseGame(player1Score: number, player2Score: number): boolean {
  return Math.abs(player1Score - player2Score) < 50
}
