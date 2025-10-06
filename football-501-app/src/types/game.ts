// Core game type definitions

export interface Player {
  id: string
  name: string
  score: number
  isActive: boolean
}

export interface PlayerAnswer {
  playerName: string // Name of the football player
  statistic: number // The actual stat value (goals, appearances, etc.)
  isValid: boolean
  isBust: boolean // True if statistic > 180
}

export interface Turn {
  playerIndex: number
  playerAnswer?: PlayerAnswer
  scoreBeforeTurn: number
  scoreAfterTurn: number
  timestamp: Date
}

export interface Category {
  id: string
  name: string
  description: string
  type: 'goals' | 'appearances' | 'caps' | 'combined'
  league: 'premier-league' | 'la-liga' | 'serie-a' | 'bundesliga' | 'ligue-1' | 'international'
  teamId?: number // For team-specific categories (e.g., Arsenal goals)
  isPremium: boolean // false for Premier League, true for paid leagues
}

export interface GameState {
  gameId: string
  players: Player[]
  currentPlayerIndex: number
  turns: Turn[]
  gameStatus: 'setup' | 'playing' | 'paused' | 'finished'
  startingScore: number
  selectedCategory: Category | null
  usedPlayerNames: string[] // Track which players have been named
  winnerId: string | null
  createdAt: Date
  lastModified: Date
}

export interface GameConfig {
  startingScore: number
  bustThreshold: number // 180
  maxPlayers: number
}

export type GameStatus = 'setup' | 'playing' | 'paused' | 'finished'
