# HubL Tags

Tags are HubL statements that perform actions like including content, managing resources, and controlling template behavior.

## Statement Syntax

```html
{% tag_name parameters %}
```

Block tags:

```html
{% tag_name %}
  content
{% end_tag_name %}
```

## Module Tags

### module

Embed a module in a template:

```html
{% module "hero"
  path="./modules/hero.module",
  heading="Welcome",
  subheading="Your journey starts here"
%}
```

### module_block

For modules with rich text or complex content:

```html
{% module_block module "content_block"
  path="./modules/content.module"
%}
  {% module_attribute "body_content" %}
    <h2>Custom HTML Content</h2>
    <p>This content goes into the body_content field</p>
  {% end_module_attribute %}
{% end_module_block %}
```

### dnd_module

Module in drag-and-drop areas:

```html
{% dnd_module path="@hubspot/rich_text" %}
{% end_dnd_module %}
```

## Include Tags

### include

Include a partial template:

```html
{% include "./partials/header.html" %}
{% include "./partials/footer.html" %}
```

With variables:

```html
{% include "./partials/card.html" with { title: "My Title", image: image_url } %}
```

### global_partial

Include a global partial:

```html
{% global_partial path="./partials/header.html" %}
```

**Note**: Don't use inside `<head>` tags.

## Block Tags

For template inheritance:

### block

Define overridable sections:

```html
<!-- base.html -->
{% block content %}
  Default content
{% endblock %}
```

### extends

Inherit from a parent template:

```html
{% extends "./layouts/base.html" %}

{% block content %}
  Custom page content
{% endblock %}
```

### super

Include parent block content:

```html
{% block header %}
  {{ super() }}
  <p>Additional header content</p>
{% endblock %}
```

## Resource Tags

### require_css

Load a stylesheet:

```html
{% require_css %}
  <link rel="stylesheet" href="{{ get_asset_url('css/custom.css') }}">
{% end_require_css %}
```

### require_js

Load JavaScript:

```html
{% require_js %}
  <script src="{{ get_asset_url('js/custom.js') }}"></script>
{% end_require_js %}
```

Options:

```html
{% require_js position="footer" defer="true" %}
  <script src="{{ get_asset_url('js/main.js') }}"></script>
{% end_require_js %}
```

### require_head

Add content to `<head>`:

```html
{% require_head %}
  <meta property="og:title" content="{{ content.name }}">
{% end_require_head %}
```

## Variable Tags

### set

Define a variable:

```html
{% set my_variable = "value" %}
{% set items = [1, 2, 3] %}
{% set config = { key: "value", count: 5 } %}
```

### do

Execute expression without output:

```html
{% do my_list.append("new item") %}
{% do my_dict.update({"key": "value"}) %}
```

## Content Tags

### raw

Output content without HubL processing:

```html
{% raw %}
  This {{ variable }} won't be processed
{% endraw %}
```

### raw_html

Allow users to enter custom HTML:

```html
{% raw_html "custom_code"
  label="Custom HTML",
  value="<div>Default HTML</div>"
%}
```

### rich_text

Rich text editor:

```html
{% rich_text "content"
  label="Page Content",
  html="<p>Default content</p>"
%}
```

### text

Simple text field:

```html
{% text "title"
  label="Title",
  value="Default Title"
%}
```

### textarea

Multi-line text:

```html
{% textarea "description"
  label="Description",
  value="Default description"
%}
```

## Form & CTA Tags

### form

Embed a HubSpot form:

```html
{% form
  form_key="contact-form",
  response_response_type="redirect",
  response_redirect_url="/thank-you"
%}
```

### cta

Call-to-action button:

```html
{% cta guid="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" %}
```

## Blog Tags

### blog_comments

Blog post comments:

```html
{% blog_comments "comments"
  select_blog="default",
  limit=10
%}
```

### post_listing

Display recent posts:

```html
{% post_listing
  select_blog="default",
  listing_type="recent",
  max_links=5
%}
```

### related_blog_posts

Show related content:

```html
{% related_blog_posts
  select_blog="default",
  limit=3
%}
```

### post_filter

Filter posts by tag/author/date:

```html
{% post_filter
  select_blog="default",
  filter_type="tag"
%}
```

## Media Tags

### image

Image field:

```html
{% image "hero_image"
  label="Hero Image",
  src="",
  alt="Hero",
  width=1200
%}
```

### gallery

Image gallery:

```html
{% gallery "product_gallery"
  label="Product Images",
  slides_per_page=3,
  show_pagination=true
%}
```

### video

Video embed:

```html
{% video "promo_video"
  label="Promo Video",
  player_type="hubspot"
%}
```

## Control Flow Tags

### if/elif/else

```html
{% if condition %}
  content
{% elif other_condition %}
  other content
{% else %}
  fallback content
{% endif %}
```

### for

```html
{% for item in items %}
  {{ item }}
{% endfor %}
```

### unless

```html
{% unless condition %}
  content when condition is false
{% endunless %}
```

## Widget Container

### widget_container

Flexible column for modules:

```html
{% widget_container "sidebar"
  label="Sidebar Content"
%}
  {% widget_block rich_text "bio" %}
  {% end_widget_block %}
{% end_widget_container %}
```

## Debug Tags

### require_debug

Only render in debug mode:

```html
{% require_debug %}
  <pre>{{ content|pprint }}</pre>
{% endrequire_debug %}
```

Access debug mode: Add `?hsDebug=true` to the URL.
