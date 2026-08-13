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
  if (days < 0) {
    const absDays = Math.abs(days);
    return absDays === 1 ? 'Besok' : `Dalam ${absDays} hari`;
  }
  if (days === 0) return 'Hari ini';
  if (days === 1) return 'Kemarin';
  return `${days} hari lalu`;
}

// Helper: format Rupiah
export function formatRupiah(amount) {
  return 'Rp ' + (amount || 0).toLocaleString('id-ID');
}

// Helper: get current ISO week number
export function getWeekNumber(date = new Date()) {
  const now = new Date(date);
  now.setHours(0, 0, 0, 0);
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 604800000;
  return Math.ceil(((diff / oneWeek) + start.getDay() + 1) / 1);
}

// Helper: get next Monday (if called without args, gets next Monday from today)
export function getNextMonday(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const daysUntilMonday = day === 0 ? 1 : (8 - day);
  d.setDate(d.getDate() + daysUntilMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Helper: Add weeks to a date
export function addWeeks(date, weeks) {
  const d = new Date(date);
  d.setDate(d.getDate() + (weeks * 7));
  return d;
}

// Format date as "18 Agu"
export function formatShortDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

// Format date as ISO string (YYYY-MM-DD) in local timezone
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
