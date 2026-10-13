import { money, SERVICE_COLOR, SLAB_COLORS } from '../utils';

export default function SlabRates({ info }) {
  return (
    <section className="panel">
      <h2>Slab rates</h2>
      {!info ? (
        <p className="empty">Loading rates…</p>
      ) : (
        <ul className="rates">
          {info.slabs.map((slab, i) => (
            <li key={slab.label}>
              <span>
                <i className="dot" style={{ background: SLAB_COLORS[i % SLAB_COLORS.length] }} />
                {slab.label} units
              </span>
              <span>{money(slab.rate)} / unit</span>
            </li>
          ))}
          <li>
            <span>
              <i className="dot" style={{ background: SERVICE_COLOR }} />
              Service charge
            </span>
            <span>{money(info.serviceCharge)}</span>
          </li>
        </ul>
      )}
    </section>
  );
}
