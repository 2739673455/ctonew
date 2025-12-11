import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'
import { MessageType, STORAGE_KEY } from '@/shared/messages'

const Popup = () => {
  const [enabled, setEnabled] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load initial state
    chrome.storage.sync.get([STORAGE_KEY], (result) => {
      setEnabled(result[STORAGE_KEY] ?? true)
      setLoading(false)
    })
  }, [])

  const handleToggle = () => {
    setLoading(true)
    chrome.runtime.sendMessage(
      { type: MessageType.POPUP_TOGGLE },
      (response: { enabled: boolean }) => {
        setEnabled(response.enabled)
        setLoading(false)
      }
    )
  }

  return (
    <div className="popup-container">
      <h1>Omnibox Suggestions Hide</h1>
      <div style={{ marginBottom: '16px' }}>
        <p>
          {enabled
            ? '✓ Omnibox suggestions are hidden'
            : '✗ Omnibox suggestions are visible'}
        </p>
      </div>
      <button
        onClick={handleToggle}
        disabled={loading}
        style={{
          padding: '8px 16px',
          fontSize: '14px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Updating...' : enabled ? 'Disable' : 'Enable'}
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