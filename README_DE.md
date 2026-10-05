# Webapp Boilerplate

Boilerplate für neue Webanwendungen mit getrenntem Frontend und Backend. Das Repository bringt eine schlanke Entwicklungsumgebung, gemeinsame TypeScript-Typen sowie API- und Browser-Tests mit. Komponenten und Beispieldomänen lassen sich direkt durch die Anforderungen des nächsten Projekts ersetzen.

## Technologien

- **Frontend:** Vue 3, TypeScript, Vite 8 und Tailwind CSS 4
- **Backend:** Node.js 24, Fastify 5 und TypeScript
- **Gemeinsamer Code:** TypeScript-Workspace für geteilte Typen und Verträge
- **Monorepo:** Yarn 4 Workspaces
- **Qualität:** ESLint 10, Prettier 3 und TypeScript-Strict-Mode
- **Tests:** Playwright für API- und End-to-End-Tests

## Voraussetzungen

- Node.js `>=24 <25`
- Yarn `4.18.1` (im Repository über Corepack und `.yarn/releases` festgelegt)

## Installation

```sh
corepack enable
yarn install
```

Beim ersten End-to-End-Testlauf muss gegebenenfalls der Playwright-Browser installiert werden:

```sh
yarn playwright install chromium
```

## Entwicklung

```sh
yarn dev
```

Der Befehl startet Frontend und Backend parallel:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Health-Endpoint: http://localhost:3001/health

Vite leitet Anfragen an `/api/*` an das Backend weiter und entfernt dabei das Präfix `/api`. Beispiel: `GET /api/health` wird zu `GET /health` auf dem Backend.

Es werden derzeit keine Umgebungsvariablen benötigt. Das Backend kann mit `PORT` auf einem anderen Port gestartet werden; standardmäßig verwendet es `3001`.

## Befehle

| Befehl                 | Zweck                                             |
| ---------------------- | ------------------------------------------------- |
| `yarn dev`             | Frontend und Backend im Entwicklungsmodus starten |
| `yarn build`           | Alle Workspaces bauen                             |
| `yarn typecheck`       | TypeScript-Prüfung für alle Workspaces ausführen  |
| `yarn lint`            | ESLint ausführen                                  |
| `yarn lint:fix`        | Behebbare ESLint-Probleme automatisch korrigieren |
| `yarn format`          | Formatierung mit Prettier prüfen                  |
| `yarn format:fix`      | Dateien mit Prettier formatieren                  |
| `yarn test`            | API- und End-to-End-Tests ausführen               |
| `yarn test:api`        | API-Tests gegen das Backend ausführen             |
| `yarn test:e2e`        | Browser- und API-Proxy-Tests ausführen            |
| `yarn test:api:report` | API-Testbericht öffnen                            |
| `yarn test:e2e:report` | End-to-End-Testbericht öffnen                     |

Die Playwright-Konfiguration startet die jeweils benötigten Server automatisch. API-Tests verwenden Chromium nicht; für End-to-End-Tests wird Chromium benötigt. Testberichte und Ergebnisse landen unter `tests/reports/` beziehungsweise `tests/results/`.

## Projektstruktur

```text
apps/
  backend/    Fastify-API und esbuild-Build
  frontend/   Vue-Anwendung und Vite-Konfiguration
  shared/     Gemeinsame TypeScript-Typen und Verträge
tests/
  api/        API-Tests
  e2e/        Browser- und Proxy-Tests
```

## Als Vorlage verwenden

1. Repository kopieren oder forken.
2. `name`-Werte und Workspace-Imports mit dem neuen Projektnamen aktualisieren, insbesondere `@boilerplate/shared`.
3. Die Beispielansicht in `apps/frontend/src/App.vue` und den Beispielendpunkt in `apps/backend/src/index.ts` durch die eigene Anwendung ersetzen.
4. Gemeinsame API-Verträge und Typen in `apps/shared/src/` pflegen.
5. Passende Tests in `tests/api/` und `tests/e2e/` ergänzen.

Der Health-Endpoint unter `/health` eignet sich als einfacher Ausgangspunkt für Monitoring und Verbindungsprüfungen.
