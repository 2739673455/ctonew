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

## Customization

Edit the following files to customize your extension:

- `manifest.json`: Extension configuration
- `src/background/index.ts`: Background script
- `src/content/index.ts`: Content script
- `src/popup/main.tsx`: Popup UI
- `public/icons/*`: Extension icons
