# Chrome Extension with Vite and React

This is a Chrome extension project built with Vite, React, and TypeScript.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

Run the development server:

```bash
npm run dev
```

This will start Vite in development mode with hot reloading.

### Building

To build the extension for production:

```bash
npm run build
```

This will create a `dist` folder with all the compiled assets ready for Chrome.

### Watch mode

For continuous building during development:

```bash
npm run watch
```

## Loading the Extension in Chrome

1. Build the extension: `npm run build`
2. Open Chrome and go to `chrome://extensions`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the `dist` folder

## Project Structure

```
src/
├── background/      # Background script
├── content/         # Content scripts
├── popup/           # Popup UI (React)
├── styles/          # Global styles
└── types/           # TypeScript types

public/
├── icons/           # Extension icons (16x16, 48x48, 128x128)
└── manifest.json    # Chrome extension manifest
```

## Features

- **Vite** for fast development and building
- **React 19** for UI components
- **TypeScript** for type safety
- **Chrome Extension Manifest V3**
- Multi-entry build (background, content, popup)

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run watch`: Watch for changes and rebuild
- `npm run lint`: Run ESLint

## Permissions

The extension uses the following permissions in Manifest V3:

- **storage**: Allows the extension to use the `chrome.storage` API for persistent data storage
- **tabs**: Required to interact with browser tabs, including accessing tab information and querying active tabs
- **scripting**: Allows dynamic script execution on web pages, enabling content script injection capabilities
- **host_permissions**: Specifies domains where the content script runs (currently configured for Google, Bing, Yahoo, Baidu, and DuckDuckGo)

These permissions are declared in `manifest.json` and are necessary for the extension to function across search engines and new tab pages.

## Customization

Edit the following files to customize your extension:

- `manifest.json`: Extension configuration (permissions, scripts, icons)
- `src/background/index.ts`: Background script
- `src/content/index.ts`: Content script
- `src/popup/main.tsx`: Popup UI
- `public/icons/*`: Extension icons
