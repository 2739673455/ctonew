// Shared message types and interfaces for chrome extension communication

export enum MessageType {
  STATE_UPDATE = 'STATE_UPDATE',
  GET_STATE = 'GET_STATE',
  POPUP_TOGGLE = 'POPUP_TOGGLE',
}

export interface StateUpdateMessage {
  type: MessageType.STATE_UPDATE
  enabled: boolean
}

export interface GetStateMessage {
  type: MessageType.GET_STATE
}

export interface PopupToggleMessage {
  type: MessageType.POPUP_TOGGLE
}

export type ExtensionMessage = StateUpdateMessage | GetStateMessage | PopupToggleMessage

export const STORAGE_KEY = 'omnibox-hiding-enabled'
