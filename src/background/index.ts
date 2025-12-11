import {
  MESSAGE_TYPES,
  STORAGE_KEY,
  type FeatureState,
  type StateChangedMessage,
  type ChromeMessage,
  type ChromeResponse,
} from '@/types/messages'

// Initialize storage on extension install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    if (!(STORAGE_KEY in result)) {
      const initialState: FeatureState = { enabled: true }
      chrome.storage.sync.set({ [STORAGE_KEY]: initialState })
    }
  })
})

// Handle messages from popup and content scripts
chrome.runtime.onMessage.addListener(
  (
    message: ChromeMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: ChromeResponse) => void
  ) => {
    if (message.type === MESSAGE_TYPES.GET_STATE) {
      handleGetState(sendResponse)
      return true
    }

    if (message.type === MESSAGE_TYPES.TOGGLE_STATE) {
      handleToggleState(sendResponse)
      return true
    }
  }
)

// Subscribe to storage changes for multi-window synchronization
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && STORAGE_KEY in changes) {
    const newState = changes[STORAGE_KEY].newValue as FeatureState
    broadcastStateChange(newState.enabled)
  }
})

function handleGetState(sendResponse: (response?: ChromeResponse) => void) {
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    const state = result[STORAGE_KEY] as FeatureState | undefined
    const enabled = state?.enabled ?? true
    sendResponse({ enabled })
  })
}

function handleToggleState(sendResponse: (response?: ChromeResponse) => void) {
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    const currentState = result[STORAGE_KEY] as FeatureState | undefined
    const currentEnabled = currentState?.enabled ?? true
    const newEnabled = !currentEnabled

    const newState: FeatureState = { enabled: newEnabled }
    chrome.storage.sync.set({ [STORAGE_KEY]: newState }, () => {
      sendResponse({ enabled: newEnabled })
    })
  })
}

function broadcastStateChange(enabled: boolean) {
  const message: StateChangedMessage = {
    type: MESSAGE_TYPES.STATE_CHANGED,
    enabled,
  }

  // Query all tabs that match the host permissions
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id !== undefined) {
        chrome.tabs.sendMessage(tab.id, message).catch(() => {
          // Silently ignore errors for tabs that don't have content script loaded
        })
      }
    })
  })
}