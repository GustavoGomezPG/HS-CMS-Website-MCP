# Drag-and-Drop Areas

Drag-and-drop areas allow content creators to add modules and modify layouts in the page editor.

## DnD Component Hierarchy

```
dnd_area (top level)
└── dnd_section
    └── dnd_row
        ├── dnd_column
        │   └── dnd_row (nested)
        │       └── dnd_module
        └── dnd_module
```

## dnd_area

The top-level container for drag-and-drop content:

```html
{% dnd_area "main_content"
  label="Main Content Area"
  class="main-content"
%}
  <!-- Default content goes here -->
{% end_dnd_area %}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | String | Display name in editor |
| `class` | String | CSS class for wrapper |

**Note**: `dnd_area` cannot be nested inside other dnd elements.

## dnd_section

The outermost container inside a `dnd_area`:

```html
{% dnd_section
  background_color="#ffffff",
  padding={
    "top": 60,
    "bottom": 60
  }
%}
  <!-- Rows go here -->
{% end_dnd_section %}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `background_color` | Object/String | Section background color |
| `background_image` | Object | Background image settings |
| `padding` | Object | Top/bottom/left/right padding |
| `margin` | Object | Top/bottom margin |
| `max_width` | Number | Maximum width in pixels |
| `vertical_alignment` | String | `TOP`, `MIDDLE`, `BOTTOM` |

### Full Example

```html
{% dnd_section
  background_color={
    "color": "#f5f5f5",
    "opacity": 100
  },
  background_image={
    "backgroundPosition": "MIDDLE_CENTER",
    "backgroundSize": "cover",
    "imageUrl": ""
  },
  padding={
    "top": 80,
    "bottom": 80,
    "left": 20,
    "right": 20
  },
  max_width=1200,
  vertical_alignment="MIDDLE"
%}
{% end_dnd_section %}
```

## dnd_row

A wrapper for columns and modules:

```html
{% dnd_row %}
  <!-- Columns or modules go here -->
{% end_dnd_row %}
```

Rows use a 12-column grid system.

## dnd_column

Holds content within a row:

```html
{% dnd_column
  width=6,
  offset=0
%}
  <!-- Nested rows or modules -->
{% end_dnd_column %}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | Number | Column width (1-12) |
| `offset` | Number | Left offset (0-11) |

### Column Width Examples

```html
<!-- Two equal columns -->
{% dnd_row %}
  {% dnd_column width=6 %}...{% end_dnd_column %}
  {% dnd_column width=6, offset=6 %}...{% end_dnd_column %}
{% end_dnd_row %}

<!-- Three columns -->
{% dnd_row %}
  {% dnd_column width=4 %}...{% end_dnd_column %}
  {% dnd_column width=4, offset=4 %}...{% end_dnd_column %}
  {% dnd_column width=4, offset=8 %}...{% end_dnd_column %}
{% end_dnd_row %}

<!-- Sidebar layout -->
{% dnd_row %}
  {% dnd_column width=8 %}...{% end_dnd_column %}
  {% dnd_column width=4, offset=8 %}...{% end_dnd_column %}
{% end_dnd_row %}
```

## dnd_module

A module wrapper in drag-and-drop areas:

```html
{% dnd_module path="@hubspot/rich_text" %}
{% end_dnd_module %}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `path` | String | Module path (required) |
| `width` | Number | Module width (1-12) |
| `offset` | Number | Left offset |
| Additional | Various | Module field values |

### With Default Values

```html
{% dnd_module
  path="./modules/hero.module",
  heading="Welcome",
  subheading="Your journey starts here",
  background_color="#3B82F6"
%}
{% end_dnd_module %}
```

## Complete Example

```html
{% dnd_area "page_content" %}
  <!-- Hero Section -->
  {% dnd_section
    background_color="#1e293b",
    padding={"top": 100, "bottom": 100}
  %}
    {% dnd_row %}
      {% dnd_column width=8, offset=2 %}
        {% dnd_module
          path="@hubspot/rich_text",
          html="<h1>Welcome to Our Site</h1><p>Discover what we offer</p>"
        %}
        {% end_dnd_module %}
      {% end_dnd_column %}
    {% end_dnd_row %}
  {% end_dnd_section %}

  <!-- Features Section -->
  {% dnd_section
    max_width=1200,
    padding={"top": 80, "bottom": 80}
  %}
    {% dnd_row %}
      {% dnd_column width=4 %}
        {% dnd_module path="./modules/feature-card.module",
          title="Feature 1",
          icon="star"
        %}
        {% end_dnd_module %}
      {% end_dnd_column %}
      {% dnd_column width=4, offset=4 %}
        {% dnd_module path="./modules/feature-card.module",
          title="Feature 2",
          icon="heart"
        %}
        {% end_dnd_module %}
      {% end_dnd_column %}
      {% dnd_column width=4, offset=8 %}
        {% dnd_module path="./modules/feature-card.module",
          title="Feature 3",
          icon="check"
        %}
        {% end_dnd_module %}
      {% end_dnd_column %}
    {% end_dnd_row %}
  {% end_dnd_section %}
{% end_dnd_area %}
```

## Styling Considerations

Rendered HTML uses Bootstrap 2 grid classes:

```html
<div class="row-fluid">
  <div class="span6">...</div>
  <div class="span6">...</div>
</div>
```

**Important**: Don't target these classes directly. Add custom classes to your HubL tags:

```html
{% dnd_section class="my-section" %}
{% dnd_row class="my-row" %}
{% dnd_column class="my-column" %}
```

## Responsive Behavior

The grid is responsive by default:
- Columns stack on mobile
- Use CSS media queries for custom breakpoints
- `layout.css` is automatically included for grid styles
