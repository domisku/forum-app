import filters from "../store/filters.js";
import fetchFromDB from "../services/fetchFromDB.js";
import renderMemberCount from "./memberCount.js";
import renderQuestionsCount from "./questionsCount.js";
import renderTagCount from "./tagCount.js";
import renderHotQuestions from "./hotQuestions.js";
import { constructParams } from "../store/filters.js";

export default async function renderDynamicContent() {
  const params = constructParams(filters);
  const { lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;
  const usersCollection = await fetchFromDB("users");
  const unfilteredQuestionsCollection = await fetchFromDB("questions");

  renderMemberCount(usersCollection);
  renderQuestionsCount(unfilteredQuestionsCollection);
  renderTagCount(unfilteredQuestionsCollection);
  renderHotQuestions(usersCollection);
}
