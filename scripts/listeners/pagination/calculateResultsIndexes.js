import filters from "../../store/filters.js";

export default function calculateResultsIndexes(resultCount = 12) {
  const resultsFrom = document.querySelector(".pagination__from");
  const resultsTo = document.querySelector(".pagination__to");

  const startsAt = filters.page * filters.limit - filters.limit + 1;

  resultsFrom.textContent = startsAt;
  resultsTo.textContent = startsAt + resultCount - 1;
}
