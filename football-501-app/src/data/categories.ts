/**
 * Game categories definition
 * Free Premier League categories + Paid league packs
 */

import type { Category } from '@/types/game'

// Premier League team IDs from API-Football
const TEAM_IDS = {
  ARSENAL: 42,
  CHELSEA: 49,
  LIVERPOOL: 40,
  MANCHESTER_UNITED: 33,
  MANCHESTER_CITY: 50,
  TOTTENHAM: 47,
} as const

// League IDs from API-Football
export const LEAGUE_IDS = {
  PREMIER_LEAGUE: 39,
  LA_LIGA: 140,
  SERIE_A: 135,
  BUNDESLIGA: 78,
  LIGUE_1: 61,
} as const

/**
 * Free Premier League Categories
 */
export const FREE_CATEGORIES: Category[] = [
  // Goals categories
  {
    id: 'pl-goals-arsenal',
    name: 'Arsenal - Premier League Goals',
    description: 'Name Arsenal players and deduct their Premier League goal tally',
    type: 'goals',
    league: 'premier-league',
    teamId: TEAM_IDS.ARSENAL,
    isPremium: false,
  },
  {
    id: 'pl-goals-chelsea',
    name: 'Chelsea - Premier League Goals',
    description: 'Name Chelsea players and deduct their Premier League goal tally',
    type: 'goals',
    league: 'premier-league',
    teamId: TEAM_IDS.CHELSEA,
    isPremium: false,
  },
  {
    id: 'pl-goals-liverpool',
    name: 'Liverpool - Premier League Goals',
    description: 'Name Liverpool players and deduct their Premier League goal tally',
    type: 'goals',
    league: 'premier-league',
    teamId: TEAM_IDS.LIVERPOOL,
    isPremium: false,
  },
  {
    id: 'pl-goals-man-utd',
    name: 'Manchester United - Premier League Goals',
    description: 'Name Man United players and deduct their Premier League goal tally',
    type: 'goals',
    league: 'premier-league',
    teamId: TEAM_IDS.MANCHESTER_UNITED,
    isPremium: false,
  },

  // Appearances categories
  {
    id: 'pl-appearances-arsenal',
    name: 'Arsenal - Premier League Appearances',
    description: 'Name Arsenal players and deduct their Premier League appearances',
    type: 'appearances',
    league: 'premier-league',
    teamId: TEAM_IDS.ARSENAL,
    isPremium: false,
  },
  {
    id: 'pl-appearances-chelsea',
    name: 'Chelsea - Premier League Appearances',
    description: 'Name Chelsea players and deduct their Premier League appearances',
    type: 'appearances',
    league: 'premier-league',
    teamId: TEAM_IDS.CHELSEA,
    isPremium: false,
  },
  {
    id: 'pl-appearances-liverpool',
    name: 'Liverpool - Premier League Appearances',
    description: 'Name Liverpool players and deduct their Premier League appearances',
    type: 'appearances',
    league: 'premier-league',
    teamId: TEAM_IDS.LIVERPOOL,
    isPremium: false,
  },
  {
    id: 'pl-appearances-man-utd',
    name: 'Manchester United - Premier League Appearances',
    description: 'Name Man United players and deduct their Premier League appearances',
    type: 'appearances',
    league: 'premier-league',
    teamId: TEAM_IDS.MANCHESTER_UNITED,
    isPremium: false,
  },

  // All-time categories
  {
    id: 'pl-top-scorers',
    name: 'Premier League - All-Time Top Scorers',
    description: 'Name any Premier League player and deduct their total PL goals',
    type: 'goals',
    league: 'premier-league',
    isPremium: false,
  },
]

/**
 * Premium Categories - La Liga Pack ($1.99)
 */
export const LA_LIGA_CATEGORIES: Category[] = [
  {
    id: 'la-liga-goals-real-madrid',
    name: 'Real Madrid - La Liga Goals',
    description: 'Name Real Madrid players and deduct their La Liga goal tally',
    type: 'goals',
    league: 'la-liga',
    teamId: 541, // Real Madrid team ID
    isPremium: true,
  },
  {
    id: 'la-liga-goals-barcelona',
    name: 'Barcelona - La Liga Goals',
    description: 'Name Barcelona players and deduct their La Liga goal tally',
    type: 'goals',
    league: 'la-liga',
    teamId: 529, // Barcelona team ID
    isPremium: true,
  },
  // Add more La Liga categories...
]

/**
 * Premium Categories - Serie A Pack ($1.99)
 */
export const SERIE_A_CATEGORIES: Category[] = [
  {
    id: 'serie-a-goals-juventus',
    name: 'Juventus - Serie A Goals',
    description: 'Name Juventus players and deduct their Serie A goal tally',
    type: 'goals',
    league: 'serie-a',
    teamId: 496, // Juventus team ID
    isPremium: true,
  },
  {
    id: 'serie-a-goals-milan',
    name: 'AC Milan - Serie A Goals',
    description: 'Name AC Milan players and deduct their Serie A goal tally',
    type: 'goals',
    league: 'serie-a',
    teamId: 489, // AC Milan team ID
    isPremium: true,
  },
  // Add more Serie A categories...
]

/**
 * Get all free categories
 */
export function getFreeCategories(): Category[] {
  return FREE_CATEGORIES
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): Category | undefined {
  const allCategories = [
    ...FREE_CATEGORIES,
    ...LA_LIGA_CATEGORIES,
    ...SERIE_A_CATEGORIES,
  ]
  return allCategories.find(cat => cat.id === id)
}

/**
 * Get categories by league
 */
export function getCategoriesByLeague(league: Category['league']): Category[] {
  const allCategories = [
    ...FREE_CATEGORIES,
    ...LA_LIGA_CATEGORIES,
    ...SERIE_A_CATEGORIES,
  ]
  return allCategories.filter(cat => cat.league === league)
}

/**
 * Check if category is available (free or purchased)
 */
export function isCategoryAvailable(categoryId: string, purchasedLeagues: string[]): boolean {
  const category = getCategoryById(categoryId)
  if (!category) return false

  // Free categories are always available
  if (!category.isPremium) return true

  // Check if premium league pack is purchased
  return purchasedLeagues.includes(category.league)
}
