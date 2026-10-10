# Web App Boilerplate

A boilerplate for new web applications with a separate frontend and backend. This repository provides a lightweight development setup, shared TypeScript types, and API and browser tests. Replace the example components and domain logic with the requirements of your next project.

## Technologies

- **Frontend:** Vue 3, TypeScript, Vite 8, and Tailwind CSS 4
- **Backend:** Node.js 24, Fastify 5, TypeScript, Drizzle ORM, and SQLite
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

On first startup, the backend creates the SQLite database at `apps/backend/data/app.sqlite` and applies the versioned Drizzle migrations. Set `DATABASE_PATH` to override the database path. Set `PORT` to run the backend on a different port; the default is `3001`.

The user table stores Discord-like profile data. Discord snowflakes are stored as text to preserve their full 64-bit value. Generate migrations with `yarn workspace @boilerplate/backend db:generate`.

## Commands

| Command            | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `yarn dev`         | Start the frontend and backend in development mode |
| `yarn build`       | Build all workspaces                               |
| `yarn typecheck`   | Type-check all workspaces                          |
| `yarn lint`        | Run ESLint                                         |
| `yarn lint:fix`    | Automatically fix fixable ESLint issues            |
| `yarn format`      | Check formatting with Prettier                     |
| `yarn format:fix`  | Format files with Prettier                         |
| `yarn test`        | Run API and end-to-end tests                       |
| `yarn test:api`    | Run API tests against the backend                  |
| `yarn test:e2e`    | Run browser and API proxy tests                    |
| `yarn test:report` | Open the combined Playwright HTML report           |

`yarn build` creates the deployment artifact in the root `dist/` directory:

```text
dist/
  html/                        Frontend bundle
  server/                      Backend bundle, migrations, and package.json
  boilerplate.service          systemd service template
  boilerplate.xikun.de.conf   Apache2 vhost for the frontend and API proxy
```

Copy the contents of `dist/` to `/var/www/boilerplate/` so the frontend and backend share one deployment root. Install the backend runtime dependencies from `server/package.json` there (for example, run `npm install --omit=dev` in `/var/www/boilerplate/server`). The systemd template uses `/var/www/boilerplate/server`; configure `NODE_ENV`, `HOST`, `PORT`, and `DATABASE_PATH` directly with its `Environment=` lines. The Apache vhost serves the frontend from `/var/www/boilerplate/html`, and proxies `/api/` to the backend. Ensure the configured Let's Encrypt certificate paths match the certificate issued for the domain. Enable the Apache `ssl`, `headers`, `proxy`, `proxy_http`, `alias`, and `dir` modules. Keep the SQLite database separately under `/var/lib/boilerplate` so deployment updates do not overwrite it.

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
