import fetchFromDB from "../fetchers/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters, { constructParams } from "../store/filters.js";
import { calculateResultsIndexes, resetPagination } from "./pagination.js";

export default function listenForSelectedPerPageChange() {
  const select = document.querySelector("#count-filter__select");

  select.addEventListener("change", async () => {
    filters.limit = select.options[select.selectedIndex].value;
    filters.page = 1;

    const params = constructParams(filters);
    const { questions, lastPage } = await fetchFromDB(
      "questions",
      params,
      true
    );
    filters.lastPage = lastPage;

    resetPagination();
    calculateResultsIndexes(questions.length);
    renderQuestions(questions);
  });
}
