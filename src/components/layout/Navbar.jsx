import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';

const BASE = import.meta.env.BASE_URL;

const links = [
  { label: 'Tjänster', href: BASE + 'tjanster' },
  { label: 'Så jobbar vi', href: BASE + '#process' },
  { label: 'Om oss', href: BASE + 'om-oss' },
  { label: 'Kontakt', href: BASE + 'kontakt' },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Smart navbar: göm vid scroll nedåt, visa vid scroll uppåt (samma som skarpa sajten).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let last = window.scrollY || 0;
    let ticking = false;
    const update = () => {
      const y = window.scrollY || 0;
      setScrolled(y > 10);
      setHidden(y > last && y > 140);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${hidden ? ' nav--hidden' : ''}`} aria-label="Huvudmeny">
        <div className="nav-in">
          <a className="brand" href={BASE} aria-label="Bygg & Projektgruppen — till startsidan">
            <Logo />
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
          <a className="nav-cta" href={BASE + 'kontakt'}>Kontakta oss</a>
          <button
            className="nav-burger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Stäng meny' : 'Öppna meny'}
            aria-expanded={mobileOpen}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu" onClick={() => setMobileOpen(false)}>
          {links.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
          <a className="nav-cta" href={BASE + 'kontakt'}>Kontakta oss</a>
        </div>
      )}
    </>
  );
}
