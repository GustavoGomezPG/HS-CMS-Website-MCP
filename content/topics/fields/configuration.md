# Field Configuration

Advanced field configuration options for modules and themes.

## Field Groups

Organize related fields:

```json
{
  "name": "button_settings",
  "label": "Button Settings",
  "type": "group",
  "expanded": true,
  "display": "accordion",
  "children": [
    {
      "name": "button_text",
      "label": "Button Text",
      "type": "text",
      "default": "Click Here"
    },
    {
      "name": "button_url",
      "label": "Button URL",
      "type": "link"
    },
    {
      "name": "button_style",
      "label": "Button Style",
      "type": "choice",
      "choices": [
        ["primary", "Primary"],
        ["secondary", "Secondary"],
        ["outline", "Outline"]
      ],
      "default": "primary"
    }
  ]
}
```

### Group Display Options

| Display | Description |
|---------|-------------|
| `"accordion"` | Expandable panel (default) |
| `"drilldown"` | Opens in separate panel |
| `"inline"` | No collapse option |

### Nested Groups

Groups can nest up to 3 levels:

```json
{
  "name": "layout",
  "type": "group",
  "children": [
    {
      "name": "spacing",
      "type": "group",
      "children": [
        { "name": "margin", "type": "spacing" },
        { "name": "padding", "type": "spacing" }
      ]
    }
  ]
}
```

## Repeating Fields

Allow multiple instances of a field:

```json
{
  "name": "features",
  "label": "Features",
  "type": "text",
  "occurrence": {
    "min": 1,
    "max": 10,
    "default": 3
  },
  "default": ["Feature 1", "Feature 2", "Feature 3"]
}
```

Access in HubL:

```html
{% for feature in module.features %}
  <li>{{ feature }}</li>
{% endfor %}
```

## Repeating Groups

Complex repeatable structures:

```json
{
  "name": "slides",
  "label": "Slides",
  "type": "group",
  "occurrence": {
    "min": 1,
    "max": null,
    "default": 1,
    "sorting_label_field": "title"
  },
  "children": [
    {
      "name": "title",
      "label": "Slide Title",
      "type": "text"
    },
    {
      "name": "image",
      "label": "Slide Image",
      "type": "image"
    },
    {
      "name": "description",
      "label": "Description",
      "type": "richtext"
    }
  ],
  "default": [
    {
      "title": "Slide 1",
      "image": { "src": "", "alt": "" },
      "description": "<p>Description</p>"
    }
  ]
}
```

Access in HubL:

```html
{% for slide in module.slides %}
  <div class="slide">
    <img src="{{ slide.image.src }}" alt="{{ slide.image.alt }}">
    <h3>{{ slide.title }}</h3>
    {{ slide.description }}
  </div>
{% endfor %}
```

## Field Visibility

Show/hide fields based on other field values:

### Simple Visibility

```json
{
  "name": "show_button",
  "label": "Show Button",
  "type": "boolean",
  "default": true
},
{
  "name": "button_text",
  "label": "Button Text",
  "type": "text",
  "visibility": {
    "controlling_field_path": "show_button",
    "controlling_value_regex": "true",
    "operator": "EQUAL"
  }
}
```

### Operators

| Operator | Description |
|----------|-------------|
| `EQUAL` | Value matches regex |
| `NOT_EQUAL` | Value doesn't match |
| `EMPTY` | Field is empty |
| `NOT_EMPTY` | Field has value |
| `MATCHES_REGEX` | Full regex match |

### Nested Field Paths

Use dot notation for nested fields:

```json
{
  "visibility": {
    "controlling_field_path": "settings.layout.type",
    "controlling_value_regex": "custom",
    "operator": "EQUAL"
  }
}
```

### Advanced Visibility

Multiple conditions:

```json
{
  "visibility_rules": "ADVANCED",
  "advanced_visibility": {
    "boolean_operator": "AND",
    "criteria": [
      {
        "controlling_field_path": "show_section",
        "controlling_value_regex": "true",
        "operator": "EQUAL"
      },
      {
        "controlling_field_path": "layout_type",
        "controlling_value_regex": "featured",
        "operator": "EQUAL"
      }
    ]
  }
}
```

Boolean operators: `"AND"` or `"OR"`

## Conditional Disabling

Disable fields based on conditions:

```json
{
  "name": "custom_width",
  "label": "Custom Width",
  "type": "number",
  "disabled_controls": {
    "message": "Custom width is only available when layout is set to custom",
    "rules": {
      "boolean_operator": "OR",
      "criteria": [
        {
          "controlling_field_path": "layout_type",
          "controlling_value_regex": "auto",
          "operator": "EQUAL"
        }
      ]
    }
  }
}
```

## Inherited Values

Make fields inherit from other fields:

```json
{
  "name": "secondary_color",
  "label": "Secondary Color",
  "type": "color",
  "inherited_value": {
    "default_value_path": "theme.colors.secondary"
  }
}
```

Property inheritance:

```json
{
  "name": "heading_color",
  "label": "Heading Color",
  "type": "color",
  "inherited_value": {
    "property_value_paths": {
      "color": "theme.typography.heading_font.color"
    }
  }
}
```

## Side-by-Side Layout

Display fields horizontally:

```json
{
  "name": "min_value",
  "label": "Minimum",
  "type": "number",
  "display_width": "half_width"
},
{
  "name": "max_value",
  "label": "Maximum",
  "type": "number",
  "display_width": "half_width"
}
```

Two consecutive `half_width` fields appear side-by-side.

## Field Locking

Prevent editing in certain contexts:

```json
{
  "name": "module_id",
  "label": "Module ID",
  "type": "text",
  "locked": true
}
```

## Validation

Regex validation for text fields:

```json
{
  "name": "email",
  "label": "Email Address",
  "type": "text",
  "validation_regex": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
}
```

## Featured Items in Repeaters

Allow marking items as featured:

```json
{
  "name": "testimonials",
  "type": "group",
  "occurrence": { "min": 1, "max": 10 },
  "group_occurrence_meta": {
    "featured_enabled": true,
    "featured_limit": 3
  },
  "children": [...]
}
```

Access in HubL:

```html
{% for item in module.testimonials %}
  {% if item.hs_meta.occurrence.featured %}
    <div class="featured">{{ item.name }}</div>
  {% endif %}
{% endfor %}
```
