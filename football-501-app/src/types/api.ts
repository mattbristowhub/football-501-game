/**
 * API-Football API response types
 * Based on https://www.api-football.com/documentation-v3
 */

// API Response wrapper
export interface ApiResponse<T> {
  get: string
  parameters: Record<string, any>
  errors: any[]
  results: number
  paging: {
    current: number
    total: number
  }
  response: T[]
}

// Player search response
export interface ApiPlayer {
  player: {
    id: number
    name: string
    firstname: string
    lastname: string
    age: number
    birth: {
      date: string
      place: string
      country: string
    }
    nationality: string
    height: string
    weight: string
    photo: string
  }
  statistics: ApiPlayerStatistics[]
}

// Player statistics (for a specific team/league/season)
export interface ApiPlayerStatistics {
  team: {
    id: number
    name: string
    logo: string
  }
  league: {
    id: number
    name: string
    country: string
    logo: string
    flag: string
    season: number
  }
  games: {
    appearences: number
    lineups: number
    minutes: number
    number: number | null
    position: string
    rating: string
    captain: boolean
  }
  substitutes: {
    in: number
    out: number
    bench: number
  }
  shots: {
    total: number
    on: number
  }
  goals: {
    total: number
    conceded: number
    assists: number
    saves: number
  }
  passes: {
    total: number
    key: number
    accuracy: number
  }
  tackles: {
    total: number
    blocks: number
    interceptions: number
  }
  duels: {
    total: number
    won: number
  }
  dribbles: {
    attempts: number
    success: number
    past: number
  }
  fouls: {
    drawn: number
    committed: number
  }
  cards: {
    yellow: number
    yellowred: number
    red: number
  }
  penalty: {
    won: number
    commited: number
    scored: number
    missed: number
    saved: number
  }
}

// Team information
export interface ApiTeam {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

// League information
export interface ApiLeague {
  id: number
  name: string
  type: string
  logo: string
}

// Search parameters
export interface PlayerSearchParams {
  search?: string // Player name
  team?: number // Team ID
  league?: number // League ID
  season?: number // Season year
  page?: number
}

// Our processed player data for the game
export interface ProcessedPlayerData {
  playerId: number
  playerName: string
  teamId: number
  teamName: string
  leagueId: number
  leagueName: string
  season: number
  goals: number
  appearances: number
  assists: number
  photo: string
}
