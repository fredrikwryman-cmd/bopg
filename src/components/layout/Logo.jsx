// Ordmärke för Bygg & Projektgruppen — textbaserat (Archivo), med guldfärgat &.
// TODO (Fredrik): byt mot transparent vektorlogga när BOPG har en framtagen.
export default function Logo({ tag = true }) {
  return (
    <div>
      <b>
        BYGG <span className="amp">&amp;</span> PROJEKTGRUPPEN
      </b>
      {tag && <span>SAMLAD BYGGEXPERTIS · STOCKHOLM</span>}
    </div>
  );
}
