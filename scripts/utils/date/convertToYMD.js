export default function convertToYMD(javascriptTime) {
  const date = new Date(javascriptTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { year, month, day };
}
