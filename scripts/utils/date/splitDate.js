export default function splitDate(date) {
  const splitDate = date.split("-").map((str) => +str);
  const [year, month, day] = splitDate;

  return { year, month, day };
}
