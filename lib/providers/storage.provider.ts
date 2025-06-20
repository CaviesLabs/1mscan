import type { IChainKey } from "configs/server/chain"
import isBrowser from "lib/isBrowser"
import { parseClause, stringifyClause } from "lib/utils/json"

export interface ExpiredItemData {
  value: any
  expires: number
}

export type ILocalStorageKey =
  | `${IChainKey}_address-book`
  | "profile_checker_counter"
  | `refresh_counter_${string}_${string}`

export class StorageProvider<K extends string = string> {
  /**
   * @notice Constructor to initialize StorageProvider with the prefix and localStorage
   * @param PREFIX
   * @param storage
   */
  constructor(
    private PREFIX = "SEITRACE_",
    private storage?: Storage,
  ) {
    if (!this.storage) {
      console.warn("Storage is not available")
    }
  }

  /**
   * @param key
   * @param value
   * @description
   * The function to set the value with an associated key
   */
  public setItem(key: K, value: string): void {
    if (!this.storage) return
    this.storage.setItem(`${this.PREFIX}_${key}`, value)
  }

  public setItemJson(key: K, value: Record<string, any>, fallback?: string) {
    if (!this.storage) {
      console.warn("Storage is not available")
      return
    }
    const stringValue = stringifyClause(value, fallback ?? "")
    this.storage.setItem(`${this.PREFIX}_${key}`, stringValue)
  }

  /**
   * @param key
   * @returns value
   * @description
   * The function to get value with an associated key
   */
  public getItem(key: K): string | null {
    if (!this.storage) return null
    return this.storage.getItem(`${this.PREFIX}_${key}`)
  }

  /**
   * @param key
   * @param value
   * @param ttl
   * @description
   * The function to set the value with an associated key and time to live
   */
  public setItemExpires(key: K, value: string, ttl: number) {
    if (!this.storage) return
    const expires = Date.now() + ttl
    this.storage.setItem(
      `${this.PREFIX}_${key}`,
      JSON.stringify({ value, expires } as ExpiredItemData),
    )
  }

  /**
   * @param key
   * @returns
   * @description
   * The function to get value with an associated key and check if it is expired
   */
  public getItemExpires(key: K) {
    try {
      if (!this.storage) return null

      const data = this.getItemAsJson<ExpiredItemData>(key)

      if (!data) return null

      if (Date.now() > data?.expires) {
        this.removeItem(key)
        return null
      }
      return data.value
    } catch {
      return null
    }
  }

  /**
   * @param key
   * @returns
   * @description
   * The function to remove value with an associated key
   */
  public removeItem(key: K): void {
    if (!this.storage) return
    return this.storage.removeItem(`${this.PREFIX}_${key}`)
  }

  /**
   * @notice The function to get item as json format
   * @param key
   */
  public getItemAsJson<T extends object>(key: K, fallback?: T): T | null {
    const value = this.getItem(key)
    if (!value) return null
    return parseClause<T>(value, fallback) ?? null
  }

  /**
   * @notice Purge all storage
   */
  public purgeAll() {
    this.storage?.clear()
  }
}

export class LocalStorageProvider extends StorageProvider<ILocalStorageKey> {
  private static instance: StorageProvider<ILocalStorageKey>

  public static getInstance() {
    if (!this.instance) {
      const storage = isBrowser() ? window.localStorage : undefined
      if (!storage) {
        console.error("LocalStorage is not available")
      }
      const newInstance = new LocalStorageProvider("SEITRACE_", storage)
      this.instance = newInstance
    }
    return this.instance
  }

  // public static setItem(key: K, value: string) {
  //   this.getInstance().setItem(key, value);
  // }

  // public static getItem(key: K) {
  //   return this.getInstance().getItem(key);
  // }

  // public static setItemExpires(key: K, value: string, ttl: number) {
  //   this.getInstance().setItemExpires(key, value, ttl);
  // }

  // public static getItemExpires(key: K) {
  //   return this.getInstance().getItemExpires(key);
  // }

  // public static removeItem(key: K) {
  //   this.getInstance().removeItem(key);
  // }

  // public static getItemAsJson<T>(key: K): T | null {
  //   return this.getInstance().getItemAsJson(key);
  // }

  // public static purgeAll() {
  //   this.getInstance().purgeAll();
  // }
}
