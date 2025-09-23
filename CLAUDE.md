# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Mintlify-based documentation website for Polarity, an AI-powered code optimization platform that automatically analyzes GitHub repositories and creates pull requests with intelligent improvements.

## Development Commands

```bash
# Install Mintlify CLI (required first time)
npm i -g mint

# Start local development server
mint dev              # Runs on port 3000
mint dev --port 3333  # Custom port

# Validate documentation
mint broken-links     # Check for broken links in documentation

# Update Mintlify CLI
mint update
```

## Architecture and Structure

### Key Technologies
- **Mintlify**: Documentation framework
- **MDX**: Markdown with JSX components
- **Node.js 19+**: Required runtime

### Content Organization
- `/ai-tools/`: Documentation for AI development tool integrations (Claude Code, Cursor, Windsurf)
- `/api-reference/`: API documentation with OpenAPI spec
- `/essentials/`: Mintlify feature documentation
- Root `.mdx` files: Main platform documentation (quickstart, dashboard, pull-requests, teams, polarity-cli)

### Configuration
- `docs.json`: Central configuration for navigation, branding, and integrations
- `package.json`: Node.js dependencies
- `/snippets/`: Reusable content components

## Important Context

### Deployment
- Changes automatically deploy to production when pushed to the main branch via GitHub App integration
- No manual build or deployment steps required

### Documentation Standards
- All documentation files use MDX format
- Navigation structure is defined in `docs.json`
- Images stored in `/images/` directory
- Brand assets in `/logo/` directory

### The Polarity Platform
When documenting Polarity features, understand these core concepts:
- **GitHub App**: Connects repositories for automatic analysis
- **AI Analysis**: Scans code for performance, security, and quality improvements
- **Pull Requests**: Automatically generated with intelligent suggestions
- **Teams**: Collaborative repository management
- **CLI Tool**: Git workflow assistant for stacked PR development (`polarity` command)
- **Dashboard**: Web interface for monitoring and management