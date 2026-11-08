// Zentrale Angaben der Website. Alles mit „TODO“ ist Platzhalter, bis ilmmeup die echten Daten schickt.

/** Vorschau-Modus: setzt noindex und zeigt Platzhalter-Hinweise. Vor dem Livegang auf false. */
export const VORSCHAU = true;

export const NAME = "ilm me up";
export const CLAIM = "Wissen sichtbar machen. Menschen verbinden.";
export const BESCHREIBUNG =
  "ilm me up ist eine unabhängige Medienplattform: Expertinnen und Experten teilen ihr Wissen in professionell produzierten Videos, offen für alle Menschen.";

// Empfängeradresse für Kontakt- und Kooperationsanfragen (Formulare öffnen das E-Mail-Programm).
export const MAIL = "info@ilmmeup.de";

// Kanal-Links (von Jamil, 19.10.2026)
export const SOCIAL = [
  { id: "youtube", name: "YouTube", handle: "ilm me up", url: "https://www.youtube.com/channel/UCw1k2XUyy1swA1CGxjRpgFQ", platzhalter: false, text: "Gespräche, Vorträge und Impulse in voller Länge." },
  { id: "instagram", name: "Instagram", handle: "@ilmmeup", url: "https://www.instagram.com/ilmmeup/", platzhalter: false, text: "Kurze Impulse, Zitate und Einblicke hinter die Kamera." },
  { id: "tiktok", name: "TikTok", handle: "@ilmmeup", url: "https://www.tiktok.com/@ilmmeup", platzhalter: false, text: "Wissen in 60 Sekunden, klar und ehrlich auf den Punkt gebracht." },
] as const;

// YouTube-Shorts für die Startseite (nur die ID; hochkant 9:16). Von Jamil, 19.10.2026.
// TODO: Titel der Videos von ilmmeup bestätigen lassen (bisher neutrale Arbeitstitel).
export const VIDEOS: { id: string | null; titel: string; thema: string; hoch?: boolean }[] = [
  { id: "5cA20lKokEg", titel: "Kurzimpuls #1", thema: "YouTube Short", hoch: true },
  { id: "xKxWlA4q4Nc", titel: "Kurzimpuls #2", thema: "YouTube Short", hoch: true },
];

