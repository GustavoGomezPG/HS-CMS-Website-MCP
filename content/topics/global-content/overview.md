# Global Content

Global content creates reusable components that maintain consistency across your entire website.

## Types of Global Content

### Global Modules

Modules where editing one instance updates all instances:

```json
// meta.json
{
  "label": "Site Footer",
  "global": true,
  "is_available_for_new_content": true
}
```

### Global Partials

Template fragments reusable across the site:

```html
<!--
templateType: global_partial
label: Site Header
-->

<header class="site-header">
  <div class="container">
    <a href="/" class="logo">
      <img src="{{ get_asset_url('images/logo.svg') }}" alt="Logo">
    </a>
    <nav class="main-nav">
      {% set menu = menu("main-navigation") %}
      {% for item in menu %}
        <a href="{{ item.url }}"
           {% if item.active %}class="active"{% endif %}>
          {{ item.label }}
        </a>
      {% endfor %}
    </nav>
  </div>
</header>
```

## Creating Global Partials

### Using CLI

```bash
hs cms create template header ./partials
```

Select "global partial" when prompted.

### File Structure

```
my-theme/
└── partials/
    ├── header.html      # Global partial
    ├── footer.html      # Global partial
    └── sidebar.html     # Global partial
```

### Template Annotation

```html
<!--
templateType: global_partial
label: Page Header
-->
```

## Using Global Partials

Include in templates with the `global_partial` tag:

```html
<!DOCTYPE html>
<html>
<head>
  {{ standard_header_includes }}
</head>
<body>
  {% global_partial path="../partials/header.html" %}

  <main>
    {% dnd_area "main_content" %}{% end_dnd_area %}
  </main>

  {% global_partial path="../partials/footer.html" %}

  {{ standard_footer_includes }}
</body>
</html>
```

**Important**: Do not use `global_partial` within the `<head>` section.

## Global Partial Output

When rendered, global partials are wrapped in a div:

```html
<div data-global-resource-path="/path/to/header.html">
  <!-- Partial content -->
</div>
```

This wrapper enables the editor to identify and edit the global content.

## Creating Global Modules

### Module Structure

```
global-footer.module/
├── module.html
├── module.css
├── fields.json
└── meta.json
```

### meta.json

```json
{
  "label": "Global Footer",
  "global": true,
  "is_available_for_new_content": true,
  "content_types": ["SITE_PAGE", "LANDING_PAGE", "BLOG_POST"]
}
```

### fields.json

```json
[
  {
    "name": "copyright_text",
    "label": "Copyright Text",
    "type": "text",
    "default": "© 2024 Company Name"
  },
  {
    "name": "social_links",
    "label": "Social Links",
    "type": "group",
    "occurrence": {
      "min": 0,
      "max": 6
    },
    "children": [
      {
        "name": "platform",
        "label": "Platform",
        "type": "choice",
        "choices": [
          ["facebook", "Facebook"],
          ["twitter", "Twitter"],
          ["linkedin", "LinkedIn"],
          ["instagram", "Instagram"]
        ]
      },
      {
        "name": "url",
        "label": "URL",
        "type": "url"
      }
    ]
  }
]
```

### module.html

```html
<footer class="global-footer">
  <div class="container">
    <div class="social-links">
      {% for link in module.social_links %}
        <a href="{{ link.url }}" class="social-{{ link.platform }}"
           target="_blank" rel="noopener">
          <span class="sr-only">{{ link.platform }}</span>
        </a>
      {% endfor %}
    </div>
    <p class="copyright">{{ module.copyright_text }}</p>
  </div>
</footer>
```

## Best Practices

### Do's

1. **Use for repeated elements**: Headers, footers, navigation, sidebars
2. **Keep content editable**: Use fields for all customizable text
3. **Design for accessibility**: Proper semantic HTML and ARIA attributes
4. **Test across templates**: Ensure global content works everywhere

### Don'ts

1. **Avoid nesting globals**: Don't put global modules inside global partials
2. **Don't overuse**: Only make truly site-wide content global
3. **Avoid complex logic**: Keep global content simple and predictable

## Common Use Cases

### Site Header

```html
<!--
templateType: global_partial
label: Site Header
-->
<header class="site-header">
  {% module "logo" path="../modules/logo.module" %}
  {% module "main_nav" path="../modules/navigation.module", menu="main-menu" %}
  {% module "cta_button" path="../modules/header-cta.module" %}
</header>
```

### Site Footer

```html
<!--
templateType: global_partial
label: Site Footer
-->
<footer class="site-footer">
  <div class="footer-widgets">
    {% module "footer_links" path="../modules/footer-links.module" %}
    {% module "newsletter" path="../modules/newsletter-signup.module" %}
  </div>
  <div class="footer-bottom">
    {% module "copyright" path="../modules/copyright.module" %}
    {% module "social" path="../modules/social-links.module" %}
  </div>
</footer>
```

### Blog Sidebar

```html
<!--
templateType: global_partial
label: Blog Sidebar
-->
<aside class="blog-sidebar">
  {% module "search" path="@hubspot/search_input" %}
  {% module "categories" path="../modules/blog-categories.module" %}
  {% module "recent_posts" path="../modules/recent-posts.module" %}
  {% module "newsletter" path="../modules/newsletter-signup.module" %}
</aside>
```

## Editing Global Content

Content creators can edit global content through:
1. The Global Content editor in HubSpot
2. Any page containing the global element
3. The Design Manager (for developers)

Changes propagate to all pages using that global content.
