import { useCallback, useEffect, useRef, useState } from 'react';
import Logo from './Logo.jsx';
import { company } from '../../data/company.js';

const BASE = import.meta.env.BASE_URL;

// Tre länkar, inte fyra. "Kontakt" låg tidigare både som textlänk och som
// CTA-knapp bredvid varandra — samma mål två gånger, vilket gör knappen svagare
// i stället för tydligare. Knappen får äga kontaktvägen.
const links = [
  { label: 'Våra bolag', href: BASE + '#bolag' },
  { label: 'Så jobbar vi', href: BASE + '#process' },
  { label: 'Om oss', href: BASE + 'om-oss' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const burgerRef = useRef(null);
  const panelRef = useRef(null);

  // KOMPRIMERINGEN. En sentinel högst upp på sidan i stället för ett
  // scroll-event: webbläsaren rapporterar själv när den lämnat vyn, och
  // huvudtråden slipper ett callback per bildruta genom hela sidan.
  //
  // Den tidigare navbaren gömde sig också vid scroll nedåt. Den är borta med
  // flit: sidan har numera två scrollstyrda sektioner som sitter fast i vyn,
  // och en header som åker in och ut ovanför dem läser som en glitch snarare
  // än som en funktion. Headern står kvar och tar mindre plats i stället.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sentinel = document.querySelector('[data-header-sentinel]');
    if (!sentinel || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    // Fokus tillbaka dit besökaren kom ifrån. Utan det hamnar fokus på
    // <body> när panelen försvinner, och nästa Tab börjar om från sidans topp.
    burgerRef.current?.focus();
  }, []);

  // Escape stänger, och kroppen låses medan panelen är öppen. Låsningen sker
  // med overflow: hidden på <html> — position: fixed på body hade nollställt
  // scrollpositionen när panelen stängs.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', onKey);

    const root = document.documentElement;
    const forra = root.style.overflow;
    root.style.overflow = 'hidden';

    // Fokus flyttas in i panelen så att tangentbordet hamnar rätt direkt.
    const first = panelRef.current?.querySelector('a, button');
    first?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      root.style.overflow = forra;
    };
  }, [mobileOpen, closeMenu]);

  return (
    <>
      <nav
        className={`nav${scrolled ? ' is-scrolled' : ''}`}
        aria-label="Huvudmeny"
        data-site-header
      >
        <div className="nav-in">
          {/* Ingen aria-label här: den lydde "<firmanamnet> — till startsidan"
              och innehöll därmed inte länkens synliga text. Skärmläsarnamnet sa
              alltså något annat än det som stod på skärmen, vilket bryter WCAG
              2.5.3 Label in Name. Utan aria-label blir namnet den synliga
              texten och de två kan inte glida isär. */}
          <a className="brand" href={BASE}>
            <Logo />
          </a>
          <div className="nav-links">
            {links.map((l) => (
              <a key={l.label} href={l.href}>{l.label}</a>
            ))}
          </div>
          <a className="nav-cta" href={BASE + 'kontakt'}>Kontakta oss</a>
          <button
            ref={burgerRef}
            className="nav-burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Öppna meny"
            aria-expanded={mobileOpen}
            aria-haspopup="dialog"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Meny"
        >
          <div className="mm-top">
            <span className="mm-label">Meny</span>
            <button className="mm-close" onClick={closeMenu} aria-label="Stäng meny">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mm-nav">
            {links.map((l, i) => (
              // Panelen stängs när ett mål valts. Länken navigerar som vanligt;
              // stängningen är bara för ankarlänkarna på samma sida, som annars
              // hade lämnat panelen liggande över sitt eget mål.
              <a key={l.label} className="mm-link" href={l.href} onClick={closeMenu}>
                <span className="mm-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="mm-text">{l.label}</span>
              </a>
            ))}
          </div>

          <div className="mm-foot">
            <a className="nav-cta" href={BASE + 'kontakt'} onClick={closeMenu}>
              Kontakta oss
            </a>
            <div className="mm-contact">
              <a href={company.phoneHref}>{company.phone}</a>
              <a href={company.emailHref}>{company.email}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