// Team (von Jamil, 19.10.2026): vorerst gezeichnete Figuren statt Fotos.
// TODO: Fachrichtung von Arooj, Porträttexte bestätigen, später echte Fotos.
// 08.11.2026 (Jamil): Dr. Safian Leitung, Sadia Allgemeinmedizin + Veranstaltungen (gemeinsam mit Dr. Muntazim), Aysha Social Media, Arooj Werbematerial, Dr. Riswan Allrounder.
export type Figur = {
  haut: string;
  haar: "kurz" | "seitenscheitel" | "voll" | "vollkurz" | "wellig" | "locken" | "lang" | "glatze" | "tuch";
  haarFarbe?: string; straehnen?: string;
  bart?: "voll" | "kurz" | "stoppel"; bartFarbe?: string; bartStraehnen?: string;
  brauen?: "dick" | "normal" | "fein" | "spitz"; brauenFarbe?: string;
  brille?: "schwarz" | "eckig" | "rund";
  kleid: string; kragen?: "hemd" | "v" | "rund" | "jacke";
  tuch?: string; tuchStil?: "seite" | "band" | "nadel"; tuchAkzent?: string;
};
// Anzeige: „rolle · fach“ (fett), danach optional „· taetigkeit“ (normal) bzw. „· zusatz“ (kursiv, Platzhalter).
// Einheitliches Muster für Ärztinnen und Ärzte: rolle „Arzt“/„Ärztin“, fach = Fachrichtung (Jamil 08.11.2026).
export type Person = { name: string; rolle: string; fach?: string; taetigkeit?: string; zusatz?: string; text: string; figur: Figur };
// Reihenfolge laut Jamil: er selbst ganz hinten. Aussehen von Jamil, Safian und Riswan nach seiner Beschreibung (20.10.2026).
export const TEAM: Person[] = [
  { name: "Sheeras", rolle: "Videograf", text: "Sorgt hinter der Kamera dafür, dass Wissen gut aussieht und gut klingt, vom ersten Bild bis zum fertigen Schnitt.", figur: { haut: "#e0ac86", haar: "glatze", haarFarbe: "#2a2624", bart: "voll", bartFarbe: "#2a2624", bartStraehnen: "#a9a6a0", brauen: "dick", brauenFarbe: "#1d1a19", kleid: "#0e2a33", kragen: "rund" } },
  { name: "Arooj", rolle: "Ärztin", taetigkeit: "organisiert unser Werbematerial", text: "Bringt medizinisches Fachwissen ein und achtet darauf, dass Gesundheitsthemen verständlich und fundiert erklärt werden. Außerdem organisiert sie Flyer, Werbeartikel und weiteres Werbematerial.", figur: { haut: "#d9a07a", haar: "tuch", tuch: "#00495b", tuchStil: "nadel", tuchAkzent: "#ffcc00", brauen: "fein", kleid: "#1a8aa6" } },
  { name: "Dr. Safian", rolle: "Arzt", fach: "Kardiologie", text: "Leitet ilm me up und bringt das Projekt Schritt für Schritt voran. Fragen rund um Herz und Kreislauf übersetzt er in klare Worte, sachlich, nahbar und mit Blick auf den Alltag der Menschen.", figur: { haut: "#c7875b", haar: "vollkurz", haarFarbe: "#16110f", bart: "kurz", bartFarbe: "#141110", brille: "schwarz", kleid: "#1a8aa6", kragen: "hemd" } },
  { name: "Aysha", rolle: "Ärztin", taetigkeit: "betreut unsere Social-Media-Kanäle", text: "Verbindet medizinisches Wissen mit Social Media und sorgt dafür, dass unsere Inhalte auf den Kanälen fundiert und verständlich ankommen.", figur: { haut: "#e0ac86", haar: "tuch", tuch: "#1a8aa6", tuchStil: "seite", brauen: "fein", brille: "eckig", kleid: "#0e2a33" } },
  { name: "Sadia", rolle: "Ärztin", fach: "Allgemeinmedizin", text: "Verbindet ärztliche Erfahrung mit dem Anliegen, Menschen gut informiert durch Gesundheitsfragen zu begleiten. Gemeinsam mit Dr. Muntazim ist sie hauptverantwortlich für die Organisation unserer Veranstaltungen.", figur: { haut: "#e0ac86", haar: "tuch", tuch: "#f2e6c9", brauen: "fein", brille: "eckig", kleid: "#006780" } },
  { name: "Dr. Muntazim", rolle: "Chemiker", text: "Denkt naturwissenschaftlich und bringt Neugier, Genauigkeit und Freude am Erklären komplexer Zusammenhänge mit. Gemeinsam mit Sadia ist er hauptverantwortlich für die Organisation unserer Veranstaltungen.", figur: { haut: "#b07a52", haar: "wellig", haarFarbe: "#1d1a19", bart: "kurz", bartFarbe: "#141110", brille: "schwarz", kleid: "#00495b", kragen: "v" } },
  { name: "Dr. Riswan", rolle: "Arzt", fach: "Kardiologie", text: "Unser Allrounder: Er kümmert sich um die Online-Strategie und das Veranstaltungsmanagement. Außerdem führt er die Termine und Erstgespräche mit den Expertinnen und Experten.", figur: { haut: "#d29a6e", haar: "vollkurz", haarFarbe: "#5f5c58", straehnen: "#1d1a19", bart: "kurz", bartFarbe: "#5f5c58", bartStraehnen: "#1d1a19", brauen: "dick", brauenFarbe: "#3d3a37", kleid: "#0e2a33", kragen: "jacke" } },
  { name: "Jamil", rolle: "IT Service Manager", text: "Hält Technik, Abläufe und Plattform zusammen, damit Inhalte zuverlässig dort ankommen, wo Menschen sie suchen.", figur: { haut: "#e0ac86", haar: "glatze", haarFarbe: "#141110", bart: "kurz", bartFarbe: "#141110", brauen: "spitz", brauenFarbe: "#1d1a19", kleid: "#006780", kragen: "hemd" } },
];

export const NAV = [
  { href: "/", label: "Start" },
  { href: "/vision/", label: "Vision & Werte" },
  { href: "/formate/", label: "Formate" },
  { href: "/mediathek/", label: "Mediathek" },
  { href: "/fuer-experten/", label: "Für Experten" },
  { href: "/ueber-uns/", label: "Über uns" },
  { href: "/kontakt/", label: "Kontakt" },
];

/** Pfad mit base-Präfix (/ilmmeup) versehen. */
export function u(pfad: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return base + (pfad.startsWith("/") ? pfad : "/" + pfad);
}
