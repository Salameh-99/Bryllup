# Achraaf & Jasmin — bryllupsinvitasjon

Live: **https://salameh-99.github.io/Bryllup/jasmin-ashraaf-bryllup/**

Invitasjon etter Tilda template5, med innhold for bryllupet på **Hove, 26. september 2026**.

| | |
|---|---|
| **Dato** | Lørdag 26.09.2026, kl. 16:00 |
| **Sted** | Hoveveien 110a, 4818 Færvik · Arendal |
| **Catering** | Arendal Catering AS |
| **Svarfrist** | 1. september 2026 |
| **RSVP** | SMS til +47 918 28 440 |
| **Hashtag** | `#AchraafOgJasmin` |

## Kjøre lokalt

```bash
cd jasmin-ashraaf-bryllup
python3 -m http.server 8000
```

Åpne http://localhost:8000

## Konfigurasjon

Øverst i `index.html`:

```js
const CONFIG = {
  date: "2026-09-26T16:00:00",
  rsvpPhone: "+47 918 28 440",
  musicSrc: "...",
  videoSrc: "..."
};
```

RSVP-oppsett: [`docs/oppsett-rsvp.md`](docs/oppsett-rsvp.md)

## Bilder i bruk

| Fil | Brukes til |
|---|---|
| `img/wax-seal.png` | Cover-segl |
| `img/flower.png` | Program-blomst på tidslinjen |
| `img/lokale-bygning.png` | Hove-tegning (Location) |
| `img/lokale-2.jpg` | Stemning — lokalebilde |
| `img/paret.jpg` | Stemning + avslutning |

Øvrige filer i `img/` er kilder/arkiv og brukes ikke direkte på siden.

## Palett

| Rolle | Verdi |
|---|---|
| Rubin | `#66021f` |
| Krem | `#fffaf8` |
| Gull | `#C5A16F` |
| Champagne | `#EAE0D1` |

## Levert av

[sosmedia.no](https://sosmedia.no)
