import { chainKey } from "configs/frontend/chain/utils"
import { ChainKey } from "configs/server/chain"

export function isElementInContainer(
  containerTop: number,
  containerBottom: number,
  elementTop: number,
  elementBottom: number,
) {
  return !(elementBottom < containerTop || elementTop > containerBottom)
}

export function canScrollY(container: HTMLElement) {
  return (
    container.scrollTop + container.clientHeight < container.scrollHeight - 5
  )
}

export const regexPositiveString = /^[1-9]\d*$/

const DB_NAME = "SearchDB"
const STORE_NAME = `${chainKey}_keywords`
const DB_VERSION = 1.1
export type ISearchDBItem = {
  keyword: string
  id: number
}

export class SearchHistoryDB {
  private db: IDBDatabase

  private constructor(_db: IDBDatabase) {
    this.db = _db
  }

  // Tạo instance đã mở connection
  static async createInstance(): Promise<SearchHistoryDB> {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    return new Promise((resolve, reject) => {
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        if (db.objectStoreNames.contains(`${ChainKey.PACIFIC_1}_keywords`)) {
          db.deleteObjectStore(`${ChainKey.PACIFIC_1}_keywords`)
        }
        db.createObjectStore(`${ChainKey.PACIFIC_1}_keywords`, {
          keyPath: "id",
          autoIncrement: false,
        })

        if (db.objectStoreNames.contains(`${ChainKey.ATLANTIC_2}_keywords`)) {
          db.deleteObjectStore(`${ChainKey.ATLANTIC_2}_keywords`)
        }
        db.createObjectStore(`${ChainKey.ATLANTIC_2}_keywords`, {
          keyPath: "id",
          autoIncrement: false,
        })

        if (db.objectStoreNames.contains(`${ChainKey.ARCTIC_1}_keywords`)) {
          db.deleteObjectStore(`${ChainKey.ARCTIC_1}_keywords`)
        }
        db.createObjectStore(`${ChainKey.ARCTIC_1}_keywords`, {
          keyPath: "id",
          autoIncrement: false,
        })
      }

      request.onsuccess = () => {
        resolve(new SearchHistoryDB(request.result))
      }

      request.onerror = () => {
        reject(request.error)
      }
    })
  }

  private wrapTransaction(mode: IDBTransactionMode): {
    store: IDBObjectStore
    tx: IDBTransaction
  } {
    const tx = this.db.transaction(STORE_NAME, mode)
    const store = tx.objectStore(STORE_NAME)
    return { store, tx }
  }

  async addKeyword(
    id: number | undefined,
    keyword: string,
  ): Promise<ISearchDBItem[]> {
    const { store, tx } = this.wrapTransaction("readwrite")

    return new Promise<ISearchDBItem[]>((resolve, reject) => {
      // B1: Lấy tất cả keywords hiện tại
      const getAllRequest = store.getAll()

      getAllRequest.onsuccess = () => {
        const items = getAllRequest.result as ISearchDBItem[]

        // B3: Nếu đã có đủ 10 keywords => xoá keyword đầu tiên (cũ nhất)
        if (items.length >= 9) {
          const oldestIds = [] as number[]
          items.forEach((item) => {
            if (!item) return
            if (items.length > 9) {
              oldestIds.push(item.id)
              items.splice(items.indexOf(item), 1)
            }
          })

          oldestIds.forEach((id) => {
            store.delete(id)
          })
        }

        const duplicateIndex = items.findIndex(
          (item) => item.id === id || item.keyword === keyword,
        )

        // B2: Nếu đã tồn tại keyword => xoá bản cũ
        if (duplicateIndex !== -1) {
          store.delete(items[duplicateIndex].id)
          items.splice(duplicateIndex, 1)
        }

        const newId = new Date().getTime()
        // B4: Sau đó thêm keyword mới vào
        store.put({ keyword, id: newId })
        items.push({ keyword, id: newId })

        tx.oncomplete = () => resolve(items.reverse())
        tx.onerror = () => reject(tx.error)
        tx.onabort = () => reject(tx.error)
      }

      getAllRequest.onerror = () => reject(getAllRequest.error)
    })
  }

  async getAllKeywords(): Promise<ISearchDBItem[]> {
    const { store } = this.wrapTransaction("readonly")

    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => {
        const result = request.result.reverse() as ISearchDBItem[]
        resolve(result)
      }
      request.onerror = () => reject(request.error)
    })
  }

  async removeKeyword(item: ISearchDBItem): Promise<ISearchDBItem> {
    const { store, tx } = this.wrapTransaction("readwrite")
    store.delete(item.id)

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(item)
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
  }

  async clearAll(): Promise<void> {
    const { store, tx } = this.wrapTransaction("readwrite")
    store.clear()

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
  }
}
