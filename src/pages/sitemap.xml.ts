// /sitemap.xml – alle öffentlichen Seiten (ohne Impressum/Datenschutz) für Suchmaschinen.
// Beim Livegang in public/robots.txt eintragen: Sitemap: https://<domain>/sitemap.xml
import type { APIRoute } from "astro";
import { NAV, u } from "../consts";

export const GET: APIRoute = ({ site }) => {
  const heute = new Date().toISOString().slice(0, 10);
  const eintraege = NAV.map((n) => `  <url><loc>${new URL(u(n.href), site).href}</loc><lastmod>${heute}</lastmod></url>`);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${eintraege.join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
