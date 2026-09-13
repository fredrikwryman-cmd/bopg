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
        <b>
          {company.wordmark[0]} <span className="amp">&amp;</span> {company.wordmark[1]}
        </b>
        {tag && <span>SAMLAD BYGGEXPERTIS · STOCKHOLM</span>}
      </div>
    </>
  );
}
