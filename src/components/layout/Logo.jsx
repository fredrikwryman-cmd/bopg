// Ordmärke för Bygg & Projektgruppen — transparent logo-symbol + textbaserat
// ordmärke (Archivo), med guldfärgat &.
const BASE = import.meta.env.BASE_URL;

export default function Logo({ tag = true }) {
  return (
    <>
      <img
        className="brand-logo"
        src={BASE + 'bopg-logo.png'}
        alt=""
        width="57"
        height="46"
        aria-hidden="true"
      />
      <div>
        <b>
          BYGG <span className="amp">&amp;</span> PROJEKTGRUPPEN
        </b>
        {tag && <span>SAMLAD BYGGEXPERTIS · STOCKHOLM</span>}
      </div>
    </>
  );
}
