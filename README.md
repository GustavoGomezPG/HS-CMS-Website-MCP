# HubSpot Website MCP

An MCP (Model Context Protocol) server providing comprehensive HubSpot CMS development documentation. Use it with Claude Desktop or any MCP-compatible client to get contextual information about building HubSpot websites.

## Features

- **HubL Templating**: Variables, loops, conditionals, filters, functions, macros, tags
- **Modules**: Creation, configuration, fields, meta.json
- **Templates**: Page, blog, email, partials, drag-and-drop areas
- **Themes**: Structure, theme.json, fields.json, theme fields
- **Sections**: Reusable drag-and-drop layouts
- **Fields**: All field types, visibility, repeaters, groups
- **Global Content**: Global modules and partials
- **Tailwind CSS**: Basic setup and Vite integration
- **CLI**: Installation, commands, workflows

## Installation

### Using npx (Recommended)

Add to your Claude Desktop config (`~/.claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "hubspot-website": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "github:GustavoGomezPG//HS-CMS-Website-MCP"]
    }
  }
}
```

### Local Installation

```bash
git clone https://github.com/GustavoGomezPG/HS-CMS-Website-MCP.git
cd hubspot-website-mcp
npm install
npm start
```

Then add to Claude Desktop config:

```json
{
  "mcpServers": {
    "hubspot-website": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/hubspot-website-mcp/server.js"]
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `list_topics` | List all available topics |
| `get_document` | Get a specific document from a topic |
| `get_topic` | Get all documents from a topic |
| `search` | Search across all documents |
| `get_index` | Get the main overview |

## Topics

- `getting-started` - CMS overview, file structure
- `cli` - Installation, commands
- `hubl` - Variables, conditionals, loops, filters, functions, macros, tags
- `modules` - Overview, configuration, hiding modules
- `templates` - Overview, drag-and-drop areas
- `themes` - Theme development
- `sections` - Section templates
- `fields` - Field types, configuration
- `global-content` - Global modules and partials
- `tailwind` - CSS setup, Vite integration

## Example Usage

Once configured, ask Claude:

- "How do I create a HubSpot module?"
- "What are the available HubL filters?"
- "How do I set up Tailwind CSS with HubSpot?"
- "Explain drag-and-drop areas in HubSpot templates"

## License

MIT
