import { MESSAGE_TYPES, type StateChangedMessage } from '@/types/messages'

// Listen for state change broadcasts from background script
chrome.runtime.onMessage.addListener((message: unknown) => {
  const typedMessage = message as { type: string }

  if (typedMessage.type === MESSAGE_TYPES.STATE_CHANGED) {
    const stateMessage = message as StateChangedMessage
    console.log('Feature state changed:', stateMessage.enabled)
    // Content script can react to state changes here
    // For example, enable/disable features on the page
  }
})