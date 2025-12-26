#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class HubSpotWebsiteMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'hubspot-website-mcp',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  /**
   * Get list of all available topics
   * Topics are directories inside the content/topics folder
   */
  async getTopicsList() {
    const topicsPath = path.join(__dirname, 'content', 'topics');
    const topics = [];

    try {
      const entries = await fs.readdir(topicsPath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const topicPath = path.join(topicsPath, entry.name);
          const files = await fs.readdir(topicPath);
          const mdFiles = files.filter(file => file.endsWith('.md'));

          topics.push({
            name: entry.name,
            documentCount: mdFiles.length,
            documents: mdFiles.map(f => f.replace('.md', ''))
          });
        }
      }
    } catch (error) {
      console.error('Error reading topics:', error.message);
    }

    return topics;
  }

  /**
   * Get a specific document from a topic
   */
  async getDocument(topic, documentName) {
    const docPath = path.join(__dirname, 'content', 'topics', topic, `${documentName}.md`);

    try {
      const content = await fs.readFile(docPath, 'utf-8');
      return {
        topic,
        document: documentName,
        content: content.trim()
      };
    } catch (error) {
      throw new Error(`Document '${documentName}' not found in topic '${topic}'`);
    }
  }

  /**
   * Get all documents from a topic
   */
  async getTopicDocuments(topic) {
    const topicPath = path.join(__dirname, 'content', 'topics', topic);

    try {
      const files = await fs.readdir(topicPath);
      const mdFiles = files.filter(file => file.endsWith('.md'));

      const documents = [];
      for (const file of mdFiles) {
        const filePath = path.join(topicPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        documents.push({
          name: file.replace('.md', ''),
          content: content.trim()
        });
      }

      return {
        topic,
        documents
      };
    } catch (error) {
      throw new Error(`Topic '${topic}' not found`);
    }
  }

  /**
   * Search across all documents
   */
  async searchDocuments(query) {
    const topics = await this.getTopicsList();
    const results = [];
    const queryLower = query.toLowerCase();

    for (const topic of topics) {
      const topicPath = path.join(__dirname, 'content', 'topics', topic.name);

      for (const docName of topic.documents) {
        const filePath = path.join(topicPath, `${docName}.md`);

        try {
          const content = await fs.readFile(filePath, 'utf-8');

          // Search in document name and content
          if (docName.toLowerCase().includes(queryLower) ||
              content.toLowerCase().includes(queryLower)) {

            // Find matching lines for context
            const lines = content.split('\n');
            const matchingLines = lines
              .filter(line => line.toLowerCase().includes(queryLower))
              .slice(0, 3);

            results.push({
              topic: topic.name,
              document: docName,
              matchType: docName.toLowerCase().includes(queryLower) ? 'title' : 'content',
              preview: matchingLines.length > 0
                ? matchingLines.join('\n').substring(0, 200)
                : content.substring(0, 200)
            });
          }
        } catch (error) {
          // Skip files that can't be read
          continue;
        }
      }
    }

    return results;
  }

  /**
   * Get the index/overview document if it exists
   */
  async getIndex() {
    const indexPath = path.join(__dirname, 'content', 'index.md');

    try {
      const content = await fs.readFile(indexPath, 'utf-8');
      return content.trim();
    } catch (error) {
      // Return a generated index if no index.md exists
      const topics = await this.getTopicsList();
      let index = '# Information Index\n\n';
      index += 'Available topics:\n\n';

      for (const topic of topics) {
        index += `## ${topic.name}\n`;
        index += `${topic.documentCount} document(s): ${topic.documents.join(', ')}\n\n`;
      }

      return index;
    }
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'list_topics',
            description: 'List all available information topics and their documents',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'get_document',
            description: 'Get a specific document from a topic',
            inputSchema: {
              type: 'object',
              properties: {
                topic: {
                  type: 'string',
                  description: 'The topic name (folder name)',
                },
                document: {
                  type: 'string',
                  description: 'The document name (without .md extension)',
                },
              },
              required: ['topic', 'document'],
            },
          },
          {
            name: 'get_topic',
            description: 'Get all documents from a specific topic',
            inputSchema: {
              type: 'object',
              properties: {
                topic: {
                  type: 'string',
                  description: 'The topic name to retrieve all documents from',
                },
              },
              required: ['topic'],
            },
          },
          {
            name: 'search',
            description: 'Search across all documents for a query',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search term to find in document titles and content',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_index',
            description: 'Get the main index/overview of all available information',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'list_topics': {
            const topics = await this.getTopicsList();
            let output = '# Available Topics\n\n';

            if (topics.length === 0) {
              output += 'No topics found. Add markdown files to content/topics/<topic-name>/ to get started.\n';
            } else {
              for (const topic of topics) {
                output += `## ${topic.name}\n`;
                output += `Documents (${topic.documentCount}):\n`;
                for (const doc of topic.documents) {
                  output += `- ${doc}\n`;
                }
                output += '\n';
              }
            }

            return {
              content: [{ type: 'text', text: output }],
            };
          }

          case 'get_document': {
            const doc = await this.getDocument(args.topic, args.document);
            return {
              content: [
                {
                  type: 'text',
                  text: `# ${doc.document}\n\n**Topic:** ${doc.topic}\n\n---\n\n${doc.content}`,
                },
              ],
            };
          }

          case 'get_topic': {
            const topicData = await this.getTopicDocuments(args.topic);
            let output = `# Topic: ${topicData.topic}\n\n`;

            for (const doc of topicData.documents) {
              output += `## ${doc.name}\n\n${doc.content}\n\n---\n\n`;
            }

            return {
              content: [{ type: 'text', text: output }],
            };
          }

          case 'search': {
            const results = await this.searchDocuments(args.query);
            let output = `# Search Results for "${args.query}"\n\n`;

            if (results.length === 0) {
              output += 'No documents found matching your search.\n';
            } else {
              output += `Found ${results.length} result(s):\n\n`;
              for (const result of results) {
                output += `## ${result.document} (${result.topic})\n`;
                output += `*Matched by: ${result.matchType}*\n\n`;
                output += `> ${result.preview}...\n\n`;
              }
            }

            return {
              content: [{ type: 'text', text: output }],
            };
          }

          case 'get_index': {
            const index = await this.getIndex();
            return {
              content: [{ type: 'text', text: index }],
            };
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{ type: 'text', text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('HubSpot Website MCP server running on stdio');
  }
}

const server = new HubSpotWebsiteMCPServer();
server.run().catch(console.error);
