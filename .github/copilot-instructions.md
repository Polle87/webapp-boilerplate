# Project context

This repository is a Yarn 4 monorepo for a web application with a Vue frontend, Fastify backend, and shared TypeScript package. The runtime is Node.js 24. Keep changes small and follow the existing patterns in the affected workspace.

# Required workflow

- Before making changes, read the affected files and nearby tests or comparable implementations.
- Change only what is needed for the task. Do not introduce unrelated refactoring or additional dependencies without a clear reason.
- Keep shared types and API contracts in `apps/shared/`; avoid duplicate definitions in the frontend and backend.
- Handle inputs, error cases, and sensitive values explicitly. Do not store secrets in source code.
- Add or update tests when behavior changes. Do not claim to have run checks that were not actually run.
- Run appropriate checks after making changes. Start with the narrowest relevant test or typecheck; for broader changes, also run `yarn lint`, `yarn build`, or the appropriate Playwright tests.

# Project commands

- `yarn dev` starts the frontend and backend.
- `yarn typecheck` checks all workspaces; to target a workspace, use `yarn workspace @boilerplate/frontend typecheck` or `yarn workspace @boilerplate/backend typecheck`.
- `yarn lint` and `yarn format:check` check code quality and formatting.
- `yarn test:api` runs API tests; `yarn test:e2e` runs browser and proxy tests.
- `yarn build` builds all workspaces.
- Chromium may be required for end-to-end tests: `yarn playwright install chromium`.

Further guidance for the frontend, backend, and tests is available in the relevant files under `.github/instructions/`.
