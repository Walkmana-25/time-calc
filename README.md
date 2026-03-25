# Time Calculator

A time-focused calculator web application built with Vite, React, Chakra UI, and TypeScript.

## Features

- Time input in dd:hh:mm:ss format
- Unique digit input flow (ss → mm → hh → dd)
- Basic operations: addition and subtraction
- Limited operations: scalar multiplication/division
- Light/Dark mode support
- i18n support (Japanese/English)
- Responsive design
- Static Site Generation (SSG) ready

## Tech Stack

- [Vite](https://vitejs.dev/) - Build tool
- [React](https://react.dev/) - UI framework
- [Chakra UI](https://chakra-ui.com/) - Component library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [i18next](https://www.i18next.com/) - Internationalization
- [Vitest](https://vitest.dev/) - Testing framework

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

The application will be available at http://localhost:5173

## Build

```bash
pnpm build
```

Static files will be generated in the `dist/` directory.

## Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test --watch
```

## Linting

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Project Structure

```
src/
├── components/          # React components
│   ├── calculator/      # Calculator-specific components
│   ├── layout/          # Layout components (Header, ThemeToggle)
│   └── i18n/            # Language selector component
├── hooks/               # Custom React hooks
│   ├── useCalculator.ts # Calculator state and operations
│   └── useTimeInput.ts  # Input flow management
├── utils/               # Utility functions
│   ├── timeCalculator.ts # Time calculation logic
│   └── __tests__/       # Unit tests
├── types/               # TypeScript type definitions
│   └── time.ts
├── i18n/                # i18n configuration
├── theme/               # Chakra UI theme
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## License

MIT
