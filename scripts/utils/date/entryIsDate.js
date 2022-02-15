export default function entryIsDate(entry) {
  const ymd = ["year", "month", "day"];
  return ymd.includes(entry.toString());
}
