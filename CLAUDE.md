# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a NestJS monorepo template with the following stack:
- **Framework**: NestJS (Node.js)
- **Database**: MySQL with Prisma ORM
- **Package Manager**: pnpm
- **Architecture**: Monorepo with pnpm workspaces
- **Logging**: Winston + Sentry integration
- **API Documentation**: Swagger/OpenAPI

## Development Commands

### Essential Commands
```bash
# Install dependencies
pnpm install

# Database setup (first time)
npm run prisma:migrate:dev --init dbname

# Database migrations (after schema changes)
npm run prisma:migrate:dev

# Generate Prisma client
npm run prisma:generate

# Start development server (backend)
pnpm start:dev

# Start frontend development server
pnpm start:dev:web

# Build for production
npm run build

# Start production server
npm run start
```

### Testing & Quality
```bash
# Run all tests with coverage
npm run test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e

# Lint and fix code
npm run lint

# Format code
npm run format

# Pre-commit hooks (runs automatically)
npm run pre-commit
```

### Database Commands
```bash
# Open Prisma Studio
npm run prisma:studio

# Run migrations for test environment
npm run prisma:migrate:test
```

## Project Architecture

This is a monorepo with the following structure:

```
├── apps/
│   ├── server/           # NestJS backend application
│   └── frontend/         # Frontend application
├── packages/
│   ├── core/             # Core functionality modules (auth, logger, response, database, config)
│   ├── shared/           # Shared types, interfaces, enums, constants
│   └── validator/        # Shared validation logic
├── bootstrap/           # Application startup logic
└── prisma/             # Database schema and migrations
```

### Module Organization
- **Business modules**: Located in `apps/server/modules/`
- **Core modules**: Located in `packages/core/` (auth, logger, response, database, config)
- **Shared utilities**: Located in `packages/shared/`

### Path Aliases
The project uses TypeScript path mapping:
- `@app/*` → `apps/server/*`
- `@packages/core/*` → `packages/core/*`
- `@packages/shared/*` → `packages/shared/*`

## Environment Setup

Required environment variables in `.env.development`:
- `DATABASE_URL`: MySQL connection string
- `SWAGGER_ENABLED`: Enable/disable Swagger docs (set to false in production)

Copy `.env.example` to `.env.development` and configure as needed.

## Requirements

- Node.js 20+
- pnpm 9+
- MySQL 8.0+

## Code Generation

The project includes NestCLI for generating boilerplate:

```bash
# Generate a complete resource (controller, service, module, etc.)
nest g resource users

# Generate individual components
nest g module users
nest g controller users
nest g service users
```

The NestCLI is configured with source root at `apps/server` and includes Swagger plugin integration.

## Testing Strategy

- Unit tests: `*.spec.ts` files alongside source code
- E2E tests: Located in `test/` directory
- Coverage reports: Generated in `./coverage/`
- Test environment: Node.js with ts-jest transformer

## Database Schema

The project uses Prisma with MySQL. The schema includes User and Animal models with relational mapping. Always run migrations after schema changes and generate the Prisma client.