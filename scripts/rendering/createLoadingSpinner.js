export default function createLoadingSpinner() {
  const loadingSpinnerContainer = document.createElement("div");
  loadingSpinnerContainer.classList.add("loading");

  const loadingSpinner = document.createElement("div");
  loadingSpinner.classList.add("loading__spinner");

  loadingSpinnerContainer.appendChild(loadingSpinner);

  return loadingSpinnerContainer;
}

export function addLoadingSpinner() {
  const overlay = document.querySelector(".overlay-root");
  const modalRoot = document.querySelector(".modal-root");

  overlay.classList.add("overlay-root--show");
  modalRoot.classList.add("modal-root--show");

  const spinner = createLoadingSpinner();
  modalRoot.appendChild(spinner);
}

export function removeLoadingSpinner() {
  const overlay = document.querySelector(".overlay-root");
  const modalRoot = document.querySelector(".modal-root");

  overlay.classList.remove("overlay-root--show");
  modalRoot.classList.remove("modal-root--show");

  const spinner = document.querySelector(".modal-root .loading");
  if (spinner) spinner.remove();
}
