import findActiveFilter from "../utils/UI/findActiveFilter.js";
import renderQuestion from "./question.js";

export default function renderQuestions(questions) {
  if (!questions) return;

  const mainContent = document.querySelector(".main");
  const articles = mainContent.querySelectorAll(".question");
  articles.forEach((article) => article.remove());

  const categoryFilter = findActiveFilter("#category-filter");
  const questionPerPageCount = +findActiveFilter("#count-filter__select");

  let filteredQuestions;

  if (categoryFilter && categoryFilter !== "all") {
    filteredQuestions = questions.filter(
      (question) => question.category === categoryFilter
    );
  } else filteredQuestions = questions;

  for (let [index, entry] of Object.entries(filteredQuestions)) {
    if (index >= questionPerPageCount) break;

    renderQuestion(entry);
  }
}
