import { money, SERVICE_COLOR, SLAB_COLORS } from '../utils';

export default function BillResult({ bill }) {
  const share = (amount) => `${(Number(amount) / Number(bill.total)) * 100}%`;

  return (
    <section className="panel" aria-live="polite">
      <p className="total-label">Total bill amount</p>
      <p className="total">{money(bill.total)}</p>

      <div className="meter" aria-hidden="true">
        {bill.lines.map((line, i) => (
          <div
            key={line.label}
            style={{ width: share(line.amount), background: SLAB_COLORS[i % SLAB_COLORS.length] }}
          />
        ))}
        <div style={{ width: share(bill.serviceCharge), background: SERVICE_COLOR }} />
      </div>

      <table>
        <thead>
          <tr>
            <th>Slab</th>
            <th>Units</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bill.lines.map((line, i) => (
            <tr key={line.label}>
              <td>
                <i className="dot" style={{ background: SLAB_COLORS[i % SLAB_COLORS.length] }} />
                {line.label}
              </td>
              <td>{line.units}</td>
              <td>{money(line.rate)}</td>
              <td>{money(line.amount)}</td>
            </tr>
          ))}
          <tr>
            <td>
              <i className="dot" style={{ background: SERVICE_COLOR }} />
              Fixed service charge
            </td>
            <td />
            <td />
            <td>{money(bill.serviceCharge)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{bill.units}</td>
            <td />
            <td>{money(bill.total)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}
