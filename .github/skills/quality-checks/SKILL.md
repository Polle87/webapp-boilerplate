---
name: quality-checks
description: Wähle und führe passende Qualitätsprüfungen für Änderungen in diesem Vue-, Fastify- und TypeScript-Monorepo aus. Verwende diesen Skill vor dem Abschluss einer Implementierung oder wenn gezielt nach Tests, Typechecks, Lint oder Build gefragt wird.
---

# Qualitätsprüfungen

1. Ermittle anhand der geänderten Dateien, welche Workspaces und welches Verhalten betroffen sind.
2. Führe zuerst den passenden Typecheck aus:
    - Frontend: `yarn workspace @boilerplate/frontend typecheck`
    - Backend: `yarn workspace @boilerplate/backend typecheck`
    - Gesamtes Repository oder gemeinsame Typen: `yarn typecheck`
3. Bei geänderten API-Verträgen oder Backend-Verhalten führe `yarn test:api` aus. Bei geänderter Oberfläche oder Proxy-Verhalten führe `yarn test:e2e` aus. Bei Tests in beiden Bereichen führe beide Suites aus.
4. Führe `yarn lint` aus, wenn TypeScript, Vue, JavaScript oder Tests geändert wurden. Verwende `yarn format:check`, wenn Formatierung Teil der Änderung oder Projektvorgabe ist.
5. Führe `yarn build` aus, wenn Änderungen Build-Konfiguration, Workspace-Abhängigkeiten oder mehrere Pakete betreffen.
6. Melde exakt, welche Befehle liefen und ob sie erfolgreich waren. Falls eine Prüfung fehlschlägt, unterscheide klar zwischen einem durch die Änderung verursachten Problem und einem bereits vorhandenen Fehler.

Führe nicht pauschal jede Suite für eine reine Dokumentationsänderung aus. End-to-End-Tests benötigen gegebenenfalls Chromium; installiere es nur, wenn der Testlauf daran scheitert und die Umgebung es noch nicht hat: `yarn playwright install chromium`.
