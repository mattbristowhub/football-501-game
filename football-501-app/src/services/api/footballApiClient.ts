/**
 * API-Football client service
 * Handles all requests to the API-Football API
 */

import type { ApiResponse, ApiPlayer, PlayerSearchParams } from '@/types/api'

const API_BASE_URL = import.meta.env.VITE_FOOTBALL_API_URL || 'https://v3.football.api-sports.io'
const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY

if (!API_KEY) {
  console.error('VITE_FOOTBALL_API_KEY is not defined in environment variables')
}

/**
 * Make a request to the API-Football API
 */
async function apiRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<ApiResponse<T>> {
  const url = new URL(endpoint, API_BASE_URL)

  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY || '',
      'x-rapidapi-host': 'v3.football.api-sports.io',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const data = await response.json()

  // Check for API errors
  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(`API returned errors: ${JSON.stringify(data.errors)}`)
  }

  return data
}

/**
 * Search for players by name
 */
export async function searchPlayers(params: PlayerSearchParams): Promise<ApiResponse<ApiPlayer>> {
  return apiRequest<ApiPlayer>('/players', params)
}

/**
 * Get player statistics for a specific season and league
 */
export async function getPlayerStatistics(
  playerId: number,
  season: number,
  leagueId?: number
): Promise<ApiResponse<ApiPlayer>> {
  const params: Record<string, any> = {
    id: playerId,
    season,
  }

  if (leagueId) {
    params.league = leagueId
  }

  return apiRequest<ApiPlayer>('/players', params)
}

/**
 * Get player by ID
 */
export async function getPlayerById(playerId: number, season: number): Promise<ApiResponse<ApiPlayer>> {
  return apiRequest<ApiPlayer>('/players', {
    id: playerId,
    season,
  })
}

/**
 * Search players by team
 */
export async function getPlayersByTeam(
  teamId: number,
  season: number,
  page: number = 1
): Promise<ApiResponse<ApiPlayer>> {
  return apiRequest<ApiPlayer>('/players', {
    team: teamId,
    season,
    page,
  })
}

/**
 * Get team information by ID
 */
export async function getTeamById(teamId: number): Promise<any> {
  return apiRequest('/teams', {
    id: teamId,
  })
}

/**
 * Health check - test API connection
 */
export async function testApiConnection(): Promise<boolean> {
  try {
    // Simple request to check if API is accessible
    const response = await apiRequest('/status', {})
    return true
  } catch (error) {
    console.error('API connection test failed:', error)
    return false
  }
}

/**
 * Get API rate limit info from response headers
 */
export function getRateLimitInfo(response: Response): {
  limit: number
  remaining: number
  reset: number
} | null {
  try {
    return {
      limit: parseInt(response.headers.get('x-ratelimit-limit') || '0'),
      remaining: parseInt(response.headers.get('x-ratelimit-remaining') || '0'),
      reset: parseInt(response.headers.get('x-ratelimit-reset') || '0'),
    }
  } catch {
    return null
  }
}
