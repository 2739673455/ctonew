// Shared message types and constants for Chrome extension communication

export const MESSAGE_TYPES = {
  // Popup to background
  GET_STATE: 'GET_STATE',
  TOGGLE_STATE: 'TOGGLE_STATE',

  // Background to content scripts
  STATE_CHANGED: 'STATE_CHANGED',
} as const

export interface FeatureState {
  enabled: boolean
}

export interface GetStateRequest {
  type: typeof MESSAGE_TYPES.GET_STATE
}

export interface GetStateResponse {
  enabled: boolean
}

export interface ToggleStateRequest {
  type: typeof MESSAGE_TYPES.TOGGLE_STATE
}

export interface ToggleStateResponse {
  enabled: boolean
}

export interface StateChangedMessage {
  type: typeof MESSAGE_TYPES.STATE_CHANGED
  enabled: boolean
}

export type ChromeMessage = GetStateRequest | ToggleStateRequest | StateChangedMessage

export type ChromeResponse = GetStateResponse | ToggleStateResponse | undefined

export const STORAGE_KEY = 'featureState'
