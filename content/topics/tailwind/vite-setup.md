# Tailwind with Vite for HubSpot

Advanced setup using Vite for fast builds and hot module replacement.

## Benefits of Vite

- Lightning-fast hot module replacement (HMR)
- Instant server start
- Optimized production builds
- Native ES modules support
- Simple configuration

## Setup

### 1. Install Dependencies

```bash
npm install -D vite tailwindcss postcss autoprefixer
```

### 2. Project Structure

```
my-theme/
├── src/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── dist/
│   └── (compiled files)
├── modules/
├── templates/
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

### 3. Vite Configuration

`vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/js/main.js'),
        styles: resolve(__dirname, 'src/css/styles.css')
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    cssCodeSplit: true,
    minify: 'terser'
  },
  css: {
    postcss: './postcss.config.js'
  }
});
```

### 4. Tailwind Config

`tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './modules/**/*.html',
    './templates/**/*.html',
    './sections/**/*.html',
    './partials/**/*.html',
    './src/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
```

### 5. PostCSS Config

`postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

### 6. Input CSS

`src/css/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom component classes */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-colors;
  }

  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }

  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }

  .card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
  }

  .container {
    @apply mx-auto px-4 max-w-6xl;
  }
}
```

### 7. Entry JavaScript

`src/js/main.js`:

```javascript
// Import Tailwind styles
import '../css/styles.css';

// Your JavaScript code
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSliders();
});

function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

function initSliders() {
  // Slider initialization
}
```

### 8. Package.json Scripts

```json
{
  "name": "hubspot-tailwind-theme",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && hs cms upload ./dist my-theme",
    "watch": "concurrently \"npm run dev\" \"hs cms watch . my-theme\""
  },
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "concurrently": "^8.2.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "terser": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## Development Workflow

### Option 1: Separate Terminals

Terminal 1 - Vite:
```bash
npm run dev
```

Terminal 2 - HubSpot:
```bash
hs cms watch . theme-name
```

### Option 2: Concurrent Watch

Install concurrently:
```bash
npm install -D concurrently
```

Run both watchers:
```bash
npm run watch
```

## Production Build

```bash
npm run build
```

Generates optimized, minified files in `dist/`.

## Deploying

```bash
npm run deploy
```

Builds and uploads to HubSpot in one command.

## Including in Templates

```html
<head>
  {{ standard_header_includes }}
  <link rel="stylesheet" href="{{ get_asset_url('dist/css/styles.css') }}">
</head>
<body>
  <!-- Content -->

  <script type="module" src="{{ get_asset_url('dist/js/main.js') }}"></script>
  {{ standard_footer_includes }}
</body>
```

## Advanced Configuration

### Multiple Entry Points

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/js/main.js'),
        blog: resolve(__dirname, 'src/js/blog.js'),
        styles: resolve(__dirname, 'src/css/styles.css'),
        blogStyles: resolve(__dirname, 'src/css/blog.css')
      }
    }
  }
});
```

### Environment Variables

Create `.env` file:
```
VITE_API_URL=https://api.example.com
```

Access in JavaScript:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Alias Paths

```javascript
// vite.config.js
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/js/components')
    }
  }
});
```

Use in imports:
```javascript
import { Modal } from '@components/modal';
```

### Source Maps for Development

```javascript
// vite.config.js
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV !== 'production'
  }
});
```

## Complete package.json Example

```json
{
  "name": "hubspot-vite-tailwind-theme",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite build --watch",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && hs cms upload . my-theme",
    "watch": "concurrently -n \"vite,hs\" -c \"cyan,magenta\" \"npm run dev\" \"hs cms watch . my-theme\"",
    "upload": "hs cms upload . my-theme"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.0",
    "concurrently": "^8.2.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "terser": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

## Vite vs Other Build Tools

| Feature | Vite | Webpack |
|---------|------|---------|
| Dev Server Start | Instant | Slow |
| HMR Speed | ~50ms | ~500ms+ |
| Config Complexity | Simple | Complex |
| Build Speed | Fast | Moderate |
| ES Modules | Native | Bundled |
| Learning Curve | Low | High |

Vite is recommended for new HubSpot projects due to its speed and simplicity.
