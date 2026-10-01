---
name: Vue-Frontend
description: Regeln für Vue-Komponenten, Frontend-TypeScript und Styles.
applyTo: 'apps/frontend/**/*'
---

# Frontend

- Verwende Vue 3 und TypeScript passend zu den vorhandenen Komponenten und der bestehenden Composition-API-Nutzung.
- Halte UI, Zustandslogik und API-Aufrufe nachvollziehbar getrennt; führe kein zusätzliches State-Management ein, solange die vorhandenen Mittel ausreichen.
- Berücksichtige Lade-, Fehler- und Leerzustände, wenn eine Oberfläche Daten lädt oder verändert.
- Bewahre responsive Bedienbarkeit und semantische HTML-Elemente; interaktive Elemente müssen per Tastatur erreichbar und sinnvoll beschriftet sein.
- Prüfe Frontend-Änderungen mindestens mit `yarn workspace @boilerplate/frontend typecheck`; ergänze passende End-to-End-Tests, wenn sich sichtbares Verhalten ändert.
