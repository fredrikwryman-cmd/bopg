import { company } from '../../data/company.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="foot-grid wrap">
        <div className="fb">
          <b>BYGG <span className="amp">&amp;</span> PROJEKTGRUPPEN</b>
          <div className="tag">Bygg · Projektledning · Entreprenad</div>
          <p>
            Samlad byggpartner i Stockholmsområdet med bas i Åkersberga. Nybyggnation,
            renovering, entreprenad och allt däremellan — från första ritning till
            färdig överlämning.
          </p>
        </div>
        <div>
          <h2>Kontakt</h2>
          <ul>
            <li><a href={company.phoneHref}>{company.phone}</a></li>
            <li><a href={company.emailHref}>{company.email}</a></li>
            <li>{company.address}</li>
            <li>Org.nr {company.orgNr}</li>
          </ul>
        </div>
      </div>
      <div className="foot-bot">
        <span>© {year} BYGG OCH PROJEKT GRUPPEN I STOCKHOLM AB</span>
        <span>ORG.NR {company.orgNr} · ÅKERSBERGA</span>
      </div>
    </footer>
  );
}
