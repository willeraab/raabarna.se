# Raab Consulting Group Website

A humorous parody consultancy website featuring a family posing as professional business consultants with absurdly varied expertise.

## Quick Start

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview
```

> **Note:** This project uses Yarn as the package manager. Make sure you have Yarn installed: `npm install -g yarn`

## Project Goals

Create a professional-looking corporate consultancy website that gradually reveals itself to be a family with hilariously mismatched "consulting" services ranging from business strategy to bedtime negotiation.

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds
- **Tailwind CSS** for styling
- **React Router** for navigation

## Documentation

This project is designed for AI-assisted development with Claude Code. All specifications are in the `/docs` folder:

- **[docs/CLAUDE.MD](docs/CLAUDE.MD)** - Primary development reference (architecture, design, phases)
- **[docs/CONTENT.md](docs/CONTENT.md)** - Content source for data files
- **[docs/PROJECT-SETUP.md](docs/PROJECT-SETUP.md)** - Setup and configuration guide

**For Claude Code users:** Start with [docs/CLAUDE.MD](docs/CLAUDE.MD) for project context.

## Development Approach

This project is designed to be built with Claude Code assistance. The documentation files contain complete specifications for AI-assisted development.

## Customization

All website content is in TypeScript data files under `src/data/`. Edit these files to update:
- `consultants.ts` - Consultant profiles and bios
- `services.ts` - Service offerings and descriptions
- `caseStudies.ts` - Case study details
- `testimonials.ts` - Client testimonials
- `packages.ts` - Service packages and pricing
- `stats.ts` - Homepage statistics

See [docs/CONTENT.md](docs/CONTENT.md) for complete content reference and tone guidelines.

## License

Private family project - All rights reserved
