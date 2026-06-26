import { motion } from 'framer-motion';

const BASE = import.meta.env.BASE_URL;

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
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1>{title}</h1>
          {subtitle && <p className="ph-sub">{subtitle}</p>}
        </motion.div>
      </div>
    </header>
  );
}
