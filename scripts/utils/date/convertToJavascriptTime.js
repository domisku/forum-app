export default function convertToJavascriptTime(date, month, day) {
  return new Date(+date, +month, +day).getTime();
}
