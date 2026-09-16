const BASE = import.meta.env.BASE_URL;

// INGEN framer-motion HÄR LÄNGRE. Rubrikblocket låg tidigare på en motion.div
// med initial={{ opacity: 0 }}, vilket serverrenderar style="opacity:0" rakt in
// i HTML:en — utan JavaScript var sidhuvudet på om-oss, kontakt och
// integritetspolicy tomt. Klassen .reveal är en ren CSS-animation som spelas
// oavsett JavaScript och slutar i det färdiga läget.
export default function PageHeader({ eyebrow, title, subtitle, crumbs }) {
  return (
    <header className="page-header">
      <div className="blueprint-bg" />
      <div className="ph-in">
        {crumbs && (
          <nav className="crumbs" aria-label="Brödsmulor">
            <a href={BASE}>Hem</a>
            {crumbs.map((c) => (
              <span key={c.label}>
                {' / '}
                {c.href ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="reveal">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p className="ph-sub">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}
