// Ordmärke: transparent logo-symbol + textbaserat ordmärke (Archivo) med
// guldfärgat &. Orden hämtas ur company.js så stavningen av firmanamnet bara
// finns på ett ställe. Versalerna sätts av CSS (text-transform), inte i källan.
import { company } from '../../data/company.js';

const BASE = import.meta.env.BASE_URL;

export default function Logo({ tag = true }) {
  return (
    <>
      <img
        className="brand-logo"
        src={BASE + 'bopg-logo.png'}
        alt=""
        width="85"
        height="68"
        aria-hidden="true"
      />
      <div>
        {/* Namnets två delar ligger i var sitt .wm-span. På mobil får ordmärket
            radbrytas, och spannen ser då till att brytningen bara kan ske MELLAN
            delarna — aldrig mitt i "Projekt Gruppen". Utan dem kollapsade
            textkolumnen till sin minsta innehållsbredd och bröt ord för ord. */}
        <b>
          <span className="wm">
            {company.wordmark[0]} <span className="amp">&amp;</span>
          </span>{' '}
          <span className="wm">{company.wordmark[1]}</span>
        </b>
        {tag && <span className="tagline">SAMLAD BYGGEXPERTIS · STOCKHOLM</span>}
      </div>
    </>
  );
}
