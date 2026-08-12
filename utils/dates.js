export const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

export function getDayName(dateStr) {
  return DAYS[new Date(dateStr + "T00:00:00").getDay()];
}