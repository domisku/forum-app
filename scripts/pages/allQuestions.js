import fetchFromDB from "../fetchers/fetchFromDB.js";
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

export default async function allQuestions() {
  resetFilters(filters);
  const params = constructParams(filters);
  const { questions, lastPage } = await fetchFromDB("questions", params, true);
  filters.lastPage = lastPage;

  renderHeader(questions);
  renderQuestions(questions);
  renderPagination();
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
