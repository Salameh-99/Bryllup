# Achraaf & Jasmin — bryllupsside

Invitasjon etter **Tilda template5** (Viktor & Paula / webgency.tilda.ws/template5), med innhold for bryllupet på **Hove, 26. september 2026**.

| | |
|---|---|
| **Dato** | Lørdag 26.09.2026, kl. 16:00 |
| **Sted** | Hoveveien 110a, 4818 Færvik |
| **Catering** | Arendal Catering AS |
| **Svarfrist** | 1. september 2026 |

Dette er **ikke** Kaupang-malen. Siden følger template5-oppsettet: burgunder/krem, script-typografi, revet papir-overganger, blomsterdekor, tidslinje, dress code, RSVP-knapp og flytende musikk-kontroll.

## Kjøre lokalt

```bash
python3 -m http.server 8000
```

## Konfigurasjon

Øverst i `index.html`:

```js
const CONFIG = {
  date: "2026-09-26T16:00:00",
  rsvpPhone: "+47 412 34 567", // nummer for RSVP på SMS
};
```

RSVP-oppsett: [`docs/oppsett-rsvp.md`](docs/oppsett-rsvp.md)

## Egne bilder

Legg filene i `img/` med nøyaktig disse navnene:

| Fil | Brukes til |
|---|---|
| `img/paret.jpg` | Bilde av paret (dress code + bunn). Original: `IMG_0422.jpeg` |
| `img/lokale-bygning.png` | Hove-tegning (Location), svarte streker som i Tilda template5 |
| `img/lokale-2.jpg` | Bilde av lokalet (dress code). Laget fra `AC-3000x1000-1-1536x512.jpeg` |

Til rammene vises en tom plassholder til filen er lagt inn. Blomsterdekoren fra malen beholdes.

## Palett

| Rolle | Verdi |
|---|---|
| Rubin | `#66021f` |
| Krem | `#fffaf8` |
| Gull | `#C5A16F` |
| Champagne | `#EAE0D1` |
