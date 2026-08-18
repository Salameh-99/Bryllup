# Jasmin &amp; Ashraaf — bryllupsside

Invitasjonsside for bryllupet på **Hove, 26. september 2026**.

| | |
|---|---|
| **Dato** | Lørdag 26.09.2026, kl. 14:00 |
| **Sted** | Hoveveien 110a, 4818 Færvik |
| **Catering** | Arendal Catering AS |
| **Svarfrist** | 1. august 2026 |

---

## Struktur

```
.
├── index.html                    # Hele nettsiden — én fil, ingen byggesteg
├── docs/
│   └── oppsett-rsvp.md           # Slik kobles påmeldingen til Google Sheets
└── scripts/
    └── rsvp-google-sheets.gs     # Apps Script som mottar påmeldingene
```

Ingen `npm install`, ingen bundler, ingen avhengigheter. `index.html` er selvstendig — all CSS og JS ligger inline.

## Kjøre lokalt

Åpne `index.html` i nettleseren. Det er alt.

Vil du ha en lokal server (f.eks. for å teste påmeldingen mot Apps Script):

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Konfigurasjon

Alt innhold styres av `CONFIG`-objektet øverst i `index.html`:

```js
const CONFIG = {
  names:     "Jasmin & Ashraaf",
  date:      "2026-09-26T14:00:00",
  names: { no: "Jasmin & Ashraaf", fa: "Jasmin & Ashraaf" },
  date: "2026-09-26T14:00:00",
  durationHours: 10,
  videoSrc: "../video/cover-doors.mp4",
  images: {
    hero: "../img/hero-venue.jpg",
    seal: "../img/wax-seal.png",
    gallery: [...]
  },
  venue: { name: { no: "Hove", fa: "Hove" }, address: "...", mapsQuery: "..." },
  program: [...],
  ENDPOINT: "",       // ← URL fra Google Apps Script (se docs/oppsett-rsvp.md)
  MODE: "sheet"       // 'sheet' eller 'formspree'
};
```

### Andre ting som er lette å endre

| Hva | Hvor |
|---|---|
| Video på cover | `videoSrc` i `CONFIG` |
| Hero- og galleri-bilder | `images` i `CONFIG` |
| Nedtellingsdato | `date` i `CONFIG` |
| Program / tidspunkter | `program`-arrayen i `CONFIG` |

---

## Påmelding (RSVP)

Se [`docs/oppsett-rsvp.md`](docs/oppsett-rsvp.md) for fullstendig oppsett.

Uten `ENDPOINT` fungerer skjemaet fortsatt — svaret logges til konsollen i stedet for å sendes.

---

## Publisering

### GitHub Pages

1. Push til GitHub
2. **Settings → Pages**
3. **Source:** Deploy from a branch → `main` / `root` (velg mappen `jasmin-ashraaf-bryllup` hvis den er i en undermappe, eller flytt filene til rot)
4. Live på `https://<bruker>.github.io/<repo>/`

### Alternativer

| Tjeneste | Notat |
|---|---|
| [Netlify Drop](https://app.netlify.com/drop) | Dra mappen inn — live på sekunder |
| Cloudflare Pages | Gratis, støtter eget domene |
| Vercel | `vercel deploy` |

Eget domene (f.eks. `jasminogashraaf.no`) koster ca. 100–200 kr/år hos [Domeneshop](https://domene.shop).

---

## Teknisk

**Typografi** — Playfair Display (overskrifter), Pinyon Script (detaljer) og Inter (brødtekst), fra Google Fonts.

**Palett**

| Rolle | Verdi |
|---|---|
| Ivory | `#FAF6EE` |
| Cream | `#F2E9D8` |
| Gull | `#B68E3A` |
| Gull dyp | `#7A5520` |

**Template-oppsett**

- Videodører på cover
- Vokssegl-knapp for åpning
- Hero-bilde med ramme
- Galleri med seks bilder
- Reveal-animasjoner og auto-scroll
- Fast bunnnavigasjon og musikk-knapp

**Kjente punkter**

- POST-en til Apps Script bruker `Content-Type: text/plain` med vilje — det unngår CORS-preflight. Ikke endre til `application/json` uten å teste.
- Google Apps Script må publiseres med tilgang satt til **«Alle»**, ellers avvises påmeldingene med 401/403.
- Endringer i Apps Script krever **ny distribusjon** for å tre i kraft.
