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

export default function convertToMDY(javascriptTime) {
  const date = new Date(javascriptTime);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${monthNames[month]} ${day}, ${year}`;
}
