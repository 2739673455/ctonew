import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'

const Popup = () => {
  return (
    <div className="popup-container">
      <h1>Chrome Extension</h1>
      <p>Welcome to your Chrome extension!</p>
      <button onClick={() => {
        chrome.runtime.sendMessage({ type: 'popup_button_click' })
      }}>
        Click Me
      </button>
    </div>
  )
}

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  )
}