// Zentrale Angaben der Website. Alles mit „TODO“ ist Platzhalter, bis ilmmeup die echten Daten schickt.

/** Vorschau-Modus: setzt noindex und zeigt Platzhalter-Hinweise. Vor dem Livegang auf false. */
export const VORSCHAU = true;

export const NAME = "ilm me up";
export const CLAIM = "Wissen sichtbar machen. Menschen verbinden.";
export const BESCHREIBUNG =
  "ilm me up ist eine unabhängige Medienplattform: Expertinnen und Experten teilen Wissen, Erfahrungen und Perspektiven – professionell produziert, für alle Menschen.";

// Empfängeradresse für Kontakt- und Kooperationsanfragen (Formulare öffnen das E-Mail-Programm).
export const MAIL = "info@ilmmeup.de";

// Kanal-Links (von Jamil, 19.10.2026)
export const SOCIAL = [
  { id: "youtube", name: "YouTube", handle: "ilm me up", url: "https://www.youtube.com/channel/UCw1k2XUyy1swA1CGxjRpgFQ", platzhalter: false, text: "Gespräche, Vorträge und Impulse in voller Länge." },
  { id: "instagram", name: "Instagram", handle: "@ilmmeup", url: "https://www.instagram.com/ilmmeup/", platzhalter: false, text: "Kurze Impulse, Zitate und Einblicke hinter die Kamera." },
  { id: "tiktok", name: "TikTok", handle: "@ilmmeup", url: "https://www.tiktok.com/@ilmmeup", platzhalter: false, text: "Wissen in 60 Sekunden – klar, ehrlich, auf den Punkt." },
] as const;

// YouTube-Shorts für die Startseite (nur die ID; hochkant 9:16). Von Jamil, 19.10.2026.
// TODO: Titel der Videos von ilmmeup bestätigen lassen (bisher neutrale Arbeitstitel).
export const VIDEOS: { id: string | null; titel: string; thema: string; hoch?: boolean }[] = [
  { id: "5cA20lKokEg", titel: "Kurzimpuls #1", thema: "YouTube Short", hoch: true },
  { id: "xKxWlA4q4Nc", titel: "Kurzimpuls #2", thema: "YouTube Short", hoch: true },
];

// Team (von Jamil, 19.10.2026): vorerst gezeichnete Figuren statt Fotos.
// TODO: Fachrichtungen der Ärztinnen, ggf. Titel, Porträttexte bestätigen, später echte Fotos.
export type Person = { name: string; rolle: string; zusatz?: string; text: string; figur: { haut: string; haar: string; stil: "kurz" | "bart" | "tuch" | "locken" | "glatze"; kleid: string; tuch?: string; brille?: boolean } };
export const TEAM: Person[] = [
  { name: "Jamil", rolle: "IT Service Manager", text: "Hält Technik, Abläufe und Plattform zusammen – damit Inhalte zuverlässig dort ankommen, wo Menschen sie suchen.", figur: { haut: "#c98e62", haar: "#1d1a19", stil: "bart", kleid: "#006780", brille: true } },
  { name: "Sheeras", rolle: "Videograf", text: "Sorgt hinter der Kamera dafür, dass Wissen gut aussieht und gut klingt – vom ersten Bild bis zum fertigen Schnitt.", figur: { haut: "#b97a50", haar: "#241c18", stil: "kurz", kleid: "#0e2a33" } },
  { name: "Arooj", rolle: "Ärztin", zusatz: "Fachrichtung folgt", text: "Bringt medizinisches Fachwissen ein und achtet darauf, dass Gesundheitsthemen verständlich und fundiert erklärt werden.", figur: { haut: "#d9a07a", haar: "#2b211c", stil: "tuch", kleid: "#1a8aa6", tuch: "#00495b" } },
  { name: "Safian", rolle: "Arzt", text: "Übersetzt medizinische Fragen in klare Worte – sachlich, nahbar und mit Blick auf den Alltag der Menschen.", figur: { haut: "#c7875b", haar: "#16110f", stil: "bart", kleid: "#1a8aa6" } },
  { name: "Aysha", rolle: "Ärztin", zusatz: "Fachrichtung folgt", text: "Steht für fundiertes Wissen aus der Medizin und dafür, Gesundheit ohne Scheu und mit Respekt zu besprechen.", figur: { haut: "#c58a63", haar: "#2b211c", stil: "tuch", kleid: "#0e2a33", tuch: "#1a8aa6" } },
  { name: "Sadia", rolle: "Ärztin", zusatz: "Fachrichtung folgt", text: "Verbindet ärztliche Erfahrung mit dem Anliegen, Menschen gut informiert durch Gesundheitsfragen zu begleiten.", figur: { haut: "#e0ac86", haar: "#2b211c", stil: "tuch", kleid: "#006780", tuch: "#f2e6c9", brille: true } },
  { name: "Muntazim", rolle: "Chemiker", text: "Denkt naturwissenschaftlich und bringt Neugier, Genauigkeit und Freude am Erklären komplexer Zusammenhänge mit.", figur: { haut: "#b5764c", haar: "#1d1a19", stil: "locken", kleid: "#00495b", brille: true } },
  { name: "Riswan", rolle: "Arzt", text: "Bringt ärztliche Erfahrung und einen ruhigen, klaren Blick auf Gesundheitsthemen in die Plattform ein.", figur: { haut: "#c98e62", haar: "#16110f", stil: "kurz", kleid: "#0e2a33" } },
];

export const NAV = [
  { href: "/", label: "Start" },
  { href: "/vision/", label: "Vision & Werte" },
  { href: "/formate/", label: "Formate" },
  { href: "/fuer-experten/", label: "Für Experten" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/kontakt/", label: "Kontakt" },
];

/** Pfad mit base-Präfix (/ilmmeup) versehen. */
export function u(pfad: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + (pfad.startsWith("/") ? pfad : "/" + pfad);
}
