# Web App Boilerplate

A boilerplate for new web applications with a separate frontend and backend. This repository provides a lightweight development setup, shared TypeScript types, and API and browser tests. Replace the example components and domain logic with the requirements of your next project.

## Technologies

- **Frontend:** Vue 3, TypeScript, Vite 8, and Tailwind CSS 4
- **Backend:** Node.js 24, Fastify 5, and TypeScript
- **Shared code:** TypeScript workspace for shared types and contracts
- **Monorepo:** Yarn 4 workspaces
- **Code quality:** ESLint 10, Prettier 3, and TypeScript strict mode
- **Testing:** Playwright for API and end-to-end tests

## Requirements

- Node.js `>=24 <25`
- Yarn `4.18.1` (pinned in the repository through Corepack and `.yarn/releases`)

## Installation

```sh
corepack enable
yarn install
```

You may need to install the Playwright browser before running end-to-end tests for the first time:

```sh
yarn playwright install chromium
```

## Development

```sh
yarn dev
```

This starts the frontend and backend in parallel:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Health endpoint: http://localhost:3001/health

Vite proxies requests to `/api/*` to the backend and removes the `/api` prefix. For example, `GET /api/health` is forwarded to `GET /health` on the backend.

No environment variables are currently required. Set `PORT` to run the backend on a different port; the default is `3001`.

## Commands

| Command                | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `yarn dev`             | Start the frontend and backend in development mode |
| `yarn build`           | Build all workspaces                               |
| `yarn typecheck`       | Type-check all workspaces                          |
| `yarn lint`            | Run ESLint                                         |
| `yarn lint:fix`        | Automatically fix fixable ESLint issues            |
| `yarn format`          | Check formatting with Prettier                     |
| `yarn format:fix`      | Format files with Prettier                         |
| `yarn test`            | Run API and end-to-end tests                       |
| `yarn test:api`        | Run API tests against the backend                  |
| `yarn test:e2e`        | Run browser and API proxy tests                    |
| `yarn test:report`     | Open the combined Playwright HTML report           |

The Playwright configuration starts the required servers automatically. API tests do not use Chromium; Chromium is required for end-to-end tests. Test reports and results are written to `tests/reports/` and `tests/results/`.

## Project structure

```text
apps/
  backend/    Fastify API and esbuild build
  frontend/   Vue application and Vite configuration
  shared/     Shared TypeScript types and contracts
tests/
  api/        API tests
  e2e/        Browser and proxy tests
```

## Using this as a template

1. Copy or fork the repository.
2. Update the `name` values and workspace imports for your project, especially `@boilerplate/shared`.
3. Replace the example view in `apps/frontend/src/App.vue` and the example endpoint in `apps/backend/src/index.ts` with your application.
4. Maintain shared API contracts and types in `apps/shared/src/`.
5. Add relevant tests in `tests/api/` and `tests/e2e/`.

The `/health` endpoint is a simple starting point for monitoring and connection checks.
