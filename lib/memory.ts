// lib/memory.ts

import { LRUCache } from "lru-cache"
import isBrowser from "./isBrowser"

/**
 * Create a new cache instance
 * @deprecated migrate to MemoryCache
 */
const cache = new LRUCache<string, any>({
  max: 500, // Maximum 500 items
  ttl: 1000 * 60 * 1, // TTL: 1 minutes
  allowStale: false, // Do not return stale data
})

/**
 * Get the cache
 * @deprecated migrate to MemoryCache
 */
export const getCache = async (
  cacheKey: string,
  fallback: () => any,
  ttl?: number,
  options?: LRUCache.SetOptions<string, any, unknown>,
) => {
  // Check if the data is already in the cache
  const data = cache.get(cacheKey)

  if (!data) {
    // console.log("Cache miss:", cacheKey);
    const next = await Promise.resolve(fallback()).catch((error) => {
      console.log(error.message)
      return undefined
    })
    cache.set(cacheKey, next, { ...(options || {}), ttl: ttl ?? undefined })
    // console.log("Data cached for:", cacheKey);
    return next
  }

  // console.log("Cache hit:", cacheKey);

  return data
}

/**
 * Delete the cache
 * @deprecated migrate to MemoryCache
 */
export const deleteCache = (cacheKey: string) => {
  cache.delete(cacheKey)
  // console.log("Cache deleted:", cacheKey);
}

/**
 * MemoryCache
 */
export class MemoryCache {
  private name: string
  private cache: LRUCache<string, any, any>
  private penalty: LRUCache<string, true, any>
  private hooks: Map<string, AnyFunction> = new Map()

  constructor(name: string, options?: LRUCache.Options<string, any, any>) {
    this.name = name
    this.cache = MemoryCache.createLRUCache(options)

    this.penalty = MemoryCache.createLRUCache({
      max: 200,
      ttl: 1000 * 60 * 1, // 1 minutes
    }) as LRUCache<string, true, any>
  }

  public static createLRUCache(options?: LRUCache.Options<string, any, any>) {
    return new LRUCache<string, any, any>({
      max: 500, // Maximum 500 items
      ttl: 1000 * 60 * 1, // TTL: 1 minutes
      allowStale: false, // Do not return stale data
      ...options,
    })
  }

  public static initCache(
    name: string,
    options?: LRUCache.Options<string, any, any>,
  ) {
    return new MemoryCache(name, options)
  }

  public async getCache(
    cacheKey: string,
    fallback: () => any,
    ttl?: number,
    options?: LRUCache.SetOptions<string, any, unknown>,
  ) {
    // Check if the data is already in the cache
    const data = this.cache.get(cacheKey)

    if (isBrowser()) {
      console.log("Cache is not available in browser")
      return
    }

    if (!data) {
      if (this.penalty.has(cacheKey) && this.penalty.get(cacheKey)) {
        return undefined
      }

      const next = await Promise.resolve(fallback())
        .then((data) => {
          this.cache.set(cacheKey, data, {
            ...(options || {}),
            ttl: ttl ?? undefined,
          })
          // console.log("Data cached for:", cacheKey);
          return data
        })
        .catch((error) => {
          console.log(error.message)

          // Penalty for the error for 1 minute
          this.penalty.set(cacheKey, true, {
            ttl: 1000 * 60 * 1, // 1 minutes
          })
          return undefined
        })

      return next
    }

    // console.log("Cache hit:", cacheKey);

    return data
  }

  public prepareHook(hookKey: string, hook: AnyFunction) {
    this.hooks.set(hookKey, hook)
  }

  public async getCacheWithHook<T = any>(
    hookKey: string,
    cacheKey: string,
    metadata?: any,
  ) {
    const hook = this.hooks.get(hookKey)
    if (!hook) {
      return Promise.reject(new Error(`Hook not found for ${cacheKey}`))
    }

    return this.getCache(cacheKey, hook.bind(null, metadata)) as Promise<T>
  }

  public deleteCache(cacheKey: string) {
    this.cache.delete(cacheKey)
    console.log("Cache deleted:", cacheKey)
  }
}
