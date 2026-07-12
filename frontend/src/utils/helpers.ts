/**
 * Formats standard number/string to localized date.
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch {
    return 'N/A';
  }
}

/**
 * Standard text formatting utility to uppercase or sentence case safely.
 */
export function formatTicker(ticker: string): string {
  return (ticker || '').toUpperCase().trim();
}
