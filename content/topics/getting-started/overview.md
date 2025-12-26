# HubSpot CMS Overview

HubSpot CMS is a content management system that allows developers to build websites using a combination of HTML, CSS, JavaScript, and HubL (HubSpot's templating language).

## Core Concepts

### Building Blocks

HubSpot CMS websites are built using these key components:

1. **Themes** - Portable, self-contained collections of developer assets
2. **Templates** - Define page/email layouts and reference stylesheets/scripts
3. **Modules** - Reusable components that can be added to templates and pages
4. **Sections** - Pre-configured drag-and-drop layout blocks
5. **Partials** - Reusable template fragments included in other templates
6. **Global Content** - Site-wide reusable elements (headers, footers)

### HubL Templating

HubL (HubSpot Templating Language) is built on Jinjava and provides:
- Template variables and expressions
- Control structures (loops, conditionals)
- Filters for data transformation
- Functions for dynamic content
- Macros for reusable code blocks

## File Structure

A typical HubSpot theme structure:

```
my-theme/
├── theme.json          # Theme configuration (required)
├── fields.json         # Theme-level fields (required)
├── templates/          # Page templates
│   ├── home.html
│   ├── about.html
│   └── blog-post.html
├── modules/            # Custom modules
│   └── my-module.module/
│       ├── module.html
│       ├── module.css
│       ├── module.js
│       ├── meta.json
│       └── fields.json
├── sections/           # Section templates
├── css/                # Stylesheets
├── js/                 # JavaScript files
├── images/             # Image assets
└── partials/           # Reusable template partials
```

## Development Approaches

### Local Development (Recommended)
- Use HubSpot CLI for file management
- Edit files locally with your preferred IDE
- Use `hs watch` for automatic uploads
- Version control with Git

### Design Manager
- Browser-based development interface
- Built-in module and template editors
- Good for quick edits and prototyping

## Key Features

- **Drag-and-Drop Editing**: Content creators can modify page layouts
- **Theme Fields**: Global styling options editable without code
- **CRM Integration**: Access contact and company data in templates
- **Responsive Grid**: Built-in 12-column responsive system
- **SEO Tools**: Built-in optimization features

## Performance

The HubSpot CMS Boilerplate achieves:
- 98 Google Lighthouse desktop performance score
- 100 SEO score
- 100 accessibility score
