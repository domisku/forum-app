export default function convertToJavascriptTime(
  date: number,
  month: number,
  day: number
) {
  return new Date(+date, +month - 1, +day).getTime();
}
