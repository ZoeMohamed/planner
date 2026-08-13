// Helper: days since a date
export function daysSinceServed(lastServedDate) {
  if (!lastServedDate) return 999;
  const served = new Date(lastServedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  served.setHours(0, 0, 0, 0);
  return Math.floor((today - served) / (1000 * 60 * 60 * 24));
}

// Helper: freshness level
export function freshnessLevel(days) {
  if (days >= 21) return 'aman';
  if (days >= 8) return 'agak-dekat';
  return 'baru';
}

// Helper: freshness label
export function freshnessLabel(days) {
  if (days >= 999) return 'Belum pernah';
  if (days === 0) return 'Hari ini';
  if (days === 1) return '1 hari lalu';
  return `${days} hari lalu`;
}

// Helper: format Rupiah
export function formatRupiah(amount) {
  return 'Rp ' + (amount || 0).toLocaleString('id-ID');
}

// Helper: get current ISO week number
export function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 604800000;
  return Math.ceil(((diff / oneWeek) + start.getDay() + 1) / 1);
}

// Helper: get next Monday
export function getNextMonday() {
  const d = new Date();
  const day = d.getDay();
  const daysUntilMonday = day === 0 ? 1 : (8 - day);
  d.setDate(d.getDate() + daysUntilMonday);
  return d;
}

// Format date as "18 Agu"
export function formatShortDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

// Format date as ISO string (YYYY-MM-DD)
export function toISODate(date) {
  return date.toISOString().split('T')[0];
}
