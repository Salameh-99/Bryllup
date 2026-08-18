# Slik kobler du påmeldingen til Google Sheets

Uten `ENDPOINT` logger skjemaet til konsollen og viser bekreftelse — nyttig for lokal testing.
Når du er klar til å ta imot ekte svar, følg stegene under.

---

## 1 · Opprett et Google Sheet

1. Gå til [sheets.google.com](https://sheets.google.com) og lag et nytt ark.
2. Gi rad 1 disse overskriftene (i den rekkefølgen):

   | A | B | C | D | E | F |
   |---|---|---|---|---|---|
   | Tidsstempel | Navn | Svar | Antall | Allergier | Merknad |

---

## 2 · Legg til Apps Script

1. I arket: **Utvidelser → Apps Script**.
2. Slett alt i `Code.gs` og lim inn innholdet fra [`../scripts/rsvp-google-sheets.gs`](../scripts/rsvp-google-sheets.gs).
3. Lagre (`Ctrl+S`).

---

## 3 · Publiser som web-app

1. Klikk **Distribuer → Ny distribusjon**.
2. Velg type **Nettapp**.
3. Innstillinger:
   - **Kjør som:** Meg (din Google-konto)
   - **Hvem har tilgang:** **Alle** *(ellers avvises påmeldinger med 401)*
4. Klikk **Distribuer** og kopiér URL-en du får.

> **Viktig:** Hver gang du endrer skriptet må du lage en **ny distribusjon** — eksisterende URL oppdateres ikke automatisk.

---

## 4 · Lim inn URL i `index.html`

Finn disse to linjene i `<script>`-blokken øverst:

```js
const ENDPOINT = '';   // ← lim inn URL her
const MODE     = 'sheet';
```

Eksempel etter utfylling:

```js
const ENDPOINT = 'https://script.google.com/macros/s/AKfycb…/exec';
const MODE     = 'sheet';
```

---

## 5 · Test

1. Åpne `index.html` i nettleseren (eller kjør `python3 -m http.server 8000`).
2. Fyll ut skjemaet og klikk **Send svar**.
3. Kontroller at en ny rad dukker opp i Google Sheet.

---

## Alternativ: Formspree

Ønsker du ikke å bruke Apps Script kan du bruke [Formspree](https://formspree.io):

1. Opprett en gratis konto og lag et nytt skjema.
2. Kopier endpoint-URL (`https://formspree.io/f/…`).
3. I `index.html`:

```js
const ENDPOINT = 'https://formspree.io/f/xyzabcde';
const MODE     = 'formspree';
```

---

## Feilsøking

| Problem | Løsning |
|---|---|
| 401 / 403 ved innsending | Sjekk at web-app er publisert med tilgang **Alle** |
| Skript-endringer har ingen effekt | Lag en **ny distribusjon** |
| CORS-feil i konsollen | Bruk `Content-Type: text/plain` (allerede satt i skriptet) |
| Rad skrives ikke til arket | Sjekk at `SHEET_NAME` i `.gs`-filen matcher fanenavnet |
