import filters from "../../store/filters.js";

export default function resetControls() {
  const buttonPrev = document.querySelector(".pagination__prev");
  const buttonNext = document.querySelector(".pagination__next");
  const buttonFirst = document.querySelector(".pagination__first");
  const buttonLast = document.querySelector(".pagination__last");

  if (filters.page === 1) buttonFirst.disabled = true;
  else buttonFirst.disabled = false;

  if (filters.page === filters.lastPage || filters.lastPage === 1) {
    buttonNext.disabled = true;
    buttonLast.disabled = true;
  } else {
    buttonNext.disabled = false;
    buttonLast.disabled = false;
  }

  if (filters.page <= 1) buttonPrev.disabled = true;
  else buttonPrev.disabled = false;
}
