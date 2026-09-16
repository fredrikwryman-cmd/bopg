import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

// Förtroenderaden längst ned i hero. Ersätter den rullande banderollen som låg
// på exakt samma plats och listade gruppens bolag — den informationen har
// numera en egen sektion, och tre fasta uppgifter säger mer på en halv sekund
// än en marquee gör på trettio.
const trust = [
  { fore: null, stark: '30+', efter: 'års branscherfarenhet' },
  { fore: 'Projekt upp till', stark: '270 MSEK', efter: null },
  { fore: null, stark: null, efter: 'Stockholm · Åkersberga' },
];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <header className="hero" id="top" ref={ref}>
      {/* BILDEN ÄR ORÖRD. Samma fil, samma srcSet, samma object-fit och
          object-position, samma parallax. Sidans LCP-element: fetchPriority
          flyttar upp den i webbläsarens köordning och srcSet låter mobilen
          nöja sig med 800 px-varianten. Attributen ligger på motion.img —
          framer-motion skickar okända props vidare till <img> orört. */}
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
          {/* INTRORÖRELSEN LIGGER I CSS, INTE HÄR. Tidigare låg varje rad på en
              motion-komponent med initial={{ opacity: 0 }}, vilket
              serverrenderar style="opacity:0" rakt in i HTML:en — utan
              JavaScript var hero-texten osynlig. Klassen .reveal är en ren
              CSS-animation som spelas oavsett JavaScript och slutar i det
              färdiga läget. --d staplar starten. */}
          <span className="eyebrow reveal" style={{ '--d': '60ms' }}>
            Bygg · Projektledning · Entreprenad
          </span>

          <h1 className="headline">
            <span className="hl-line reveal" style={{ '--d': '160ms' }}>
              <span className="accent">
                En partner.
                <svg className="sweep" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M8,42 C150,12 430,8 592,30" />
                </svg>
              </span>
            </span>
            {/* Radbrytningen är satt för hand för desktopbredd och stängs av
                under 760 px, där raden ändå inte ryms. MELLANSLAGET FÖRE <br>
                ÄR AVSIKTLIGT: utan det blir "idétill" ett enda ord när
                brytningen döljs på mobil. På desktop trimmas det bort av
                radbrytningen och syns inte. */}
            <span className="hl-line reveal" style={{ '--d': '280ms' }}>
              Hela vägen från idé <br />till färdig byggnad.
            </span>
          </h1>

          <p className="sub reveal" style={{ '--d': '380ms' }}>
            Vi leder, samordnar och kvalitetssäkrar byggprojekt genom hela kedjan —
            med tydlig kostnadskontroll, raka beslutsvägar och en ansvarig kontakt.
          </p>

          <div className="actions reveal" style={{ '--d': '460ms' }}>
            <a className="btn btn-primary" href={BASE + 'kontakt'}>
              <span className="fill" />
              <span className="lbl">Berätta om ditt projekt</span>
              <span className="arrow">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href={BASE + '#bolag'}>Upptäck våra bolag</a>
          </div>
        </div>
      </motion.div>

      <div className="hero-trust">
        <div className="hero-trust-in">
          {trust.map((t, i) => (
            <span className="ht-item" key={i}>
              {t.fore && <>{t.fore}&nbsp;</>}
              {t.stark && <b>{t.stark}</b>}
              {t.efter && <>&nbsp;{t.efter}</>}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
