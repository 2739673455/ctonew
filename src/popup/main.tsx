import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { MESSAGE_TYPES, type GetStateResponse, type ToggleStateResponse } from '@/types/messages'
import './popup.css'

const Popup = () => {
  const [enabled, setEnabled] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Fetch initial state
    chrome.runtime.sendMessage({ type: MESSAGE_TYPES.GET_STATE }, (response: GetStateResponse) => {
      setEnabled(response.enabled)
      setLoading(false)
    })
  }, [])

  const handleToggle = () => {
    setLoading(true)
    chrome.runtime.sendMessage({ type: MESSAGE_TYPES.TOGGLE_STATE }, (response: ToggleStateResponse) => {
      setEnabled(response.enabled)
      setLoading(false)
    })
  }

  return (
    <div className="popup-container">
      <h1>Chrome Extension</h1>
      <p>Feature Status: {loading ? 'Loading...' : enabled ? 'Enabled' : 'Disabled'}</p>
      <button onClick={handleToggle} disabled={loading}>
        {loading ? 'Updating...' : 'Toggle Feature'}
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