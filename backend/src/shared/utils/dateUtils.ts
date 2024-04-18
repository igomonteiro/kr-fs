export function toISODate(date: string) {
  if (typeof date !== "string" || date.length !== 8) {
    return null;
  }

  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  try {
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
    return isoDate;
  } catch (err) {
    return null;
  }
}
