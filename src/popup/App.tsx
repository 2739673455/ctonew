import React, { useEffect, useState } from 'react'

const App: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Request current state from background on mount
    chrome.runtime.sendMessage(
      { type: 'GET_PROTECTION_STATE' },
      (response) => {
        if (chrome.runtime.lastError) {
          setError('Failed to load protection state')
          setIsLoading(false)
          return
        }

        if (response?.success && response.state) {
          setIsEnabled(response.state.enabled)
        } else {
          setError('Failed to load protection state')
        }
        setIsLoading(false)
      }
    )
  }, [])

  const handleToggle = async () => {
    const newState = !isEnabled
    
    // Optimistically update UI
    setIsEnabled(newState)
    setError('')

    // Send message to background worker
    chrome.runtime.sendMessage(
      { type: 'SET_PROTECTION_STATE', enabled: newState },
      (response) => {
        if (chrome.runtime.lastError || !response?.success) {
          // Revert on error
          setIsEnabled(!newState)
          setError(
            response?.error || 
            chrome.runtime.lastError?.message || 
            'Failed to update protection state'
          )
        }
      }
    )
  }

  if (isLoading) {
    return (
      <div className="popup-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="popup-container">
      <div className="header">
        <h1>Content Protection</h1>
        <div className={`status-badge ${isEnabled ? 'active' : 'inactive'}`}>
          {isEnabled ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="content">
        <p className="description">
          {isEnabled
            ? 'Your content is currently protected. Sensitive elements are hidden from view.'
            : 'Content protection is disabled. Enable it to hide sensitive elements on web pages.'}
        </p>

        <button
          className={`toggle-button ${isEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleToggle}
          aria-label={isEnabled ? 'Disable protection' : 'Enable protection'}
        >
          <span className="toggle-slider">
            <span className="toggle-knob"></span>
          </span>
          <span className="toggle-label">
            {isEnabled ? 'Disable' : 'Enable'} Protection
          </span>
        </button>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
      </div>

      <div className="footer">
        <p className="hint">
          Click the button above to toggle content protection
        </p>
      </div>
    </div>
  )
}

export default App
