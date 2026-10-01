---
name: Fastify-Backend
description: Regeln für Fastify-Routen, Backend-TypeScript und API-Verträge.
applyTo: 'apps/backend/**/*'
---

# Backend

- Folge den vorhandenen Fastify-Mustern und halte Handler klein und verständlich.
- Validiere externe Eingaben an der API-Grenze mit den im Projekt etablierten Mitteln; verlasse dich nicht auf TypeScript-Typen als Laufzeitvalidierung.
- Bewahre API-Verträge und gemeinsam genutzte Typen in `apps/shared/`, wenn Frontend und Backend sie benötigen.
- Gib keine Secrets oder internen Stacktraces in API-Antworten aus und behandle Fehler über die bestehenden Fastify-Konventionen.
- Prüfe Backend-Änderungen mindestens mit `yarn workspace @boilerplate/backend typecheck`; ergänze oder aktualisiere API-Tests in `tests/api/` bei geändertem Verhalten.
