---
name: Fastify Backend
description: Guidelines for Fastify routes, backend TypeScript, and API contracts.
applyTo: 'apps/backend/**/*'
---

# Backend

- Follow the existing Fastify patterns and keep handlers small and easy to understand.
- Validate external inputs at the API boundary using the project's established methods; do not rely on TypeScript types for runtime validation.
- Keep API contracts and shared types in `apps/shared/` when they are needed by both the frontend and backend.
- Do not expose secrets or internal stack traces in API responses, and handle errors according to the existing Fastify conventions.
- At minimum, check backend changes with `yarn workspace @boilerplate/backend typecheck`; add or update API tests in `tests/api/` when behavior changes.
