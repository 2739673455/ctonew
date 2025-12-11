// Content script for Chrome extension
// This runs in the context of web pages and controls visibility of omnibox/search suggestions

import { MessageType, STORAGE_KEY } from '@/shared/messages'
import type { StateUpdateMessage } from '@/shared/messages'

const INJECTED_STYLE_ID = 'omnibox-hiding-style'

// CSS that hides known suggestion containers
const HIDE_STYLES = `
  /* Hide omnibox/search suggestion containers */
  [role="listbox"],
  [role="option"],
  .Omnibox,
  #suggestions-list,
  .suggestions-list,
  [data-testid*="suggestion"],
  [class*="suggestion"],
  .autocomplete,
  .autocomplete-list,
  [class*="omnibox"],
  .goog-menu,
  .goog-menuseparator,
  .goog-menuitem,
  [class*="history"],
  [class*="recent"],
  div[data-view-id*="suggestion"],
  div[data-view-id*="history"] {
    display: none !important;
    visibility: hidden !important;
  }

  /* Specific selectors for common search/omnibox UIs */
  .searchbox ~ [role="listbox"],
  input[role="combobox"] ~ [role="listbox"],
  [jsaction*="suggestions"] {
    display: none !important;
    visibility: hidden !important;
  }
`

let styleElement: HTMLStyleElement | null = null
let mutationObserver: MutationObserver | null = null
let isEnabled = true

console.log('Content script loaded')

// Initialize the hiding logic based on stored enabled state
function initializeHiding() {
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    isEnabled = result[STORAGE_KEY] ?? true
    if (isEnabled) {
      applyHidingStyles()
    } else {
      removeHidingStyles()
    }
  })
}

// Apply hiding styles to the page
function applyHidingStyles() {
  if (styleElement) {
    return // Already applied
  }

  styleElement = document.createElement('style')
  styleElement.id = INJECTED_STYLE_ID
  styleElement.textContent = HIDE_STYLES
  document.documentElement.appendChild(styleElement)

  // Set up mutation observer to reapply styles when DOM regenerates
  if (mutationObserver) {
    mutationObserver.disconnect()
  }

  mutationObserver = new MutationObserver(() => {
    // Check if style element was removed
    if (!document.getElementById(INJECTED_STYLE_ID)) {
      console.log('Style element was removed, reapplying...')
      applyHidingStyles()
    }
  })

  mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })

  console.log('Hiding styles applied')
}

// Remove hiding styles from the page
function removeHidingStyles() {
  if (styleElement) {
    styleElement.remove()
    styleElement = null
    console.log('Hiding styles removed')
  }

  if (mutationObserver) {
    mutationObserver.disconnect()
    mutationObserver = null
  }
}

// Handle messages from background script
chrome.runtime.onMessage.addListener(
  (message: StateUpdateMessage, sender, sendResponse) => {
    if (message.type === MessageType.STATE_UPDATE) {
      isEnabled = message.enabled
      console.log('Received state update:', { enabled: isEnabled })

      if (isEnabled) {
        applyHidingStyles()
      } else {
        removeHidingStyles()
      }

      sendResponse({ success: true })
    }
  }
)

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeHiding)
} else {
  initializeHiding()
}

// Cleanup on page unload
window.addEventListener('unload', () => {
  if (mutationObserver) {
    mutationObserver.disconnect()
  }
})