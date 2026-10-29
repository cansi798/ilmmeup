# ilm me up – Website (Quellcode)

Astro-Projekt. Vorschau: https://cansi798.github.io/ilmmeup/ (Branch `main` = gebaute Seite, dieser Branch `quelle` = Quellcode).

- Bauen + Linkprüfung + Bildschirmfotos: `bash scripts/pruefen.sh` (Docker: node:22, Playwright-Image)
- Veröffentlichen: `bash scripts/deploy.sh` (baut und pusht `dist/` nach `main`)
- Logo/Favicons/OG-Bild neu erzeugen: `node scripts/logo.mjs` (im node:22-Container) – vektorisiert `quellbilder/Logo_ilm_me_up_petrol.jpg`
- Inhalte/Platzhalter zentral in `src/consts.ts` (Kanäle, Videos, Team, E-Mail, `VORSCHAU` = noindex + Platzhalter-Hinweise)
- Schrift selbst gehostet (nur Plus Jakarta Sans, OFL – Fraunces auf Wunsch von Jamil entfernt) in `src/styles/fonts/`
- Ansprache: „du“ auf allen Seiten (auch „Für Experten“ und Datenschutz; Wunsch Jamil 20.10.)
- SEO/KI-Suche: JSON-LD (Organization mit Kanälen, WebSite, FAQPage auf „Für Experten“), `og:url`, `/sitemap.xml` und `/llms.txt` (beide aus `src/consts.ts` erzeugt)
- Texte nach dem humanizer-Skill überarbeitet (29.10.2026): keine Gedankenstrich-Ketten und Floskeln, Inhalte und Platzhalter unverändert

Offen (TODO): Fachrichtungen der Ärztinnen, Titel/Porträttexte bestätigen, Video-Titel, Impressum-/Datenschutzangaben, später echte Teamfotos, Newsletter-Dienst, Formular-Backend (derzeit mailto an info@ilmmeup.de).

## Vor dem Livegang (Checkliste)

- [ ] `VORSCHAU = false` in `src/consts.ts` (noindex aus, Platzhalter-Hinweise weg), `public/robots.txt` freigeben und `Sitemap: https://<domain>/sitemap.xml` eintragen
- [ ] Impressum und Datenschutz mit echten Angaben, rechtlich prüfen lassen
- [ ] Eigene Domain: `site`/`base` in `astro.config.mjs` anpassen
