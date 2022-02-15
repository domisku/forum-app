import fetchFromDB from "../services/fetchFromDB.js";
import calculateResultsIndexes from "../listeners/pagination/calculateResultsIndexes.js";
import renderQuestions from "../rendering/questions.js";
import filters, { resetFilters } from "../store/filters.js";
import { constructParams } from "../store/filters.js";
import renderHeader from "../utils/UI/renderHeader.js";
import listenForPaginationChange from "../listeners/pagination/pagination.js";
import removePagination from "../utils/UI/removePagination.js";
import currentPage from "../store/currentPage.js";
import removeOldPage from "../utils/UI/removeOldPage.js";
import { NEW_QUESTIONS } from "./pageNameStrings/pageNameStrings.js";
import removeListeners from "../utils/UI/removeListeners.js";
import {
  addLoadingSpinner,
  removeLoadingSpinner,
} from "../rendering/createLoadingSpinner.js";
import sleep from "../utils/sleep/sleep.js";

export default async function newQuestions() {
  if (currentPage.index === NEW_QUESTIONS) return;
  currentPage.index = NEW_QUESTIONS;

  addLoadingSpinner();
  await sleep(800);

  removeListeners();
  removeOldPage();

  renderHeader("New Questions");

  resetFilters(filters);
  filters.limit = 2;
  const params = constructParams(filters);
  const { questions, lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;

  await renderQuestions(questions);
  renderPagination();
  calculateResultsIndexes(2);

  removeLoadingSpinner();
}

function renderPagination() {
  removePagination();

  const paginationTemplate = document.querySelector("#paginationTemplate");
  const clone = paginationTemplate.content.cloneNode(true);
  const mainContent = document.querySelector(".main");

  mainContent.appendChild(clone);

  listenForPaginationChange();
}
