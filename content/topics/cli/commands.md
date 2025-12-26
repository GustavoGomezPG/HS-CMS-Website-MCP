# HubSpot CLI Commands

Complete reference for HubSpot CLI commands.

## File Operations

### List Files

```bash
hs cms ls [path]
```

Lists files in the developer file system.

### Upload Files

```bash
hs cms upload <src> <dest>
```

Upload local files to HubSpot. Changes are live immediately.

Example:
```bash
hs cms upload ./src/theme my-theme
```

### Download Files

```bash
hs cms fetch <src> [dest]
```

Download files from HubSpot to local.

Options:
- `--overwrite`: Overwrite existing local files

Example:
```bash
hs cms fetch my-theme ./local-theme --overwrite
```

### Watch for Changes

```bash
hs cms watch <src> <dest>
```

Monitors local directory and auto-uploads changes.

Options:
- `--initial-upload`: Upload all files before watching
- `--remove`: Delete remote files when local files are deleted

Example:
```bash
hs cms watch ./src/theme my-theme --initial-upload
```

### Move Files

```bash
hs cms mv <src> <dest>
```

Move files within the developer file system.

### Remove Files

```bash
hs cms remove <path>
```

Delete files from HubSpot.

## Create Commands

### Create New Assets

```bash
hs cms create <type> <name> [dest]
```

Types available:
- `website-theme` - Full theme with boilerplate
- `template` - Template file
- `module` - Module folder structure
- `function` - Serverless function

Examples:

```bash
# Create a new theme
hs cms create website-theme my-theme

# Create a template
hs cms create template home-page ./templates

# Create a module
hs cms create module hero-banner ./modules
```

## Theme Commands

### Preview Theme

```bash
hs cms theme preview <theme-path>
```

Runs a local proxy server at `https://hslocal.net:3000/` for theme development.

### Lighthouse Score

```bash
hs cms lighthouse-score <theme-path>
```

Evaluates theme using Google Lighthouse for SEO and accessibility.

## Account Management

### List Accounts

```bash
hs accounts list
```

Shows name, ID, and auth type for each configured account.

### Switch Account

```bash
hs accounts use <account-name-or-id>
```

Sets the default account for CLI operations.

## HubDB Commands

### Create Table

```bash
hs hubdb create <src>
```

Create a HubDB table from a JSON file.

### Fetch Table

```bash
hs hubdb fetch <tableId> <dest>
```

Download HubDB table data.

### Clear Table

```bash
hs hubdb clear <tableId>
```

Remove all rows from a table.

### Delete Table

```bash
hs hubdb delete <tableId>
```

Delete an entire HubDB table.

## Secrets Management

### Add Secret

```bash
hs secrets add <name>
```

Add a new secret for serverless functions.

### List Secrets

```bash
hs secrets list
```

List all secrets (names only, not values).

### Update Secret

```bash
hs secrets update <name>
```

Update an existing secret.

### Delete Secret

```bash
hs secrets delete <name>
```

Remove a secret.

## Custom Objects

### Create Schema

```bash
hs custom-object create <definition>
```

Create a custom object schema.

## Diagnostics

### Doctor Command

```bash
hs doctor
```

Retrieves diagnostic information about local configurations.

## Common Workflows

### Initial Theme Setup

```bash
# Create theme
hs cms create website-theme my-theme

# Upload to HubSpot
cd my-theme
hs cms upload . my-theme

# Start watching
hs cms watch . my-theme
```

### Sync Existing Theme

```bash
# Fetch from HubSpot
hs cms fetch my-theme ./my-theme --overwrite

# Make changes locally, then watch
hs cms watch ./my-theme my-theme
```
