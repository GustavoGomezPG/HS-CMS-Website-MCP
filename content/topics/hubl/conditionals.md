# HubL Conditionals

Control template rendering based on conditions.

## If Statements

Basic syntax:

```html
{% if condition %}
  <!-- Rendered if condition is true -->
{% endif %}
```

## If/Else

```html
{% if user_logged_in %}
  <p>Welcome back!</p>
{% else %}
  <p>Please log in</p>
{% endif %}
```

## If/Elif/Else

Multiple conditions:

```html
{% if score >= 90 %}
  <span class="grade">A</span>
{% elif score >= 80 %}
  <span class="grade">B</span>
{% elif score >= 70 %}
  <span class="grade">C</span>
{% else %}
  <span class="grade">F</span>
{% endif %}
```

**Note**: You can have unlimited `elif` statements but only one `else`.

## Unless Statements

Inverse of if - renders when condition is false:

```html
{% unless is_hidden %}
  <div class="content">This is visible</div>
{% endunless %}
```

With else:

```html
{% unless show_advanced %}
  <p>Basic mode</p>
{% else %}
  <p>Advanced mode</p>
{% endunless %}
```

**Note**: `unless` does not support `elif`.

## Ifchanged

Renders only when a variable changes:

```html
{% for post in posts %}
  {% ifchanged post.category %}
    <h2>{{ post.category }}</h2>
  {% endifchanged %}
  <p>{{ post.title }}</p>
{% endfor %}
```

## Inline Conditionals

Single-line conditional assignment:

```html
{% set color = "Blue" if is_blue is truthy else "Red" %}
{% set status = "Active" if user.active else "Inactive" %}
```

## Ternary Operators

Quick conditional output:

```html
{{ is_featured ? "Featured" : "Standard" }}
{{ has_discount ? sale_price : regular_price }}
```

## Comparison Operators

| Operator | Shorthand | Description |
|----------|-----------|-------------|
| `==` | `eq` | Equal to |
| `!=` | `ne` | Not equal to |
| `>` | `gt` | Greater than |
| `>=` | `gte` | Greater than or equal |
| `<` | `lt` | Less than |
| `<=` | `lte` | Less than or equal |

Examples:

```html
{% if count == 0 %}Empty{% endif %}
{% if price > 100 %}Expensive{% endif %}
{% if age >= 18 %}Adult{% endif %}
```

## Logical Operators

### And

```html
{% if is_logged_in and has_permission %}
  <button>Edit</button>
{% endif %}
```

### Or

```html
{% if is_admin or is_moderator %}
  <a href="/dashboard">Dashboard</a>
{% endif %}
```

### Not

```html
{% if not is_disabled %}
  <button>Submit</button>
{% endif %}
```

### Combining Operators

```html
{% if (is_member and subscription_active) or is_admin %}
  <div class="premium-content">...</div>
{% endif %}
```

## Expression Tests

Use `is` keyword for type/value testing:

```html
{% if variable is defined %}
  {{ variable }}
{% endif %}

{% if name is string %}
  <p>{{ name }}</p>
{% endif %}

{% if items is iterable %}
  {% for item in items %}...{% endfor %}
{% endif %}
```

### Common Expression Tests

| Test | Description |
|------|-------------|
| `is defined` | Variable exists |
| `is undefined` | Variable doesn't exist |
| `is none` | Value is null |
| `is truthy` | Evaluates to true |
| `is string` | Is a string type |
| `is number` | Is numeric |
| `is integer` | Is an integer |
| `is float` | Is a float |
| `is mapping` | Is a dictionary |
| `is iterable` | Can be looped |
| `is sequence` | Is a sequence |
| `is boolean` | Is boolean type |
| `is even` | Number is even |
| `is odd` | Number is odd |
| `is divisibleby(n)` | Divisible by n |
| `is equalto(value)` | Equals value |
| `is sameas(var)` | Same as another var |
| `is containing(value)` | List contains value |
| `is string_containing(str)` | String contains substring |
| `is string_startingwith(str)` | String starts with |
| `is lower` | Is lowercase |
| `is upper` | Is uppercase |

Examples:

```html
{% if email is string_containing("@") %}
  Valid email format
{% endif %}

{% if count is divisibleby(2) %}
  Even count
{% endif %}

{% if tags is containing("featured") %}
  Featured item
{% endif %}
```
