# HubSpot Sections

Sections are reusable, pre-configured drag-and-drop layouts that content creators can add to pages.

## What is a Section?

A section is:
- A template file with `templateType: section`
- Pre-built layouts with modules
- Reusable across pages in a theme
- Editable by content creators

## Section Structure

Sections are single HTML files with template annotations:

```html
<!--
templateType: section
label: Hero Banner
description: A full-width hero section with background image and CTA
screenshotPath: ../images/section-previews/hero-banner.png
isAvailableForNewContent: true
-->

{% dnd_section
  background_color="#1e293b",
  padding={"top": 100, "bottom": 100}
%}
  {% dnd_row %}
    {% dnd_column width=8, offset=2 %}
      {% dnd_module
        path="@hubspot/rich_text",
        html="<h1>Your Headline Here</h1><p>Supporting text goes here</p>"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_row %}
  {% dnd_row %}
    {% dnd_column width=4, offset=4 %}
      {% dnd_module
        path="@hubspot/button",
        button_text="Get Started",
        button_link="#"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_row %}
{% end_dnd_section %}
```

## Section Annotations

| Annotation | Type | Description |
|------------|------|-------------|
| `templateType` | String | Must be `section` |
| `label` | String | Display name in editor |
| `description` | String | Description for content creators |
| `screenshotPath` | String | Preview image path |
| `isAvailableForNewContent` | Boolean | Show in section selector |

## Creating Sections

### File Location

Store sections in your theme's `sections/` folder:

```
my-theme/
└── sections/
    ├── hero-banner.html
    ├── feature-grid.html
    ├── testimonial-slider.html
    ├── cta-section.html
    └── contact-form.html
```

### Example: Feature Grid Section

```html
<!--
templateType: section
label: Feature Grid
description: Display features in a 3-column grid
screenshotPath: ../images/section-previews/feature-grid.png
-->

{% dnd_section
  max_width=1200,
  padding={"top": 80, "bottom": 80}
%}
  {% dnd_row %}
    {% dnd_column width=12 %}
      {% dnd_module
        path="@hubspot/rich_text",
        html="<h2 style='text-align: center'>Our Features</h2>"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_row %}
  {% dnd_row %}
    {% dnd_column width=4 %}
      {% dnd_module path="../modules/feature-card.module",
        title="Feature 1",
        description="Description for feature 1"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
    {% dnd_column width=4, offset=4 %}
      {% dnd_module path="../modules/feature-card.module",
        title="Feature 2",
        description="Description for feature 2"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
    {% dnd_column width=4, offset=8 %}
      {% dnd_module path="../modules/feature-card.module",
        title="Feature 3",
        description="Description for feature 3"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_row %}
{% end_dnd_section %}
```

### Example: CTA Section

```html
<!--
templateType: section
label: Call to Action
description: A centered CTA with heading and button
screenshotPath: ../images/section-previews/cta.png
-->

{% dnd_section
  background_color={
    "color": "#3B82F6",
    "opacity": 100
  },
  padding={"top": 60, "bottom": 60}
%}
  {% dnd_row %}
    {% dnd_column width=8, offset=2 %}
      {% dnd_module
        path="@hubspot/rich_text",
        html="<h2 style='color: white; text-align: center'>Ready to Get Started?</h2><p style='color: white; text-align: center'>Join thousands of satisfied customers today.</p>"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_row %}
  {% dnd_row %}
    {% dnd_column width=4, offset=4 %}
      {% dnd_module
        path="@hubspot/button",
        button_text="Start Free Trial",
        button_style="primary"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_row %}
{% end_dnd_section %}
```

## Section Rules

1. **Must start and end with dnd_section**: Only one `dnd_section` per section template
2. **Follow dnd hierarchy**: Use proper nesting (row → column/module)
3. **Use 12-column grid**: Column widths must total 12 or less

## Using Sections in Templates

Include a section directly in a template:

```html
{% include "../sections/hero-banner.html" %}

{% dnd_area "main_content" %}
{% end_dnd_area %}

{% include "../sections/cta-section.html" %}
```

## Section Updates

**Important behavior**:
- Modifying a section updates all instances in new pages
- Existing pages with that section are NOT automatically updated
- Manual update required for existing pages

## Multi-Theme Sections

To use a section in multiple themes:
- Add the section template file to each theme
- Or create a shared sections folder outside themes

## Creating from Page Editor

Quick way to create sections:
1. Build layout in a blank page
2. Enable developer mode
3. Copy the HubL code
4. Paste into a new section template file
5. Add section annotations

## Best Practices

1. **Create preview screenshots**: Help content creators visualize sections
2. **Use descriptive labels**: Clear names for easy identification
3. **Set sensible defaults**: Pre-populate with realistic content
4. **Test responsiveness**: Ensure sections work on all devices
5. **Document usage**: Add descriptions explaining the section's purpose
