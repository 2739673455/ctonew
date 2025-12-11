// Type declarations for Chrome extension
// This extends the global chrome namespace with custom types

declare namespace chrome.runtime {
  interface Message {
    type: string
    data?: any
    enabled?: boolean
  }
}

declare namespace chrome.storage {
  interface StorageArea {
    get(keys: string | string[] | Record<string, any>, callback: (result: Record<string, any>) => void): void
    set(items: Record<string, any>, callback?: () => void): void
  }

  const sync: StorageArea
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