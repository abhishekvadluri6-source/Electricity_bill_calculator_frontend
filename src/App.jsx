import { useEffect, useState } from 'react';
import { calculateBill, clearHistory, getHistory, getSlabs } from './api';
import BillResult from './components/BillResult.jsx';
import History from './components/History.jsx';
import SlabRates from './components/SlabRates.jsx';

export default function App() {
  const [units, setUnits] = useState('');
  const [bill, setBill] = useState(null);
  const [slabInfo, setSlabInfo] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([getSlabs(), getHistory()])
      .then(([slabs, items]) => {
        setSlabInfo(slabs);
        setHistory(items);
      })
      .catch(() =>
        setError('Cannot reach the server. Check that the Spring Boot backend and MySQL are running.')
      );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const text = units.trim();
    if (text === '' || Number.isNaN(Number(text))) {
      setError('Enter the number of units as a positive number.');
      setBill(null);
      return;
    }

    setLoading(true);
    try {
      setBill(await calculateBill(Number(text)));
      setHistory(await getHistory());
    } catch (err) {
      setBill(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setUnits('');
    setBill(null);
    setError('');
  }

  async function handleClearHistory() {
    try {
      await clearHistory();
      setHistory([]);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <h1>Electricity Bill Calculator</h1>
          <p>Enter the units you used. Charges are added slab by slab, plus a fixed service charge.</p>
        </div>
      </header>

      <main className="layout">
        <div className="stack">
          <section className="panel">
            <h2>Units consumed</h2>
            <form className="unit-form" onSubmit={handleSubmit} autoComplete="off">
              <label className="field">
                <input
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  inputMode="decimal"
                  placeholder="250"
                  aria-label="Units consumed"
                  autoFocus
                />
                <span>units</span>
              </label>
              <button className="primary" type="submit" disabled={loading}>
                {loading ? 'Calculating…' : 'Calculate bill'}
              </button>
              <button className="ghost" type="button" onClick={handleClear}>
                Clear
              </button>
            </form>
            <p className="error" role="alert">{error}</p>
          </section>

          {bill && <BillResult bill={bill} />}
        </div>

        <div className="stack">
          <SlabRates info={slabInfo} />
          <History items={history} onClear={handleClearHistory} />
        </div>
      </main>
    </>
  );
}
