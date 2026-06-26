import { company } from '../../data/company.js';
import { services } from '../../data/services.js';

const BASE = import.meta.env.BASE_URL;

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
          <h4>Tjänster</h4>
          <ul>
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <a href={BASE + 'tjanster/' + s.slug}>{s.title}</a>
              </li>
            ))}
            <li><a href={BASE + 'tjanster'}>Alla tjänster</a></li>
          </ul>
        </div>
        <div>
          <h4>Kontakt</h4>
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
