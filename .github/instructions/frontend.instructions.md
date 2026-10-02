---
name: Vue Frontend
description: Guidelines for Vue components, frontend TypeScript, and styles.
applyTo: 'apps/frontend/**/*'
---

# Frontend

- Use Vue 3 and TypeScript in line with the existing components and Composition API usage.
- Keep UI, state logic, and API calls clearly separated; do not introduce additional state management while the existing tools are sufficient.
- Account for loading, error, and empty states when the UI loads or changes data.
- Preserve responsive usability and semantic HTML; interactive elements must be keyboard-accessible and clearly labeled.
- At minimum, check frontend changes with `yarn workspace @boilerplate/frontend typecheck`; add appropriate end-to-end tests when visible behavior changes.
