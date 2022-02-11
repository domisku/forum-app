import fetchFromDB from "../fetchers/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters, { constructParams } from "../store/filters.js";
import { calculateResultsIndexes, resetPagination } from "./pagination.js";

export default function listenForSelectedCategoryChange() {
  const select = document.querySelector("#category-filter");

  select.addEventListener("change", async () => {
    const selectedCategory = select.options[select.selectedIndex].value;

    if (selectedCategory === "all") filters.category = "";
    else filters.category = selectedCategory;

    resetPagination();
    const params = constructParams(filters);
    const { questions, lastPage } = await fetchFromDB(
      "questions",
      params,
      true
    );
    filters.lastPage = lastPage;

    calculateResultsIndexes(questions.length);
    renderQuestions(questions);
  });
}
