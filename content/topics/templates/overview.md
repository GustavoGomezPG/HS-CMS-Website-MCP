# HubSpot Templates Overview

Templates define the structure and layout of pages, emails, and blog content.

## Template Types

### Page Templates

For website and landing pages:

```html
<!--
templateType: page
label: About Page
description: Template for the about us page
screenshotPath: ../images/previews/about.png
isAvailableForNewContent: true
-->

<!DOCTYPE html>
<html lang="en">
<head>
  {{ standard_header_includes }}
  <title>{{ page_meta.html_title }}</title>
  <meta name="description" content="{{ page_meta.meta_description }}">
</head>
<body>
  {% include "../partials/header.html" %}

  <main>
    {% dnd_area "main_content" %}
    {% end_dnd_area %}
  </main>

  {% include "../partials/footer.html" %}
  {{ standard_footer_includes }}
</body>
</html>
```

### Blog Templates

#### Blog Listing

```html
<!--
templateType: blog_listing
label: Blog Listing
-->
```

Displays blog post summaries with pagination.

#### Blog Post

```html
<!--
templateType: blog_post
label: Blog Post
-->
```

Shows individual blog post content.

#### Combined Blog Template

```html
<!--
templateType: blog
label: Blog Template
-->
```

Handles both listing and post views.

### Email Templates

```html
<!--
templateType: email
label: Marketing Email
-->
```

Must include required CAN-SPAM variables.

### Partials

Reusable template fragments:

```html
<!--
templateType: page
isAvailableForNewContent: false
-->
```

Setting `isAvailableForNewContent: false` makes it a partial.

### Global Partials

Site-wide reusable components:

```html
<!--
templateType: global_partial
label: Site Header
-->
```

Updates propagate to all pages using the partial.

### System Page Templates

Special templates for system pages:

| Type | Purpose |
|------|---------|
| `error_page` | 404 and error pages |
| `password_prompt_page` | Password-protected content |
| `search_results_page` | Search results |
| `membership_login` | Member login |
| `membership_register` | Member registration |
| `membership_reset` | Password reset |
| `email_subscription_preferences` | Email preferences |

## Template Annotations

Full annotation reference:

```html
<!--
templateType: page
label: My Template
description: Description of the template
screenshotPath: ../images/preview.png
isAvailableForNewContent: true
enableDomainStylesheets: false
hiddenModules:
- '@hubspot/module_name'
hiddenSections:
- ../sections/section_name
-->
```

## Required Includes

All page templates must include:

```html
<!-- In <head> -->
{{ standard_header_includes }}

<!-- Before </body> -->
{{ standard_footer_includes }}
```

These add:
- HubSpot tracking code
- Required scripts
- Analytics code

## Template Inheritance

### Base Template

`templates/layouts/base.html`:

```html
<!--
templateType: page
isAvailableForNewContent: false
-->
<!DOCTYPE html>
<html lang="en">
<head>
  {{ standard_header_includes }}
  <title>{% block title %}{{ page_meta.html_title }}{% endblock %}</title>
  {% block head %}{% endblock %}
</head>
<body class="{{ builtin_body_classes }}">
  {% block header %}
    {% include "../partials/header.html" %}
  {% endblock %}

  <main>
    {% block content %}{% endblock %}
  </main>

  {% block footer %}
    {% include "../partials/footer.html" %}
  {% endblock %}
  {{ standard_footer_includes }}
</body>
</html>
```

### Child Template

`templates/home.html`:

```html
<!--
templateType: page
label: Home Page
-->
{% extends "./layouts/base.html" %}

{% block title %}Welcome - {{ page_meta.html_title }}{% endblock %}

{% block head %}
  <link rel="stylesheet" href="{{ get_asset_url('css/home.css') }}">
{% endblock %}

{% block content %}
  {% dnd_area "home_content"
    label="Home Content"
  %}
  {% end_dnd_area %}
{% endblock %}
```

## Template Swapping Rules

Content creators can swap templates with these rules:

1. **Drag-and-drop templates** swap with:
   - Other drag-and-drop templates
   - Coded templates with `dnd_area` tags

2. **Coded templates without dnd_area** swap with:
   - Other coded templates without `dnd_area`

## Included Files

### jQuery (Optional)

Configured in HubSpot settings:
- Version 1.11.x (recommended)
- Version 1.7.1
- Disabled

### layout.css

Automatically included in drag-and-drop templates. Provides the responsive grid system.

## Creating Templates

### Using CLI

```bash
hs cms create template my-template ./templates
```

Follow prompts to select template type.

### Template File Structure

```
templates/
├── layouts/
│   └── base.html
├── home.html
├── about.html
├── contact.html
├── blog/
│   ├── listing.html
│   └── post.html
└── system/
    ├── 404.html
    └── search.html
```
