---
name: quality-checks
description: Run focused quality and consistency checks for this Vue, Fastify, and TypeScript monorepo. Use before completing implementation work or when asked to review project quality.
---

# Quality checks

Use this skill to validate the requested change and catch directly related inconsistencies, not to launch an unrestricted repository-wide cleanup.

1. **Establish scope.** Inspect the worktree and change diff. Identify affected workspaces, behavior, API contracts, and relevant neighboring code and tests.
2. **Review focused consistency.** In the affected paths, check that:
    - Code follows nearby patterns and has clear responsibilities; identify only obvious dead code, duplication, or stale TODOs.
    - Shared TypeScript types and API contracts used across workspaces live in `apps/shared/`, without moving workspace-local types unnecessarily.
    - Comments are accurate and useful; update stale comments and remove redundant ones.
    - User-facing behavior, setup, commands, architecture, or contracts are documented where needed. Keep equivalent English `README.md` and German `README_DE.md` content aligned.
    - Relevant validation, error handling, security boundaries, and performance characteristics are sound. For UI changes, also consider accessibility, responsive behavior, and loading/error/empty states.
    - Changed configuration and dependency surfaces remain consistent, including workspace scripts, lockfile, environment variables, build tooling, and CI when applicable.
3. **Make bounded corrections.** Fix clear issues caused by the change or directly coupled to it. Do not refactor unrelated code or silently expand scope to pre-existing repository-wide problems. Ask before larger or ambiguous cleanup.
4. **Run checks selected by impact.** Start with the narrowest relevant typecheck:
    - Frontend: `yarn workspace @boilerplate/frontend typecheck`
    - Backend: `yarn workspace @boilerplate/backend typecheck`
    - Shared types, cross-workspace changes, or repository-wide impact: `yarn typecheck`

    Then select additional checks:
    - Backend behavior or API contracts: add/update relevant observable behavior and edge-case coverage, then run `yarn test:api`.
    - UI or frontend proxy behavior: add/update relevant browser coverage, then run `yarn test:e2e`.
    - If both API and browser behavior are affected, run both test suites.
    - Run `yarn lint` when TypeScript, Vue, JavaScript, or test files changed.
    - Run `yarn format:check` when changed files are supported by Prettier.
    - Run `yarn build` when build configuration, workspace dependencies, shared packages, or multiple workspaces are affected.

    Do not run unrelated suites for documentation-only changes. End-to-end tests may require Chromium; install it with `yarn playwright install chromium` only if a test fails because Chromium is unavailable.

5. **Handle failures carefully.** Determine whether each failure was caused by the change. Fix related failures and rerun the relevant check; report pre-existing or unrelated failures without changing them.
6. **Report precisely.** State the checks and exact commands run, their results, any directly related corrections, and unresolved or out-of-scope findings. Do not claim checks that were not run.
