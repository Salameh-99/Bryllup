# Stoupa Family Trip Planner

Mobil dagsplan for familieturen i Stoupa, 4.–10. oktober 2026. Siden er statisk HTML, CSS og JavaScript. Den virker uten innlogging. Avkrysninger, notater og egne aktiviteter lagres i nettleseren på telefonen (`localStorage`) og blir værende etter refresh.

## Åpne siden

Etter at dette er med på `main` og GitHub Pages er aktivert for repoet:

https://salameh-99.github.io/Bryllup/stoupa-family-trip/

Bryllupsinvitasjonen i rotmappen er urørt. Reiseplanen ligger i denne mappen, så begge sider kan leve side om side.

Lokalt:

```bash
cd stoupa-family-trip
python3 -m http.server 8080
```

Åpne http://localhost:8080 på telefonen i samme nett, eller på datamaskinen.

På iPhone: åpne siden i Safari, del, og velg **Legg til på Hjem-skjerm**. Etter første besøk kan selve planen brukes med dårlig nett. Google Maps-knappene trenger fortsatt dekning.

## Språk

Norsk er standard. Bytt til English eller Ελληνικά øverst. Hele grensesnittet og de ferdige planene for søndag og mandag bytter språk. Tekst du skriver selv, blir stående slik du skrev den.

## Hva som ligger klart

- Søndag 4. oktober: familieutflukt med Kalogria, Kardamyli, lunsj, Agios Nikolaos, Stoupa Beach og solnedgang.
- Mandag 5. oktober: Stoupa, Diros-grottene, Areopoli, Limeni og tilbake. Åpningstider og priser er tomme felt, så ingenting blir utdatert.
- Tirsdag til lørdag er tomme til du legger inn aktiviteter.
- Huskeliste, hjelpesetninger på gresk med kopier-knapp, og egne notater.
- **+ Ny dag** legger til flere dager for senere turer.
- **Nullstill reisedata** sletter det som er lagret på telefonen, etter bekreftelse, og legger de ferdige planene tilbake.

## Personvern

Notater og avkrysninger sendes ikke til GitHub. De ligger bare i nettleseren på enheten du bruker. Selve dagsplanen ligger i kildekoden. Dette repoet er offentlig fordi bryllupssiden allerede publiseres på GitHub Pages, så adressen til reiseplanen kan åpnes av alle som har lenken. Siden ber søkemotorer om ikke å indeksere den (`noindex`).

---

# Stoupa Family Trip Planner

A mobile day planner for the family trip in Stoupa, 4–10 October 2026. Static HTML, CSS and JavaScript. No login. Checks, notes and your own activities stay in the browser (`localStorage`) after refresh.

Once this folder is on `main` and GitHub Pages is enabled:

https://salameh-99.github.io/Bryllup/stoupa-family-trip/

The wedding invitation at the repo root is unchanged.

```bash
cd stoupa-family-trip
python3 -m http.server 8080
```

On iPhone, open the page in Safari and use **Add to Home Screen**. After the first visit the plan itself works on a weak connection. Maps buttons still need network.

Norwegian is the default. The language switcher also sets English and Greek for the interface and the preset Sunday and Monday plans. Text you type stays as you wrote it.

Checks and notes are not uploaded. This repository is public because the wedding site is already on GitHub Pages, so anyone with the link can open the planner. The page asks search engines not to index it.
