import { motion } from 'framer-motion';

const steps = [
  { n: '01', title: 'Planering', text: 'Vi får bäst resultat när beställningen kommer i god tid. Vi planerar noggrant så att rätt sak görs i rätt ordning.' },
  { n: '02', title: 'Fast pris i första hand', text: 'Vi eftersträvar fasta priser och tydliga offerter, men arbetar även på löpande räkning vid behov. Prislista finns på begäran.' },
  { n: '03', title: 'Kvalitet & miljö', text: 'Efter utfört arbete levererar vi alltid relevant kvalitets- och miljödokumentation — inget lämnas åt slumpen.' },
  { n: '04', title: 'En kontakt', text: 'Brett kunnande samlat på ett ställe. Du har en kontakt genom hela projektet, från första ritning till färdigt.' },
];

export default function ProcessSection() {
  return (
    <section className="section stone" id="process">
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="sec-ey">Så jobbar vi</span>
          <h2 className="sec-h">Tryggt från<br />offert till överlämning</h2>
        </motion.div>
        <div className="steps">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              className="step"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="node">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
