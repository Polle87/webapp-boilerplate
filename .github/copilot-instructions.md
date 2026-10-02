# Project context

This repository is a Yarn 4 monorepo for a web application with a Vue frontend, Fastify backend, and shared TypeScript package. It runs on Node.js 24.

# Core principles

- Follow existing code and conventions in the affected area. Read relevant files and nearby tests or comparable implementations before changing code.
- Keep changes focused on the request. Do not add unrelated refactoring or dependencies without approval.
- Keep shared TypeScript types and API contracts in `apps/shared/` rather than duplicating them across frontend and backend.
- Keep all repository instruction and skill documents in English.

# Clarifying questions

- Ask whenever anything is uncertain, including small implementation details. Do not guess or proceed on assumptions.
- If clarification is needed, pause the work and wait for the user's answer.

# Working workflow

- Check the worktree before editing. Preserve existing user changes and do not overwrite unrelated work.
- For clear implementation requests, investigate, implement, and run the appropriate checks instead of only proposing a plan.
- Make precise, complete changes and verify the requested behavior.

# Design and performance

- Keep classes and files focused and manageable, with clear responsibilities. Split code when it improves cohesion or readability, but do not fragment related logic unnecessarily; do not enforce arbitrary line limits.
- Consider performance in every implementation. Avoid obvious inefficiencies and scalability problems, but do not optimize speculatively; use measurements when performance optimization is warranted.
- Add comments to explain meaningful flows, decisions, or non-obvious behavior. Do not paraphrase obvious individual lines.

# Security and errors

- Validate inputs at system boundaries and handle sensitive values carefully. Never add secrets to source code.
- Handle errors explicitly. Do not swallow errors or return success-shaped fallbacks that hide failures.

# Testing and validation

- Add or update relevant tests when behavior changes. Run the narrowest checks that cover the change, and report exactly what ran and whether it passed.
- Choose checks based on the changed area; do not run every suite for documentation-only changes.
- Use the repository scripts as appropriate: `yarn typecheck`, `yarn lint`, `yarn format:check`, `yarn test:api`, `yarn test:e2e`, and `yarn build`.
- Use `yarn test:api` for backend/API behavior and `yarn test:e2e` for UI or proxy behavior. Run `yarn build` when build configuration, workspace dependencies, or multiple packages are affected.
- End-to-end tests may require Chromium. Install it with `yarn playwright install chromium` only if a test run fails because it is unavailable.

# Communication and token efficiency

- Keep investigation and responses concise: inspect only relevant files and code ranges, avoid repeated searches or reads, and do not dump entire files when a focused excerpt is sufficient.
- Respond in the user's language. Keep repository instruction and skill documents in English.
- Don't use any filler and pleasantries or low-value glue words when meaning stays clear or repeated framing before the answer
- Compress answers with symbolic joins ->, =>, vs, w/, w/o, +, =
- Short causal chains: X -> Y -> Z

# Repository-specific guidance

- Follow applicable detailed guidance in `.github/instructions/`, including the backend, frontend, and testing instructions.
- `yarn dev` starts the frontend and backend. Use the workspace-specific typechecks from the relevant instruction file when a single workspace is affected.

# Git safety

- Do not commit or push unless the user explicitly asks.
- Do not use destructive Git or filesystem operations without explicit approval.
