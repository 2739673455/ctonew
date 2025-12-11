// Type declarations for Chrome extension
// This extends the global chrome namespace with custom types

declare namespace chrome.runtime {
  interface Message {
    type: string
    data?: any
  }
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}