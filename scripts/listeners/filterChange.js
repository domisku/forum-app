import renderQuestions from "../rendering/questions.js";
import convertToJavascriptTime from "../utils/date/toJavascriptTime.js";

export default function listenForFilterChange(questions) {
  const articleFiltersList = document.querySelector(".main-header__list");

  articleFiltersList.addEventListener("click", (event) => {
    if (!event.target.classList.contains("main-header__item")) return;
    const clickedFilter = event.target;
    const articleFilters = Array.from(articleFiltersList.children);
    clearModifiers();
    clickedFilter.classList.add("main-header__item--active");

    switch (clickedFilter.dataset.filterType) {
      case "latest":
        questions.sort(
          (question, nextQuestion) =>
            convertToJavascriptTime(nextQuestion.dateCreated) -
            convertToJavascriptTime(question.dateCreated)
        );
        break;
      case "votes":
        questions.sort(
          (question, nextQuestion) => nextQuestion.votes - question.votes
        );
        break;
      case "unanswered":
        questions.sort(
          (question, nextQuestion) => question.answers - nextQuestion.answers
        );
        break;
      default:
    }

    function clearModifiers() {
      articleFilters.forEach((filter) =>
        filter.classList.remove("main-header__item--active")
      );
    }
    renderQuestions(questions);
  });
}
