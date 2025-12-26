# Hiding Modules and Sections

Control which modules and sections appear in the page editor.

## Hiding Modules in Themes

Configure `theme.json` to hide HubSpot's default modules.

### Hide All Default Modules

```json
{
  "label": "My Theme",
  "hide_all_default_modules": true
}
```

### Hide Specific Default Modules

```json
{
  "label": "My Theme",
  "hidden_modules": [
    "@hubspot/button",
    "@hubspot/form",
    "@hubspot/rich_text",
    "@hubspot/image"
  ]
}
```

### Important Limitations

- You **can only hide default HubSpot modules** in themes
- You **cannot hide custom modules** in themes
- To exclude a custom module from a theme, delete it from the theme folder

## Hiding Modules in Templates

Templates use annotations to control visibility.

### Template Annotations

At the top of your template file:

```html
<!--
templateType: page
label: My Page Template
hiddenModules:
- '@hubSpot/follow_me'
- '@hubspot/form'
- ../modules/deprecated-module
hiddenSections:
- ../sections/old-banner
-->
```

### Syntax Rules

1. **Quote default modules**: Use single quotes around @hubSpot modules
   ```yaml
   - '@hubSpot/follow_me'  # Correct
   - @hubSpot/follow_me    # Wrong - YAML error
   ```

2. **Use relative paths**: For custom modules and sections
   ```yaml
   - ../modules/my-module  # Correct
   - /theme/modules/my-module  # Wrong - won't work
   ```

## Template Example

Complete template with hidden modules:

```html
<!--
templateType: page
label: Landing Page
description: A conversion-focused landing page template
screenshotPath: ../images/template-previews/landing.png
isAvailableForNewContent: true
hiddenModules:
- '@hubSpot/post_listing'
- '@hubSpot/blog_comments'
- '@hubSpot/related_posts'
- '../modules/legacy-cta'
hiddenSections:
- '../sections/deprecated-hero'
- '../sections/old-footer'
-->

<!DOCTYPE html>
<html>
<head>
  {{ standard_header_includes }}
</head>
<body>
  {% dnd_area "main_content" %}
    {% dnd_section %}
      {% dnd_row %}
        {% dnd_module path="@hubspot/rich_text" %}
        {% end_dnd_module %}
      {% end_dnd_row %}
    {% end_dnd_section %}
  {% end_dnd_area %}

  {{ standard_footer_includes }}
</body>
</html>
```

## Theme vs Template Scope

| Location | Hide Default Modules | Hide Custom Modules | Hide Sections |
|----------|---------------------|---------------------|---------------|
| theme.json | Yes | No | No |
| Template annotations | Yes | Yes | Yes |

## Common Default Modules to Hide

```yaml
hiddenModules:
# Blog-related
- '@hubSpot/post_listing'
- '@hubSpot/blog_comments'
- '@hubSpot/related_posts'
- '@hubSpot/blog_subscribe'
- '@hubSpot/rss_listing'

# Social
- '@hubSpot/follow_me'
- '@hubSpot/social_sharing'

# Legacy
- '@hubSpot/raw_html'
- '@hubSpot/section_header'
```

## Best Practices

1. **Hide unused modules**: Simplify the editor for content creators
2. **Hide legacy modules**: After migration, hide deprecated modules
3. **Use template-level hiding**: More granular control than theme-level
4. **Document hidden modules**: Note why modules are hidden for future developers
5. **Test the editor**: Verify hidden modules don't appear in the page editor
