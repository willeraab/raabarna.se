# Raab Consulting Group - Documentation

This directory contains all project documentation for the Raab Consulting Group website.

## Documentation Files

### [CLAUDE.MD](CLAUDE.MD) - Development Guide ⭐
**Primary reference for Claude Code and developers**

What's inside:
- Project goals and technical architecture
- Complete site structure (6 pages)
- Component architecture (9 reusable components)
- Design guidelines (colors, typography, layout)
- Development phases (Foundation → Content → Polish → Testing)
- TypeScript data structures

**Use when:** Building features, understanding architecture, planning changes

---

### [CONTENT.md](CONTENT.md) - Content Reference
**Brand voice and content examples**

What's inside:
- Complete consultant bios (Wilhelm, Nina, Gabriel, Linnéa, Vendela, Vidar)
- Service descriptions for 6 divisions
- 4 detailed case studies
- Testimonials, statistics, office info
- SEO metadata

**Use when:** Writing new content, understanding tone, updating copy

---

### [PROJECT-SETUP.md](PROJECT-SETUP.md) - Setup & Configuration
**Technical setup and build instructions**

What's inside:
- Current development commands (`yarn dev`, `yarn build`, etc.)
- Initial setup steps (already completed)
- Tailwind CSS configuration
- TypeScript interfaces
- Testing and production checklists

**Use when:** Initial setup, troubleshooting builds, deployment

---

### [GIT-GUIDELINES.md](GIT-GUIDELINES.md) - Commit Standards
**Git commit message format and rules**

What's inside:
- Conventional commit format guidelines
- Examples of good vs bad commit messages
- Important rule: No AI attribution in commits

**Use when:** Creating commits for this project

## Quick Reference

### Actual Content Lives Here:
The website content displayed to users is stored in:
- `/src/data/consultants.ts` - Team member information
- `/src/data/services.ts` - Service offerings
- `/src/data/caseStudies.ts` - Case studies
- `/src/data/testimonials.ts` - Client reviews
- `/src/data/packages.ts` - Service packages
- `/src/data/stats.ts` - Homepage statistics

### To Update Website Content:
Edit the TypeScript files in `/src/data/` - they are the source of truth for the live website.

### To Update Documentation:
Edit the markdown files in this directory (`/docs/`) to keep documentation in sync with the actual implementation.

## Project Structure

```
raabarna.se/
├── docs/                   # Documentation (this folder)
│   ├── CLAUDE.MD          # Development guide
│   ├── CONTENT.md         # Website content reference
│   ├── PROJECT-SETUP.md   # Setup instructions
│   └── README.md          # This file
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── data/             # Content data (actual source of truth)
│   ├── types/            # TypeScript interfaces
│   └── assets/           # Images and static files
├── public/               # Public assets
└── README.md            # Main project README
```

## Development Workflow

1. **Planning/Design Changes:** Reference `CLAUDE.MD`
2. **Content Updates:** Edit files in `/src/data/`
3. **New Features:** Follow architecture in `CLAUDE.MD`
4. **Production Build:** Run `yarn build` to create optimized build

---

**Note:** This is a family project for the Raab family. All content is customized for Wilhelm, Nina, Gabriel, Linnéa, Vendela, and Vidar.
