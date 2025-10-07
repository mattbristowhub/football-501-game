/**
 * API response caching service
 * Reduces API calls by caching responses in memory and localStorage
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}

interface CacheConfig {
  ttl: number // Time to live in milliseconds
  maxEntries: number
}

class ApiCache {
  private memoryCache: Map<string, CacheEntry<any>>
  private config: CacheConfig

  constructor(config: Partial<CacheConfig> = {}) {
    this.memoryCache = new Map()
    this.config = {
      ttl: config.ttl || 1000 * 60 * 60, // Default: 1 hour
      maxEntries: config.maxEntries || 100,
    }
  }

  /**
   * Generate cache key from parameters
   */
  private generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&')
    return `${prefix}:${sortedParams}`
  }

  /**
   * Get cached data
   */
  get<T>(key: string): T | null {
    const entry = this.memoryCache.get(key)

    if (!entry) {
      // Try localStorage as fallback
      return this.getFromLocalStorage<T>(key)
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key)
      this.removeFromLocalStorage(key)
      return null
    }

    return entry.data as T
  }

  /**
   * Set cached data
   */
  set<T>(key: string, data: T, customTtl?: number): void {
    const ttl = customTtl || this.config.ttl
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl,
    }

    // Add to memory cache
    this.memoryCache.set(key, entry)

    // Enforce max entries limit
    if (this.memoryCache.size > this.config.maxEntries) {
      this.evictOldest()
    }

    // Also save to localStorage for persistence
    this.saveToLocalStorage(key, entry)
  }

  /**
   * Clear specific cache entry
   */
  delete(key: string): void {
    this.memoryCache.delete(key)
    this.removeFromLocalStorage(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear()
    this.clearLocalStorage()
  }

  /**
   * Get cached player search result
   */
  getPlayerSearch(playerName: string, categoryId: string) {
    const key = this.generateKey('player_search', { playerName, categoryId })
    return this.get(key)
  }

  /**
   * Set cached player search result
   */
  setPlayerSearch(playerName: string, categoryId: string, data: any): void {
    const key = this.generateKey('player_search', { playerName, categoryId })
    this.set(key, data)
  }

  /**
   * Get cached player statistics
   */
  getPlayerStats(playerId: number, season: number, leagueId: number) {
    const key = this.generateKey('player_stats', { playerId, season, leagueId })
    return this.get(key)
  }

  /**
   * Set cached player statistics
   */
  setPlayerStats(playerId: number, season: number, leagueId: number, data: any): void {
    const key = this.generateKey('player_stats', { playerId, season, leagueId })
    this.set(key, data)
  }

  /**
   * Evict oldest cache entry
   */
  private evictOldest(): void {
    let oldestKey: string | null = null
    let oldestTime = Infinity

    for (const [key, entry] of this.memoryCache.entries()) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.delete(oldestKey)
    }
  }

  /**
   * Save to localStorage
   */
  private saveToLocalStorage<T>(key: string, entry: CacheEntry<T>): void {
    try {
      const storageKey = `api_cache_${key}`
      localStorage.setItem(storageKey, JSON.stringify(entry))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  }

  /**
   * Get from localStorage
   */
  private getFromLocalStorage<T>(key: string): T | null {
    try {
      const storageKey = `api_cache_${key}`
      const item = localStorage.getItem(storageKey)

      if (!item) return null

      const entry: CacheEntry<T> = JSON.parse(item)

      // Check if expired
      if (Date.now() > entry.expiresAt) {
        this.removeFromLocalStorage(key)
        return null
      }

      // Restore to memory cache
      this.memoryCache.set(key, entry)

      return entry.data
    } catch (error) {
      console.warn('Failed to get from localStorage:', error)
      return null
    }
  }

  /**
   * Remove from localStorage
   */
  private removeFromLocalStorage(key: string): void {
    try {
      const storageKey = `api_cache_${key}`
      localStorage.removeItem(storageKey)
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
    }
  }

  /**
   * Clear all cache from localStorage
   */
  private clearLocalStorage(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith('api_cache_')) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.memoryCache.size,
      maxEntries: this.config.maxEntries,
      ttl: this.config.ttl,
    }
  }
}

// Export singleton instance
export const apiCache = new ApiCache({
  ttl: 1000 * 60 * 60 * 24, // 24 hours for player data
  maxEntries: 200,
})
