const WIB_OFFSET_HOURS = 7;
const HOURS_PER_DAY = 24;
const TIME_PATTERN = /^([01]?\d|2[0-3]):([0-5]\d)$/;

export function convertToWIB(timeUTC: string | null | undefined): string {
  if (!timeUTC) return "";

  const match = TIME_PATTERN.exec(timeUTC.trim());
  if (!match) return "";

  const wibHour = (Number(match[1]) + WIB_OFFSET_HOURS) % HOURS_PER_DAY;
  return `${String(wibHour).padStart(2, "0")}:${match[2]} WIB`;
}
