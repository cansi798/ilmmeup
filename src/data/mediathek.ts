// Mediathek – alle Videos an einer Stelle pflegen.
//
// SO KOMMT EIN NEUES VIDEO DAZU
// 1. Video auf YouTube hochladen und die ID aus dem Link kopieren
//    (https://www.youtube.com/shorts/5cA20lKokEg → ID = 5cA20lKokEg).
// 2. Vorschaubild als JPG unter src/assets/mediathek/<ID>.jpg ablegen
//    (z. B. https://i.ytimg.com/vi/<ID>/maxresdefault.jpg herunterladen). Astro macht daraus beim Bauen
//    kleine WebP-Dateien (AVIF bewusst nicht: manche WebKit-Versionen zeigen es nicht an) – auf der Seite wird nur dieses Bild geladen, nicht YouTube.
// 3. Unten einen Eintrag ergänzen (neueste zuerst). Kategorie muss eine aus KATEGORIEN sein.
// 4. Einen Platzhalter-Eintrag (id: null) löschen, sobald genug echte Videos da sind.
//
// Der YouTube-Player lädt erst nach Klick auf „Abspielen“ (youtube-nocookie.com, siehe Datenschutz).
// Strukturierte Daten (JSON-LD VideoObject) entstehen automatisch – nur für echte Videos, nicht für Platzhalter.

export const KATEGORIEN = ["Gesundheit", "Wissen", "Gesellschaft", "Shorts"] as const;
export type Kategorie = (typeof KATEGORIEN)[number];

export type MediathekVideo = {
  /** YouTube-ID; null = Platzhalter (wird auf der Seite klar als Platzhalter gekennzeichnet) */
  id: string | null;
  titel: string;
  kategorie: Kategorie;
  /** Format laut „Formate“-Seite, z. B. „Kurzimpuls“, „Im Gespräch“ */
  format: string;
  /** Dauer im Format m:ss bzw. h:mm:ss (bei Platzhaltern ungefähre Länge des Formats) */
  dauer: string;
  /** ISO-Dauer für Suchmaschinen, z. B. PT1M21S (nur echte Videos) */
  dauerIso?: string;
  sprecher: string;
  /** Veröffentlichung auf YouTube, JJJJ-MM-TT (nur echte Videos) */
  datum?: string;
  hoch?: boolean;
};

export const MEDIATHEK: MediathekVideo[] = [
  // Echte Videos (Titel nach YouTube, Schreibweise geglättet; Dauer und Datum wie auf YouTube, Stand 08.11.2026)
  { id: "5cA20lKokEg", titel: "„Es sind die Seiten seines Buches, die er füllt“", kategorie: "Shorts", format: "Kurzimpuls · Denkanstoß", dauer: "1:21", dauerIso: "PT1M21S", sprecher: "Dr. Ali Özdil", datum: "2026-10-17", hoch: true },
  { id: "xKxWlA4q4Nc", titel: "Warum sagt Allah: Sie sind schon erfolgreich?", kategorie: "Shorts", format: "Kurzimpuls · Tiefenblick", dauer: "0:35", dauerIso: "PT35S", sprecher: "ilm me up", datum: "2026-10-02", hoch: true },

  // Platzhalter – bis echte Videos da sind
  { id: null, titel: "Gespräch zu einem Gesundheitsthema", kategorie: "Gesundheit", format: "Im Gespräch", dauer: "20–60 Min.", sprecher: "Expertin oder Experte folgt" },
  { id: null, titel: "Fachvortrag aus der Medizin", kategorie: "Gesundheit", format: "Fachvortrag", dauer: "10–30 Min.", sprecher: "Expertin oder Experte folgt" },
  { id: null, titel: "Fragen & Antworten zur Gesundheit", kategorie: "Gesundheit", format: "Fragen & Antworten", dauer: "5–15 Min.", sprecher: "Expertin oder Experte folgt" },
  { id: null, titel: "Fachvortrag aus der Wissenschaft", kategorie: "Wissen", format: "Fachvortrag", dauer: "10–30 Min.", sprecher: "Expertin oder Experte folgt" },
  { id: null, titel: "Gespräch über Bildung und Lernen", kategorie: "Wissen", format: "Im Gespräch", dauer: "20–60 Min.", sprecher: "Expertin oder Experte folgt" },
  { id: null, titel: "Porträt: ein Weg, der andere inspiriert", kategorie: "Gesellschaft", format: "Porträt", dauer: "5–10 Min.", sprecher: "Gast folgt" },
  { id: null, titel: "Gespräch über Familie und Gesellschaft", kategorie: "Gesellschaft", format: "Im Gespräch", dauer: "20–60 Min.", sprecher: "Expertin oder Experte folgt" },
];
