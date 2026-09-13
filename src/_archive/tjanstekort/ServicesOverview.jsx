import { motion } from 'framer-motion';
import { services, extraServices } from '../../data/services.js';

const BASE = import.meta.env.BASE_URL;

export default function ServicesOverview() {
  return (
    <section className="section" id="tjanster">
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="sec-ey">Vad vi gör</span>
          <h2 className="sec-h">Vi hjälper till<br />med det mesta</h2>
          <p className="sec-intro">
            Från grund till färdig byggnad — och allt däremellan. Vi tar oss an stora som
            små uppdrag inom bygg, renovering och entreprenad, med egen personal och
            pålitliga samarbetspartners.
          </p>
        </motion.div>

        <div className="svc-grid">
          {services.map((s, i) => (
            <motion.a
              key={s.slug}
              href={BASE + 'tjanster/' + s.slug}
              className="svc"
              aria-label={`${s.title}, läs mer`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="svc-img">
                <img src={BASE + s.image} alt={s.title} loading="lazy" />
                <span className="svc-idx">{s.idx}</span>
              </div>
              <div className="svc-body">
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="svc-link">Läs mer <span className="ar">&rarr;</span></span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p className="svc-more" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          Vi erbjuder även:{' '}
          {extraServices.map((e, i) => (
            <span key={e}><b>{e}</b>{i < extraServices.length - 1 ? ' · ' : ''}</span>
          ))}
          . Saknas något? Hör av er — vi löser det också.
        </motion.p>
      </div>
    </section>
  );
}
