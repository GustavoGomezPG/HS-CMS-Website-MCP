# HubL Loops

Iterate over arrays, objects, and sequences in HubL templates.

## For Loop Syntax

Basic for loop:

```html
{% for item in items %}
  <p>{{ item }}</p>
{% endfor %}
```

## Loop Variables

Access loop state within the loop:

| Variable | Description |
|----------|-------------|
| `loop.index` | Current iteration (1-indexed) |
| `loop.index0` | Current iteration (0-indexed) |
| `loop.revindex` | Iterations remaining (1-indexed) |
| `loop.revindex0` | Iterations remaining (0-indexed) |
| `loop.first` | True if first iteration |
| `loop.last` | True if last iteration |
| `loop.length` | Total number of items |
| `loop.cycle` | Cycle through values |
| `loop.depth` | Nesting depth (starts at 1) |
| `loop.depth0` | Nesting depth (starts at 0) |

### Examples

```html
{% for post in posts %}
  <article class="post {% if loop.first %}first{% endif %}">
    <span class="number">{{ loop.index }} of {{ loop.length }}</span>
    <h2>{{ post.title }}</h2>
  </article>
{% endfor %}
```

### Alternating Classes with cycle

```html
{% for item in items %}
  <div class="{{ loop.cycle('odd', 'even') }}">
    {{ item }}
  </div>
{% endfor %}
```

## Looping Over Objects

Iterate over dictionary key-value pairs:

```html
{% for key, value in my_dict.items() %}
  <p>{{ key }}: {{ value }}</p>
{% endfor %}
```

Just keys:

```html
{% for key in my_dict.keys() %}
  <span>{{ key }}</span>
{% endfor %}
```

Just values:

```html
{% for value in my_dict.values() %}
  <span>{{ value }}</span>
{% endfor %}
```

## Range Function

Generate number sequences:

```html
{% for i in range(5) %}
  <span>{{ i }}</span>  <!-- 0, 1, 2, 3, 4 -->
{% endfor %}

{% for i in range(1, 6) %}
  <span>{{ i }}</span>  <!-- 1, 2, 3, 4, 5 -->
{% endfor %}

{% for i in range(0, 10, 2) %}
  <span>{{ i }}</span>  <!-- 0, 2, 4, 6, 8 -->
{% endfor %}
```

## Else Clause

Execute when loop is empty:

```html
{% for post in posts %}
  <article>{{ post.title }}</article>
{% else %}
  <p>No posts found.</p>
{% endfor %}
```

## Loop Filtering

### If Condition

```html
{% for post in posts if post.is_published %}
  <article>{{ post.title }}</article>
{% endfor %}
```

### Multiple Conditions

```html
{% for product in products if product.in_stock and product.price < 100 %}
  <div class="product">{{ product.name }}</div>
{% endfor %}
```

## Loop Control

### Break (Continue to End)

Use a conditional to skip remaining items:

```html
{% set found = false %}
{% for item in items %}
  {% if not found %}
    {% if item.id == target_id %}
      <p>Found: {{ item.name }}</p>
      {% set found = true %}
    {% endif %}
  {% endif %}
{% endfor %}
```

## Nested Loops

```html
{% for category in categories %}
  <h2>{{ category.name }}</h2>
  <ul>
    {% for product in category.products %}
      <li>
        {{ product.name }}
        (Depth: {{ loop.depth }})
      </li>
    {% endfor %}
  </ul>
{% endfor %}
```

## Blog Post Iteration

Common pattern for blog listings:

```html
{% for post in contents %}
  <article class="post">
    <h2><a href="{{ post.absolute_url }}">{{ post.name }}</a></h2>
    <p class="meta">
      By {{ post.blog_post_author.name }} on
      {{ post.publish_date|format_date("MMMM d, yyyy") }}
    </p>
    <div class="summary">{{ post.post_summary }}</div>

    {% if post.tag_list %}
      <div class="tags">
        {% for tag in post.tag_list %}
          <a href="{{ blog_tag_url(group.id, tag.slug) }}">
            {{ tag.name }}
          </a>{% if not loop.last %}, {% endif %}
        {% endfor %}
      </div>
    {% endif %}
  </article>
{% endfor %}
```

## Menu Iteration

```html
{% set menu = menu("main-menu") %}
{% for item in menu %}
  <a href="{{ item.url }}"
     {% if item.active %}class="active"{% endif %}>
    {{ item.label }}
  </a>

  {% if item.children %}
    <ul class="submenu">
      {% for child in item.children %}
        <li><a href="{{ child.url }}">{{ child.label }}</a></li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
```

## Repeating Module Fields

Looping over repeater field values:

```html
{% for slide in module.slides %}
  <div class="slide">
    <img src="{{ slide.image.src }}" alt="{{ slide.image.alt }}">
    <h3>{{ slide.title }}</h3>
    <p>{{ slide.description }}</p>
  </div>
{% endfor %}
```
