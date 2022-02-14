export default function createLoadingSpinner() {
  const loadingSpinnerContainer = document.createElement("div");
  loadingSpinnerContainer.classList.add("loading");

  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("loading__spinner");

  loadingSpinnerContainer.appendChild(loadingSpinner);

  return loadingSpinnerContainer;
}

export function addLoadingSpinner() {
  const mainContent = document.querySelector(".main-content");
  const spinner = createLoadingSpinner();
  mainContent.appendChild(spinner);
}

export function removeLoadingSpinner() {
  const spinner = document.querySelector(".main-content .loading");
  if (spinner) spinner.remove();
}
