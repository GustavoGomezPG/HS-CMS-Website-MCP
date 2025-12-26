# Tailwind CSS Setup with HubSpot

Integrate Tailwind CSS with HubSpot CMS for utility-first styling.

## Prerequisites

- Node.js and npm installed
- HubSpot CLI installed and configured
- A HubSpot theme to work with

## Basic Setup

### 1. Initialize npm

In your theme directory:

```bash
npm init -y
```

### 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 3. Create Tailwind Config

```bash
npx tailwindcss init
```

This creates `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './modules/**/*.{html,js}',
    './templates/**/*.{html,js}',
    './sections/**/*.html',
    './partials/**/*.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. Create PostCSS Config

Create `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

### 5. Create Input CSS

Create `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 6. Add Build Script

In `package.json`:

```json
{
  "scripts": {
    "build:css": "npx tailwindcss -i ./src/styles.css -o ./css/tailwind.css",
    "watch:css": "npx tailwindcss -i ./src/styles.css -o ./css/tailwind.css --watch"
  }
}
```

## Development Workflow

### Run Both Watchers

Terminal 1 - Tailwind:
```bash
npm run watch:css
```

Terminal 2 - HubSpot:
```bash
hs cms watch . theme-name
```

### Build for Production

```bash
npm run build:css
```

## Link Stylesheet in Templates

In your base template:

```html
<head>
  {{ standard_header_includes }}
  <link rel="stylesheet" href="{{ get_asset_url('css/tailwind.css') }}">
</head>
```

## Using Tailwind Classes

### In Templates

```html
<section class="py-16 bg-gray-100">
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold text-center text-gray-900">
      Welcome
    </h1>
  </div>
</section>
```

### In Modules

`module.html`:

```html
<div class="bg-white rounded-lg shadow-md overflow-hidden">
  <img src="{{ module.image.src }}"
       alt="{{ module.image.alt }}"
       class="w-full h-48 object-cover">
  <div class="p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-2">
      {{ module.title }}
    </h3>
    <p class="text-gray-600">
      {{ module.description }}
    </p>
    {% if module.button_url %}
      <a href="{{ module.button_url }}"
         class="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        {{ module.button_text }}
      </a>
    {% endif %}
  </div>
</div>
```

## Advanced Configuration

### Custom Colors

```javascript
// tailwind.config.js
module.exports = {
  content: ['./modules/**/*.html', './templates/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          500: '#10b981',
          600: '#059669',
        }
      }
    }
  }
}
```

### Custom Fonts

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      }
    }
  }
}
```

### Container Configuration

```javascript
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      }
    }
  }
}
```

## Production Optimization

### Minify Output

```json
{
  "scripts": {
    "build:css": "npx tailwindcss -i ./src/styles.css -o ./css/tailwind.css --minify"
  }
}
```

Tailwind automatically purges unused classes when `NODE_ENV=production`.

## Complete package.json Example

```json
{
  "name": "my-hubspot-theme",
  "version": "1.0.0",
  "scripts": {
    "build:css": "npx tailwindcss -i ./src/styles.css -o ./css/tailwind.css --minify",
    "watch:css": "npx tailwindcss -i ./src/styles.css -o ./css/tailwind.css --watch",
    "dev": "npm run watch:css",
    "deploy": "npm run build:css && hs cms upload . theme-name"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

## Benefits

1. **Rapid development**: Utility classes speed up styling
2. **Consistent design**: Predefined scale for spacing, colors, typography
3. **Small file size**: Unused styles automatically removed
4. **Responsive design**: Built-in responsive utilities
5. **No context switching**: Style directly in HTML
