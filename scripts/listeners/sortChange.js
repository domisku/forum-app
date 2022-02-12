import fetchFromDB from "../fetchers/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters from "../store/filters.js";
import { constructParams } from "../store/filters.js";

export default function listenForSortChange() {
  const articleSortList = document.querySelector(".main-header__list");

  articleSortList.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("main-header__item")) return;

    const clickedSort = event.target;
    const articleSort = Array.from(articleSortList.children);
    clearModifiers();
    clickedSort.classList.add("main-header__item--active");

    switch (clickedSort.dataset.sortType) {
      case "latest":
        filters.sorting = "dateCreated";
        filters.order = "desc";
        break;
      case "votes":
        filters.sorting = "votes";
        filters.order = "desc";
        break;
      case "unanswered":
        filters.sorting = "answers";
        filters.order = "asc";
        break;
      default:
    }

    function clearModifiers() {
      articleSort.forEach((sort) =>
        sort.classList.remove("main-header__item--active")
      );
    }

    const params = constructParams(filters);

    const questions = await fetchFromDB("questions", params);

    renderQuestions(questions);
  });
}
