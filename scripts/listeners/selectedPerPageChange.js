import fetchFromDB from "../fetchers/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters, { constructParams } from "../store/filters.js";

export default function listenForSelectedPerPageChange() {
  const select = document.querySelector("#count-filter__select");

  select.addEventListener("change", async () => {
    filters.limit = select.options[select.selectedIndex].value;

    const params = constructParams(filters);
    const limitedQuestions = await fetchFromDB("questions", params);
    renderQuestions(limitedQuestions);
  });
}
