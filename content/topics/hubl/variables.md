# HubL Variables

HubL variables are predefined values used in templates to render dynamic content. They're wrapped in `{{ }}` delimiters.

## Variable Syntax

```html
{{ variable_name }}
{{ object.property }}
{{ object["property"] }}
```

## Universal Variables

Available in all template types:

### Content Variables

```html
{{ content.absolute_url }}     <!-- Full page URL -->
{{ content.name }}             <!-- Page internal name or post title -->
{{ content.slug }}             <!-- URL slug -->
{{ content.publish_date }}     <!-- Publication date -->
{{ content_id }}               <!-- Unique page/post ID -->
```

### Page Meta

```html
{{ page_meta.html_title }}        <!-- Page title for <title> tag -->
{{ page_meta.meta_description }}  <!-- SEO meta description -->
{{ page_meta.canonical_url }}     <!-- Canonical URL -->
```

### Account & Portal

```html
{{ hub_id }}        <!-- HubSpot account ID -->
{{ portal_id }}     <!-- Same as hub_id -->
{{ year }}          <!-- Current year -->
{{ local_dt }}      <!-- Current time in report timezone -->
{{ local_time_zone }} <!-- Configured timezone -->
```

### Contact Data

```html
{{ contact.firstname }}           <!-- Known visitor's first name -->
{{ contact.email }}               <!-- Contact email -->
{{ account.name }}                <!-- Associated company name -->
```

**Note**: Using contact variables disables page caching.

## Required Template Variables

These must be included in templates:

```html
<!-- In <head> section -->
{{ standard_header_includes }}

<!-- Before closing </body> -->
{{ standard_footer_includes }}
```

## Request Variables

HTTP request information:

```html
{{ request.domain }}          <!-- Current domain -->
{{ request.full_url }}        <!-- Complete URL with query string -->
{{ request.path }}            <!-- URL path only -->
{{ request.query }}           <!-- Query string -->
{{ request.query_dict }}      <!-- Query params as dictionary -->
{{ request.remote_ip }}       <!-- Visitor IP address -->
{{ request.referrer }}        <!-- Previous page URL -->
{{ request.search_engine }}   <!-- Search engine if from search -->
{{ request.search_keyword }}  <!-- Search keyword if from search -->
```

## Blog Variables

### Post Variables

```html
{{ content.post_body }}               <!-- Full post content -->
{{ content.blog_post_author.name }}   <!-- Author name -->
{{ content.blog_post_author.bio }}    <!-- Author bio -->
{{ content.tag_list }}                <!-- Tags for looping -->
```

### Listing Variables

```html
{{ contents }}              <!-- Sequence of posts for iteration -->
{{ group.absolute_url }}    <!-- Blog base URL -->
{{ current_page_num }}      <!-- Current page number -->
{{ last_page_num }}         <!-- Total pages -->
```

## Email Variables

Required for CAN-SPAM compliance:

```html
{{ site_settings.company_name }}
{{ site_settings.company_city }}
{{ site_settings.company_state }}
{{ site_settings.company_street_address_1 }}
{{ unsubscribe_link }}
```

Email content:

```html
{{ content.subject }}         <!-- Email subject -->
{{ content.email_body }}      <!-- Email body content -->
{{ content.from_name }}       <!-- Sender name -->
{{ primary_accent_color }}    <!-- Brand color (hex) -->
```

## Editor Detection

Check if in preview/editor mode:

```html
{{ is_in_page_editor }}      <!-- True in page editor -->
{{ is_in_email_editor }}     <!-- True in email editor -->
{{ is_in_previewer }}        <!-- True in any previewer -->
{{ is_in_hs_app }}           <!-- True in HubSpot app -->
```

## Dynamic Page Variables

For CRM object and HubDB dynamic pages:

```html
{{ dynamic_page_crm_object }}       <!-- CRM object data -->
{{ dynamic_page_hubdb_row }}        <!-- HubDB row data -->
{{ dynamic_page_route_level }}      <!-- Nesting depth -->
```

## Debugging Variables

Use `|pprint` filter to inspect:

```html
{{ content|pprint }}
{{ request|pprint }}
```

## CSS Classes Variable

Dynamic CSS classes for the body:

```html
<body class="{{ builtin_body_classes }}">
```

This adds classes like `hs-content-id-123456789` for targeting specific pages.
