export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });
}

export function getMonthDay(date: Date): { month: string; day: string } {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return { month, day };
}

export function getYearSuffix(year: number): string {
  if (year < 0) {
    return `${Math.abs(year)} BCE`;
  }
  return year.toString();
}
