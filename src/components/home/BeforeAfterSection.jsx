import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

const BA = [
  { label: 'Badrum', before: 'forevefter/badrum-fore.jpg', after: 'forevefter/badrum-efter.jpg', desc: 'Totalrenovering med nytt tätskikt, mörkt kakel och walk-in dusch. Vi river, bygger upp och dokumenterar — ett badrum som håller i decennier.' },
  { label: 'Fasad', before: 'forevefter/fasad-fore.jpg', after: 'forevefter/fasad-efter.jpg', desc: 'Ny puts, plåttak och fönster ger huset ett helt nytt yttre — och ett tätare, varmare skal som klarar vädret år efter år.' },
  { label: 'Kök', before: 'forevefter/kok-fore.jpg', after: 'forevefter/kok-efter.jpg', desc: 'Från slitet och mörkt till ljust och funktionellt. Nya stommar, bänkskivor och vitvaror, monterat med millimeterpassning.' },
  { label: 'Nybygge', before: 'forevefter/nybygge-fore.jpg', after: 'forevefter/nybygge-efter.jpg', desc: 'Från grund och stomme till inflyttningsklart hus. Vi håller ihop hela kedjan med en kontakt — projektering, bygge och slutbesiktning.' },
  { label: 'Trappa & räcke', before: 'forevefter/trappa-fore.jpg', after: 'forevefter/trappa-efter.jpg', desc: 'Ny entrétrappa i granit med smidesräcke och infälld belysning — säkert, snyggt och i princip underhållsfritt.' },
  { label: 'Mark & uppfart', before: 'forevefter/mark-fore.jpg', after: 'forevefter/mark-efter.jpg', desc: 'Dränering, markberedning och stensatt uppfart med ny plantering. En entré som lyfter intrycket av hela tomten.' },
];

export default function BeforeAfterSection() {
  const [active, setActive] = useState(0);
  const [x, setX] = useState(50);
  const stageRef = useRef(null);
  const dragging = useRef(false);

  const current = BA[active];

  const fromEvent = (e) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const v = ((cx - r.left) / r.width) * 100;
    setX(Math.max(0, Math.min(100, v)));
  };

  useEffect(() => {
    const move = (e) => { if (dragging.current) fromEvent(e); };
    const up = () => { dragging.current = false; };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); setX((v) => Math.max(0, v - 3)); }
    if (e.key === 'ArrowRight') { e.preventDefault(); setX((v) => Math.min(100, v + 3)); }
  };

  return (
    <section className="section" id="forevefter">
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="sec-ey">Före / efter</span>
          <h2 className="sec-h">Se förvandlingen</h2>
          <p className="sec-intro">
            Dra i reglaget och se skillnaden — från slitet och uttjänt till färdigt och
            premium. Välj objekt nedan.
          </p>
        </motion.div>

        <div className="ba-tabs">
          {BA.map((b, i) => (
            <button
              key={b.label}
              type="button"
              className={'ba-tab' + (i === active ? ' active' : '')}
              onClick={() => { setActive(i); setX(50); }}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="ba-layout">
          <div>
            <div className="ba">
              <div
                className="ba-stage"
                ref={stageRef}
                onPointerDown={(e) => { dragging.current = true; fromEvent(e); }}
              >
                <img className="ba-after" src={BASE + current.after} alt={`Efter renovering — ${current.label}`} />
                <img className="ba-before" src={BASE + current.before} alt={`Före renovering — ${current.label}`} style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }} />
                <span className="ba-label ba-label-before">Före</span>
                <span className="ba-label ba-label-after">Efter</span>
                <div className="ba-divider" style={{ left: x + '%' }}>
                  <div
                    className="ba-handle"
                    tabIndex={0}
                    role="slider"
                    aria-label="Dra för att jämföra före och efter"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(x)}
                    onKeyDown={onKey}
                  >
                    &#8646;
                  </div>
                </div>
              </div>
            </div>
            <p className="ba-hint">&#8646;&nbsp; Dra reglaget i sidled — eller använd piltangenterna när knappen är markerad.</p>
          </div>

          <aside className="ba-info">
            <span className="ba-info-ey">Förvandling {String(active + 1).padStart(2, '0')} / 06</span>
            <h3>{current.label}</h3>
            <p className="ba-info-desc">{current.desc}</p>
            <a className="btn btn-primary" href={BASE + 'kontakt'} style={{ alignSelf: 'flex-start' }}>
              <span className="fill" /><span className="lbl">Begär offert</span><span className="arrow">&rarr;</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
