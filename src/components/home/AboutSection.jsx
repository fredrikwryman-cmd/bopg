import { motion } from 'framer-motion';
import { company } from '../../data/company.js';

const BASE = import.meta.env.BASE_URL;

export default function AboutSection({ withLink = true }) {
  return (
    <section className="section" id="om">
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="sec-ey">Om gruppen</span>
          <h2 className="sec-h">En samlad<br />byggpartner</h2>
        </motion.div>
        <motion.div className="about" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          <div>
            <p>
              Bygg och Projektgruppen är en <strong>samlad byggpartner i Stockholmsområdet</strong>,
              med bas i Åkersberga. Vi tar oss an allt från nybyggnation och totalrenovering
              till installation, mark, plåt och fastighet — med samma mål oavsett storlek:
              kvalitet, ordning och en rak, ärlig dialog.
            </p>
            <p>
              Vår ambition är att vara den <strong>enda kontakt du behöver</strong> genom hela
              projektet. Vi planerar noga, håller det vi lovar och dokumenterar arbetet ordentligt.
            </p>
            <p>
              Bakom gruppen står <strong>Andreas Dahlgren</strong>, med över 20 års erfarenhet i
              byggbranschen — från hantverkare och stomledare till arbetsledare, platschef och
              byggledare på projekt upp mot 270 miljoner kronor.
            </p>
            {withLink && (
              <a className="btn btn-ghost" href={BASE + 'om-oss'} style={{ marginTop: '0.5rem' }}>
                Läs mer om oss <span className="arrow">&rarr;</span>
              </a>
            )}
          </div>
          <div className="tblock">
            <div className="tbh"><span>Bolagsfakta</span><span className="g">/ AB</span></div>
            <div className="trow"><span className="k">Juridiskt namn</span><span className="v">{company.legalName}</span></div>
            <div className="trow"><span className="k">Org.nr</span><span className="v">{company.orgNr}</span></div>
            <div className="trow"><span className="k">Säte</span><span className="v">{company.seat}</span></div>
            <div className="trow"><span className="k">VD</span><span className="v">{company.ceo}</span></div>
            <div className="trow"><span className="k">Grundat</span><span className="v">{company.founded}</span></div>
            <div className="trow"><span className="k">Registrerat för</span><span className="v">F-skatt · Moms · Arb.avgift</span></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
