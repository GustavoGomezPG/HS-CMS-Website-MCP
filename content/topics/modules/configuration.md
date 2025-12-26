# Module Configuration (meta.json)

The `meta.json` file configures module behavior, appearance, and availability.

## Complete meta.json Structure

```json
{
  "label": "My Module",
  "icon": "",
  "global": false,
  "is_available_for_new_content": true,
  "categories": [],
  "content_types": [],
  "content_tags": [],
  "css_assets": [],
  "css_render_options": {},
  "js_assets": [],
  "js_render_options": {},
  "inline_help_text": "",
  "module_id": null
}
```

## Properties Reference

### Display Properties

#### label (required)

Display name shown in the editor:

```json
{
  "label": "Hero Banner"
}
```

#### icon

URL to an SVG icon (max 10kb, single color recommended):

```json
{
  "icon": "https://example.com/icons/hero.svg"
}
```

Add icons via Design Manager or meta.json. Multi-color icons are converted to single color.

#### inline_help_text

Help text shown in blue info box (max 400 characters):

```json
{
  "inline_help_text": "Add a full-width hero section with background image and CTA button."
}
```

### Availability Properties

#### is_available_for_new_content

Controls visibility in the editor:

```json
{
  "is_available_for_new_content": true
}
```

Set to `false` to hide the module while keeping existing instances working.

#### content_types

Where the module can be used:

```json
{
  "content_types": ["SITE_PAGE", "LANDING_PAGE", "BLOG_POST"]
}
```

Available types:
- `SITE_PAGE` - Website pages
- `LANDING_PAGE` - Landing pages
- `BLOG_POST` - Blog posts
- `BLOG_LISTING` - Blog listing pages
- `EMAIL` - Marketing emails
- `KNOWLEDGE_ARTICLE` - Knowledge base articles
- `QUOTE_TEMPLATE` - Quote templates

#### global

Makes module content shared across all instances:

```json
{
  "global": true
}
```

When `true`, editing one instance updates all instances site-wide.

### Organization Properties

#### categories

Pre-defined categories (max 3):

```json
{
  "categories": ["design", "body_content", "media"]
}
```

Available categories:
- `blog`
- `body_content`
- `commerce`
- `design`
- `functionality`
- `forms_and_buttons`
- `media`
- `social`
- `text`

#### content_tags

User-defined tags for Design Manager organization:

```json
{
  "content_tags": [
    {"name": "BANNER", "source": "CONTENT_TYPE"},
    {"name": "NAVIGATION", "source": "FUNCTION"}
  ]
}
```

Content type tags: `ACCORDION`, `BLOG`, `BUTTON`, `CTA`, `FORM`, `HEADER`, `FOOTER`, `GALLERY`, `HERO`, `IMAGE`, `LOGO`, `MENU`, `PRICING`, `SEARCH`, `SLIDER`, `SOCIAL`, `TESTIMONIAL`, `VIDEO`

Function tags: `ANIMATION`, `BANNER`, `CARD`, `CONTACT`, `LAYOUT`, `MODAL`, `NAVIGATION`, `POPUP`, `TABS`

### Asset Dependencies

#### css_assets

CSS files to load with the module:

```json
{
  "css_assets": [
    {"path": "../css/components/hero.css"},
    {"path": "../css/utilities.css"}
  ]
}
```

#### css_render_options

Control CSS rendering:

```json
{
  "css_render_options": {
    "async": false
  }
}
```

#### js_assets

JavaScript files to load:

```json
{
  "js_assets": [
    {"path": "../js/slider.js"},
    {"path": "../js/animations.js"}
  ]
}
```

#### js_render_options

Control JavaScript rendering:

```json
{
  "js_render_options": {
    "position": "footer",
    "async": true,
    "defer": false,
    "type": "module"
  }
}
```

Options:
- `position`: `"head"` or `"footer"`
- `async`: Load asynchronously
- `defer`: Defer execution
- `type`: Script type (e.g., `"module"`)

### Identifier

#### module_id

Unique identifier (auto-generated):

```json
{
  "module_id": 12345678
}
```

This ID is independent of file path and used for tracking modules across renames.

## Example: Complete meta.json

```json
{
  "label": "Testimonial Slider",
  "icon": "https://example.com/icons/testimonial.svg",
  "global": false,
  "is_available_for_new_content": true,
  "categories": ["body_content", "social"],
  "content_types": ["SITE_PAGE", "LANDING_PAGE"],
  "content_tags": [
    {"name": "TESTIMONIAL", "source": "CONTENT_TYPE"},
    {"name": "SLIDER", "source": "CONTENT_TYPE"}
  ],
  "css_assets": [
    {"path": "../css/slider.css"}
  ],
  "css_render_options": {
    "async": false
  },
  "js_assets": [
    {"path": "../js/slider.js"}
  ],
  "js_render_options": {
    "position": "footer",
    "defer": true
  },
  "inline_help_text": "Display customer testimonials in a rotating slider. Add at least 3 testimonials for best results."
}
```
