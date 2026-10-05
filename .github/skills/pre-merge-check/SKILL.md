---
name: pre-merge-check
description: Review changes against main and run focused quality checks before merging this Vue, Fastify, and TypeScript monorepo.
---

# Pre-merge check

Use the current branch's changes against `main` as the primary scope. Review the diff and relevant context, not the whole repository.

1. **Establish the comparison range.**
    - Identify the current branch and compare it with the merge base against `origin/main` when available, otherwise local `main` (equivalent to `git diff <base>...HEAD`).
    - Do not fetch or change refs as part of the review. If no usable `main` ref exists, or the correct target is ambiguous, ask the user before choosing another base.
    - Inspect the worktree separately. Include staged, unstaged, and untracked changes in the review scope where relevant, without confusing them with committed branch changes or overwriting them.
    - If the current branch is `main`, report that there is no feature-branch diff against `main` and review only any local changes.
2. **Map the diff to impact.** Identify changed files, affected workspaces, behavior, API contracts, configuration, and only the neighboring code/tests needed to understand them.
3. **Review focused consistency** in the changed paths and directly affected behavior:
    - Code follows nearby patterns and has clear responsibilities; identify obvious dead code, duplication, and stale TODOs.
    - Shared TypeScript types and API contracts used across workspaces live in `apps/shared/`; keep workspace-local types local.
    - Comments are accurate and useful; update stale comments and remove redundant ones.
    - Update documentation when changed behavior, setup, commands, architecture, or contracts make it necessary. Keep equivalent content in `README.md` and `README_DE.md` aligned.
    - Check relevant validation, error handling, security boundaries, and performance. For UI changes, also consider accessibility, responsive behavior, and loading/error/empty states.
    - Check affected configuration and dependency surfaces, including workspace scripts, lockfile, environment variables, build tooling, and CI.
4. **Make bounded corrections.** Fix clear issues introduced by the branch changes or directly coupled to them. Do not refactor unrelated code or expand scope to pre-existing repository-wide problems. Ask before larger or ambiguous cleanup.
5. **Run checks selected by impact.** Start with the narrowest relevant typecheck:
    - Frontend: `yarn workspace @boilerplate/frontend typecheck`
    - Backend: `yarn workspace @boilerplate/backend typecheck`
    - Shared types, cross-workspace changes, or repository-wide impact: `yarn typecheck`

    Then select additional checks:
    - Backend behavior or API contracts: ensure relevant observable behavior and edge cases are covered, then run `yarn test:api`.
    - UI or frontend proxy behavior: ensure relevant browser behavior is covered, then run `yarn test:e2e`.
    - If both API and browser behavior are affected, run both test suites.
    - Run `yarn lint` when TypeScript, Vue, JavaScript, or test files changed.
    - Run `yarn format` when changed files are supported by Prettier.
    - Run `yarn build` when build configuration, workspace dependencies, shared packages, or multiple workspaces are affected.

    Do not run unrelated suites for documentation-only changes. End-to-end tests may require Chromium; install it with `yarn playwright install chromium` only if a test fails because Chromium is unavailable.

6. **Handle failures carefully.** Determine whether a failure is caused by the reviewed changes. Fix related failures and rerun the relevant check; report pre-existing or unrelated failures without changing them.
7. **Report precisely.** Summarize the comparison base and scope, findings and any directly related corrections, exact checks run and results, and unresolved or out-of-scope issues. Do not claim checks that were not run.
