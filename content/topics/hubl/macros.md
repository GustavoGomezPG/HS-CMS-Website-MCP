# HubL Macros

Macros are reusable code blocks that accept parameters. They're similar to functions and help avoid repetitive code.

## Basic Syntax

### Defining a Macro

```html
{% macro macro_name(param1, param2) %}
  <div class="output">
    <h3>{{ param1 }}</h3>
    <p>{{ param2 }}</p>
  </div>
{% endmacro %}
```

### Calling a Macro

```html
{{ macro_name("Title Text", "Description text here") }}
```

## Where Macros Work

Macros can be used in:
- Template HTML files
- Module HTML files (module.html)
- CSS files (not module.css)
- Template partials

## Practical Examples

### Button Macro

```html
{% macro button(text, url, style="primary") %}
  <a href="{{ url }}" class="btn btn-{{ style }}">
    {{ text }}
  </a>
{% endmacro %}

<!-- Usage -->
{{ button("Learn More", "/about") }}
{{ button("Buy Now", "/shop", "success") }}
{{ button("Cancel", "/", "outline") }}
```

### Card Component

```html
{% macro card(title, content, image_url="", link_url="") %}
  <div class="card">
    {% if image_url %}
      <img src="{{ image_url }}" alt="{{ title }}" class="card-image">
    {% endif %}
    <div class="card-body">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-content">{{ content }}</p>
      {% if link_url %}
        <a href="{{ link_url }}" class="card-link">Read more</a>
      {% endif %}
    </div>
  </div>
{% endmacro %}

<!-- Usage -->
{{ card(
  "Our Services",
  "We provide excellent solutions.",
  "/images/services.jpg",
  "/services"
) }}
```

### Social Links

```html
{% macro social_icon(platform, url) %}
  {% if url %}
    <a href="{{ url }}" class="social-link social-{{ platform }}"
       target="_blank" rel="noopener">
      <span class="sr-only">Follow us on {{ platform }}</span>
      <i class="icon-{{ platform }}"></i>
    </a>
  {% endif %}
{% endmacro %}

<!-- Usage -->
<div class="social-links">
  {{ social_icon("facebook", "https://facebook.com/company") }}
  {{ social_icon("twitter", "https://twitter.com/company") }}
  {{ social_icon("linkedin", "https://linkedin.com/company/company") }}
</div>
```

## CSS Helper Macros

### RGBA Conversion

```html
{% macro to_rgba(hex, opacity) %}
rgba({{ hex|convert_rgb }}, {{ opacity / 100 }})
{% endmacro %}

/* Usage in CSS */
.overlay {
  background-color: {{ to_rgba("#000000", 50) }};
}
```

### Responsive Font Size

```html
{% macro fluid_type(min_size, max_size, min_width=320, max_width=1200) %}
  font-size: {{ min_size }}px;

  @media (min-width: {{ min_width }}px) {
    font-size: calc({{ min_size }}px + ({{ max_size }} - {{ min_size }}) * ((100vw - {{ min_width }}px) / ({{ max_width }} - {{ min_width }})));
  }

  @media (min-width: {{ max_width }}px) {
    font-size: {{ max_size }}px;
  }
{% endmacro %}

/* Usage */
h1 {
  {{ fluid_type(24, 48) }}
}
```

## Default Parameter Values

```html
{% macro alert(message, type="info", dismissible=false) %}
  <div class="alert alert-{{ type }} {% if dismissible %}alert-dismissible{% endif %}">
    {{ message }}
    {% if dismissible %}
      <button type="button" class="close">&times;</button>
    {% endif %}
  </div>
{% endmacro %}

{{ alert("Welcome!") }}
{{ alert("Error occurred", "danger", true) }}
```

## Importing Macros

### Create a Macro File

`macros/helpers.html`:

```html
{% macro button(text, url) %}
  <a href="{{ url }}" class="btn">{{ text }}</a>
{% endmacro %}

{% macro icon(name) %}
  <i class="icon icon-{{ name }}"></i>
{% endmacro %}
```

### Import and Use

```html
{% import "macros/helpers.html" as helpers %}

{{ helpers.button("Click me", "/page") }}
{{ helpers.icon("star") }}
```

### Import Specific Macros

```html
{% from "macros/helpers.html" import button, icon %}

{{ button("Click me", "/page") }}
{{ icon("star") }}
```

## Simulating Return Values

Macros don't have return values, but you can simulate them:

```html
{% macro calculate_sum(a, b, result) %}
  {% do result.update({"value": a + b}) %}
{% endmacro %}

{% set result = {} %}
{% do calculate_sum(5, 3, result) %}
<p>Sum: {{ result.value }}</p>  <!-- Sum: 8 -->
```

## Recursive Macros

For nested structures like menus:

```html
{% macro render_menu(items) %}
  <ul>
    {% for item in items %}
      <li>
        <a href="{{ item.url }}">{{ item.label }}</a>
        {% if item.children %}
          {{ render_menu(item.children) }}
        {% endif %}
      </li>
    {% endfor %}
  </ul>
{% endmacro %}

{{ render_menu(menu("main-menu")) }}
```

## Best Practices

1. **Keep macros focused**: Each macro should do one thing well
2. **Use default values**: Make common use cases simple
3. **Document parameters**: Comment what each parameter does
4. **Organize in files**: Group related macros together
5. **Consider performance**: Avoid complex logic in frequently-called macros
