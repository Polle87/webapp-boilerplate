# Webapp Boilerplate

Boilerplate für neue Webanwendungen mit getrenntem Frontend und Backend. Das Repository bringt eine schlanke Entwicklungsumgebung, gemeinsame TypeScript-Typen sowie API- und Browser-Tests mit. Komponenten und Beispieldomänen lassen sich direkt durch die Anforderungen des nächsten Projekts ersetzen.

## Technologien

- **Frontend:** Vue 3, TypeScript, Vite 8 und Tailwind CSS 4
- **Backend:** Node.js 24, Fastify 5, TypeScript, Drizzle ORM und SQLite
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

Beim ersten Backend-Start wird die SQLite-Datenbank unter `apps/backend/data/app.sqlite` erstellt und mit den versionierten Drizzle-Migrationen aktualisiert. `DATABASE_PATH` kann den Datenbankpfad überschreiben. Das Backend kann mit `PORT` auf einem anderen Port gestartet werden; standardmäßig verwendet es `3001`.

Die Benutzertabelle speichert Discord-ähnliche Profildaten. Discord-Snowflakes werden als Text gespeichert, um den vollständigen 64-Bit-Wert verlustfrei abzubilden. Migrationen werden mit `yarn workspace @boilerplate/backend db:generate` erzeugt.

## Befehle

| Befehl             | Zweck                                             |
| ------------------ | ------------------------------------------------- |
| `yarn dev`         | Frontend und Backend im Entwicklungsmodus starten |
| `yarn build`       | Alle Workspaces bauen                             |
| `yarn typecheck`   | TypeScript-Prüfung für alle Workspaces ausführen  |
| `yarn lint`        | ESLint ausführen                                  |
| `yarn lint:fix`    | Behebbare ESLint-Probleme automatisch korrigieren |
| `yarn format`      | Formatierung mit Prettier prüfen                  |
| `yarn format:fix`  | Dateien mit Prettier formatieren                  |
| `yarn test`        | API- und End-to-End-Tests ausführen               |
| `yarn test:api`    | API-Tests gegen das Backend ausführen             |
| `yarn test:e2e`    | Browser- und API-Proxy-Tests ausführen            |
| `yarn test:report` | Gemeinsamen Playwright-HTML-Bericht öffnen        |

`yarn build` erzeugt das Deployment-Artefakt im Root-Ordner `dist/`:

```text
dist/
  html/                        Frontend-Bundle
  server/                      Backend-Bundle, Migrationen und package.json
  boilerplate.service          systemd-Vorlage
  boilerplate.xikun.de.conf    Apache2-VHost für Frontend und API-Proxy
```

Kopiere den Inhalt von `dist/` nach `/var/www/boilerplate/`; damit liegen Frontend und Backend gemeinsam unter diesem Deployment-Verzeichnis. Installiere dort die Backend-Runtime-Abhängigkeiten aus `server/package.json` (z. B. mit `npm install --omit=dev` im Verzeichnis `/var/www/boilerplate/server`). Die systemd-Vorlage verwendet `/var/www/boilerplate/server`; `NODE_ENV`, `HOST`, `PORT` und `DATABASE_PATH` werden direkt über die `Environment=`-Zeilen in `boilerplate.service` konfiguriert. Der Apache-VHost bedient das Frontend aus `/var/www/boilerplate/html` und proxyt `/api/` zum Backend. Die konfigurierten Let's-Encrypt-Zertifikatspfade müssen zum tatsächlich ausgestellten Zertifikat passen. Aktiviere dafür Apache-Module `ssl`, `headers`, `proxy`, `proxy_http`, `alias` und `dir`. Die SQLite-Datenbank bleibt separat unter `/var/lib/boilerplate`, damit sie bei Updates des Deployment-Verzeichnisses erhalten bleibt.

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
