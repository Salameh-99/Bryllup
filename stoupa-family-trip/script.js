/* Stoupa Family Trip Planner
   Statisk side uten innlogging. Alt brukeren skriver lagres i localStorage
   på enheten og overlever refresh. Google Maps-lenker trenger nett. */

(function () {
  "use strict";

  const STORAGE_KEY = "stoupa-family-trip-v1";

  const MAPS = {
    kalogria: "https://www.google.com/maps/search/?api=1&query=Kalogria%20Beach%20Stoupa%20Greece",
    kardamyli: "https://www.google.com/maps/search/?api=1&query=Kardamyli%20Greece",
    agios: "https://www.google.com/maps/search/?api=1&query=Agios%20Nikolaos%20Messinia%20Greece",
    stoupaBeach: "https://www.google.com/maps/search/?api=1&query=Stoupa%20Beach%20Greece",
    stoupa: "https://www.google.com/maps/search/?api=1&query=Stoupa%20Messinia%20Greece",
    diros: "https://www.google.com/maps/search/?api=1&query=Diros%20Caves%20Mani%20Greece",
    areopoli: "https://www.google.com/maps/search/?api=1&query=Areopoli%20Greece",
    limeni: "https://www.google.com/maps/search/?api=1&query=Limeni%20Mani%20Greece"
  };

  const TRIP = [
    "2026-10-04",
    "2026-10-05",
    "2026-10-06",
    "2026-10-07",
    "2026-10-08",
    "2026-10-09",
    "2026-10-10"
  ];

  const STOP = { times: true, what: true, memory: true, hours: true, price: true };
  const LUNCH = { chosen: true };

  /* Tekster: [norsk, english, ελληνικά] */
  const UI = {
    language: ["Språk", "Language", "Γλώσσα"],
    appTitle: ["Stoupa Family Trip 🇬🇷", "Stoupa Family Trip 🇬🇷", "Stoupa Family Trip 🇬🇷"],
    dates: ["4.–10. oktober 2026", "4–10 October 2026", "4–10 Οκτωβρίου 2026"],
    subtitle: [
      "Familietur i Mani – våre planer, steder og minner.",
      "Family trip in Mani – our plans, places and memories.",
      "Οικογενειακό ταξίδι στη Μάνη – τα σχέδιά μας, τα μέρη και οι αναμνήσεις."
    ],
    navPlan: ["Plan", "Plan", "Πλάνο"],
    navPack: ["Huskeliste", "List", "Λίστα"],
    navAdd: ["Legg til", "Add", "Προσθήκη"],
    navNotes: ["Notater", "Notes", "Σημειώσεις"],
    navHelp: ["Hjelp", "Help", "Βοήθεια"],
    weather: ["Vær-notat", "Weather note", "Σημείωση καιρού"],
    weatherPh: ["F.eks. sol, 24 grader", "e.g. sunny, 24 degrees", "π.χ. ήλιος, 24 βαθμοί"],
    dayNotes: ["Egne notater", "Our notes", "Δικές μας σημειώσεις"],
    dayNotesPh: ["Skriv her", "Write here", "Γράψτε εδώ"],
    bestMoment: ["Dagens beste øyeblikk ❤️", "Best moment of the day ❤️", "Η καλύτερη στιγμή της ημέρας ❤️"],
    bestPh: ["Det vi vil huske", "What we want to remember", "Αυτό που θέλουμε να θυμόμαστε"],
    progress: ["Dagens fremdrift: {done} / {total} ✓", "Today's progress: {done} / {total} ✓", "Πρόοδος ημέρας: {done} / {total} ✓"],
    doneBanner: ["Dagens eventyr fullført!", "Today's adventure is complete!", "Η σημερινή περιπέτεια ολοκληρώθηκε!"],
    statusNot: ["Ikke startet", "Not started", "Δεν ξεκίνησε"],
    statusGo: ["Pågår", "In progress", "Σε εξέλιξη"],
    statusDone: ["Ferdig", "Done", "Ολοκληρώθηκε"],
    empty: [
      "Ingen plan ennå – legg til dagens eventyr ✨",
      "No plan yet – add today's adventure ✨",
      "Δεν υπάρχει πλάνο ακόμα – πρόσθεσε τη σημερινή περιπέτεια ✨"
    ],
    addActivity: ["Legg til aktivitet", "Add activity", "Προσθήκη δραστηριότητας"],
    maps: ["Maps", "Maps", "Χάρτης"],
    note: ["Notat", "Note", "Σημείωση"],
    edit: ["Rediger", "Edit", "Επεξεργασία"],
    delete: ["Slett", "Delete", "Διαγραφή"],
    chosenPlace: ["Restaurant / sted vi valgte", "Restaurant / place we chose", "Εστιατόριο / μέρος που διαλέξαμε"],
    chosenPh: ["Skriv navnet her", "Write the name here", "Γράψτε το όνομα εδώ"],
    arrival: ["Ankomst", "Arrival", "Άφιξη"],
    departure: ["Avreise", "Departure", "Αναχώρηση"],
    whatHere: ["Hva skal vi gjøre her?", "What will we do here?", "Τι θα κάνουμε εδώ;"],
    whatPh: ["Skriv planen deres", "Write your plan", "Γράψτε το πλάνο σας"],
    memory: ["Bilder / minner", "Photos / memories", "Φωτογραφίες / αναμνήσεις"],
    memoryPh: ["Det vi vil huske herfra", "What we want to remember", "Τι θέλουμε να θυμόμαστε"],
    hours: ["Åpningstider", "Opening hours", "Ωράριο"],
    hoursPh: ["Skriv inn selv", "Add them yourself", "Συμπληρώστε μόνοι σας"],
    price: ["Pris", "Price", "Τιμή"],
    pricePh: ["Skriv inn selv", "Add it yourself", "Συμπληρώστε μόνοι σας"],
    newDay: ["Ny dag", "New day", "Νέα μέρα"],
    reset: ["Nullstill reisedata", "Reset trip data", "Μηδενισμός δεδομένων"],
    resetTitle: ["Nullstill reisedata?", "Reset trip data?", "Μηδενισμός δεδομένων;"],
    resetBody: [
      "Avkrysninger, egne aktiviteter, notater og huskeliste på denne telefonen slettes. De ferdige dagsplanene legges inn på nytt.",
      "Checks, your activities, notes and the packing list on this phone will be deleted. The ready-made day plans are put back.",
      "Οι επιλογές, οι δικές σας δραστηριότητες, οι σημειώσεις και η λίστα σε αυτό το τηλέφωνο θα διαγραφούν. Τα έτοιμα πλάνα επιστρέφουν."
    ],
    cancel: ["Avbryt", "Cancel", "Ακύρωση"],
    confirmReset: ["Nullstill", "Reset", "Μηδενισμός"],
    confirmDelete: ["Slett", "Delete", "Διαγραφή"],
    deleteTitle: ["Slette dette?", "Delete this?", "Διαγραφή;"],
    deleteBody: [
      "Egne aktiviteter slettes. Ferdige planer kommer tilbake hvis du nullstiller reisen.",
      "Your own activities are removed. Preset plans come back if you reset the trip.",
      "Οι δικές σας δραστηριότητες διαγράφονται. Τα έτοιμα πλάνα επιστρέφουν αν μηδενίσετε το ταξίδι."
    ],
    addHeading: ["Legg til aktivitet", "Add activity", "Νέα δραστηριότητα"],
    editHeading: ["Rediger aktivitet", "Edit activity", "Επεξεργασία"],
    fieldDay: ["Dag", "Day", "Ημέρα"],
    fieldActivity: ["Aktivitet", "Activity", "Δραστηριότητα"],
    activityPh: ["F.eks. lunsj ved havnen", "e.g. lunch by the harbour", "π.χ. μεσημεριανό στο λιμάνι"],
    fieldPlace: ["Sted", "Place", "Μέρος"],
    placePh: ["F.eks. Kardamyli", "e.g. Kardamyli", "π.χ. Καρδαμύλη"],
    fieldTime: ["Tid", "Time", "Ώρα"],
    fieldDesc: ["Beskrivelse", "Description", "Περιγραφή"],
    descPh: ["Kort plan", "Short plan", "Σύντομο πλάνο"],
    fieldBring: ["Hva må vi ha med?", "What should we bring?", "Τι να πάρουμε μαζί;"],
    bringPh: ["Ett punkt per linje", "One item per line", "Ένα στοιχείο ανά γραμμή"],
    fieldMaps: ["Google Maps-lenke", "Google Maps link", "Σύνδεσμος Google Maps"],
    mapsPh: ["Lim inn lenke eller stedsnavn", "Paste a link or place name", "Σύνδεσμος ή όνομα μέρους"],
    fieldNotes: ["Notater", "Notes", "Σημειώσεις"],
    notesPh: ["Noe vi må huske", "Something to remember", "Κάτι να θυμόμαστε"],
    fieldPhone: ["Telefon", "Phone", "Τηλέφωνο"],
    phonePh: ["Valgfritt", "Optional", "Προαιρετικό"],
    fieldAddress: ["Adresse", "Address", "Διεύθυνση"],
    save: ["Lagre aktivitet", "Save activity", "Αποθήκευση"],
    required: ["Skriv hva aktiviteten er.", "Add a name for the activity.", "Γράψτε το όνομα της δραστηριότητας."],
    packingTitle: ["Huskeliste", "Packing list", "Λίστα για τη βόλτα"],
    packingIntro: ["Kryss av før dere kjører.", "Check these before you drive.", "Τσεκάρετε πριν φύγετε."],
    addItem: ["Legg til", "Add", "Προσθήκη"],
    addItemPh: ["Eget punkt", "Your own item", "Δικό σας στοιχείο"],
    remove: ["Fjern", "Remove", "Αφαίρεση"],
    groupKids: ["Barna", "Kids", "Παιδιά"],
    groupCar: ["Bil", "Car", "Αυτοκίνητο"],
    groupParents: ["Foreldre", "Parents", "Γονείς"],
    notesTitle: ["Mine notater", "My notes", "Οι σημειώσεις μου"],
    notesIntro: [
      "Alt lagres automatisk på denne telefonen.",
      "Everything is saved automatically on this phone.",
      "Όλα αποθηκεύονται αυτόματα σε αυτό το τηλέφωνο."
    ],
    favPlace: ["Favorittsted", "Favourite place", "Αγαπημένο μέρος"],
    bestRest: ["Beste restaurant", "Best restaurant", "Καλύτερο εστιατόριο"],
    bestBeach: ["Beste strand", "Best beach", "Καλύτερη παραλία"],
    bestPhoto: ["Beste fotosted", "Best photo spot", "Καλύτερο σημείο για φωτογραφία"],
    kidsFav: ["Barnas favoritt", "The kids' favorite", "Το αγαπημένο των παιδιών"],
    doAgain: ["Ting vi vil gjøre igjen", "Things we want to do again", "Πράγματα που θέλουμε να ξανακάνουμε"],
    freeNotes: ["Frie notater", "Free notes", "Ελεύθερες σημειώσεις"],
    freePh: ["Skriv det dere vil huske", "Write anything you want to remember", "Γράψτε ό,τι θέλετε να θυμάστε"],
    helpTitle: ["Hjelp", "Help", "Βοήθεια"],
    helpIntro: [
      "Vis den store greske setningen, eller kopier den.",
      "Show the large Greek sentence, or copy it.",
      "Δείξτε τη μεγάλη ελληνική φράση ή αντιγράψτε την."
    ],
    copy: ["Kopier", "Copy", "Αντιγραφή"],
    copied: ["Kopiert", "Copied", "Αντιγράφηκε"],
    newDayHelp: [
      "Bruk planen på en senere ferie.",
      "Use the planner on a later trip.",
      "Χρησιμοποιήστε το πλάνο σε ένα επόμενο ταξίδι."
    ],
    newDayDate: ["Dato", "Date", "Ημερομηνία"],
    newDayName: ["Navn (valgfritt)", "Name (optional)", "Όνομα (προαιρετικό)"],
    namePh: ["F.eks. Athen", "e.g. Athens", "π.χ. Αθήνα"],
    createDay: ["Legg til dag", "Add day", "Προσθήκη ημέρας"],
    duplicateDay: ["Den datoen finnes allerede.", "That date is already in the plan.", "Αυτή η ημερομηνία υπάρχει ήδη."],
    badDate: ["Velg en dato.", "Choose a date.", "Επιλέξτε ημερομηνία."],
    onThisPhone: ["Lagres bare på denne telefonen.", "Saved only on this phone.", "Αποθηκεύεται μόνο σε αυτό το τηλέφωνο."],
    today: ["I dag", "Today", "Σήμερα"],
    linksFound: ["Lenker", "Links", "Σύνδεσμοι"]
  };

  const WEEKDAYS = [
    ["søndag", "Sunday", "Κυριακή"],
    ["mandag", "Monday", "Δευτέρα"],
    ["tirsdag", "Tuesday", "Τρίτη"],
    ["onsdag", "Wednesday", "Τετάρτη"],
    ["torsdag", "Thursday", "Πέμπτη"],
    ["fredag", "Friday", "Παρασκευή"],
    ["lørdag", "Saturday", "Σάββατο"]
  ];

  const MONTHS = [
    ["januar", "January", "Ιανουαρίου"],
    ["februar", "February", "Φεβρουαρίου"],
    ["mars", "March", "Μαρτίου"],
    ["april", "April", "Απριλίου"],
    ["mai", "May", "Μαΐου"],
    ["juni", "June", "Ιουνίου"],
    ["juli", "July", "Ιουλίου"],
    ["august", "August", "Αυγούστου"],
    ["september", "September", "Σεπτεμβρίου"],
    ["oktober", "October", "Οκτωβρίου"],
    ["november", "November", "Νοεμβρίου"],
    ["desember", "December", "Δεκεμβρίου"]
  ];

  const DAY_META = {
    "2026-10-04": {
      emoji: "☀️",
      plan: ["Familieutflukt rundt Stoupa", "Family outing around Stoupa", "Οικογενειακή βόλτα γύρω από τη Στούπα"]
    },
    "2026-10-05": {
      emoji: "🚗",
      plan: ["Mani Road Trip", "Mani Road Trip", "Οδικό ταξίδι στη Μάνη"],
      route: [
        "Stoupa → Diros-grottene → Areopoli → Limeni → Stoupa",
        "Stoupa → Diros Caves → Areopoli → Limeni → Stoupa",
        "Στούπα → Σπήλαια Διρού → Αρεόπολη → Λιμένι → Στούπα"
      ],
      blurb: [
        "Kjøretur sørover i Mani. Skriv inn tider og priser selv, så ingenting blir utdatert.",
        "A drive south through Mani. Add times and prices yourself so nothing goes out of date.",
        "Διαδρομή νότια στη Μάνη. Συμπληρώστε τις ώρες και τις τιμές μόνοι σας."
      ]
    }
  };

  const ACTIVITIES = [
    activity("d1a1", "2026-10-04", MAPS.kalogria, {}, "08:30–10:00",
      ["🏖️ Kalogria Beach", "🏖️ Kalogria Beach", "🏖️ Παραλία Καλογριά"], "",
      [
        ["Spise frokost", "Eat breakfast", "Πρωινό"],
        ["Pakke badetøy", "Pack swimwear", "Μαγιό στην τσάντα"],
        ["Håndklær", "Towels", "Πετσέτες"],
        ["Vann", "Water", "Νερό"],
        ["Solkrem", "Sunscreen", "Αντηλιακό"],
        ["Klær til barna", "Clothes for the kids", "Ρούχα για τα παιδιά"],
        ["Besøke Kalogria Beach", "Visit Kalogria Beach", "Επίσκεψη στην παραλία Καλογριά"],
        ["La barna leke på stranden", "Let the kids play on the beach", "Παιχνίδι στην παραλία"],
        ["Ta noen familiebilder", "Take some family photos", "Οικογενειακές φωτογραφίες"]
      ]),
    activity("d1a2", "2026-10-04", MAPS.kardamyli, {}, "10:15",
      ["🚗 Kardamyli", "🚗 Kardamyli", "🚗 Καρδαμύλη"],
      ["Kjør fra Stoupa/Kalogria til Kardamyli.", "Drive from Stoupa/Kalogria to Kardamyli.", "Διαδρομή από Στούπα/Καλογριά προς Καρδαμύλη."],
      [
        ["Besøke gamle Kardamyli", "Visit old Kardamyli", "Παλιά Καρδαμύλη"],
        ["Se steinhusene", "See the stone houses", "Πέτρινα σπίτια"],
        ["Se de gamle tårnene", "See the old towers", "Παλιοί πύργοι"],
        ["Kort familietur til fots", "Short family walk", "Σύντομη βόλτα με τα πόδια"],
        ["Ta bilder", "Take photos", "Φωτογραφίες"],
        ["Maks ca. 45–60 minutter med barna", "About 45–60 minutes with the kids", "Περίπου 45–60 λεπτά με τα παιδιά"]
      ]),
    activity("d1a3", "2026-10-04", MAPS.kardamyli, LUNCH, "12:00–13:30",
      ["🍽️ Lunsj i Kardamyli", "🍽️ Lunch in Kardamyli", "🍽️ Μεσημεριανό στην Καρδαμύλη"], "",
      [
        ["Finn et familievennlig sted", "Find a family-friendly place", "Οικογενειακό μέρος"],
        ["Lunsj", "Lunch", "Μεσημεριανό"],
        ["Toalettpause", "Toilet break", "Τουαλέτα"],
        ["Fylle vann", "Refill water", "Γέμισμα νερού"],
        ["La barna hvile litt", "Let the kids rest a little", "Τα παιδιά ξεκουράζονται λίγο"]
      ]),
    activity("d1a4", "2026-10-04", MAPS.agios, {}, "14:00",
      ["⚓ Agios Nikolaos", "⚓ Agios Nikolaos", "⚓ Άγιος Νικόλαος"],
      ["Kjør sørover via Stoupa til Agios Nikolaos.", "Drive south via Stoupa to Agios Nikolaos.", "Νότια μέσω Στούπας προς τον Άγιο Νικόλαο."],
      [
        ["Gå langs havnen", "Walk along the harbour", "Βόλτα στο λιμάνι"],
        ["Se fiskebåtene", "See the fishing boats", "Ψαρόβαρκες"],
        ["Kjøpe is 🍦", "Buy ice cream 🍦", "Παγωτό 🍦"],
        ["Ta bilder", "Take photos", "Φωτογραφίες"],
        ["Rolig pause med barna", "Quiet break with the kids", "Ήρεμη παύση με τα παιδιά"]
      ]),
    activity("d1a5", "2026-10-04", MAPS.stoupaBeach, {}, "15:30–17:30",
      ["🏖️ Stoupa Beach", "🏖️ Stoupa Beach", "🏖️ Παραλία Στούπας"], "",
      [
        ["Tilbake til Stoupa", "Back to Stoupa", "Επιστροφή στη Στούπα"],
        ["Strand", "Beach", "Παραλία"],
        ["Bading hvis været passer", "Swim if the weather is right", "Μπάνιο αν ο καιρός το επιτρέπει"],
        ["Lek i sanden", "Play in the sand", "Παιχνίδι στην άμμο"],
        ["Slappe av", "Relax", "Χαλάρωση"]
      ]),
    activity("d1a6", "2026-10-04", MAPS.stoupa, {}, "18:00",
      ["🌅 Middag og solnedgang", "🌅 Dinner and sunset", "🌅 Δείπνο και ηλιοβασίλεμα"], "",
      [
        ["Skifte klær", "Change clothes", "Αλλαγή ρούχων"],
        ["Middag", "Dinner", "Δείπνο"],
        ["Strandpromenaden", "The promenade", "Ο παραλιακός"],
        ["Se solnedgangen", "Watch the sunset", "Ηλιοβασίλεμα"],
        ["Familiebilder", "Family photos", "Οικογενειακές φωτογραφίες"]
      ]),
    activity("d2a1", "2026-10-05", MAPS.stoupa, STOP, "",
      ["🏡 Stoupa", "🏡 Stoupa", "🏡 Στούπα"],
      ["Start hjemme i Stoupa.", "Start from Stoupa.", "Εκκίνηση από τη Στούπα."], []),
    activity("d2a2", "2026-10-05", MAPS.diros, STOP, "",
      ["🪨 Diros-grottene", "🪨 Diros Caves", "🪨 Σπήλαια Διρού"],
      ["Grottene. Sjekk åpningstid lokalt før dere kjører.", "The caves. Check opening hours locally before you drive.", "Τα σπήλαια. Ρωτήστε για το ωράριο πριν φύγετε."], []),
    activity("d2a3", "2026-10-05", MAPS.areopoli, STOP, "",
      ["🏛️ Areopoli", "🏛️ Areopoli", "🏛️ Αρεόπολη"],
      ["Gå i de gamle gatene hvis barna orker.", "Walk the old streets if the kids have energy.", "Βόλτα στα παλιά σοκάκια αν τα παιδιά αντέχουν."], []),
    activity("d2a4", "2026-10-05", MAPS.limeni, STOP, "",
      ["⚓ Limeni", "⚓ Limeni", "⚓ Λιμένι"],
      ["Havnen og en rolig pause.", "The harbour and a quiet break.", "Το λιμάνι και μια ήρεμη παύση."], []),
    activity("d2a5", "2026-10-05", MAPS.stoupa, STOP, "",
      ["🏡 Tilbake til Stoupa", "🏡 Back to Stoupa", "🏡 Επιστροφή στη Στούπα"],
      ["Hjem til Stoupa.", "Home to Stoupa.", "Επιστροφή στη Στούπα."], [])
  ];

  const PACKING = [
    {
      id: "kids",
      label: "groupKids",
      items: [
        ["Ekstra klær", "Extra clothes", "Επιπλέον ρούχα"],
        ["Jakke", "Jacket", "Ζακέτα"],
        ["Badetøy", "Swimwear", "Μαγιό"],
        ["Håndklær", "Towels", "Πετσέτες"],
        ["Snacks", "Snacks", "Σνακ"],
        ["Vann", "Water", "Νερό"],
        ["Våtservietter", "Wipes", "Υγρά μαντηλάκια"],
        ["Solkrem", "Sunscreen", "Αντηλιακό"],
        ["Leker", "Toys", "Παιχνίδια"]
      ]
    },
    {
      id: "car",
      label: "groupCar",
      items: [
        ["Telefon", "Phone", "Τηλέφωνο"],
        ["Mobillader", "Phone charger", "Φορτιστής τηλεφώνου"],
        ["Powerbank", "Power bank", "Powerbank"],
        ["Vann", "Water", "Νερό"],
        ["Google Maps klart", "Google Maps ready", "Google Maps έτοιμο"]
      ]
    },
    {
      id: "parents",
      label: "groupParents",
      items: [
        ["Lommebok", "Wallet", "Πορτοφόλι"],
        ["ID", "ID", "Ταυτότητα"],
        ["Solbriller", "Sunglasses", "Γυαλιά ηλίου"],
        ["Kamera", "Camera", "Κάμερα"],
        ["Nøkler", "Keys", "Κλειδιά"]
      ]
    }
  ];

  const HELP = [
    ["Hvor er nærmeste toalett?", "Where is the nearest toilet?", "Πού είναι η πιο κοντινή τουαλέτα;"],
    ["Kan du hjelpe meg?", "Can you help me?", "Μπορείτε να με βοηθήσετε;"],
    ["Vi har to små barn.", "We have two small children.", "Έχουμε δύο μικρά παιδιά."],
    ["Hvor kan vi parkere?", "Where can we park?", "Πού μπορούμε να παρκάρουμε;"],
    ["Er det trygt for små barn?", "Is it safe for small children?", "Είναι ασφαλές για μικρά παιδιά;"],
    ["Har dere barnestol?", "Do you have a high chair?", "Έχετε παιδικό καρεκλάκι;"],
    ["Hvor er nærmeste apotek?", "Where is the nearest pharmacy?", "Πού είναι το πιο κοντινό φαρμακείο;"],
    ["Hvor er nærmeste bensinstasjon?", "Where is the nearest gas station?", "Πού είναι το πιο κοντινό βενζινάδικο;"],
    ["Kan vi betale med kort?", "Can we pay by card?", "Μπορούμε να πληρώσουμε με κάρτα;"],
    ["Hvor lang tid tar det å kjøre dit?", "How long does it take to drive there?", "Πόση ώρα χρειάζεται με το αυτοκίνητο;"]
  ];

  const JOURNAL = [
    ["free", "freeNotes", "📝", "freePh", 8],
    ["favoritePlace", "favPlace", "❤️", "", 2],
    ["bestRestaurant", "bestRest", "🍽️", "", 2],
    ["bestBeach", "bestBeach", "🏖️", "", 2],
    ["bestPhoto", "bestPhoto", "📸", "", 2],
    ["kidsFavorite", "kidsFav", "👨‍👩‍👧", "", 2],
    ["doAgain", "doAgain", "💡", "", 3]
  ];

  let state = defaultState();
  const app = () => document.getElementById("app");

  function activity(id, day, maps, flags, time, title, desc, items) {
    const triple = Array.isArray(time) ? time : [time, time, time];
    const description = Array.isArray(desc) ? desc : [desc || "", desc || "", desc || ""];
    return { id: id, day: day, maps: maps, flags: flags, time: triple, title: title, desc: description, items: items };
  }

  function defaultState() {
    return {
      lang: "no",
      tab: "plan",
      openDay: null,
      checks: {},
      fields: {},
      deleted: {},
      edits: {},
      customActivities: {},
      extraDays: [],
      packingCustom: [],
      journal: {
        free: "",
        favoritePlace: "",
        bestRestaurant: "",
        bestBeach: "",
        bestPhoto: "",
        kidsFavorite: "",
        doAgain: ""
      },
      draft: null,
      editingId: null,
      modal: null,
      formError: "",
      openNotes: {},
      packDraft: {}
    };
  }

  function obj(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  }

  function arr(value) {
    return Array.isArray(value) ? value : [];
  }

  function loadState() {
    const base = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const data = JSON.parse(raw);
      if (["no", "en", "el"].indexOf(data.lang) !== -1) base.lang = data.lang;
      if (["plan", "pack", "add", "notes", "help"].indexOf(data.tab) !== -1) base.tab = data.tab;
      if (Object.prototype.hasOwnProperty.call(data, "openDay")) base.openDay = data.openDay || "";
      base.checks = obj(data.checks);
      base.fields = obj(data.fields);
      base.deleted = obj(data.deleted);
      base.edits = obj(data.edits);
      base.customActivities = obj(data.customActivities);
      Object.keys(base.customActivities).forEach((key) => {
        if (!Array.isArray(base.customActivities[key])) delete base.customActivities[key];
      });
      base.extraDays = arr(data.extraDays).filter((day) => day && day.id && day.date);
      base.packingCustom = arr(data.packingCustom).filter((item) => item && item.id && item.group && item.label);
      base.journal = Object.assign(base.journal, obj(data.journal));
    } catch (error) {
      return defaultState();
    }
    return base;
  }

  function persist() {
    const copy = JSON.parse(JSON.stringify(state));
    ["draft", "editingId", "modal", "formError", "openNotes", "packDraft"].forEach((key) => {
      delete copy[key];
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
    } catch (error) {
      /* Privat modus kan nekte lagring. Siden virker fortsatt i økten. */
    }
  }

  function L(value) {
    if (Array.isArray(value)) {
      const index = state.lang === "en" ? 1 : state.lang === "el" ? 2 : 0;
      return value[index] || value[0] || "";
    }
    return value || "";
  }

  function t(key) {
    return UI[key] ? L(UI[key]) : key;
  }

  function cap(text) {
    return text ? text.charAt(0).toLocaleUpperCase() + text.slice(1) : "";
  }

  function esc(text) {
    return String(text == null ? "" : text).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  function uid() {
    return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }

  function todayISO() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function formatDate(iso) {
    const parts = String(iso || "").split("-").map(Number);
    if (parts.length !== 3 || !parts[0]) return iso || "";
    const utc = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    const weekday = cap(L(WEEKDAYS[utc.getUTCDay()]));
    const month = L(MONTHS[parts[1] - 1]);
    if (state.lang === "no") return weekday + " " + parts[2] + ". " + month;
    return weekday + " " + parts[2] + " " + month;
  }

  function safeUrl(url) {
    const text = String(url || "").trim();
    if (!text) return "";
    try {
      const parsed = new URL(text);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") return parsed.href;
    } catch (error) {
      return "";
    }
    return "";
  }

  function toMaps(value) {
    const text = String(value || "").trim();
    if (!text) return "";
    if (/^https?:\/\//i.test(text)) return safeUrl(text);
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(text);
  }

  function safeTel(raw) {
    const tel = String(raw || "").replace(/[^\d+]/g, "");
    return tel.replace(/\+/g, "").length >= 6 ? tel : "";
  }

  function field(key) {
    return state.fields[key] || "";
  }

  function sourcePreset(id) {
    return ACTIVITIES.find((item) => item.id === id);
  }

  function resolvePreset(def) {
    const edit = state.edits[def.id] || {};
    const sourceItems = (def.items || []).map((triple, index) => ({
      id: def.id + "-i" + index,
      label: L(triple)
    }));
    return {
      id: def.id,
      day: def.day,
      time: edit.time != null ? edit.time : L(def.time),
      title: edit.title != null ? edit.title : L(def.title),
      place: edit.place || "",
      description: edit.description != null ? edit.description : L(def.desc),
      maps: edit.maps != null ? edit.maps : def.maps,
      items: Array.isArray(edit.items) ? edit.items : sourceItems,
      phone: edit.phone || "",
      address: edit.address || "",
      flags: def.flags || {},
      custom: false
    };
  }

  function normalizeCustom(item) {
    return {
      id: item.id,
      day: item.day,
      time: item.time || "",
      title: item.title || "",
      place: item.place || "",
      description: item.description || "",
      maps: item.maps || "",
      items: Array.isArray(item.items) ? item.items : [],
      phone: item.phone || "",
      address: item.address || "",
      flags: {},
      custom: true
    };
  }

  function activitiesFor(dayId) {
    const presets = ACTIVITIES.filter((item) => item.day === dayId && !state.deleted[item.id]).map(resolvePreset);
    const custom = arr(state.customActivities[dayId]).map(normalizeCustom);
    return presets.concat(custom);
  }

  function getDays() {
    const presets = TRIP.map((date) => {
      const meta = DAY_META[date] || {};
      return {
        id: date,
        date: date,
        extra: false,
        emoji: meta.emoji || "✨",
        plan: meta.plan ? L(meta.plan) : "",
        route: meta.route ? L(meta.route) : "",
        blurb: meta.blurb ? L(meta.blurb) : "",
        activities: activitiesFor(date)
      };
    });
    const extras = state.extraDays.map((day) => ({
      id: day.id,
      date: day.date,
      extra: true,
      emoji: "✨",
      plan: day.title || "",
      route: "",
      blurb: "",
      activities: arr(state.customActivities[day.id]).map(normalizeCustom)
    }));
    return presets.concat(extras).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  }

  function findActivity(id) {
    const days = getDays();
    for (let i = 0; i < days.length; i += 1) {
      const activityItem = days[i].activities.find((item) => item.id === id);
      if (activityItem) return { day: days[i], activity: activityItem };
    }
    return null;
  }

  function todayInTrip() {
    const today = todayISO();
    const days = getDays();
    const match = days.find((day) => day.date === today);
    return match ? match.id : (days[0] ? days[0].id : "");
  }

  function blankDraft(dayId) {
    return {
      dayId: dayId || todayInTrip(),
      title: "",
      place: "",
      time: "",
      description: "",
      bring: "",
      maps: "",
      notes: "",
      phone: "",
      address: ""
    };
  }

  function dayStats(day) {
    const total = day.activities.length;
    const done = day.activities.filter((item) => state.checks["act:" + item.id]).length;
    let status = "not";
    if (total > 0 && done === total) status = "done";
    else if (done > 0) status = "go";
    return { total: total, done: done, status: status };
  }

  function statusLabel(status) {
    if (status === "done") return t("statusDone");
    if (status === "go") return t("statusGo");
    return t("statusNot");
  }

  function progressText(done, total) {
    return t("progress").replace("{done}", String(done)).replace("{total}", String(total));
  }

  function linkPreviewHtml(text) {
    const raw = String(text || "");
    if (!raw.trim()) return "";
    const links = [];
    const urls = raw.match(/https?:\/\/[^\s<>"']+/gi) || [];
    urls.forEach((url) => {
      const safe = safeUrl(url);
      if (safe) links.push('<a href="' + esc(safe) + '" target="_blank" rel="noopener">' + esc(url) + "</a>");
    });
    const phones = raw.match(/(?:\+\d|\b\d)[\d\s().-]{5,}\d/g) || [];
    phones.forEach((phone) => {
      const tel = safeTel(phone);
      if (tel) links.push('<a href="tel:' + esc(tel) + '">' + esc(phone.trim()) + "</a>");
    });
    if (!links.length) return "";
    return '<span class="links-label">' + esc(t("linksFound")) + "</span> " + links.join(" · ");
  }

  function line(label, placeholder, bucket, key, type) {
    const value = bucket === "journal" ? (state.journal[key] || "") : field(key);
    return '<label class="field"><span>' + esc(label) + '</span><input type="' + (type || "text") +
      '" autocomplete="off" data-store="' + bucket + "|" + key + '" value="' + esc(value) +
      '" placeholder="' + esc(placeholder || "") + '"></label>';
  }

  function area(label, placeholder, bucket, key, rows) {
    const value = bucket === "journal" ? (state.journal[key] || "") : field(key);
    return '<label class="field"><span>' + esc(label) + '</span><textarea rows="' + (rows || 3) +
      '" data-store="' + bucket + "|" + key + '" placeholder="' + esc(placeholder || "") + '">' +
      esc(value) + '</textarea><div class="link-preview">' + linkPreviewHtml(value) + "</div></label>";
  }

  function extraFields(item) {
    const flags = item.flags || {};
    let html = "";
    if (flags.chosen) html += line(t("chosenPlace"), t("chosenPh"), "fields", "act:" + item.id + ":chosen", "text");
    if (flags.times) {
      html += '<div class="split">' +
        line(t("arrival"), "", "fields", "act:" + item.id + ":arrival", "time") +
        line(t("departure"), "", "fields", "act:" + item.id + ":departure", "time") +
        "</div>";
    }
    if (flags.what) html += area(t("whatHere"), t("whatPh"), "fields", "act:" + item.id + ":what", 3);
    if (flags.hours || flags.price) {
      html += '<div class="split">' +
        (flags.hours ? line(t("hours"), t("hoursPh"), "fields", "act:" + item.id + ":hours", "text") : "") +
        (flags.price ? line(t("price"), t("pricePh"), "fields", "act:" + item.id + ":price", "text") : "") +
        "</div>";
    }
    if (flags.memory) html += area(t("memory"), t("memoryPh"), "fields", "act:" + item.id + ":memory", 3);
    return html;
  }

  function isNoteOpen(id) {
    if (Object.prototype.hasOwnProperty.call(state.openNotes, id)) return !!state.openNotes[id];
    return !!field("act:" + id + ":note");
  }

  function renderActivity(item) {
    const done = !!state.checks["act:" + item.id];
    const maps = safeUrl(item.maps || "");
    const bits = [];
    if (item.place && item.place !== item.title) bits.push('<p class="place">📍 ' + esc(item.place) + "</p>");
    if (item.description) bits.push('<p class="desc">' + esc(item.description) + "</p>");
    const items = (item.items || []).map((entry) => (
      '<li><label class="check-row"><input class="check" type="checkbox" data-check="item:' + esc(entry.id) + '"' +
      (state.checks["item:" + entry.id] ? " checked" : "") + '><span>' + esc(entry.label) + "</span></label></li>"
    )).join("");
    const contact = [];
    if (item.phone && safeTel(item.phone)) {
      contact.push('<a class="text-link" href="tel:' + esc(safeTel(item.phone)) + '">📞 ' + esc(item.phone) + "</a>");
    }
    if (item.address) {
      const addressUrl = toMaps(item.address);
      if (addressUrl) contact.push('<a class="text-link" href="' + esc(addressUrl) + '" target="_blank" rel="noopener">📍 ' + esc(item.address) + "</a>");
    }
    return '<article class="activity' + (done ? " is-done" : "") + '" id="act-' + esc(item.id) + '">' +
      '<div class="activity-top"><label class="check-row"><input class="check" type="checkbox" data-check="act:' + esc(item.id) + '"' +
      (done ? " checked" : "") + '><span>' +
      (item.time ? '<span class="time">' + esc(item.time) + "</span>" : "") +
      '<span class="activity-title">' + esc(item.title) + "</span></span></label></div>" +
      bits.join("") +
      (items ? '<ul class="subchecks">' + items + "</ul>" : "") +
      extraFields(item) +
      (contact.length ? '<div class="links">' + contact.join("") + "</div>" : "") +
      '<div class="actions">' +
      (maps ? '<a class="btn primary" href="' + esc(maps) + '" target="_blank" rel="noopener">📍 ' + esc(t("maps")) + "</a>" : "") +
      '<button type="button" class="btn" data-action="note" data-id="' + esc(item.id) + '">📝 ' + esc(t("note")) + "</button>" +
      '<button type="button" class="btn" data-action="edit" data-id="' + esc(item.id) + '">' + esc(t("edit")) + "</button>" +
      '<button type="button" class="btn danger" data-action="ask-delete" data-id="' + esc(item.id) + '">' + esc(t("delete")) + "</button>" +
      "</div>" +
      (isNoteOpen(item.id) ? area(t("fieldNotes"), t("notesPh"), "fields", "act:" + item.id + ":note", 3) : "") +
      "</article>";
  }

  function renderDay(day) {
    const stats = dayStats(day);
    const open = state.openDay === day.id;
    const today = day.date === todayISO();
    const width = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    let body = "";
    if (open) {
      const parts = [];
      if (stats.status === "done") parts.push('<p class="banner">🎉 ' + esc(t("doneBanner")) + "</p>");
      if (day.route) parts.push('<p class="route">' + esc(day.route) + "</p>");
      if (day.blurb) parts.push('<p class="blurb">' + esc(day.blurb) + "</p>");
      parts.push(line(t("weather"), t("weatherPh"), "fields", "day:" + day.id + ":weather", "text"));
      if (!day.activities.length) {
        parts.push('<p class="empty">' + esc(t("empty")) + "</p>");
      }
      parts.push(day.activities.map(renderActivity).join(""));
      parts.push('<button type="button" class="btn primary block" data-action="add-for-day" data-id="' + esc(day.id) + '">＋ ' + esc(t("addActivity")) + "</button>");
      parts.push(area(t("dayNotes"), t("dayNotesPh"), "fields", "day:" + day.id + ":notes", 3));
      parts.push(area(t("bestMoment"), t("bestPh"), "fields", "day:" + day.id + ":best", 3));
      body = '<div class="day-body">' + parts.join("") + "</div>";
    }
    return '<article class="day' + (today ? " is-today" : "") + '" id="day-' + esc(day.id) + '">' +
      '<button type="button" class="day-head" data-action="toggle-day" data-id="' + esc(day.id) + '" aria-expanded="' + (open ? "true" : "false") + '">' +
      '<span class="day-top"><span><span class="day-date">' + esc(formatDate(day.date)) + "</span>" +
      (day.plan ? '<span class="day-plan">' + esc(day.emoji) + " " + esc(day.plan) + "</span>" : "") +
      "</span><span>" + (today ? '<span class="today">' + esc(t("today")) + "</span> " : "") +
      '<span class="pill ' + stats.status + '">' + esc(statusLabel(stats.status)) + '</span><span class="chevron">' + (open ? "▾" : "▸") + "</span></span></span>" +
      '<span class="progress-label">' + esc(progressText(stats.done, stats.total)) + "</span>" +
      '<span class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + stats.total + '" aria-valuenow="' + stats.done + '"><span style="width:' + width + '%"></span></span>' +
      "</button>" + body + "</article>";
  }

  function renderPlan() {
    return '<div class="stack"><button type="button" class="btn primary block" data-action="new-day">＋ ' + esc(t("newDay")) + "</button>" +
      getDays().map(renderDay).join("") +
      '<button type="button" class="btn danger block" data-action="ask-reset">' + esc(t("reset")) + "</button>" +
      '<p class="fine">' + esc(t("onThisPhone")) + "</p></div>";
  }

  function renderPacking() {
    const groups = PACKING.map((group) => {
      const defaults = group.items.map((triple, index) => ({
        id: group.id + "-" + index,
        label: L(triple),
        custom: false
      }));
      const custom = state.packingCustom.filter((item) => item.group === group.id);
      const rows = defaults.concat(custom).map((item) => (
        '<li><label class="check-row"><input class="check" type="checkbox" data-check="pack:' + esc(item.id) + '"' +
        (state.checks["pack:" + item.id] ? " checked" : "") + "><span>" + esc(item.label) + "</span></label>" +
        (item.custom ? '<button type="button" class="btn danger" data-action="ask-delete-pack" data-id="' + esc(item.id) + '">' + esc(t("remove")) + "</button>" : "") +
        "</li>"
      )).join("");
      const draft = state.packDraft[group.id] || "";
      return '<section class="card"><h3 class="group-title">' + esc(t(group.label)) + "</h3><ul class=\"subchecks\">" + rows + "</ul>" +
        '<div class="pack-add"><input data-pack-input="' + group.id + '" value="' + esc(draft) + '" placeholder="' + esc(t("addItemPh")) + '" aria-label="' + esc(t("addItem")) + '">' +
        '<button type="button" class="btn primary" data-action="add-pack" data-group="' + group.id + '" aria-label="' + esc(t("addItem")) + '">＋</button></div></section>';
    }).join("");
    return "<h2>🎒 " + esc(t("packingTitle")) + "</h2><p class=\"intro\">" + esc(t("packingIntro")) + "</p>" + groups;
  }

  function renderAdd() {
    if (state.editingId && !findActivity(state.editingId)) state.editingId = null;
    if (!state.draft) state.draft = blankDraft(state.openDay);
    const draft = state.draft;
    const found = state.editingId ? findActivity(state.editingId) : null;
    const lockDay = !!(found && !found.activity.custom);
    const dayField = lockDay
      ? '<p class="blurb">' + esc(formatDate(found.day.date)) + "</p>"
      : '<label class="field"><span>' + esc(t("fieldDay")) + '</span><select name="dayId">' +
        getDays().map((day) => '<option value="' + esc(day.id) + '"' + (day.id === draft.dayId ? " selected" : "") + ">" +
          esc(formatDate(day.date) + (day.plan ? " · " + day.plan : "")) + "</option>").join("") +
        "</select></label>";
    return "<h2>" + esc(state.editingId ? t("editHeading") : t("addHeading")) + "</h2>" +
      '<form class="stack" data-form="activity">' + dayField +
      '<label class="field"><span>' + esc(t("fieldActivity")) + '</span><input name="title" value="' + esc(draft.title) + '" placeholder="' + esc(t("activityPh")) + '"></label>' +
      '<label class="field"><span>' + esc(t("fieldPlace")) + '</span><input name="place" value="' + esc(draft.place) + '" placeholder="' + esc(t("placePh")) + '"></label>' +
      '<label class="field"><span>' + esc(t("fieldTime")) + '</span><input name="time" value="' + esc(draft.time) + '" placeholder="08:30"></label>' +
      '<label class="field"><span>' + esc(t("fieldDesc")) + '</span><textarea name="description" rows="3" placeholder="' + esc(t("descPh")) + '">' + esc(draft.description) + "</textarea></label>" +
      '<label class="field"><span>' + esc(t("fieldBring")) + '</span><textarea name="bring" rows="4" placeholder="' + esc(t("bringPh")) + '">' + esc(draft.bring) + "</textarea></label>" +
      '<label class="field"><span>' + esc(t("fieldMaps")) + '</span><input name="maps" value="' + esc(draft.maps) + '" placeholder="' + esc(t("mapsPh")) + '"></label>' +
      '<label class="field"><span>' + esc(t("fieldNotes")) + '</span><textarea name="notes" rows="3" placeholder="' + esc(t("notesPh")) + '">' + esc(draft.notes) + "</textarea></label>" +
      '<div class="split"><label class="field"><span>' + esc(t("fieldPhone")) + '</span><input name="phone" type="tel" value="' + esc(draft.phone) + '" placeholder="' + esc(t("phonePh")) + '"></label>' +
      '<label class="field"><span>' + esc(t("fieldAddress")) + '</span><input name="address" value="' + esc(draft.address) + '" placeholder="' + esc(t("phonePh")) + '"></label></div>' +
      (state.formError ? '<p class="form-error">' + esc(state.formError) + "</p>" : "") +
      '<button class="btn primary block" type="submit">' + esc(t("save")) + "</button></form>";
  }

  function renderNotes() {
    const fields = JOURNAL.map((entry) => area(entry[2] + " " + t(entry[1]), entry[3] ? t(entry[3]) : "", "journal", entry[0], entry[4])).join("");
    return "<h2>📝 " + esc(t("notesTitle")) + "</h2><p class=\"intro\">" + esc(t("notesIntro")) + "</p><div class=\"stack\">" + fields + "</div>";
  }

  function renderHelp() {
    const cards = HELP.map((row) => (
      '<article class="phrase"><p class="lang-tag">Norsk</p><p>' + esc(row[0]) + "</p>" +
      '<p class="lang-tag">English</p><p>' + esc(row[1]) + "</p>" +
      '<p class="lang-tag">Ελληνικά</p><p class="phrase-el">' + esc(row[2]) + "</p>" +
      '<button type="button" class="btn primary block" data-action="copy" data-text="' + esc(row[2]) + '">📋 ' + esc(t("copy")) + "</button></article>"
    )).join("");
    return "<h2>🆘 " + esc(t("helpTitle")) + "</h2><p class=\"intro\">" + esc(t("helpIntro")) + '</p><div class="stack">' + cards + "</div>";
  }

  function renderModal() {
    if (!state.modal) return "";
    let inner = "";
    if (state.modal.kind === "reset") {
      inner = "<h2>" + esc(t("resetTitle")) + "</h2><p>" + esc(t("resetBody")) + "</p>" +
        '<div class="modal-actions"><button type="button" class="btn" data-action="close-modal">' + esc(t("cancel")) + "</button>" +
        '<button type="button" class="btn danger" data-action="do-reset">' + esc(t("confirmReset")) + "</button></div>";
    } else if (state.modal.kind === "delete" || state.modal.kind === "delete-pack") {
      inner = "<h2>" + esc(t("deleteTitle")) + "</h2><p>" + esc(t("deleteBody")) + "</p>" +
        '<div class="modal-actions"><button type="button" class="btn" data-action="close-modal">' + esc(t("cancel")) + "</button>" +
        '<button type="button" class="btn danger" data-action="do-delete">' + esc(t("confirmDelete")) + "</button></div>";
    } else if (state.modal.kind === "new-day") {
      inner = "<h2>" + esc(t("newDay")) + "</h2><p>" + esc(t("newDayHelp")) + "</p>" +
        '<form class="stack" data-form="newday"><label class="field"><span>' + esc(t("newDayDate")) + '</span><input type="date" name="date"></label>' +
        '<label class="field"><span>' + esc(t("newDayName")) + '</span><input name="title" maxlength="80" placeholder="' + esc(t("namePh")) + '"></label>' +
        (state.formError ? '<p class="form-error">' + esc(state.formError) + "</p>" : "") +
        '<button class="btn primary block" type="submit">' + esc(t("createDay")) + "</button>" +
        '<button class="btn block" type="button" data-action="close-modal">' + esc(t("cancel")) + "</button></form>";
    }
    return '<div class="modal-back"><div class="modal" role="dialog" aria-modal="true">' + inner + "</div></div>";
  }

  function tabButton(id, icon, label) {
    const on = state.tab === id;
    return '<button type="button" class="tab' + (on ? " on" : "") + '" data-action="tab" data-tab="' + id + '" aria-current="' + (on ? "page" : "false") + '">' +
      '<span class="tab-icon" aria-hidden="true">' + icon + "</span><span>" + esc(label) + "</span></button>";
  }

  function render() {
    const root = app();
    if (!root) return;
    document.documentElement.lang = state.lang === "no" ? "nb" : state.lang;
    document.title = "Stoupa Family Trip";
    const view = state.tab === "pack" ? renderPacking()
      : state.tab === "add" ? renderAdd()
      : state.tab === "notes" ? renderNotes()
      : state.tab === "help" ? renderHelp()
      : renderPlan();
    root.innerHTML =
      '<header class="hero"><div class="hero-inner"><div class="langs" role="group" aria-label="' + esc(t("language")) + '">' +
      langButton("no", "🇳🇴 Norsk") + langButton("en", "🇬🇧 English") + langButton("el", "🇬🇷 Ελληνικά") +
      '</div><div class="sun" aria-hidden="true"></div><h1>' + esc(t("appTitle")) + "</h1><p class=\"dates\">" + esc(t("dates")) +
      '</p><p class="lede">' + esc(t("subtitle")) + "</p></div></header>" +
      '<main class="wrap">' + view + "</main>" +
      '<nav class="tabbar" aria-label="' + esc(t("navPlan")) + '"><div class="tabbar-inner">' +
      tabButton("plan", "🏠", t("navPlan")) + tabButton("pack", "🎒", t("navPack")) + tabButton("add", "➕", t("navAdd")) +
      tabButton("notes", "📝", t("navNotes")) + tabButton("help", "🆘", t("navHelp")) +
      "</div></nav>" + renderModal() + '<div class="toast" role="status"></div>';
    document.body.classList.toggle("modal-open", !!state.modal);
  }

  function langButton(code, label) {
    const on = state.lang === code;
    return '<button type="button" data-action="lang" data-lang="' + code + '" class="' + (on ? "on" : "") + '" aria-pressed="' + (on ? "true" : "false") + '">' + label + "</button>";
  }

  function showToast(message) {
    const toast = document.querySelector(".toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function rerender(keepScroll) {
    const y = keepScroll ? window.scrollY : 0;
    render();
    window.scrollTo(0, y);
  }

  function itemsFromLines(text, previous) {
    const lines = String(text || "").split(/\n/).map((lineText) => lineText.trim()).filter(Boolean);
    const used = {};
    return lines.map((label) => {
      const match = (previous || []).find((item) => item.label === label && !used[item.id]);
      const id = match ? match.id : uid();
      used[id] = true;
      return { id: id, label: label };
    });
  }

  function readDraft(form) {
    const draft = state.draft || blankDraft();
    ["dayId", "title", "place", "time", "description", "bring", "maps", "notes", "phone", "address"].forEach((name) => {
      if (form.elements[name]) draft[name] = form.elements[name].value;
    });
    state.draft = draft;
    return draft;
  }

  function saveActivityFromForm(form) {
    const draft = readDraft(form);
    if (!String(draft.title || "").trim()) {
      state.formError = t("required");
      rerender(true);
      return;
    }
    const dayId = draft.dayId || todayInTrip();
    const maps = toMaps(draft.maps);
    let activityId = state.editingId;
    const found = activityId ? findActivity(activityId) : null;
    if (found && !found.activity.custom) {
      const def = sourcePreset(activityId);
      const edit = {};
      if (draft.time.trim() !== L(def.time)) edit.time = draft.time.trim();
      if (draft.title.trim() !== L(def.title)) edit.title = draft.title.trim();
      if ((draft.place || "").trim()) edit.place = draft.place.trim();
      if (draft.description.trim() !== L(def.desc)) edit.description = draft.description.trim();
      if (maps !== def.maps) edit.maps = maps;
      if (draft.phone.trim()) edit.phone = draft.phone.trim();
      if (draft.address.trim()) edit.address = draft.address.trim();
      const sourceItems = (def.items || []).map((triple, index) => ({ id: def.id + "-i" + index, label: L(triple) }));
      const nextItems = itemsFromLines(draft.bring, sourceItems);
      const same = nextItems.length === sourceItems.length && nextItems.every((item, index) => item.label === sourceItems[index].label);
      if (!same) edit.items = nextItems;
      if (Object.keys(edit).length) state.edits[activityId] = edit;
      else delete state.edits[activityId];
    } else {
      if (found && found.activity.custom) removeCustom(found.day.id, activityId);
      else activityId = uid();
      if (!state.customActivities[dayId]) state.customActivities[dayId] = [];
      state.customActivities[dayId].push({
        id: activityId,
        day: dayId,
        time: draft.time.trim(),
        title: draft.title.trim(),
        place: draft.place.trim(),
        description: draft.description.trim(),
        maps: maps,
        items: itemsFromLines(draft.bring, found ? found.activity.items : []),
        phone: draft.phone.trim(),
        address: draft.address.trim()
      });
    }
    state.fields["act:" + activityId + ":note"] = draft.notes || "";
    state.openNotes[activityId] = !!String(draft.notes || "").trim();
    state.tab = "plan";
    state.openDay = found && !found.activity.custom ? found.day.id : dayId;
    state.editingId = null;
    state.draft = null;
    state.formError = "";
    persist();
    rerender(false);
  }

  function removeCustom(dayId, id) {
    state.customActivities[dayId] = arr(state.customActivities[dayId]).filter((item) => item.id !== id);
  }

  function deleteActivity(id) {
    const found = findActivity(id);
    if (!found) return;
    if (found.activity.custom) removeCustom(found.day.id, id);
    else state.deleted[id] = true;
    delete state.edits[id];
    delete state.checks["act:" + id];
    (found.activity.items || []).forEach((item) => delete state.checks["item:" + item.id]);
  }

  function createDay(date, title) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
      state.formError = t("badDate");
      rerender(true);
      return;
    }
    if (getDays().some((day) => day.date === date)) {
      state.formError = t("duplicateDay");
      rerender(true);
      return;
    }
    const id = "x-" + date;
    state.extraDays.push({ id: id, date: date, title: String(title || "").trim() });
    state.openDay = id;
    state.tab = "plan";
    state.modal = null;
    state.formError = "";
    persist();
    rerender(false);
  }

  function addPack(group, label) {
    const text = String(label || "").trim();
    if (!text) return;
    state.packingCustom.push({ id: uid(), group: group, label: text });
    state.packDraft[group] = "";
    persist();
    rerender(true);
  }

  function resetTrip() {
    const lang = state.lang;
    state = defaultState();
    state.lang = lang;
    state.openDay = todayInTrip();
    persist();
    rerender(false);
  }

  function startEdit(id) {
    const found = findActivity(id);
    if (!found) return;
    const item = found.activity;
    state.editingId = id;
    state.formError = "";
    state.draft = {
      dayId: found.day.id,
      title: item.title,
      place: item.place || "",
      time: item.time || "",
      description: item.description || "",
      bring: (item.items || []).map((entry) => entry.label).join("\n"),
      maps: item.maps || "",
      notes: field("act:" + id + ":note"),
      phone: item.phone || "",
      address: item.address || ""
    };
    state.tab = "add";
    rerender(false);
  }

  function startAdd(dayId) {
    state.editingId = null;
    state.formError = "";
    state.draft = blankDraft(dayId || state.openDay || todayInTrip());
    state.tab = "add";
    rerender(false);
  }

  function fallbackCopy(text) {
    const areaEl = document.createElement("textarea");
    areaEl.value = text;
    document.body.appendChild(areaEl);
    areaEl.select();
    try { document.execCommand("copy"); } catch (error) { /* uten clipboard blir teksten fortsatt synlig */ }
    areaEl.remove();
  }

  function copyText(text) {
    const done = () => showToast(t("copied"));
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => {
        fallbackCopy(text);
        done();
      });
      return;
    }
    fallbackCopy(text);
    done();
  }

  function onClick(event) {
    const button = event.target.closest("[data-action]");
    if (event.target.classList && event.target.classList.contains("modal-back")) {
      state.modal = null;
      state.formError = "";
      rerender(true);
      return;
    }
    if (!button || !app().contains(button)) return;
    const action = button.dataset.action;
    const id = button.dataset.id;
    if (action === "lang") {
      state.lang = button.dataset.lang;
      persist();
      rerender(true);
    } else if (action === "tab") {
      if (button.dataset.tab === "add" && state.tab !== "add") startAdd(state.openDay);
      else {
        state.tab = button.dataset.tab;
        persist();
        rerender(false);
      }
    } else if (action === "toggle-day") {
      state.openDay = state.openDay === id ? "" : id;
      persist();
      rerender(true);
      if (state.openDay) {
        const el = document.getElementById("day-" + state.openDay);
        if (el) el.scrollIntoView({ block: "start" });
      }
    } else if (action === "note") {
      state.openNotes[id] = !isNoteOpen(id);
      rerender(true);
    } else if (action === "edit") {
      startEdit(id);
    } else if (action === "add-for-day") {
      startAdd(id);
    } else if (action === "new-day") {
      state.formError = "";
      state.modal = { kind: "new-day" };
      rerender(true);
    } else if (action === "ask-reset") {
      state.modal = { kind: "reset" };
      rerender(true);
    } else if (action === "ask-delete") {
      state.modal = { kind: "delete", id: id };
      rerender(true);
    } else if (action === "ask-delete-pack") {
      state.modal = { kind: "delete-pack", id: id };
      rerender(true);
    } else if (action === "close-modal") {
      state.modal = null;
      state.formError = "";
      rerender(true);
    } else if (action === "do-reset") {
      resetTrip();
    } else if (action === "do-delete") {
      if (state.modal && state.modal.kind === "delete-pack") {
        state.packingCustom = state.packingCustom.filter((item) => item.id !== state.modal.id);
        delete state.checks["pack:" + state.modal.id];
      } else if (state.modal) {
        deleteActivity(state.modal.id);
      }
      state.modal = null;
      persist();
      rerender(true);
    } else if (action === "add-pack") {
      const input = document.querySelector('[data-pack-input="' + button.dataset.group + '"]');
      addPack(button.dataset.group, input ? input.value : "");
    } else if (action === "copy") {
      copyText(button.dataset.text || "");
    }
  }

  function onInput(event) {
    const el = event.target;
    if (!el || !el.dataset) return;
    if (el.dataset.store) {
      const parts = el.dataset.store.split("|");
      if (parts[0] === "journal") state.journal[parts[1]] = el.value;
      if (parts[0] === "fields") state.fields[parts[1]] = el.value;
      persist();
      const preview = el.parentElement && el.parentElement.querySelector(".link-preview");
      if (preview) preview.innerHTML = linkPreviewHtml(el.value);
      return;
    }
    if (el.dataset.packInput) {
      state.packDraft[el.dataset.packInput] = el.value;
      return;
    }
    if (el.form && el.form.dataset.form === "activity" && el.name) {
      if (!state.draft) state.draft = blankDraft();
      state.draft[el.name] = el.value;
    }
  }

  function onChange(event) {
    const el = event.target;
    if (!el || !el.dataset || !el.dataset.check) return;
    state.checks[el.dataset.check] = el.checked;
    persist();
    rerender(true);
  }

  function onSubmit(event) {
    const form = event.target;
    if (!form || !form.dataset || !form.dataset.form) return;
    event.preventDefault();
    if (form.dataset.form === "activity") saveActivityFromForm(form);
    if (form.dataset.form === "newday") createDay(form.date.value, form.title.value);
  }

  function onKeydown(event) {
    if (event.key === "Enter" && event.target.dataset && event.target.dataset.packInput) {
      event.preventDefault();
      addPack(event.target.dataset.packInput, event.target.value);
    }
  }

  function registerWorker() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }

  function init() {
    state = loadState();
    if (state.openDay == null) state.openDay = todayInTrip();
    const root = app();
    root.addEventListener("click", onClick);
    root.addEventListener("input", onInput);
    root.addEventListener("change", onChange);
    root.addEventListener("submit", onSubmit);
    root.addEventListener("keydown", onKeydown);
    render();
    registerWorker();
  }

  if (typeof document !== "undefined") init();
})();
