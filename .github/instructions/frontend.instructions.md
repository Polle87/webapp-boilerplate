---
name: Vue Frontend
description: Vue-specific guidance for components, frontend state, and accessible UI.
applyTo: 'apps/frontend/**/*'
---

# Vue frontend

- Use Vue 3, TypeScript, and the Composition API in keeping with nearby components.
- Keep components focused on presentation and interaction. Extract reusable behavior or UI only when it has a clear use; avoid unnecessary state-management libraries.
- Represent loading, error, empty, and success states when a UI operation needs them.
- Use semantic HTML and accessible names. Ensure interactive controls are keyboard-operable and provide visible focus.
- Keep layouts responsive and follow the project's existing styling and component patterns.
- For frontend changes, run `yarn workspace @boilerplate/frontend typecheck`. For visible UI or proxy behavior changes, add or update relevant E2E coverage and run `yarn test:e2e`.
