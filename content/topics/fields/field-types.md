# Module and Theme Field Types

Fields define the editable options available to content creators in modules and themes.

## Field Definition Structure

Every field has these common properties:

```json
{
  "name": "field_name",
  "label": "Display Label",
  "type": "text",
  "required": false,
  "locked": false,
  "default": "Default value",
  "inline_help_text": "Help text for editors",
  "display_width": "full_width"
}
```

## Text Fields

### Text

Single-line text input:

```json
{
  "name": "title",
  "label": "Title",
  "type": "text",
  "required": true,
  "default": "Enter title here",
  "validation_regex": "^[A-Za-z0-9 ]+$"
}
```

### Rich Text

Formatted content with HTML support:

```json
{
  "name": "content",
  "label": "Content",
  "type": "richtext",
  "default": "<p>Enter content here</p>"
}
```

### URL

Web address input:

```json
{
  "name": "link_url",
  "label": "Link URL",
  "type": "url",
  "default": {
    "url": {
      "href": ""
    }
  }
}
```

## Boolean

Toggle or checkbox:

```json
{
  "name": "show_icon",
  "label": "Show Icon",
  "type": "boolean",
  "default": true,
  "display": "toggle"
}
```

Display options: `"toggle"` or `"checkbox"`

## Choice

Selection from options:

```json
{
  "name": "alignment",
  "label": "Alignment",
  "type": "choice",
  "choices": [
    ["left", "Left"],
    ["center", "Center"],
    ["right", "Right"]
  ],
  "default": "center",
  "display": "radio"
}
```

Display options: `"dropdown"`, `"radio"`, `"checkbox"` (multi-select), `"button"`

## Number

Numeric input:

```json
{
  "name": "columns",
  "label": "Number of Columns",
  "type": "number",
  "default": 3,
  "min": 1,
  "max": 6,
  "step": 1
}
```

## Image

Image selection:

```json
{
  "name": "background_image",
  "label": "Background Image",
  "type": "image",
  "responsive": true,
  "resizable": true,
  "default": {
    "src": "",
    "alt": "",
    "width": null,
    "height": null
  }
}
```

Access in HubL:
- `{{ module.background_image.src }}`
- `{{ module.background_image.alt }}`

## Color

Color picker:

```json
{
  "name": "text_color",
  "label": "Text Color",
  "type": "color",
  "default": {
    "color": "#333333",
    "opacity": 100
  }
}
```

Access: `{{ module.text_color.color }}` or `{{ module.text_color.css }}`

## Font

Font styling controls:

```json
{
  "name": "heading_font",
  "label": "Heading Font",
  "type": "font",
  "default": {
    "font": "Arial",
    "size": 24,
    "size_unit": "px",
    "color": "#000000",
    "styles": {}
  }
}
```

Access: `{{ module.heading_font.css }}` outputs complete CSS.

## Spacing

Margin/padding controls:

```json
{
  "name": "padding",
  "label": "Padding",
  "type": "spacing",
  "default": {
    "top": { "value": 20, "units": "px" },
    "right": { "value": 20, "units": "px" },
    "bottom": { "value": 20, "units": "px" },
    "left": { "value": 20, "units": "px" }
  }
}
```

## Border

Border styling:

```json
{
  "name": "border",
  "label": "Border",
  "type": "border",
  "default": {
    "top": {
      "width": { "value": 1, "units": "px" },
      "style": "solid",
      "color": "#cccccc",
      "opacity": 100
    }
  }
}
```

## Date/DateTime

Date picker:

```json
{
  "name": "event_date",
  "label": "Event Date",
  "type": "date",
  "default": null
}
```

Returns Unix timestamp. Format with: `{{ module.event_date|format_date("MMMM d, yyyy") }}`

## Link

Page/URL link:

```json
{
  "name": "button_link",
  "label": "Button Link",
  "type": "link",
  "default": {
    "url": {
      "href": "",
      "type": "EXTERNAL"
    },
    "open_in_new_tab": false,
    "no_follow": false
  }
}
```

## Icon

Icon selector:

```json
{
  "name": "icon",
  "label": "Icon",
  "type": "icon",
  "default": {
    "name": "star",
    "type": "SOLID",
    "unicode": "f005"
  }
}
```

## CRM Object

CRM record selector:

```json
{
  "name": "featured_contact",
  "label": "Featured Contact",
  "type": "crmobject",
  "object_type": "contact",
  "properties_to_fetch": ["firstname", "lastname", "email"]
}
```

## Form

Form selector:

```json
{
  "name": "contact_form",
  "label": "Contact Form",
  "type": "form",
  "default": {
    "form_id": ""
  }
}
```

## Blog

Blog selector:

```json
{
  "name": "blog",
  "label": "Select Blog",
  "type": "blog",
  "default": null
}
```

## HubDB Table/Row

HubDB integration:

```json
{
  "name": "data_table",
  "label": "Data Table",
  "type": "hubdbtable"
}
```

```json
{
  "name": "featured_row",
  "label": "Featured Item",
  "type": "hubdbrow",
  "table_name_or_id": "products"
}
```

## Menu

Navigation menu:

```json
{
  "name": "nav_menu",
  "label": "Navigation Menu",
  "type": "menu"
}
```

## Style Fields

For the Styles tab in page editor, wrap fields in a styles group:

```json
{
  "name": "styles",
  "label": "Styles",
  "type": "group",
  "tab": "STYLE",
  "children": [
    {
      "name": "background_color",
      "label": "Background Color",
      "type": "color"
    }
  ]
}
```

Supported style field types: `alignment`, `background_image`, `border`, `boolean`, `choice`, `color`, `font`, `gradient`, `icon`, `image`, `number`, `spacing`, `text_alignment`
