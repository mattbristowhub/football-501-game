/**
 * Scoring logic for Football 501 game
 */

export const GAME_CONSTANTS = {
  STARTING_SCORE: 501,
  BUST_THRESHOLD: 180,
  WINNING_SCORE: 0,
} as const

/**
 * Calculate if a statistic is a bust (over 180)
 */
export function isBust(statistic: number): boolean {
  return statistic > GAME_CONSTANTS.BUST_THRESHOLD
}

/**
 * Calculate new score after subtracting a statistic
 * Returns the new score, or the original score if it's a bust
 */
export function calculateNewScore(currentScore: number, statistic: number): number {
  if (isBust(statistic)) {
    return currentScore // No change on bust
  }
  return currentScore - statistic
}

/**
 * Check if a score represents a win (0 or below)
 */
export function isWinningScore(score: number): boolean {
  return score <= GAME_CONSTANTS.WINNING_SCORE
}

/**
 * Determine the winner when both players finish in the same round
 * The player closest to 0 wins (least negative)
 */
export function determineWinner(player1Score: number, player2Score: number): number {
  if (player1Score === player2Score) {
    return 0 // Tie (shouldn't happen in normal gameplay)
  }

  // Both are at or below 0 - closest to 0 wins
  if (player1Score <= 0 && player2Score <= 0) {
    return Math.abs(player1Score) < Math.abs(player2Score) ? 1 : 2
  }

  // Only one is at or below 0
  if (player1Score <= 0) return 1
  if (player2Score <= 0) return 2

  // Neither has won yet
  return 0
}

/**
 * Calculate score difference between two players
 */
export function getScoreDifference(player1Score: number, player2Score: number): number {
  return Math.abs(player1Score - player2Score)
}

/**
 * Get score status message
 */
export function getScoreStatus(score: number): string {
  if (score <= 0) return 'Winner!'
  if (score < 50) return 'Close to winning'
  if (score < 100) return 'Good position'
  if (score < 200) return 'Making progress'
  if (score < 350) return 'Getting started'
  return 'Just started'
}
