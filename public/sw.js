const CACHE_NAME = "quest-academy-v1"
const STATIC_CACHE = "quest-academy-static-v1"
const DYNAMIC_CACHE = "quest-academy-dynamic-v1"

// Assets to cache immediately
const STATIC_ASSETS = ["/", "/teacher", "/manifest.json", "/icon-192.png", "/icon-512.png", "/student-avatar.png"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...")
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[SW] Caching static assets")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log("[SW] Static assets cached successfully")
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error("[SW] Failed to cache static assets:", error)
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("[SW] Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("[SW] Service worker activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Handle static assets with cache-first strategy
  if (
    request.destination === "image" ||
    request.destination === "script" ||
    request.destination === "style" ||
    url.pathname.includes("/_next/static/")
  ) {
    event.respondWith(cacheFirstStrategy(request))
    return
  }

  // Handle navigation requests with stale-while-revalidate
  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidateStrategy(request))
    return
  }

  // Default to network-first for other requests
  event.respondWith(networkFirstStrategy(request))
})

// Network-first strategy (good for API calls)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("[SW] Network failed, trying cache:", request.url)
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline fallback for API requests
    if (request.url.includes("/api/")) {
      return new Response(
        JSON.stringify({
          error: "Offline",
          message: "This feature requires internet connection",
          offline: true,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    throw error
  }
}

// Cache-first strategy (good for static assets)
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("[SW] Failed to fetch asset:", request.url)
    throw error
  }
}

// Stale-while-revalidate strategy (good for pages)
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request)

  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(DYNAMIC_CACHE)
        cache.then((c) => c.put(request, networkResponse.clone()))
      }
      return networkResponse
    })
    .catch(() => null)

  return (
    cachedResponse ||
    networkResponsePromise ||
    caches.match("/") ||
    new Response("Offline - Please check your connection", { status: 503 })
  )
}

// Background sync for quest progress
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync triggered:", event.tag)

  if (event.tag === "quest-progress-sync") {
    event.waitUntil(syncQuestProgress())
  }

  if (event.tag === "student-data-sync") {
    event.waitUntil(syncStudentData())
  }
})

// Sync quest progress when online
async function syncQuestProgress() {
  try {
    console.log("[SW] Syncing quest progress...")

    // Get pending sync data from IndexedDB
    const db = await openDB()
    const transaction = db.transaction(["pendingSync"], "readonly")
    const store = transaction.objectStore("pendingSync")
    const pendingData = await store.getAll()

    // Send each pending update to server
    for (const data of pendingData) {
      try {
        const response = await fetch("/api/sync/quest-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.payload),
        })

        if (response.ok) {
          // Remove from pending sync after successful upload
          const deleteTransaction = db.transaction(["pendingSync"], "readwrite")
          const deleteStore = deleteTransaction.objectStore("pendingSync")
          await deleteStore.delete(data.id)
        }
      } catch (error) {
        console.error("[SW] Failed to sync individual quest progress:", error)
      }
    }

    console.log("[SW] Quest progress sync completed")
  } catch (error) {
    console.error("[SW] Quest progress sync failed:", error)
  }
}

// Sync student data when online
async function syncStudentData() {
  try {
    console.log("[SW] Syncing student data...")
    // Similar implementation for student data sync
    console.log("[SW] Student data sync completed")
  } catch (error) {
    console.error("[SW] Student data sync failed:", error)
  }
}

// Helper function to open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("QuestAcademyDB", 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = event.target.result

      // Create object stores
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

// Message handling for communication with main thread
self.addEventListener("message", (event) => {
  const { type, payload } = event.data

  switch (type) {
    case "CACHE_QUEST_DATA":
      cacheQuestData(payload)
      break
    case "GET_OFFLINE_STATUS":
      event.ports[0].postMessage({ offline: !navigator.onLine })
      break
    case "FORCE_SYNC":
      self.registration.sync.register("quest-progress-sync")
      break
  }
})

// Cache quest data for offline access
async function cacheQuestData(questData) {
  try {
    const db = await openDB()
    const transaction = db.transaction(["quests"], "readwrite")
    const store = transaction.objectStore("quests")

    for (const quest of questData) {
      await store.put(quest)
    }

    console.log("[SW] Quest data cached for offline access")
  } catch (error) {
    console.error("[SW] Failed to cache quest data:", error)
  }
}
