import fetchFromDB from "../fetchers/fetchFromDB.js";
import calculateResultsIndexes from "../listeners/pagination/calculateResultsIndexes.js";
import renderQuestions from "../rendering/questions.js";
import filters, { resetFilters } from "../store/filters.js";
import { constructParams } from "../store/filters.js";
import removeHeader from "../utils/UI/removeHeader.js";
import listenForPaginationChange from "../listeners/pagination/pagination.js";
import removePagination from "../utils/UI/removePagination.js";

export default async function newQuestions() {
  resetFilters(filters);
  filters.limit = 2;
  const params = constructParams(filters);
  const { questions, lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;

  calculateResultsIndexes(2);

  renderHeader();
  renderQuestions(questions);
  renderPagination();
}

function renderHeader() {
  removeHeader();

  const mainContent = document.querySelector(".main");

  const header = document.createElement("header");
  const headerSection = document.createElement("section");
  const headerTitle = document.createElement("h2");

  header.classList.add("main-header");
  headerSection.classList.add("main-header__top");
  headerTitle.classList.add("main-header__title");

  headerTitle.textContent = "New Questions";
  header.style.height = "6.5rem";
  headerSection.style.height = "100%";

  headerSection.appendChild(headerTitle);
  header.appendChild(headerSection);

  mainContent.prepend(header);
}

function renderPagination() {
  removePagination();

  const paginationTemplate = document.querySelector("#paginationTemplate");
  const clone = paginationTemplate.content.cloneNode(true);
  const mainContent = document.querySelector(".main");

  mainContent.appendChild(clone);

  listenForPaginationChange();
}
