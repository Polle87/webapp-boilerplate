---
name: Fastify Backend
description: Fastify-specific guidance for backend routes, request validation, and API behavior.
applyTo: 'apps/backend/**/*'
---

# Fastify backend

- Use Fastify's route schemas to validate and document request and response shapes. TypeScript types alone do not validate runtime input.
- Keep route handlers focused on HTTP concerns; place reusable domain logic outside the handler when the codebase needs it.
- Preserve API response contracts in `apps/shared/` when they are shared with the frontend.
- Handle failures through Fastify's established error handling. Never expose secrets, internal stack traces, or implementation details in API responses.
- For backend changes, run `yarn workspace @boilerplate/backend typecheck`. For changes to API behavior or contracts, add or update coverage under `tests/api/` and run `yarn test:api`.
