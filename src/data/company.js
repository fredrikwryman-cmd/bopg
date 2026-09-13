// Företagsfakta för Bygg och Projekt Gruppen i Stockholm AB — används i navbar,
// footer, sidtitlar, kontakt och strukturerad data.
//
// FIRMANAMNET STAVAS SOM I BOLAGSVERKETS REGISTER: "Projekt Gruppen" särskrivet.
// Sajten hade tidigare två stavningar live samtidigt — sidtitlarna sa
// "Bygg & Projektgruppen i Stockholm AB" medan footern och integritetspolicyn sa
// registervarianten. Därför bor varje namnsträng numera här och konsumeras
// härifrån, så att de inte kan glida isär igen. Lägg inte tillbaka namnet
// hårdkodat i en komponent eller en sidtitel.
export const company = {
  // Fullständigt firmanamn. Används i sidtitlar, meta, og-taggar, JSON-LD och
  // footerns copyright.
  legalName: 'Bygg och Projekt Gruppen i Stockholm AB',
  // Kortform för löpande text, där hela firmanamnet med bolagsform blir tungt.
  name: 'Bygg och Projekt Gruppen',
  // Ordmärket i navbar och footer sätts i två delar med ett guldfärgat &
  // emellan, så det kan inte vara en enda sträng. Delarna versaliseras av CSS.
  wordmark: ['Bygg', 'Projekt Gruppen'],
  orgNr: '559576-5198',
  phone: '070-462 99 43',
  phoneHref: 'tel:+46704629943',
  email: 'Andreas@byggoprojektgruppen.se',
  emailHref: 'mailto:Andreas@byggoprojektgruppen.se',
  address: 'Sågvägen 33, 184 40 Åkersberga',
  ceo: 'Andreas Berndt Dahlgren',
  seat: 'Österåker, Stockholms län',
  founded: '2026',
  domain: 'byggoprojektgruppen.se',
};
