# Slik setter du opp RSVP via SMS

Gjestene fyller ut skjemaet på siden. Når de trykker **Send svar på SMS**, åpnes SMS-appen med en ferdig utfylt melding til nummeret du oppgir.

---

## 1 · Legg inn telefonnummer

Finn `CONFIG` øverst i `index.html`:

```js
const CONFIG = {
  date: "2026-09-26T16:00:00",
  rsvpPhone: "+47 918 28 440", // ← ditt nummer her
  ...
};
```

Bruk internasjonalt format med landskode, f.eks. `+47` for Norge.

---

## 2 · Test på mobil

1. Åpne bryllupssiden på telefonen.
2. Trykk **RSVP**, fyll ut skjemaet og trykk **Send svar på SMS**.
3. SMS-appen skal åpne seg med meldingen klar — husk å trykke **Send** i appen.

På PC uten SMS kan du se nummeret på siden og sende manuelt fra telefonen.

---

## Eksempel på melding gjestene sender

```
Hei! Dette er mitt svar på bryllupsinvitasjonen til Achraaf og Jasmin:

Navn: Ola Nordmann
Svar: Jeg kommer
Antall personer: 2
Allergier/merknader: Ingen
```

---

## Alternativ: Google Sheets

Ønsker du web-skjema som lagrer svar i et regneark, se [`scripts/rsvp-google-sheets.gs`](../scripts/rsvp-google-sheets.gs). Det krever egen kodeendring — standardoppsettet er SMS.
