export function getIquitosToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((value) => value.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function parseRetreatDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < '0001-01-01') return null;
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== value
    ? null
    : date;
}

export function isValidArrival(
  value: string,
  today = getIquitosToday()
): boolean {
  return (
    parseRetreatDate(value) !== null && value >= today && value <= '9999-12-25'
  );
}

export function getDepartureDate(arrival: string): string {
  const date = parseRetreatDate(arrival);
  if (!date) throw new RangeError('Invalid retreat arrival date');
  date.setUTCDate(date.getUTCDate() + 6);
  return date.toISOString().slice(0, 10);
}

export function formatRetreatDate(value: string, lang: 'es' | 'en'): string {
  const date = parseRetreatDate(value);
  if (!date) throw new RangeError('Invalid retreat date');
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
