import fetchFromDB from "../../fetchers/fetchFromDB.js";
import filters, { constructParams } from "../../store/filters.js";
import renderQuestions from "../../rendering/questions.js";
import scrollTo from "../../utils/UI/scrollTo.js";
import resetPagination from "./resetPagination.js";
import resetControls from "./resetControls.js";
import calculateResultsIndexes from "./calculateResultsIndexes.js";

let timeout;

export default function listenForPaginationChange() {
  resetPagination();
  calculateResultsIndexes();

  const pagination = document.querySelector(".pagination__nav");
  const currentPage = document.querySelector(".pagination__current");

  currentPage.textContent = filters.page;

  pagination.addEventListener("click", pageChangeHandler);
}

async function pageChangeHandler(event) {
  const clickedButton = event.target.closest("button");
  if (!clickedButton) return;
  if (clickedButton.disabled) return;

  if (timeout) clearTimeout(timeout);

  switch (clickedButton.dataset.page) {
    case "first":
      filters.page = 1;
      break;
    case "prev":
      filters.page--;
      break;
    case "next":
      filters.page++;
      break;
    case "last":
      filters.page = filters.lastPage;
      break;
    default:
  }

  const currentPage = document.querySelector(".pagination__current");
  currentPage.textContent = filters.page;

  const params = constructParams(filters);
  const { questions, lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;

  resetControls();

  calculateResultsIndexes(questions.length);

  timeout = setTimeout(() => {
    renderQuestions(questions);
    scrollTo(0);
  }, 1000);
}

export function removePageChangeListener() {
  const pagination = document.querySelector(".pagination__nav");

  if (pagination) pagination.removeEventListener("click", pageChangeHandler);
}
