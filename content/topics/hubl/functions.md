# HubL Functions

Functions generate values and can interact with HubSpot systems. Unlike filters, functions don't require an initial value.

## Function Syntax

```html
{{ function_name(parameter1, parameter2) }}
{% set result = function_name(params) %}
```

## Content Retrieval

### Get Content by ID

```html
{{ content_by_id(12345678) }}
```

Returns a landing page, website page, or blog post. Limited to 10 calls per page.

### Get Multiple Content Items

```html
{% set pages = content_by_ids([123, 456, 789]) %}
{% for page in pages %}
  <a href="{{ page.absolute_url }}">{{ page.name }}</a>
{% endfor %}
```

Supports up to 100 items.

## Blog Functions

### Recent Posts

```html
{% set posts = blog_recent_posts("default", 5) %}
{% for post in posts %}
  <article>
    <a href="{{ post.absolute_url }}">{{ post.name }}</a>
  </article>
{% endfor %}
```

Parameters:
- Blog ID or "default"
- Limit (max 200)

### Popular Posts

```html
{% set popular = blog_popular_posts("default", 5, [], "last_three_months") %}
```

Parameters:
- Blog ID
- Limit
- Tags filter (array)
- Timeframe: `popular_all_time`, `last_two_months`, `last_three_months`, `last_six_months`, `last_year`

Results are cached for 6 hours.

### Blog Authors

```html
{% set authors = blog_authors("default", 10) %}
{% for author in authors %}
  <span>{{ author.name }}</span>
{% endfor %}
```

Max 250 authors.

### Blog Tags

```html
{% set tags = blog_tags("default", 25) %}
{% for tag in tags %}
  <a href="{{ blog_tag_url("default", tag.slug) }}">
    {{ tag.name }} ({{ tag.post_count }})
  </a>
{% endfor %}
```

Returns 250 most-used tags sorted by post count.

### Blog Tag URL

```html
{{ blog_tag_url("default", "marketing") }}
<!-- Returns: /blog/tag/marketing -->
```

## Asset Functions

### Get Asset URL

```html
<link rel="stylesheet" href="{{ get_asset_url('css/main.css') }}">
<img src="{{ get_asset_url('images/logo.png') }}" alt="Logo">
```

### Module Asset URL

For assets within a module:

```html
<img src="{{ module_asset_url('icon.svg') }}">
```

## CRM Functions

### Single CRM Object

```html
{% set contact = crm_object("contact", "email=test@example.com") %}
<p>{{ contact.firstname }} {{ contact.lastname }}</p>
```

Limited to 10 calls per page.

### Multiple CRM Objects

```html
{% set deals = crm_objects("deal", "dealstage=closedwon", "amount,dealname", 10) %}
{% for deal in deals.results %}
  <p>{{ deal.dealname }}: ${{ deal.amount }}</p>
{% endfor %}
```

Parameters:
- Object type
- Query/filter
- Properties to fetch
- Limit

## Menu Functions

### Get Menu

```html
{% set nav = menu("main-navigation") %}
{% for item in nav %}
  <a href="{{ item.url }}"
     {% if item.active %}class="active"{% endif %}>
    {{ item.label }}
  </a>

  {% if item.children %}
    <ul>
      {% for child in item.children %}
        <li><a href="{{ child.url }}">{{ child.label }}</a></li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
```

## Utility Functions

### Range

Generate number sequences:

```html
{% for i in range(1, 6) %}
  <span>{{ i }}</span>
{% endfor %}
```

### Today

```html
{{ today() }}
{{ today()|format_date("yyyy-MM-dd") }}
```

### Super

Call parent block content in templates:

```html
{% block content %}
  {{ super() }}
  <p>Additional content</p>
{% endblock %}
```

### Personalization Token

```html
{{ personalization_token("contact.firstname", "there") }}
<!-- Falls back to "there" if no value -->
```

## Form Functions

### Render Form

```html
{{ form("form-id-or-name") }}
```

Or with options:

```html
{% form
  form_key="contact-form",
  response_response_type="redirect",
  response_redirect_url="https://example.com/thank-you"
%}
```

## Color Functions

### Color Variant

```html
{{ color_variant("#3B82F6", 20) }}   <!-- 20% lighter -->
{{ color_variant("#3B82F6", -20) }}  <!-- 20% darker -->
```

### Contrast Color

```html
{{ contrast_color("#3B82F6") }}       <!-- Returns black or white -->
```

## Debugging

### Require Debug

```html
{% require_debug %}
  <pre>{{ content|pprint }}</pre>
{% endrequire_debug %}
```

Only renders in debug mode (add `?hsDebug=true` to URL).

## Function Limits

Most functions have rate limits:
- `content_by_id`: 10 calls per page
- `crm_object`: 10 calls per page
- `blog_recent_posts`: Max 200 posts
- `blog_authors`: Max 250 authors
- `blog_tags`: Max 250 tags

Exceeding limits may affect performance or return errors.
