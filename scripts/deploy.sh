#!/usr/bin/env bash
# Baut die Seite und veröffentlicht dist/ (+ .nojekyll) als Inhalt des Branches main.
# GitHub Pages ist auf „Deploy from branch main, /“ eingestellt.
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE="$(git remote get-url origin)"
QUELLE="$(git rev-parse --short HEAD)"

docker run --rm --cpus=2 -u "$(id -u):$(id -g)" -e HOME=/tmp -e npm_config_cache=/tmp/npmc -e ASTRO_TELEMETRY_DISABLED=1 \
  -v "$PWD":/app -w /app node:22 sh -c 'npm install --no-audit --no-fund >/dev/null && node node_modules/astro/bin/astro.mjs build && node scripts/links.mjs'

rm -rf .deploy && mkdir .deploy
cp -r dist/. .deploy/
touch .deploy/.nojekyll
printf '# ilm me up – gebaute Seite\n\nGebaute Seite – Quellcode im Branch `quelle`.\n' > .deploy/README.md
cd .deploy
git init -q -b main
git add -A
git -c user.name="$(git -C .. config user.name || echo deploy)" -c user.email="$(git -C .. config user.email || echo deploy@localhost)" \
  commit -q -m "Gebaute Seite aus quelle@${QUELLE}

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
git push -q -f "$REMOTE" main
cd .. && rm -rf .deploy
echo "Veröffentlicht: main ← quelle@${QUELLE}"
