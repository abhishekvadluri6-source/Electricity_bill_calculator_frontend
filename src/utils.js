export const SLAB_COLORS = ['var(--s1)', 'var(--s2)', 'var(--s3)', 'var(--s4)'];
export const SERVICE_COLOR = 'var(--svc)';

export const money = (n) =>
  'Rs. ' +
  Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
