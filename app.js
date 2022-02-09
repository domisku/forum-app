import fetchQuestions from "./fetchQuestions.js";
import connectHamburgerListeners from "./hamburgerMenu.js";
import connectScrollEventListeners from "./scrollButton.js";

import listenForFilterChange from "./scripts/listeners/filterChange.js";
import listenForSelectedCategoryChange from "./scripts/listeners/selectedCategoryChange.js";
import listenForSelectedPerPageChange from "./scripts/listeners/selectedPerPageChange.js";

import renderCategoryOptions from "./scripts/rendering/categoryOptions.js";
import renderHotQuestions from "./scripts/rendering/hotQuestions.js";
import renderMemberCount from "./scripts/rendering/memberCount.js";
import renderQuestions from "./scripts/rendering/questions.js";
import renderQuestionsCount from "./scripts/rendering/questionsCount.js";
import renderTagCount from "./scripts/rendering/tagCount.js";

import convertToJavascriptTime from "./scripts/utils/date/toJavascriptTime.js";

connectScrollEventListeners();
connectHamburgerListeners();
renderDynamicContent();

async function renderDynamicContent() {
  const questions = await fetchQuestions();

  questions.sort(
    (question, nextQuestion) =>
      convertToJavascriptTime(nextQuestion.dateCreated) -
      convertToJavascriptTime(question.dateCreated)
  );

  renderCategoryOptions(questions);
  renderQuestions(questions);
  listenForFilterChange(questions);
  listenForSelectedCategoryChange(questions);
  listenForSelectedPerPageChange(questions);
  renderTagCount(questions);
  renderQuestionsCount(questions);
  renderMemberCount(questions);
  renderHotQuestions(questions);
}
