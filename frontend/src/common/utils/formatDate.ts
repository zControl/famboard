/**
 * Format a date as a string in the format MM/DD/YY HH:mm.
 * @param date The date to be formatted.
 * @returns The formatted date string.
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(date));
}