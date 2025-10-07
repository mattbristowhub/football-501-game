/**
 * Player search service
 * High-level service for searching football players
 */

import { searchPlayers, getPlayerStatistics } from './footballApiClient'
import type { ProcessedPlayerData, ApiPlayer, ApiPlayerStatistics } from '@/types/api'
import type { Category } from '@/types/game'

/**
 * Search for a player by name within a specific category context
 */
export async function searchPlayerForCategory(
  playerName: string,
  category: Category
): Promise<ProcessedPlayerData | null> {
  try {
    // Determine search parameters based on category
    const searchParams: any = {
      search: playerName,
      league: category.league === 'premier-league' ? 39 : undefined, // Premier League ID is 39
      season: 2024, // Current season
    }

    // Add team filter if category is team-specific
    if (category.teamId) {
      searchParams.team = category.teamId
    }

    const response = await searchPlayers(searchParams)

    if (!response.response || response.response.length === 0) {
      return null // Player not found
    }

    // Get the first matching player
    const apiPlayer = response.response[0]

    // Find statistics matching the category
    const relevantStats = findRelevantStatistics(apiPlayer, category)

    if (!relevantStats) {
      return null // No matching statistics found
    }

    return processPlayerData(apiPlayer, relevantStats, category)
  } catch (error) {
    console.error('Error searching for player:', error)
    throw error
  }
}

/**
 * Find statistics that match the category criteria
 */
function findRelevantStatistics(
  apiPlayer: ApiPlayer,
  category: Category
): ApiPlayerStatistics | null {
  const stats = apiPlayer.statistics

  if (!stats || stats.length === 0) return null

  // Filter statistics based on category
  const matchingStats = stats.filter(stat => {
    // Check league match
    const leagueMatch = matchLeague(stat, category.league)
    if (!leagueMatch) return false

    // Check team match if category is team-specific
    if (category.teamId && stat.team.id !== category.teamId) {
      return false
    }

    return true
  })

  if (matchingStats.length === 0) return null

  // Return the most recent season's stats or sum across multiple seasons
  // For now, return the first match
  return matchingStats[0]
}

/**
 * Check if a statistic matches the league
 */
function matchLeague(stat: ApiPlayerStatistics, league: Category['league']): boolean {
  const leagueMap: Record<Category['league'], number> = {
    'premier-league': 39,
    'la-liga': 140,
    'serie-a': 135,
    'bundesliga': 78,
    'ligue-1': 61,
    'international': 0, // Will need special handling
  }

  const leagueId = leagueMap[league]
  return stat.league.id === leagueId
}

/**
 * Process API player data into our game format
 */
function processPlayerData(
  apiPlayer: ApiPlayer,
  stats: ApiPlayerStatistics,
  category: Category
): ProcessedPlayerData {
  return {
    playerId: apiPlayer.player.id,
    playerName: apiPlayer.player.name,
    teamId: stats.team.id,
    teamName: stats.team.name,
    leagueId: stats.league.id,
    leagueName: stats.league.name,
    season: stats.league.season,
    goals: stats.goals.total || 0,
    appearances: stats.games.appearences || 0,
    assists: stats.goals.assists || 0,
    photo: apiPlayer.player.photo,
  }
}

/**
 * Get the statistic value based on category type
 */
export function getStatisticForCategory(
  playerData: ProcessedPlayerData,
  category: Category
): number {
  switch (category.type) {
    case 'goals':
      return playerData.goals
    case 'appearances':
      return playerData.appearances
    case 'caps':
      return playerData.appearances // For international, appearances = caps
    case 'combined':
      return playerData.goals + playerData.assists
    default:
      return 0
  }
}

/**
 * Validate that a player matches the category requirements
 */
export function validatePlayerForCategory(
  playerData: ProcessedPlayerData | null,
  category: Category
): {
  isValid: boolean
  error?: string
} {
  if (!playerData) {
    return { isValid: false, error: 'Player not found in database' }
  }

  // Check team match for team-specific categories
  if (category.teamId && playerData.teamId !== category.teamId) {
    return { isValid: false, error: `Player did not play for ${category.name}` }
  }

  // Check league match
  const leagueMap: Record<Category['league'], number> = {
    'premier-league': 39,
    'la-liga': 140,
    'serie-a': 135,
    'bundesliga': 78,
    'ligue-1': 61,
    'international': 0,
  }

  const expectedLeagueId = leagueMap[category.league]
  if (expectedLeagueId !== 0 && playerData.leagueId !== expectedLeagueId) {
    return { isValid: false, error: `Player statistics not found for ${category.league}` }
  }

  // Check if statistic is 0
  const statValue = getStatisticForCategory(playerData, category)
  if (statValue === 0) {
    return { isValid: false, error: `Player has 0 ${category.type} in this category` }
  }

  return { isValid: true }
}
