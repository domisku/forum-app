import fetchFromDB from "../fetchers/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters, { constructParams } from "../store/filters.js";

export default function listenForSelectedCategoryChange() {
  const select = document.querySelector("#category-filter");

  select.addEventListener("change", async () => {
    const selectedCategory = select.options[select.selectedIndex].value;

    if (selectedCategory === "all") filters.category = "";
    else filters.category = selectedCategory;

    const params = constructParams(filters);
    const filteredQuestions = await fetchFromDB("questions", params);
    renderQuestions(filteredQuestions);
  });
}
