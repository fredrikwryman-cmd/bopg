import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

const ticker = ['Bygg', 'Projektledning', 'Entreprenad', 'Renovering', 'El & VVS', 'Mark & plåt', 'Smide'];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <header className="hero" id="top" ref={ref}>
      {/* Sidans LCP-element. fetchPriority="high" flyttar upp bilden i webbläsarens
          köordning (Lighthouse-revisionen "LCP request discovery" saknade just den),
          och srcSet låter mobilen nöja sig med 800 px-varianten (47 kB) i stället för
          1400 px (118 kB). Attributen ligger på motion.img — framer-motion skickar
          okända props vidare till <img> orört, så parallaxen (y/scale) rörs inte.
          Motsvarande <link rel="preload"> sätts i Layout.astro via index.astro. */}
      <motion.img
        className="hero-bg"
        src={BASE + 'hero.jpg'}
        srcSet={`${BASE}hero-800.jpg 800w, ${BASE}hero.jpg 1400w`}
        sizes="100vw"
        alt="Byggteam som planerar över ritningar"
        style={{ y: bgY, scale: bgScale }}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-scrim" />
      <div className="hero-grid" />
      <motion.div className="hero-in" style={{ opacity: copyOpacity }}>
        <div className="hero-copy">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            Åkersberga · Stockholm — samlad byggpartner
          </motion.span>
          <h1 className="headline">
            <motion.span style={{ display: 'block' }} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}>
              Bygg, projekt
            </motion.span>
            <motion.span className="accent" style={{ display: 'block' }} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32 }}>
              <span className="amp-g">&amp;</span> entreprenad.
              <svg className="sweep" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
                <path d="M8,42 C150,12 430,8 592,30" />
              </svg>
            </motion.span>
          </h1>
          <motion.p className="sub" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            Bygg och Projektgruppen samlar bygg, projektledning och entreprenad under ett
            tak — nybyggnation, renovering, installation, mark och fastighet. Vi hjälper
            till med det mesta, från första ritning till färdig överlämning med komplett
            kvalitets- och miljödokumentation.
          </motion.p>
          <motion.div className="actions" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.46 }}>
            <a className="btn btn-primary" href={BASE + 'tjanster'}>
              <span className="fill" /><span className="lbl">Se våra tjänster</span><span className="arrow">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href={BASE + 'kontakt'}>Kontakta oss</a>
          </motion.div>
        </div>
      </motion.div>
      <div className="ticker">
        <div className="marquee">
          <div className="mq-track">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <span className={'mq-item' + (t === 'Bygg' ? ' first' : '')}>{t}</span>
                <span className="mq-sep">&bull;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
