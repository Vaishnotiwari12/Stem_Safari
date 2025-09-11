"use client"

import { useState, useEffect } from "react"
import { offlineManager } from "@/lib/offline-manager"

export function useOffline() {
  const [isOnline, setIsOnline] = useState(true)
  const [hasPendingSync, setHasPendingSync] = useState(false)

  useEffect(() => {
    // Initialize online status
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    const handleOnlineStatusChange = (event: CustomEvent) => {
      setIsOnline(event.detail.isOnline)
    }

    window.addEventListener("onlineStatusChange", handleOnlineStatusChange as EventListener)

    // Native browser events as fallback
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("onlineStatusChange", handleOnlineStatusChange as EventListener)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const saveQuestProgress = async (questId: string, progress: number, xpEarned: number) => {
    await offlineManager.saveQuestProgress(questId, progress, xpEarned)
    if (!isOnline) {
      setHasPendingSync(true)
    }
  }

  const getQuestProgress = async (questId: string) => {
    return await offlineManager.getQuestProgress(questId)
  }

  const getCachedQuests = async () => {
    return await offlineManager.getCachedQuests()
  }

  const forceSync = async () => {
    await offlineManager.forcSync()
    setHasPendingSync(false)
  }

  return {
    isOnline,
    hasPendingSync,
    saveQuestProgress,
    getQuestProgress,
    getCachedQuests,
    forceSync,
  }
}
