export function displayDateFormat(dateString: Date): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}