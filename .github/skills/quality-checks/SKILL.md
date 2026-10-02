---
name: quality-checks
description: Select and run appropriate quality checks for changes in this Vue, Fastify, and TypeScript monorepo. Use this skill before completing an implementation or when specifically asked about tests, typechecks, linting, or builds.
---

# Quality checks

1. Determine which workspaces and behaviors are affected by the changed files.
2. Run the appropriate typecheck first:
    - Frontend: `yarn workspace @boilerplate/frontend typecheck`
    - Backend: `yarn workspace @boilerplate/backend typecheck`
    - Entire repository or shared types: `yarn typecheck`
3. For changes to API contracts or backend behavior, run `yarn test:api`. For changes to the UI or proxy behavior, run `yarn test:e2e`. If tests in both areas are affected, run both suites.
4. Run `yarn lint` when TypeScript, Vue, JavaScript, or tests have changed. Use `yarn format:check` when formatting is part of the change or a project requirement.
5. Run `yarn build` when changes affect build configuration, workspace dependencies, or multiple packages.
6. Report exactly which commands were run and whether they succeeded. If a check fails, clearly distinguish a problem caused by the changes from a pre-existing failure.

Do not run every suite indiscriminately for documentation-only changes. End-to-end tests may require Chromium; install it only if the test run fails because it is unavailable: `yarn playwright install chromium`.
