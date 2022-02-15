import fetchFromDB from "../services/fetchFromDB.js";
import renderQuestions from "../rendering/questions.js";
import filters, { resetFilters } from "../store/filters.js";
import { constructParams } from "../store/filters.js";
import listenForPaginationChange from "../listeners/pagination/pagination.js";
import listenForSelectedPerPageChange from "../listeners/selectedPerPageChange.js";
import listenForSelectedCategoryChange from "../listeners/selectedCategoryChange.js";
import listenForSortChange from "../listeners/sortChange.js";
import renderCategoryOptions from "../rendering/categoryOptions.js";
import removeHeader from "../utils/UI/removeHeader.js";
import removePagination from "../utils/UI/removePagination.js";
import currentPage from "../store/currentPage.js";
import removeOldPage from "../utils/UI/removeOldPage.js";
import { ALL_QUESTIONS } from "./pageNameStrings/pageNameStrings.js";
import removeListeners from "../utils/UI/removeListeners.js";
import {
  addLoadingSpinner,
  removeLoadingSpinner,
} from "../rendering/createLoadingSpinner.js";
import sleep from "../utils/sleep/sleep.js";

export default async function allQuestions() {
  if (currentPage.index === ALL_QUESTIONS) return;
  currentPage.index = ALL_QUESTIONS;

  addLoadingSpinner();
  await sleep(800);

  removeListeners();
  removeOldPage();

  resetFilters(filters);
  const params = constructParams(filters);
  const { questions, lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;

  renderHeader(questions);
  await renderQuestions(questions);
  renderPagination();
  removeLoadingSpinner();
}

function renderHeader(questions) {
  removeHeader();

  const mainContent = document.querySelector(".main");
  const headerTemplate = document.querySelector("#mainContentHeader");
  const clone = headerTemplate.content.cloneNode(true);

  mainContent.prepend(clone);
  renderCategoryOptions(questions);
  listenForSortChange();
  listenForSelectedCategoryChange();
  listenForSelectedPerPageChange();
}

function renderPagination() {
  removePagination();

  const paginationTemplate = document.querySelector("#paginationTemplate");
  const clone = paginationTemplate.content.cloneNode(true);
  const mainContent = document.querySelector(".main");

  mainContent.appendChild(clone);

  listenForPaginationChange();
}
