import fetchFromDB from "./scripts/services/fetchFromDB.js";
import filters from "./scripts/store/filters.js";
import { constructParams } from "./scripts/store/filters.js";

import connectLeftSidebarListeners from "./scripts/listeners/leftSidebarNav.js";
import connectHamburgerListeners from "./scripts/listeners/hamburgerMenu.js";
import connectScrollEventListeners from "./scripts/listeners/scrollButton.js";

import renderHotQuestions from "./scripts/rendering/hotQuestions.js";
import renderMemberCount from "./scripts/rendering/memberCount.js";
import renderQuestionsCount from "./scripts/rendering/questionsCount.js";
import renderTagCount from "./scripts/rendering/tagCount.js";
import askQuestion from "./scripts/pages/askQuestion.js";

connectLeftSidebarListeners();
connectScrollEventListeners();
connectHamburgerListeners();
renderDynamicContent();

async function renderDynamicContent() {
  const params = constructParams(filters);
  const { lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;
  const usersCollection = await fetchFromDB("users");
  const unfilteredQuestionsCollection = await fetchFromDB("questions");

  renderMemberCount(usersCollection);
  renderQuestionsCount(unfilteredQuestionsCollection);
  renderTagCount(unfilteredQuestionsCollection);
  renderHotQuestions(usersCollection);

  // allQuestions();
  askQuestion();
}
