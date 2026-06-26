import { motion } from 'framer-motion';
import { services } from '../../data/services.js';

const BASE = import.meta.env.BASE_URL;

export default function ServiceDetail({ slug }) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  const others = services.filter((s) => s.slug !== slug);

  return (
    <section className="section">
      <div className="wrap">
        <div className="sd-grid">
          <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="sd-media" style={{ marginBottom: '2rem' }}>
              <img src={BASE + service.image} alt={service.title} loading="eager" />
            </div>
            <p className="sd-intro">{service.intro}</p>
            <div className="sd-inc-h">Det här ingår</div>
            <ul className="sd-inc">
              {service.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </motion.div>

          <motion.aside className="sd-aside" initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}>
            <h3>Begär offert</h3>
            <p>
              Berätta om ditt projekt inom {service.title.toLowerCase()} så återkommer vi
              med en tydlig offert så snart vi kan. Fast pris i första hand.
            </p>
            <a className="btn btn-primary" href={BASE + 'kontakt'} style={{ width: '100%', justifyContent: 'center' }}>
              <span className="fill" /><span className="lbl">Kontakta oss</span><span className="arrow">&rarr;</span>
            </a>
          </motion.aside>
        </div>

        <div className="sd-other">
          <div className="sd-other-h">Andra tjänster</div>
          <div className="sd-other-grid">
            {others.map((o) => (
              <a key={o.slug} className="sd-chip" href={BASE + 'tjanster/' + o.slug}>{o.title}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
