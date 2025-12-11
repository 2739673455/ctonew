// Background script for Chrome extension
// This runs in the background and handles extension events

console.log('Background script loaded')

// Example: Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background:', request)
  // Handle messages here
  sendResponse({ status: 'success' })
})

// Example: Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed')
})