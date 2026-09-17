// NAVBARENS LOGOTYP — en enda bild, inte ett återskapat ordmärke.
//
// Tidigare låg lockupen i tre delar: en symbolbild plus firmanamnet och
// undertexten satta i HTML med Archivo och Space Mono. Den konstruktionen
// kunde aldrig bli identisk med den riktiga logotypen — teckensnittens
// proportioner, kerning och det guldfärgade &-tecknet var en approximation, och
// de tre delarna kunde glida isär vid varje ny brytpunkt. Nu är det den levererade
// logotypfilen som visas, som en sammanhållen enhet.
//
// BILDEN. public/bopg-navbar-logo.png är originalet (orört på beställarens
// dator) trimmat från sin vita ytteryta och skalat till 1440 px bredd — drygt
// 3x största visningsbredd, alltså skarpa bokstäver även på retina. Bakgrunden
// är snappad till exakt #ffffff: originalet låg på 253–254, vilket hade synts
// som en svag rektangel mot navbarens vita yta.
//
// TILLGÄNGLIGHET. Alt-texten är firmanamnet, en gång. Ingen dold textversion
// av namnet, verksamhetsraden eller orten ligger kvar bredvid — skärmläsaren
// ska inte läsa upp samma uppgifter två gånger.
import { company } from '../../data/company.js';

const BASE = import.meta.env.BASE_URL;

export default function Logo() {
  return (
    <img
      className="brand-logo"
      src={BASE + 'bopg-navbar-logo.png'}
      alt={`${company.wordmark[0]} & ${company.wordmark[1]}`}
      // Bildens verkliga pixelmått. Webbläsaren kan därmed räkna ut höjden ur
      // bredden innan filen laddats, så navbaren har rätt höjd från första
      // målningen och ingenting hoppar.
      width="1440"
      height="288"
      decoding="async"
    />
  );
}
