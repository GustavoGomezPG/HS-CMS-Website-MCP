# HubSpot Themes Overview

A theme is a portable, self-contained collection of developer assets for building websites.

## What is a Theme?

Themes provide:
- Templates for different page types
- Modules for content building blocks
- Stylesheets and JavaScript
- Theme-level styling controls
- Consistent design across pages

## Theme Structure

```
my-theme/
├── theme.json          # Required: Theme configuration
├── fields.json         # Required: Theme-level fields
├── templates/
│   ├── layouts/
│   │   └── base.html
│   ├── home.html
│   ├── about.html
│   └── blog-post.html
├── modules/
│   ├── hero.module/
│   └── feature-card.module/
├── sections/
│   ├── hero-section.html
│   └── cta-section.html
├── css/
│   ├── main.css
│   └── components/
├── js/
│   └── main.js
├── images/
│   ├── logo.svg
│   └── template-previews/
└── partials/
    ├── header.html
    └── footer.html
```

## theme.json

Required configuration file:

```json
{
  "label": "My Company Theme",
  "preview_path": "./templates/home.html",
  "screenshot_path": "./images/theme-preview.png",
  "enable_domain_stylesheets": false,
  "version": "1.0.0",
  "author": {
    "name": "Developer Name",
    "email": "dev@example.com",
    "url": "https://example.com"
  },
  "documentation_url": "https://example.com/docs",
  "license": "MIT",
  "is_available_for_new_content": true
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | String | Theme display name |
| `preview_path` | String | Default template for preview |
| `screenshot_path` | String | Theme preview image |
| `enable_domain_stylesheets` | Boolean | Include domain stylesheets |
| `version` | String | Version number (dot notation) |
| `author` | Object | Developer information |
| `documentation_url` | String | Link to theme docs |
| `license` | String | SPDX identifier or file path |
| `is_available_for_new_content` | Boolean | Show in page creation |

## fields.json (Theme Fields)

Define global styling options:

```json
[
  {
    "name": "colors",
    "label": "Colors",
    "type": "group",
    "children": [
      {
        "name": "primary",
        "label": "Primary Color",
        "type": "color",
        "default": {
          "color": "#3B82F6",
          "opacity": 100
        }
      },
      {
        "name": "secondary",
        "label": "Secondary Color",
        "type": "color",
        "default": {
          "color": "#10B981",
          "opacity": 100
        }
      }
    ]
  },
  {
    "name": "typography",
    "label": "Typography",
    "type": "group",
    "children": [
      {
        "name": "body_font",
        "label": "Body Font",
        "type": "font",
        "default": {
          "font": "Inter",
          "size": 16,
          "size_unit": "px"
        }
      }
    ]
  }
]
```

## Using Theme Fields

Access theme field values in CSS:

```css
body {
  font-family: {{ theme.typography.body_font.font }};
  font-size: {{ theme.typography.body_font.size }}{{ theme.typography.body_font.size_unit }};
  color: {{ theme.colors.text.color }};
}

h1, h2, h3 {
  font-family: {{ theme.typography.heading_font.font }};
  color: {{ theme.colors.primary.color }};
}

.btn-primary {
  background-color: {{ theme.colors.primary.color }};
}
```

## Theme Editor

Content creators can modify theme fields through the Theme Editor:
- Colors and fonts
- Spacing values
- Images and logos
- Layout options

## Theme Test Mode

Test theme changes without affecting live site:

### Enable Test Mode

1. Design Manager: Select theme → Click **Preview**
2. URL: Add `?testmode=true` to address bar

In test mode:
- Publishing is blocked
- Changes don't affect live pages
- Can copy settings JSON for local development

## Hiding Default Modules

In `theme.json`:

```json
{
  "label": "My Theme",
  "hide_all_default_modules": true
}
```

Or hide specific modules:

```json
{
  "hidden_modules": [
    "@hubspot/button",
    "@hubspot/form"
  ]
}
```

## Theme Modules

Modules within a theme are emphasized in the content editor:
- Appear prominently in module selector
- Designed for use within that theme's templates

## Creating a Theme

### Using CLI

```bash
hs cms create website-theme my-theme
```

This creates a complete theme based on the HubSpot boilerplate.

### From Scratch

1. Create theme directory
2. Add `theme.json` and `fields.json`
3. Create templates, modules, and assets
4. Upload with `hs cms upload`

## Best Practices

1. **Use theme fields for styling**: Let content creators customize without code
2. **Organize assets logically**: Group related files together
3. **Include documentation**: Help content creators use the theme
4. **Test responsiveness**: Ensure theme works on all devices
5. **Optimize performance**: Minimize CSS/JS, optimize images
6. **Version your theme**: Track changes with version numbers
