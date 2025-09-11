// Offline data management utilities
export class OfflineManager {
  private db: IDBDatabase | null = null
  private isOnline = typeof navigator !== "undefined" ? navigator.onLine : true

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeDB()
      this.setupOnlineListeners()
      this.registerServiceWorker()
    }
  }

  private async initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("QuestAcademyDB", 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create object stores for offline data
        if (!db.objectStoreNames.contains("quests")) {
          const questStore = db.createObjectStore("quests", { keyPath: "id" })
          questStore.createIndex("subject", "subject", { unique: false })
        }

        if (!db.objectStoreNames.contains("progress")) {
          db.createObjectStore("progress", { keyPath: "questId" })
        }

        if (!db.objectStoreNames.contains("pendingSync")) {
          db.createObjectStore("pendingSync", { keyPath: "id", autoIncrement: true })
        }

        if (!db.objectStoreNames.contains("studentData")) {
          db.createObjectStore("studentData", { keyPath: "id" })
        }
      }
    })
  }

  private setupOnlineListeners(): void {
    window.addEventListener("online", () => {
      this.isOnline = true
      this.syncPendingData()
      this.notifyOnlineStatus(true)
    })

    window.addEventListener("offline", () => {
      this.isOnline = false
      this.notifyOnlineStatus(false)
    })
  }

  private async registerServiceWorker(): Promise<void> {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js")
        console.log("Service Worker registered:", registration)

        // Request background sync permission
        if ("sync" in window.ServiceWorkerRegistration.prototype) {
          await registration.sync.register("quest-progress-sync")
        }
      } catch (error) {
        console.error("Service Worker registration failed:", error)
      }
    }
  }

  // Save quest progress offline
  async saveQuestProgress(questId: string, progress: number, xpEarned: number): Promise<void> {
    if (!this.db) await this.initializeDB()

    const progressData = {
      questId,
      progress,
      xpEarned,
      timestamp: Date.now(),
      synced: this.isOnline,
    }

    const transaction = this.db!.transaction(["progress"], "readwrite")
    const store = transaction.objectStore("progress")
    await store.put(progressData)

    // If offline, add to pending sync
    if (!this.isOnline) {
      await this.addToPendingSync("quest-progress", progressData)
    }
  }

  // Get quest progress (offline-first)
  async getQuestProgress(questId: string): Promise<any> {
    if (!this.db) await this.initializeDB()

    const transaction = this.db!.transaction(["progress"], "readonly")
    const store = transaction.objectStore("progress")

    return new Promise((resolve, reject) => {
      const request = store.get(questId)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Cache quest data for offline access
  async cacheQuestData(quests: any[]): Promise<void> {
    if (!this.db) await this.initializeDB()

    const transaction = this.db!.transaction(["quests"], "readwrite")
    const store = transaction.objectStore("quests")

    for (const quest of quests) {
      await store.put(quest)
    }
  }

  // Get cached quests for offline use
  async getCachedQuests(): Promise<any[]> {
    if (!this.db) await this.initializeDB()

    const transaction = this.db!.transaction(["quests"], "readonly")
    const store = transaction.objectStore("quests")

    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // Add data to pending sync queue
  private async addToPendingSync(type: string, data: any): Promise<void> {
    if (!this.db) return

    const syncData = {
      type,
      payload: data,
      timestamp: Date.now(),
    }

    const transaction = this.db.transaction(["pendingSync"], "readwrite")
    const store = transaction.objectStore("pendingSync")
    await store.add(syncData)
  }

  // Sync pending data when online
  private async syncPendingData(): Promise<void> {
    if (!this.db || !this.isOnline) return

    const transaction = this.db.transaction(["pendingSync"], "readonly")
    const store = transaction.objectStore("pendingSync")

    const request = store.getAll()
    request.onsuccess = async () => {
      const pendingItems = request.result

      for (const item of pendingItems) {
        try {
          // Attempt to sync each item
          await this.syncItem(item)

          // Remove from pending sync after successful sync
          const deleteTransaction = this.db!.transaction(["pendingSync"], "readwrite")
          const deleteStore = deleteTransaction.objectStore("pendingSync")
          await deleteStore.delete(item.id)
        } catch (error) {
          console.error("Failed to sync item:", error)
        }
      }
    }
  }

  private async syncItem(item: any): Promise<void> {
    const { type, payload } = item

    switch (type) {
      case "quest-progress":
        await fetch("/api/sync/quest-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        break
      // Add more sync types as needed
    }
  }

  private notifyOnlineStatus(isOnline: boolean): void {
    // Dispatch custom event for components to listen to
    window.dispatchEvent(
      new CustomEvent("onlineStatusChange", {
        detail: { isOnline },
      }),
    )
  }

  // Public method to check online status
  getOnlineStatus(): boolean {
    return this.isOnline
  }

  // Force sync when user manually requests it
  async forcSync(): Promise<void> {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "FORCE_SYNC" })
    }
    await this.syncPendingData()
  }
}

// Export singleton instance
export const offlineManager = new OfflineManager()
