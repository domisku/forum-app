export default function splitByComma(string: string) {
  return string.split(',').map((str) => str.trim());
}
