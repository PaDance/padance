# PaDance landingspagina

Een snelle one-page website voor PaDance, gemaakt met alleen HTML, CSS en een beetje JavaScript.
Geen build, geen database, geen betaalde diensten. Klaar voor gratis hosting op Netlify.

## Bestanden

```
PaDance Site/
├── index.html            De pagina (alle teksten staan hier)
├── css/style.css         Vormgeving (kleuren bovenaan bij :root)
├── js/main.js            Menu, ticketlinks en formulier (links invullen bovenaan)
├── images/
│   ├── hero.jpg          Foto bovenaan
│   ├── sfeer.jpg         Sfeerbeeld onder Concept
│   └── og-image.png      Beeld dat verschijnt als je de link deelt
├── assets/
│   ├── logo/             Logo-onderdelen die de site gebruikt (niet aanpassen)
│   ├── fonts/            Lettertype Archivo (gratis, OFL-licentie)
│   └── favicon + app-icoon
├── netlify.toml          Instellingen voor Netlify
├── robots.txt, sitemap.xml
└── README.md
```

## 1. Lokaal bekijken

**Snelst:** dubbelklik op `index.html`. De pagina opent in je browser.

Het interesseformulier werkt pas online (op Netlify). Lokaal krijg je daar een melding over; dat is normaal.

## 2. Invulvelden aanpassen

Alles wat nog niet bevestigd is, staat tussen vierkante haken, bijvoorbeeld `[DATUM]`.
Op de pagina zie je ze als een vakje met een stippellijn, zodat je niets vergeet.

1. Open `index.html` in een teksteditor (bv. Kladblok of gratis Visual Studio Code).
2. Zoek met **Ctrl+F** naar `[` om alle invulvelden te vinden.
3. Vervang het hele stukje, dus ook de code eromheen. Voorbeeld:

   ```html
   <span class="ph">[DATUM]</span> mei 2027
   ```
   wordt
   ```html
   zaterdag 15 mei 2027
   ```
   (`class="ph"` zorgt voor het stippelkader, dus dat moet weg.)

Lijst van invulvelden:

| Invulveld | Waar |
|---|---|
| `[DATUM]` | Hero, Praktisch |
| `[LOCATIE]`, `[ADRES]` | Hero, Praktisch |
| `[STARTUUR]`, `[EINDUUR]`, `[UUR]` (5×) | Praktisch, Programma |
| `[DJ 1]`, `[DJ 2]`, `[DJ 3]` | Programma (line-up) |
| `[PRIJS]` (2×), `[WAT IS INBEGREPEN]` (2×) | Tickets |
| `[TICKETLINK]` | Tickets (meldingsvak) |
| `[FIETS / OPENBAAR VERVOER / PARKING]`, `[RACKET, SPORTSCHOENEN, ...]`, `[INFO TOEGANKELIJKHEID]` | Praktisch |
| FAQ-antwoorden: `[ANTWOORD ...]`, `[BEVESTIGEN + TICKETINFO]`, `[WEERPLAN]`, `[LEEFTIJD]`, `[ANNULERINGSVOORWAARDEN]` | Praktisch |
| `[E-MAILADRES]`, `[INSTAGRAM-ACCOUNT]`, `[TIKTOK-ACCOUNT]` | Contact (voorbeeldcode staat erboven in een commentaar) |
| `[LINK NAAR PRIVACYVERKLARING]`, `[NAAM STUDENTENBEDRIJF + ONDERNEMINGSNUMMER]` | Footer |

Vergeet ook de **slogan** niet te bevestigen ("Padel heeft een ritme. Muziek ook." komt uit jullie pitch) en pas
de beschrijving in de `<head>` van `index.html` aan zodra datum en locatie vastliggen.

### Ticket- en inschrijfknoppen

Zolang er geen ticketlink is, springen de knoppen naar het oranje gestippelde vak "De ticketverkoop is nog niet open".
Heb je een link (bv. van een gratis ticketplatform)? Open `js/main.js` en vul bovenaan in:

```js
const CONFIG = {
  registrationUrl: 'https://...',  // knop "Schrijf je duo in"
  ticketUrl: 'https://...'         // knop "Koop een ticket"
};
```

Alle ticketknoppen gebruiken dan automatisch die link. Pas daarna ook de tekst in het meldingsvak aan.

## 3. Eigen beelden plaatsen

