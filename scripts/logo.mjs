// Logo-Aufbereitung: Vektorisiert die gelbe Glühbirne aus quellbilder/Logo_ilm_me_up_petrol.jpg
// (Schriftzug „ilm me up“ + Pfeil bleiben als Aussparung → transparent) und erzeugt daraus
// SVG-Logo, Favicons und Social-Vorschaubild.
// Aufruf (im Docker-Container, sharp kommt mit Astro): node scripts/logo.mjs
import sharp from "sharp";
import potrace from "potrace";
import { writeFileSync, mkdirSync } from "node:fs";

const GELB = "#FFCC00";
const PETROL = "#006780";
const P = "public/assets/";
mkdirSync(P, { recursive: true });

// 1) Maske: gelbe Pixel (inkl. hellem Verlauf oben) → schwarz, Rest weiß; 2× hochskaliert für glattere Kurven
const SKALA = 2;
const { data, info } = await sharp("quellbilder/Logo_ilm_me_up_petrol.jpg").raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: c } = info;
const maske = Buffer.alloc(w * h);
let minX = w, minY = h, maxX = 0, maxY = 0;
for (let i = 0; i < w * h; i++) {
  const r = data[i * c], b = data[i * c + 2];
  const gelb = r > 150 && r - b > 70;
  maske[i] = gelb ? 0 : 255;
  if (gelb) {
    const x = i % w, y = (i / w) | 0;
    if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
}
const maskePng = await sharp(maske, { raw: { width: w, height: h, channels: 1 } })
  .resize(w * SKALA, h * SKALA, { kernel: "lanczos3" })
  .blur(2.2)
  .png().toBuffer();

const d = await new Promise((ok, fehler) => {
  const t = new potrace.Potrace({ threshold: 128, turdSize: 40, optTolerance: 1.2, alphaMax: 1.0 });
  t.loadImage(maskePng, (err) => {
    if (err) return fehler(err);
    const tag = t.getPathTag();
    ok(tag.match(/ d="([^"]+)"/)[1].replace(/\d+\.\d+/g, (z) => (+z).toFixed(1).replace(/\.0$/, "")).replace(/, /g, " "));
  });
});

// Ausschnitt mit etwas Rand (in Pixeln des Originals)
const RAND = 6;
const vx = (minX - RAND) * SKALA, vy = (minY - RAND) * SKALA;
const vw = (maxX - minX + 2 * RAND) * SKALA, vh = (maxY - minY + 2 * RAND) * SKALA;
const viewBox = `${vx} ${vy} ${vw} ${vh}`;
console.log("Logo-Ausschnitt", { minX, minY, maxX, maxY, viewBox });

const pfad = (farbe) => `<path fill="${farbe}" fill-rule="evenodd" d="${d}"/>`;
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="ilm me up">${pfad(GELB)}</svg>\n`;
writeFileSync("src/assets/logo-pfad.txt", JSON.stringify({ viewBox, d }));
writeFileSync(P + "logo.svg", logoSvg);

// Quadratische Kachel: Petrol-Fläche mit Logo (für Favicon, Apple-Touch, OG)
const kachel = (groesse, rund, anteil = 0.78) => {
  const s = Math.max(vw, vh) / anteil;
  const ox = vx - (s - vw) / 2, oy = vy - (s - vh) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${groesse}" height="${groesse}" viewBox="${ox} ${oy} ${s} ${s}">` +
    `<rect x="${ox}" y="${oy}" width="${s}" height="${s}" rx="${rund * s}" fill="${PETROL}"/>${pfad(GELB)}</svg>`;
};
writeFileSync("public/favicon.svg", kachel(64, 0.22, 0.86));
await sharp(Buffer.from(kachel(32, 0.22, 0.9))).png().toFile(P + "favicon-32.png");
await sharp(Buffer.from(kachel(180, 0, 0.74))).png().toFile(P + "apple-touch-icon.png");
await sharp(Buffer.from(kachel(512, 0, 0.74))).png().toFile(P + "icon-512.png");

// Transparente PNGs (gelbe Birne, Schrift ausgespart) für Weitergabe/Social
const logoPng = (breite) => sharp(Buffer.from(logoSvg.replace("<svg ", `<svg width="${breite}" height="${Math.round((breite * vh) / vw)}" `))).png();
await logoPng(1024).toFile(P + "logo-1024.png");
await logoPng(256).toFile(P + "logo-256.png");

// Social-Vorschaubild 1200×630: Petrol mit Logo links-mittig, sanfter Lichtschein
const ogH = 630, ogW = 1200, lh = 470, lw = Math.round((lh * vw) / vh);
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ogW}" height="${ogH}">
  <defs><radialGradient id="g" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stop-color="#1a9ab8" stop-opacity="0.55"/><stop offset="1" stop-color="#1a9ab8" stop-opacity="0"/></radialGradient></defs>
  <rect width="100%" height="100%" fill="#00495b"/>
  <circle cx="${ogW / 2}" cy="${ogH / 2}" r="420" fill="url(#g)"/>
  <svg x="${(ogW - lw) / 2}" y="${(ogH - lh) / 2}" width="${lw}" height="${lh}" viewBox="${viewBox}">${pfad(GELB)}</svg>
</svg>`;
await sharp(Buffer.from(ogSvg)).jpeg({ quality: 88 }).toFile(P + "og-image.jpg");
console.log("Logo-Dateien erzeugt.");
