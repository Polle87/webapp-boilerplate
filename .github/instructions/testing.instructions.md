---
name: Playwright Tests
description: Guidelines for API and end-to-end tests using Playwright.
applyTo: 'tests/**/*.ts'
---

# Tests

- Write tests from the perspective of observable behavior and use Playwright's assertions and locator APIs.
- Use API tests under `tests/api/` for backend contracts and end-to-end tests under `tests/e2e/` for browser behavior and the frontend proxy.
- Avoid fixed waits and fragile selectors; prefer roles, accessible names, and explicit state checks.
- After changing tests, run the appropriate suite: `yarn test:api` or `yarn test:e2e`.
