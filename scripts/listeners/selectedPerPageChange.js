import fetchFromDB from "../services/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters, { constructParams } from "../store/filters.js";
import resetPagination from "./pagination/resetPagination.js";
import calculateResultsIndexes from "./pagination/calculateResultsIndexes.js";

export default function listenForSelectedPerPageChange() {
  const select = document.querySelector("#count-filter__select");

  select.addEventListener("change", perPageChangeHandler);
}

async function perPageChangeHandler() {
  const select = document.querySelector("#count-filter__select");
  filters.limit = select.options[select.selectedIndex].value;
  filters.page = 1;

  const params = constructParams(filters);
  const { questions, lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;

  resetPagination();
  calculateResultsIndexes(questions.length);
  renderQuestions(questions);
}

export function removePerPageListener() {
  const select = document.querySelector("#count-filter__select");

  if (select) select.removeEventListener("click", perPageChangeHandler);
}
