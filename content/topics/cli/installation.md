# HubSpot CLI Installation

The HubSpot CLI is the recommended tool for local development with HubSpot CMS.

## Prerequisites

- **Node.js**: Version 18 or higher
- **npm**: Comes with Node.js

## Installation

Install the HubSpot CLI globally:

```bash
npm install -g @hubspot/cli
```

Check the installed version:

```bash
hs --version
```

Update to the latest version:

```bash
npm i -g @hubspot/cli@latest
```

## Authentication

### Using Personal Access Key (Recommended)

1. Run the authentication command:

```bash
hs auth
```

2. Follow the prompts to:
   - Open HubSpot in your browser
   - Generate a personal access key
   - Paste the key when prompted

This creates a configuration file at `~/.hscli/config.yml`.

### Legacy Method (hubspot.config.yml)

For older setups using local config:

```bash
hs init
```

This creates a `hubspot.config.yml` in your current directory.

## Configuration File

The `~/.hscli/config.yml` structure:

```yaml
defaultPortal: my-sandbox
portals:
  - name: my-sandbox
    portalId: 12345678
    authType: personalaccesskey
    personalAccessKey: your-key-here
  - name: production
    portalId: 87654321
    authType: personalaccesskey
    personalAccessKey: another-key-here
```

## Managing Accounts

List all configured accounts:

```bash
hs accounts list
```

Switch default account:

```bash
hs accounts use my-sandbox
```

## Verify Installation

Test that everything is working:

```bash
hs cms ls
```

This should list files in your HubSpot design manager.

## Troubleshooting

### Permission Issues on macOS/Linux

If you get EACCES errors, fix npm permissions:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

Add the export line to your `~/.bashrc` or `~/.zshrc`.

### Config Migration

If using an older local `hubspot.config.yml`:

```bash
hs config migrate
```

This migrates to the centralized global config.
