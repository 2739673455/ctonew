// Content script for Chrome extension
// This runs in the context of web pages

console.log('Content script loaded')

// Example: Inject some functionality into the page
const style = document.createElement('style')
style.textContent = `
  .chrome-extension-highlight {
    background-color: yellow !important;
  }
`
document.head.appendChild(style)

// Example: Send message to background script
chrome.runtime.sendMessage({ type: 'content_loaded' }, (response) => {
  console.log('Response from background:', response)
})