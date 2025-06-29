# Personal Site

A modern personal website built with Next.js, featuring a portfolio, blog, and interactive lab experiments.

## Features

- **🌐 Internationalization**: Full support for English and Japanese with next-intl
- **📝 Blog**: Powered by Newt CMS with server-side rendering
- **💼 Portfolio**: MDX-based project showcases with bilingual content
- **🧪 Lab**: Interactive experiments and demos including:
  - FeedMatrix: RSS feed aggregator and reader
  - Vista Voyage: Animated particle system themes
- **🎨 Modern UI**: Built with shadcn/ui and Tailwind CSS
- **✨ Animations**: Smooth interactions with Framer Motion
- **🌓 Theme Support**: Light/dark mode switching

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Content**: MDX for portfolio, Newt CMS for blog
- **Animation**: Framer Motion (motion package)
- **State Management**: Zustand for client-side state
- **Code Quality**: Biome for linting and formatting
- **Git Hooks**: Lefthook for pre-commit checks

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   # Required for Newt CMS integration
   NEWT_SPACE_UID=your_space_uid
   NEWT_CDN_API_TOKEN=your_api_token
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run check        # Check formatting, linting, imports
npm run format       # Format code
npm run lint         # Lint code
npm run check:fix    # Auto-fix all issues
```

## Project Structure

```
src/
├── app/[locale]/           # Internationalized routing
│   ├── (main)/            # Main pages (home, blog, portfolio)
│   └── (lab)/             # Interactive lab experiments
├── components/            # Reusable UI components
├── lib/                   # Utility functions and data fetching
├── messages/              # i18n translation files
├── contents/              # MDX portfolio content
└── types/                 # TypeScript type definitions
```

## Lab Projects

Each lab project is self-contained with its own:
- `components/` - Project-specific React components
- `lib.ts` - Utility functions
- `store.ts` - Zustand state management
- `type.ts` - TypeScript definitions
- `schema.ts` - Zod validation schemas

## Deployment

This project is optimized for deployment on Vercel. Simply connect your repository and deploy with zero configuration.

## License

MIT License - feel free to use this project as a template for your own personal site.