// Background script for Chrome extension
// This runs in the background and handles extension events

import { MessageType, STORAGE_KEY } from '@/shared/messages'
import type { ExtensionMessage, StateUpdateMessage } from '@/shared/messages'

console.log('Background script loaded')

// Initialize storage on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    if (!(STORAGE_KEY in result)) {
      chrome.storage.sync.set({ [STORAGE_KEY]: true })
    }
  })
})

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(
  (request: ExtensionMessage, sender, sendResponse) => {
    console.log('Message received in background:', request)

    if (request.type === MessageType.POPUP_TOGGLE) {
      // Get current state and toggle it
      chrome.storage.sync.get([STORAGE_KEY], (result) => {
        const currentState = result[STORAGE_KEY] ?? true
        const newState = !currentState

        // Update storage
        chrome.storage.sync.set({ [STORAGE_KEY]: newState }, () => {
          // Broadcast the update to all tabs
          broadcastStateUpdate(newState)
          sendResponse({ enabled: newState })
        })
      })
      return true // Indicate we'll send response asynchronously
    } else if (request.type === MessageType.GET_STATE) {
      chrome.storage.sync.get([STORAGE_KEY], (result) => {
        const enabled = result[STORAGE_KEY] ?? true
        sendResponse({ enabled })
      })
      return true
    }
  }
)

// Broadcast state update to all tabs
function broadcastStateUpdate(enabled: boolean) {
  const message: StateUpdateMessage = {
    type: MessageType.STATE_UPDATE,
    enabled,
  }

  // Send to all tabs
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, message).catch(() => {
          // Ignore errors for tabs that don't have content script
        })
      }
    })
  })
}