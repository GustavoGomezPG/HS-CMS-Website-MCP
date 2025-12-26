# HubL Filters

Filters modify output using the pipe operator `|`. They can be chained together.

## Filter Syntax

```html
{{ variable|filter }}
{{ variable|filter(param) }}
{{ variable|filter1|filter2|filter3 }}
```

String parameters require quotes:

```html
{{ variable|replace("old", "new") }}
```

## Text Transformation

### Case Conversion

```html
{{ "hello world"|upper }}      <!-- HELLO WORLD -->
{{ "HELLO WORLD"|lower }}      <!-- hello world -->
{{ "hello world"|capitalize }} <!-- Hello world -->
{{ "hello world"|title }}      <!-- Hello World -->
```

### String Manipulation

```html
{{ "  hello  "|trim }}                    <!-- "hello" -->
{{ "<p>text</p>"|striptags }}             <!-- "text" -->
{{ "hello"|replace("l", "L") }}           <!-- heLLo -->
{{ "hello world"|cut(" ") }}              <!-- helloworld -->
{{ "hello"|center(11) }}                  <!-- "   hello   " -->
```

### Length Control

```html
{{ "long text here"|truncate(10) }}       <!-- "long te..." -->
{{ "long text here"|truncatehtml(10) }}   <!-- Preserves HTML -->
{{ "word1 word2 word3"|wordwrap(10) }}    <!-- Wraps at width -->
```

## Escaping & Security

### HTML Escaping

```html
{{ user_input|escape }}           <!-- Escape HTML entities -->
{{ user_input|escape_html }}      <!-- Same as escape -->
{{ content|escape_attr }}         <!-- For HTML attributes -->
{{ url|escape_url }}              <!-- URL encoding -->
{{ code|escape_js }}              <!-- JavaScript escaping -->
{{ data|escapejson }}             <!-- JSON escaping -->
```

### Sanitization

```html
{{ html_content|sanitize_html }}  <!-- Strips unsafe tags -->
{{ trusted_content|safe }}        <!-- Mark as pre-escaped -->
```

## Math Operations

```html
{{ -5|abs }}                  <!-- 5 -->
{{ 5|add(3) }}                <!-- 8 -->
{{ 10|subtract(3) }}          <!-- 7 -->
{{ 5|multiply(3) }}           <!-- 15 -->
{{ 10|divide(3) }}            <!-- 3.333... -->
{{ 3.7|round }}               <!-- 4 -->
{{ 3.7|round(1) }}            <!-- 3.7 -->
{{ 3.7|int }}                 <!-- 3 -->
{{ 3|float }}                 <!-- 3.0 -->
{{ 27|root(3) }}              <!-- 3.0 (cube root) -->
{{ 100|log(10) }}             <!-- 2.0 -->
```

## Date/Time Formatting

### Format Dates

```html
{{ content.publish_date|format_date("MMMM d, yyyy") }}
<!-- Output: January 15, 2024 -->

{{ content.publish_date|format_date("MM/dd/yy") }}
<!-- Output: 01/15/24 -->

{{ content.publish_date|format_datetime("yyyy-MM-dd HH:mm") }}
<!-- Output: 2024-01-15 14:30 -->
```

### Date Patterns

| Pattern | Output Example |
|---------|----------------|
| `yyyy` | 2024 |
| `yy` | 24 |
| `MMMM` | January |
| `MMM` | Jan |
| `MM` | 01 |
| `M` | 1 |
| `dd` | 05 |
| `d` | 5 |
| `EEEE` | Monday |
| `EEE` | Mon |
| `HH` | 14 (24-hour) |
| `hh` | 02 (12-hour) |
| `mm` | 30 |
| `ss` | 45 |
| `a` | PM |

### Date Manipulation

```html
{{ content.publish_date|plus_time(7, "days") }}
{{ content.publish_date|minus_time(1, "month") }}
{{ content.created|between_times(content.updated, "days") }}
```

### Parse Strings to Dates

```html
{{ "2024-01-15"|strtodate("yyyy-MM-dd") }}
{{ "14:30:00"|strtotime("HH:mm:ss") }}
```

## Collection Filters

### Basic Operations

```html
{{ items|length }}          <!-- Number of items -->
{{ items|first }}           <!-- First item -->
{{ items|last }}            <!-- Last item -->
{{ items|reverse }}         <!-- Reversed list -->
{{ items|sort }}            <!-- Sorted list -->
{{ items|unique }}          <!-- Remove duplicates -->
```

### Slicing and Joining

```html
{{ items|slice(0, 3) }}             <!-- First 3 items -->
{{ items|batch(3) }}                <!-- Groups of 3 -->
{{ items|join(", ") }}              <!-- "a, b, c" -->
```

### Filtering Collections

```html
{{ items|select("published") }}     <!-- Filter by property -->
{{ items|reject("draft") }}         <!-- Exclude by property -->
{{ items|selectattr("active") }}    <!-- Filter by attribute -->
{{ items|rejectattr("hidden") }}    <!-- Exclude by attribute -->
```

### Mapping

```html
{{ items|map("name") }}                    <!-- Extract property -->
{{ items|map(attribute="title") }}         <!-- Same as above -->
{{ items|groupby("category") }}            <!-- Group by property -->
```

## JSON Filters

```html
{{ json_string|fromjson }}     <!-- Parse JSON to object -->
{{ object|tojson }}            <!-- Convert to JSON string -->
```

## Advanced Filters

### Hashing

```html
{{ "string"|md5 }}             <!-- MD5 hash -->
```

### Rendering HubL

```html
{{ hubl_string|render }}       <!-- Process HubL in string -->
```

### Debug Output

```html
{{ complex_object|pprint }}    <!-- Pretty print for debugging -->
```

## URL Filters

```html
{{ file_path|get_asset_url }}          <!-- CDN URL for asset -->
{{ "param=value"|urlencode }}          <!-- URL encode string -->
```

## Default Values

```html
{{ missing_value|default("fallback") }}
{{ user.name|default("Anonymous", true) }}  <!-- Use default for falsy values -->
```

## Platform Restriction

**Important**: Filters work on CMS pages and blog content only. They do not work in email templates.
