import splitDate from "./splitDate.js";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function reformatDate(date) {
  const ymd = splitDate(date);

  return `${monthNames[ymd.month - 1]} ${ymd.day}, ${ymd.year}`;
}
