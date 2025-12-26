# HubSpot Modules Overview

Modules are reusable components that can be added to templates and pages. They're the building blocks of HubSpot websites.

## What is a Module?

A module consists of:
1. **User Interface** - Fields that content creators see when editing
2. **HTML+HubL Template** - Defines the rendered output
3. **CSS** - Module-specific styling
4. **JavaScript** - Module-specific functionality

## Module vs Module Instance

- **Module**: The reusable definition/template
- **Module Instance**: A specific use of a module on a page with its own field values

## Module Structure

Every module is a folder with the `.module` extension:

```
my-module.module/
├── module.html      # Required: HubL template
├── module.css       # Optional: Scoped styles
├── module.js        # Optional: JavaScript
├── meta.json        # Required: Module configuration
└── fields.json      # Required: Field definitions
```

## Creating a Module

### Using CLI

```bash
hs cms create module my-module ./modules
```

### Module Files

#### module.html

```html
<div class="hero-module">
  <h1>{{ module.heading }}</h1>
  <p>{{ module.subheading }}</p>

  {% if module.button_text and module.button_url %}
    <a href="{{ module.button_url }}" class="btn">
      {{ module.button_text }}
    </a>
  {% endif %}

  {% if module.background_image.src %}
    <style>
      .hero-module {
        background-image: url('{{ module.background_image.src }}');
      }
    </style>
  {% endif %}
</div>
```

#### meta.json

```json
{
  "label": "Hero Banner",
  "icon": "https://example.com/icon.svg",
  "global": false,
  "is_available_for_new_content": true,
  "categories": ["design", "body_content"],
  "content_types": ["SITE_PAGE", "LANDING_PAGE", "BLOG_POST"],
  "css_assets": [],
  "js_assets": [],
  "inline_help_text": "Add a hero section to your page"
}
```

#### fields.json

```json
[
  {
    "name": "heading",
    "label": "Heading",
    "type": "text",
    "required": true,
    "default": "Welcome"
  },
  {
    "name": "subheading",
    "label": "Subheading",
    "type": "text",
    "default": ""
  },
  {
    "name": "button_text",
    "label": "Button Text",
    "type": "text",
    "default": "Learn More"
  },
  {
    "name": "button_url",
    "label": "Button URL",
    "type": "link",
    "default": {
      "url": {
        "href": ""
      }
    }
  },
  {
    "name": "background_image",
    "label": "Background Image",
    "type": "image",
    "default": {
      "src": "",
      "alt": ""
    }
  }
]
```

## Using Modules in Templates

### Module Tag

```html
{% module "hero"
  path="./modules/hero-module.module",
  heading="Custom Heading",
  subheading="Custom subheading text"
%}
```

### Module Block (for complex content)

```html
{% module_block module "content-block"
  path="./modules/content-block.module"
%}
  {% module_attribute "rich_content" %}
    <h2>Custom HTML Content</h2>
    <p>This goes into the rich_content field</p>
  {% end_module_attribute %}
{% end_module_block %}
```

### DnD Module (in drag-and-drop areas)

```html
{% dnd_module path="./modules/hero-module.module" %}
{% end_dnd_module %}
```

## Accessing Module Data

All module field values are available via the `module` variable:

```html
{{ module.heading }}
{{ module.background_image.src }}
{{ module.items[0].title }}
```

## Key Limitations

1. **Modules cannot be nested** - Use sections in drag-and-drop areas instead
2. **Module CSS is scoped** - Styles in module.css only apply to that module
3. **No module inheritance** - Each module is standalone

## Module Best Practices

1. **Build for accessibility** - Use semantic HTML and ARIA attributes
2. **Use fields for all text** - Don't hardcode content
3. **Design for localization** - Fields can be translated
4. **Provide sensible defaults** - Make modules usable out of the box
5. **Keep modules focused** - Each module should do one thing well
