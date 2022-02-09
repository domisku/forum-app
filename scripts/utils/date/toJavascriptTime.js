import splitDate from "./splitDate.js";

export default function convertToJavascriptTime(date) {
  const ymd = splitDate(date);

  return `${new Date(ymd.year, ymd.month - 1, ymd.day).getTime()}`;
}
