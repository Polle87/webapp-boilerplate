# Projektkontext

Dieses Repository ist ein Yarn-4-Monorepo für eine Webanwendung mit Vue-Frontend, Fastify-Backend und gemeinsamem TypeScript-Paket. Laufzeit ist Node.js 24. Halte Änderungen klein und orientiere dich an den bestehenden Mustern im jeweils betroffenen Workspace.

# Verbindliche Arbeitsweise

- Lies vor Änderungen die betroffenen Dateien und nahegelegene Tests oder vergleichbare Implementierungen.
- Ändere nur, was für die Aufgabe nötig ist. Führe keine unabhängigen Refactorings oder zusätzlichen Abhängigkeiten ohne nachvollziehbaren Grund ein.
- Behalte gemeinsam genutzte Typen und API-Verträge in `apps/shared/`; vermeide doppelte Definitionen in Frontend und Backend.
- Behandle Eingaben, Fehlerfälle und vertrauliche Werte ausdrücklich. Hinterlege keine Secrets im Quellcode.
- Ergänze oder passe Tests an, wenn sich Verhalten ändert. Behaupte nicht, Prüfungen ausgeführt zu haben, die tatsächlich nicht gelaufen sind.
- Führe nach Änderungen passende Prüfungen aus. Nutze zuerst den engsten relevanten Test oder Typecheck; bei Änderungen mit größerer Auswirkung zusätzlich `yarn lint`, `yarn build` oder die passenden Playwright-Tests.

# Projektbefehle

- `yarn dev` startet Frontend und Backend.
- `yarn typecheck` prüft alle Workspaces; gezielt: `yarn workspace @boilerplate/frontend typecheck` oder `yarn workspace @boilerplate/backend typecheck`.
- `yarn lint` und `yarn format:check` prüfen Codequalität und Formatierung.
- `yarn test:api` führt API-Tests aus; `yarn test:e2e` führt Browser- und Proxy-Tests aus.
- `yarn build` baut alle Workspaces.
- Für End-to-End-Tests kann Chromium erforderlich sein: `yarn playwright install chromium`.

Weitere Hinweise zu Frontend, Backend und Tests stehen in den passenden Dateien unter `.github/instructions/`.
