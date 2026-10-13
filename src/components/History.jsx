import { money } from '../utils';

const timeOf = (iso) =>
  new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

export default function History({ items, onClear }) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Recent bills</h2>
        {items.length > 0 && (
          <button className="link" type="button" onClick={onClear}>
            Clear history
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="empty">Bills you calculate will appear here.</p>
      ) : (
        <ul className="rates">
          {items.map((item) => (
            <li key={item.id}>
              <span>
                {item.units} units <small>{timeOf(item.createdAt)}</small>
              </span>
              <strong>{money(item.total)}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
