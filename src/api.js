async function request(path, options) {
  const res = await fetch(`/api${path}`, options);
  const data = res.status === 204 ? null : await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Something went wrong.');
  }
  return data;
}

export const getSlabs = () => request('/slabs');
export const getHistory = () => request('/history');
export const clearHistory = () => request('/history', { method: 'DELETE' });

export const calculateBill = (units) =>
  request('/calculate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ units }),
  });