1. Maak je foto eerst kleiner (onder ~300 kB), bv. met het gratis https://squoosh.app.
2. Vervang in de map `images/` het bestand `hero.jpg` (staand, ca. 1200×1500 px) of `sfeer.jpg` (liggend, ca. 1600×900 px) door je eigen foto, met dezelfde naam.
3. Pas in `index.html` bij die foto `width`, `height` en de `alt`-tekst aan (korte beschrijving, bv. `alt="Duo speelt padel terwijl een DJ draait"`), en het onderschrift bij het sfeerbeeld.

Gebruik alleen foto's die jullie zelf maakten of waarvoor je toestemming hebt. Geen logo's van partners zolang die samenwerking niet bevestigd is.

## 4. Gratis publiceren op Netlify

**Zonder account-gedoe (drag & drop):**

1. Maak een gratis account op https://app.netlify.com.
2. Ga naar **Sites → Add new site → Deploy manually**.
3. Sleep de hele map **PaDance Site** in het vak. Na een paar seconden staat de site online op een adres als `iets.netlify.app`.
4. Een update? Open de site in Netlify → **Deploys** → sleep de map opnieuw.

**Het formulier activeren:** ga in Netlify naar **Forms** en klik op **Enable form detection**, en sleep de map daarna nog één keer opnieuw.
Inzendingen zie je dan onder **Forms → interesse**. Het gratis plan heeft een maandelijkse limiet op inzendingen; controleer de actuele limiet op netlify.com.

### Je domein padance.be koppelen

1. In Netlify: **Domain management → Add a domain** → typ `padance.be`.
2. Netlify toont welke DNS-instellingen je moet invullen. Doe dat bij de partij waar je `padance.be` gekocht hebt
   (meestal een A-record voor `padance.be` en een CNAME voor `www`), of zet de nameservers over naar Netlify.
3. Wacht tot de DNS is bijgewerkt (minuten tot een paar uur). Netlify zet daarna gratis HTTPS (slotje) aan.

De metadata (`og:url`, `canonical`, sitemap) gaan al uit van `https://padance.be/`.

## 5. Kleuren en stijl

- Basis: crème/zand `#F4EFE6` (de crèmekleur uit het logo) en diep baangroen `#0E3B2E`.
- Accent: PaDance-oranje `#FF5A1F` voor knoppen. Voor oranje tekst op licht wordt het donkerdere `#D9420F` uit de pitch gebruikt, zodat het leesbaar blijft.
- Lime `#E6F53A` alleen op donkere vlakken (scorebord, labels), zoals in het logo.
- Het logo staat altijd in de originele kleuren. Op een lichte achtergrond staat het op het donkere label uit de pitchdeck (de crème "Pa" valt anders weg).

Alle kleuren staan bovenaan in `css/style.css` en kun je daar centraal aanpassen.

## Later toevoegen (aanrader)

- Een privacyverklaring (verplicht zodra je e-mailadressen verzamelt).
- Zodra datum en locatie vastliggen: gestructureerde gegevens (schema.org `Event`) zodat Google het evenement beter toont.

## Foto's

| Bestand | Foto | Maker | Licentie |
|---|---|---|---|
| `images/hero.jpg` | [Man en vrouw op een padelterrein](https://unsplash.com/photos/a-man-and-woman-posing-on-a-padel-court-dHDYCMVAsmU) | César O'neill (Unsplash) | Unsplash License |
| `images/sfeer.jpg` | [DJ op een buitenfeest bij zonsondergang](https://www.pexels.com/photo/a-dj-at-an-outdoor-party-13902049/) | Luca Luperto (Pexels) | Pexels License |

Beide licenties: gratis, ook commercieel, naamsvermelding niet verplicht (wel netjes).
Wek niet de indruk dat de mensen op de foto's PaDance aanbevelen.
Zodra je eigen foto's van PaDance hebt, vervang je deze bestanden met dezelfde naam (hero staand 4:5, sfeer liggend 16:9)
en pas je `width`/`height`, `alt` en het onderschrift in `index.html` aan.

## Animaties

- **Logo:** bij het openen rolt het beeldmerk binnen en springen de balkjes op als een equalizer. Bij hover bewegen ze zachtjes mee.
  Het logo in de header is het originele kleurlogo op het donkere label uit de pitchdeck. Het staat als code in `index.html` (label + beeldmerk) plus `assets/logo/padance-wordmark-primary.svg` (woordmerk), met exact de kleuren van `padance-logo-primary.svg`.
- **Scroll:** blokken schuiven rustig omhoog zodra ze in beeld komen (`js/main.js`, onderdeel "Scroll-animatie").
- Wie op zijn toestel "minder beweging" heeft aangezet, ziet geen animaties. Zonder JavaScript blijft alles gewoon zichtbaar.
- Uitzetten: verwijder in `css/style.css` het blok "Animaties".
