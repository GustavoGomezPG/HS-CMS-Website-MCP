# HubSpot CMS File Structure

Understanding the file structure is essential for HubSpot CMS development.

## Theme Directory Structure

```
theme-name/
├── theme.json              # Required: Theme metadata and configuration
├── fields.json             # Required: Theme-level field definitions
├── templates/
│   ├── layouts/
│   │   └── base.html       # Base template for inheritance
│   ├── home.html           # Home page template
│   ├── page.html           # Generic page template
│   ├── blog-listing.html   # Blog listing template
│   └── blog-post.html      # Blog post template
├── modules/
│   └── module-name.module/
│       ├── module.html     # Module HubL/HTML template
│       ├── module.css      # Module-specific styles
│       ├── module.js       # Module-specific JavaScript
│       ├── meta.json       # Module configuration
│       └── fields.json     # Module field definitions
├── sections/
│   └── banner.html         # Section template files
├── css/
│   ├── main.css           # Main stylesheet
│   └── components/
│       ├── _header.css
│       ├── _footer.css
│       └── _buttons.css
├── js/
│   └── main.js            # Main JavaScript file
├── images/
│   ├── logo.svg
│   └── icons/
├── partials/
│   ├── header.html        # Header partial
│   └── footer.html        # Footer partial
└── macros/
    └── helpers.html       # Reusable HubL macros
```

## Module File Structure

Each module is a folder with the `.module` extension:

```
my-module.module/
├── module.html      # Required: HubL template
├── module.css       # Optional: Scoped styles
├── module.js        # Optional: JavaScript
├── meta.json        # Required: Module configuration
└── fields.json      # Required: Field definitions
```

### module.html
The main template file containing HubL and HTML:

```html
<div class="my-module">
  <h2>{{ module.title }}</h2>
  <p>{{ module.description }}</p>
  {% if module.show_button %}
    <a href="{{ module.button_link }}" class="btn">
      {{ module.button_text }}
    </a>
  {% endif %}
</div>
```

### meta.json
Module configuration:

```json
{
  "label": "My Module",
  "css_assets": [],
  "js_assets": [],
  "global": false,
  "is_available_for_new_content": true
}
```

### fields.json
Field definitions as an array:

```json
[
  {
    "name": "title",
    "label": "Title",
    "type": "text",
    "required": true,
    "default": "Default Title"
  }
]
```

## Section File Structure

Section templates are single HTML files:

```html
<!--
  templateType: section
  label: Hero Banner
  description: A full-width hero section
  screenshotPath: ../images/section-previews/hero.png
-->
{% dnd_section %}
  {% dnd_row %}
    {% dnd_module path="@hubspot/rich_text" %}
    {% end_dnd_module %}
  {% end_dnd_row %}
{% end_dnd_section %}
```

## Required Files

### theme.json (Required)

```json
{
  "label": "My Theme",
  "preview_path": "./templates/home.html",
  "screenshot_path": "./images/template-previews/home.png",
  "enable_domain_stylesheets": false,
  "version": "1.0.0"
}
```

### fields.json at Theme Root (Required)

```json
[
  {
    "name": "primary_color",
    "label": "Primary Color",
    "type": "color",
    "default": {
      "color": "#007bff"
    }
  }
]
```

## File Naming Conventions

- Use lowercase with hyphens: `my-module-name.module`
- Templates: `page-name.html`
- Stylesheets: `component-name.css` or `_partial-name.css`
- JavaScript: `feature-name.js`
- Images: descriptive names like `hero-background.jpg`
