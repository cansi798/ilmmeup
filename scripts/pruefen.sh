#!/usr/bin/env bash
# Baut die Seite, prüft interne Links und erstellt Bildschirmfotos (Desktop 1280 px, Handy 390 px).
# Aufruf: bash scripts/pruefen.sh   (optional: SEITEN="/,/impressum/" bash scripts/pruefen.sh)
set -euo pipefail
cd "$(dirname "$0")/.."
docker run --rm --cpus=2 -u "$(id -u):$(id -g)" -e HOME=/tmp -e npm_config_cache=/tmp/npmc -e ASTRO_TELEMETRY_DISABLED=1 \
  -v "$PWD":/app -w /app node:22 sh -c 'npm install --no-audit --no-fund >/dev/null && node node_modules/astro/bin/astro.mjs build && node scripts/links.mjs'
PW="${TMPDIR:-/tmp}/ilmmeup-pw"; mkdir -p "$PW/srv"; rm -rf "$PW/srv/ilmmeup"; cp -r dist "$PW/srv/ilmmeup"; cp scripts/screens.mjs "$PW/s.mjs"
docker run --rm --cpus=2 -u "$(id -u):$(id -g)" -e HOME=/tmp -e npm_config_cache=/tmp/npmc -e SEITEN="${SEITEN:-}" -e RUHIG="${RUHIG:-}" \
  -v "$PW":/pw -w /pw mcr.microsoft.com/playwright:v1.48.2-jammy sh -c \
  '[ -d node_modules/playwright ] || npm i playwright@1.48.2 --no-audit --no-fund >/dev/null 2>&1; (cd srv && python3 -m http.server 8080 >/dev/null 2>&1 &); sleep 1; node s.mjs'
rm -rf screens && cp -r "$PW/screens" screens
echo "Bildschirmfotos in screens/"
