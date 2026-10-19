# ilm me up – Website (Quellcode)

Astro-Projekt. Vorschau: https://cansi798.github.io/ilmmeup/ (Branch `main` = gebaute Seite, dieser Branch `quelle` = Quellcode).

- Bauen + Linkprüfung + Bildschirmfotos: `bash scripts/pruefen.sh` (Docker: node:22, Playwright-Image)
- Veröffentlichen: `bash scripts/deploy.sh` (baut und pusht `dist/` nach `main`)
- Logo/Favicons/OG-Bild neu erzeugen: `node scripts/logo.mjs` (im node:22-Container) – vektorisiert `quellbilder/Logo_ilm_me_up_petrol.jpg`
- Inhalte/Platzhalter zentral in `src/consts.ts` (Kanäle, Videos, Team, E-Mail, `VORSCHAU` = noindex + Platzhalter-Hinweise)
- Schrift selbst gehostet (nur Plus Jakarta Sans, OFL – Fraunces auf Wunsch von Jamil entfernt) in `src/styles/fonts/`
- Ansprache: „du“ auf allen Seiten, „Sie“ auf „Für Experten“ (Fachpublikum)

Offen (TODO): Fachrichtungen der Ärztinnen, Titel/Porträttexte bestätigen, Video-Titel, Impressum-/Datenschutzangaben, später echte Teamfotos, Newsletter-Dienst, Formular-Backend (derzeit mailto an info@ilmmeup.de).

## Vor dem Livegang (Checkliste)

- [ ] `VORSCHAU = false` in `src/consts.ts` (noindex aus, Platzhalter-Hinweise weg), `public/robots.txt` freigeben
- [ ] Impressum und Datenschutz mit echten Angaben, rechtlich prüfen lassen
- [ ] Eigene Domain: `site`/`base` in `astro.config.mjs` anpassen
