import fetchFromDB from "./scripts/fetchers/fetchFromDB.js";
import filters from "./scripts/store/filters.js";
import { constructParams } from "./scripts/store/filters.js";

import connectHamburgerListeners from "./scripts/listeners/hamburgerMenu.js";
import connectScrollEventListeners from "./scripts/listeners/scrollButton.js";
import listenForSortChange from "./scripts/listeners/sortChange.js";
import listenForSelectedCategoryChange from "./scripts/listeners/selectedCategoryChange.js";
import listenForSelectedPerPageChange from "./scripts/listeners/selectedPerPageChange.js";
import listenForPaginationChange from "./scripts/listeners/pagination/pagination.js";

import renderCategoryOptions from "./scripts/rendering/categoryOptions.js";
import renderHotQuestions from "./scripts/rendering/hotQuestions.js";
import renderMemberCount from "./scripts/rendering/memberCount.js";
import renderQuestions from "./scripts/rendering/questions.js";
import renderQuestionsCount from "./scripts/rendering/questionsCount.js";
import renderTagCount from "./scripts/rendering/tagCount.js";

connectScrollEventListeners();
connectHamburgerListeners();
renderDynamicContent();

async function renderDynamicContent() {
  const params = constructParams(filters);
  const { questions: questionsCollection, lastPage } = await fetchFromDB(
    "questions",
    params,
    true
  );
  filters.lastPage = lastPage;
  const usersCollection = await fetchFromDB("users");
  const unfilteredQuestionsCollection = await fetchFromDB("questions");

  renderMemberCount(usersCollection);
  renderQuestionsCount(unfilteredQuestionsCollection);
  renderCategoryOptions(questionsCollection);
  renderTagCount(unfilteredQuestionsCollection);
  renderHotQuestions(usersCollection);

  renderQuestions(questionsCollection);

  listenForPaginationChange();
  listenForSortChange();
  listenForSelectedCategoryChange();
  listenForSelectedPerPageChange();
}
