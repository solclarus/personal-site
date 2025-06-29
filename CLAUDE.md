# CLAUDE.md
日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build
npm run start

# Code quality (uses Biome instead of ESLint/Prettier)
npm run check          # Check formatting, linting, imports
npm run format         # Format code
npm run lint           # Lint code
npm run check:fix      # Auto-fix all issues
npm run format:fix     # Auto-format code
npm run lint:fix       # Auto-fix linting issues
```

## Project Architecture

### Internationalization (i18n)
- **Routing**: Uses next-intl with English (`en`) and Japanese (`ja`) locales
- **Default locale**: English
- **Structure**: All pages are under `src/app/[locale]/` with locale-specific routing
- **Messages**: Translation files in `src/messages/en.json` and `src/messages/ja.json`
- **Middleware**: Automatic locale detection and routing via `src/middleware.ts`

### App Structure
- **Route Groups**: 
  - `(main)` - Standard pages (blog, portfolio, home)
  - `(lab)` - Interactive experiments and demos
- **Layout Hierarchy**: Root layout → Locale layout → Route group layouts → Page layouts

### Content Management
- **Blog**: Powered by Newt CMS with server-side data fetching via `src/lib/newt.ts`
- **Portfolio**: Static MDX content in `src/contents/` with bilingual support
- **Lab Projects**: Self-contained interactive demos with their own state management

### Key Patterns
- **Server Components**: Uses React Server Components by default with "server-only" imports
- **Data Fetching**: React `cache()` wrapper for server-side data fetching
- **State Management**: Zustand for client-side state (see lab projects)
- **Styling**: Tailwind CSS with shadcn/ui components in `src/components/ui/`
- **Animation**: Framer Motion ("motion" package) and custom particle systems

### Lab Projects Architecture
Each lab project is self-contained with:
- `page.tsx` - Main component
- `components/` - Project-specific components  
- `lib.ts` - Utility functions
- `store.ts` - Zustand state management (if needed)
- `type.ts` - TypeScript definitions
- `schema.ts` - Zod validation schemas (if needed)

### Code Quality Setup
- **Linter**: Biome (not ESLint) with tab indentation and double quotes
- **Git Hooks**: Lefthook runs Biome checks on pre-commit and pre-push
- **UI Components**: shadcn/ui components are excluded from linting (`src/components/ui/**`)

### Environment Variables
Required for Newt CMS integration:
- `NEWT_SPACE_UID`
- `NEWT_CDN_API_TOKEN`

## MDX Configuration
- **Plugins**: remarkGfm, remarkToc, rehypePrettyCode, rehypeSlug
- **Extensions**: `.md`, `.mdx` files supported
- **TOC**: Auto-generated with max depth 2, heading "Content"