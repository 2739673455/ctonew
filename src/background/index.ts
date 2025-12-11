// Background script for Chrome extension
// This runs in the background and handles extension events

console.log('Background script loaded')

interface ProtectionState {
  enabled: boolean
}

const STORAGE_KEY = 'protectionState'

// Initialize default state on installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    if (result[STORAGE_KEY] === undefined) {
      const defaultState: ProtectionState = { enabled: false }
      chrome.storage.sync.set({ [STORAGE_KEY]: defaultState })
    }
  })
})

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background:', request)
  
  if (request.type === 'GET_PROTECTION_STATE') {
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      const state: ProtectionState = result[STORAGE_KEY] || { enabled: false }
      sendResponse({ success: true, state })
    })
    return true // Keep the message channel open for async response
  }
  
  if (request.type === 'SET_PROTECTION_STATE') {
    const newState: ProtectionState = { enabled: request.enabled }
    chrome.storage.sync.set({ [STORAGE_KEY]: newState }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message })
      } else {
        sendResponse({ success: true, state: newState })
        // Notify content scripts about the state change
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            if (tab.id) {
              chrome.tabs.sendMessage(tab.id, {
                type: 'PROTECTION_STATE_CHANGED',
                enabled: newState.enabled
              }).catch(() => {
                // Ignore errors for tabs that don't have our content script
              })
            }
          })
        })
      }
    })
    return true // Keep the message channel open for async response
  }
  
  sendResponse({ success: false, error: 'Unknown message type' })
  return false
})