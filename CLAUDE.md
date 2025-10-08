# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository.

## Project Overview

This is a Mintlify-based documentation site for Polarity. The doc set has been reset and now contains three pages: a quick start, a dashboard overview, and a CLI reference.

## Development Commands

```bash
# Install Mintlify CLI (required the first time)
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
- Root `.mdx` files: `quickstart.mdx`, `dashboard.mdx`, `cli.mdx`
- `/images/`: Shared imagery
- `/logo/`: Brand assets

### Configuration
- `docs.json`: Navigation, branding, and integration settings
- `package.json`: Node.js dependencies and scripts

## Important Context

### Deployment
- Changes pushed to the `main` branch deploy through the connected GitHub workflow.
- No manual build or deployment steps required locally beyond verification.

### Documentation Standards
- All documentation content lives in MDX files.
- Navigation is driven entirely by `docs.json`.
- Keep content concise while the new structure is under construction.

### Polarity Product Pillars
- **GitHub App**: Connects repositories for automated analysis.
- **CLI Tool**: `pt` command-line workflow for stacked pull requests.
- **Dashboard**: Web interface for monitoring activity, usage, and team settings.
