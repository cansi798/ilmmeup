// Bildschirmfotos zur Sichtprüfung (läuft im Playwright-Container, siehe README).
// Erwartet einen Server auf http://localhost:8080/ilmmeup/ und schreibt nach screens/.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync("screens", { recursive: true });
const seiten = (process.env.SEITEN || "/,/vision/,/formate/,/fuer-experten/,/ueber-uns/,/kontakt/,/impressum/").split(",");
const geraete = [
  { name: "desktop", viewport: { width: 1280, height: 800 } },
  { name: "handy", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];
const browser = await chromium.launch();
for (const g of geraete) {
  const ctx = await browser.newContext({ viewport: g.viewport, isMobile: g.isMobile, hasTouch: g.hasTouch, deviceScaleFactor: g.deviceScaleFactor || 1, reducedMotion: process.env.RUHIG ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  for (const s of seiten) {
    await page.goto("http://localhost:8080/ilmmeup" + s, { waitUntil: "networkidle" });
    // langsam durchscrollen, damit alle Reveal-/Sprüh-Animationen auslösen
    const h = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 400) { await page.evaluate((yy) => scrollTo({ top: yy, behavior: "instant" }), y); await page.waitForTimeout(150); }
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(2500);
    const ueberlauf = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      return [...document.querySelectorAll("body *")].filter((el) => el.getBoundingClientRect().right > w + 1 && getComputedStyle(el).position !== "fixed").slice(0, 5).map((el) => el.tagName + "." + el.className);
    });
    const name = (s.replace(/\//g, "_").replace(/^_|_$/g, "") || "start") + "-" + g.name;
    await page.screenshot({ path: `screens/${name}.png`, fullPage: true });
    const quer = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    console.log(name, "Querscrollen:", quer > 0 ? quer + " px" : "nein", "| Überlauf:", ueberlauf.length ? ueberlauf.join(", ") : "keiner");
  }
  await ctx.close();
}
await browser.close();
