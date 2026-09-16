import { company } from '../../data/company.js';

const BASE = import.meta.env.BASE_URL;

// Tre nyckeltal, inte fler. De ska kunna läsas i ett svep och tåla att stå
// obevisade — det är därför de är erfarenhet, storleksordning och arbetssätt,
// inte antal projekt eller nöjda kunder.
const stats = [
  { fig: '30', unit: '+', label: 'Års branscherfarenhet' },
  { fig: '270', unit: ' MSEK', label: 'Projektstorlek som mest' },
  { fig: '01', unit: null, label: 'Ansvarig kontakt genom projektet' },
];

export default function AboutSection({ withLink = true }) {
  return (
    <section className="section" id="om">
      <div className="wrap">
        {/* INGEN framer-motion HÄR LÄNGRE. Rubriken och texten låg tidigare på
            motion.div med initial={{ opacity: 0 }}, vilket serverrenderar
            style="opacity:0" rakt in i HTML:en — utan JavaScript var sektionen
            tom. Klassen .reveal är en ren CSS-animation som spelas oavsett
            JavaScript och slutar i det färdiga läget. */}
        <div className="reveal">
          <span className="sec-ey">Om gruppen</span>
          <h2 className="sec-h">Erfarenhet som håller<br />ihop hela projektet</h2>
        </div>

        <div className="about">
          <div className="reveal" style={{ '--d': '80ms' }}>
            <p>
              {company.name} samlar <strong>lång branscherfarenhet</strong>,
              specialistkompetens och tydlig projektledning under ett gemensamt ansvar.
              Vi skapar struktur från första beslut till färdig överlämning.
            </p>
            <p>
              Bakom gruppen står <strong>Andreas Dahlgren</strong>, med över 30 års
              erfarenhet från byggbranschen och ledande roller i projekt upp till
              270 miljoner kronor.
            </p>
            {withLink && (
              <a className="btn btn-ghost" href={BASE + 'om-oss'} style={{ marginTop: '0.6rem' }}>
                Läs mer om oss <span className="arrow">&rarr;</span>
              </a>
            )}
          </div>

          <div className="reveal" style={{ '--d': '160ms' }}>
            {/* Nyckeltalen som typografi: hårfina linjer, inga kort. Samma
                uppställning som bolagslistan använder, så att de två blocken
                känns byggda av samma material. */}
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <span className="stat-fig">
                    {s.fig}
                    {s.unit && <span className="u">{s.unit}</span>}
                  </span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Bolagsfakta är kvar men underordnat — referensmaterial under
                nyckeltalen, inte ett andra blickfång bredvid dem. */}
            <div className="tblock">
              <div className="tbh"><span>Bolagsfakta</span><span className="g">/ AB</span></div>
              <div className="trow"><span className="k">Juridiskt namn</span><span className="v">{company.legalName}</span></div>
              <div className="trow"><span className="k">Org.nr</span><span className="v">{company.orgNr}</span></div>
              <div className="trow"><span className="k">Säte</span><span className="v">{company.seat}</span></div>
              <div className="trow"><span className="k">VD</span><span className="v">{company.ceo}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
