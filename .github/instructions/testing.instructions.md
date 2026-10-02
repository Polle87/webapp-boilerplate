---
name: Playwright Tests
description: Playwright-specific guidance for API and end-to-end test behavior.
applyTo: 'tests/**/*.ts'
---

# Playwright tests

- Test observable behavior with Playwright's built-in assertions and locators rather than implementation details.
- Place backend contract tests in `tests/api/`; place browser behavior and frontend proxy tests in `tests/e2e/`.
- Prefer role- and label-based locators and explicit state assertions. Avoid fixed timeouts and brittle selectors.
- Use the request fixture for API checks and page locators for browser interactions; assert response status and relevant payload or rendered state.
- Run `yarn test:api` for API test changes and `yarn test:e2e` for browser or proxy test changes.
