/**
 * rsvp-google-sheets.gs
 * Google Apps Script — mottar RSVP-svar fra bryllupssiden og skriver til Sheet.
 *
 * Oppsett: se docs/oppsett-rsvp.md
 */

/* Navn på fanebladet i Google Sheet */
var SHEET_NAME = "Svar";

/* ──────────────────────────────────────────────────────────────
   doPost — kalles av nettleseren ved skjemainnsending
   Bruker Content-Type: text/plain for å unngå CORS-preflight.
   ────────────────────────────────────────────────────────────── */
function doPost(e) {
  try {
    var data    = JSON.parse(e.postData.contents);
    var sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      /* Lag fanen automatisk hvis den mangler */
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      sheet.appendRow(["Tidsstempel", "Navn", "Svar", "Antall", "Allergier", "Merknad"]);
    }

    sheet.appendRow([
      new Date().toLocaleString("nb-NO"),
      data.name     || "—",
      data.attend   || "—",
      data.guests   || "1",
      data.allergies|| "—",
      data.notes    || "—"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/* ──────────────────────────────────────────────────────────────
   doGet — enkel helsesjekk; åpne URL i nettleseren for å teste
   ────────────────────────────────────────────────────────────── */
function doGet() {
  return ContentService
    .createTextOutput("RSVP-skript kjører. Bruk POST for å sende svar.")
    .setMimeType(ContentService.MimeType.TEXT);
}
