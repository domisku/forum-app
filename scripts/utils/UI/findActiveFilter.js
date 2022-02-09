export default function findActiveFilter(className) {
  const select = document.querySelector(className);
  const selectedOption = select.options[select.selectedIndex].value;

  return selectedOption;
}
