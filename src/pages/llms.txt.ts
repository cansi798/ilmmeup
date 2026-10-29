// /llms.txt – kurze Zusammenfassung für KI-Suchen (ChatGPT, Perplexity, Gemini …), aus src/consts.ts erzeugt.
import type { APIRoute } from "astro";
import { NAME, CLAIM, BESCHREIBUNG, MAIL, SOCIAL, NAV, TEAM, u } from "../consts";

export const GET: APIRoute = ({ site }) => {
  const url = (p: string) => new URL(u(p), site).href;
  const zeilen = [
    `# ${NAME}`,
    "",
    `> ${BESCHREIBUNG} Leitsatz: ${CLAIM}`,
    "",
    "## Worum es geht",
    "- Expertinnen, Experten und engagierte Persönlichkeiten teilen Wissen, Erfahrungen und Perspektiven in Videos.",
    "- Themen u. a.: Gesundheit, Medizin, Bildung, Familie, Psychologie, Erziehung, Wissenschaft, Gesellschaft, Glaube & Alltag, Unternehmertum, Jugend.",
    "- Unabhängig, überparteilich und selbst finanziert. Offen für Menschen aller Richtungen.",
    "- Getragen von einem Team muslimischer, beruflich etablierter Menschen mit unterschiedlichen fachlichen Hintergründen.",
    "",
    "## Für Expertinnen und Experten",
    "- Planung, Dreh, Schnitt und Veröffentlichung übernimmt das Team von ilm me up. Für die Expertinnen und Experten ist das kostenlos.",
    "- Vor der Veröffentlichung sehen sie das Ergebnis und geben es frei.",
    `- Anfrage: ${url("/fuer-experten/#anfrage")}`,
    "",
    "## Kanäle",
    ...SOCIAL.map((s) => `- [${s.name}](${s.url}) (${s.handle}): ${s.text}`),
    "",
    "## Team",
    ...TEAM.map((p) => `- ${p.name}: ${p.rolle}`),
    "",
    "## Seiten",
    ...NAV.map((n) => `- [${n.label}](${url(n.href)})`),
    "",
    "## Kontakt",
    `- E-Mail: ${MAIL}`,
  ];
  return new Response(zeilen.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
