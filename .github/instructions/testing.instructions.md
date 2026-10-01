---
name: Playwright-Tests
description: Regeln für API- und End-to-End-Tests mit Playwright.
applyTo: 'tests/**/*.ts'
---

# Tests

- Schreibe Tests aus Sicht des beobachtbaren Verhaltens und verwende Playwrights Assertions und Locator-APIs.
- Nutze API-Tests unter `tests/api/` für Backend-Verträge und End-to-End-Tests unter `tests/e2e/` für Browserverhalten und Frontend-Proxy.
- Vermeide feste Wartezeiten und fragile Selektoren; bevorzuge Rollen, zugängliche Namen und explizite Zustandsprüfungen.
- Führe nach Teständerungen die passende Suite aus: `yarn test:api` oder `yarn test:e2e`.
