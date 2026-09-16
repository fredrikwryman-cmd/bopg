import { company } from '../../data/company.js';

const BASE = import.meta.env.BASE_URL;

// Samma tre mål som huvudmenyn, plus kontakt. Footern ska kunna bära besökaren
// vidare utan att hen behöver scrolla tillbaka upp.
const navlankar = [
  { label: 'Våra bolag', href: BASE + '#bolag' },
  { label: 'Så jobbar vi', href: BASE + '#process' },
  { label: 'Om oss', href: BASE + 'om-oss' },
  { label: 'Kontakt', href: BASE + 'kontakt' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="foot-grid wrap">
        <div className="fb">
          <b>
            {company.wordmark[0]} <span className="amp">&amp;</span> {company.wordmark[1]}
          </b>
          <div className="tag">Bygg · Projektledning · Entreprenad</div>
          <p>
            Construction Management-partner i Stockholmsområdet med bas i Åkersberga.
            Vi leder, samordnar och kvalitetssäkrar byggprojekt genom hela kedjan.
          </p>
        </div>

        <nav aria-label="Sidfotsmeny">
          <h2>Genvägar</h2>
          <ul>
            {navlankar.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2>Kontakt</h2>
          <ul>
            <li><a href={company.phoneHref}>{company.phone}</a></li>
            <li><a href={company.emailHref}>{company.email}</a></li>
            <li className="foot-plain">{company.address}</li>
          </ul>
        </div>
      </div>

      {/* Org.nr stod tidigare både här och i kontaktkolumnen. En gång räcker. */}
      <div className="foot-bot">
        <span>© {year} {company.legalName}</span>
        <span>Org.nr {company.orgNr} · Åkersberga</span>
        <span><a href={BASE + 'integritetspolicy'}>Integritetspolicy</a></span>
      </div>
    </footer>
  );
}
