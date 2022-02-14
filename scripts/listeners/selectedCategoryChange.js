import fetchFromDB from "../services/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters, { constructParams } from "../store/filters.js";
import resetPagination from "./pagination/resetPagination.js";
import resetControls from "./pagination/resetControls.js";
import calculateResultsIndexes from "./pagination/calculateResultsIndexes.js";

export default function listenForSelectedCategoryChange() {
  const select = document.querySelector("#category-filter");

  select.addEventListener("change", categoryChangeHandler);
}

export async function categoryChangeHandler() {
  const selectedCategory = select.options[select.selectedIndex].value;

  if (selectedCategory === "all") filters.category = "";
  else filters.category = selectedCategory;

  resetPagination();
  const params = constructParams(filters);
  const { questions, lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;

  resetControls();
  calculateResultsIndexes(questions.length);
  renderQuestions(questions);
}

export function removeCategoryListener() {
  const select = document.querySelector("#category-filter");

  if (select) select.removeEventListener("click", categoryChangeHandler);
}
