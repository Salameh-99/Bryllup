# Achraaf & Jasmin — bryllupsside

Invitasjon etter **Tilda template5** (Viktor & Paula / webgency.tilda.ws/template5), med innhold for bryllupet på **Hove, 26. september 2026**.

| | |
|---|---|
| **Dato** | Lørdag 26.09.2026, kl. 15:30 |
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
  date: "2026-09-26T15:30:00",
  ENDPOINT: "",   // Google Apps Script URL
  MODE: "sheet"
};
```

RSVP-oppsett: [`docs/oppsett-rsvp.md`](docs/oppsett-rsvp.md)

## Egne bilder

Legg filene i `img/` med nøyaktig disse navnene:

| Fil | Brukes til |
|---|---|
| `img/paret.jpg` | Bilde av paret (dress code + bunn). Original: `IMG_0422.jpeg` |
| `img/lokale.png` | Bilde av lokalet (sted-seksjonen). Original: `53AB3932-83F1-400E-9D21-C6C9EF5784C7.png` |
| `img/lokale-2.jpg` | Ekstra bilde av lokalet (dress code) |

Til rammene vises en tom plassholder til filen er lagt inn. Blomsterdekoren fra malen beholdes.

## Palett

| Rolle | Verdi |
|---|---|
| Rubin | `#66021f` |
| Krem | `#fffaf8` |
| Gull | `#C5A16F` |
| Champagne | `#EAE0D1` |
